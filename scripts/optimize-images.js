/* eslint-disable */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

sharp.cache(false);

const IMAGES_DIR = path.join(__dirname, "..", "public", "images");

const SUPPORTED = [".webp", ".png", ".jpg", ".jpeg"];

async function optimize() {
  const files = fs.readdirSync(IMAGES_DIR);
  const images = files.filter((f) =>
    SUPPORTED.includes(path.extname(f).toLowerCase()),
  );

  if (images.length === 0) {
    console.log("No supported images found.");
    return;
  }

  let totalSaved = 0;

  for (const file of images) {
    const filePath = path.join(IMAGES_DIR, file);
    const ext = path.extname(file).toLowerCase();
    const originalSize = fs.statSync(filePath).size;

    if (file.startsWith("__")) continue;

    try {
      if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
        const newName = file.replace(ext, ".webp");
        const newPath = path.join(IMAGES_DIR, newName);
        const image = sharp(filePath);
        const buf = await image.webp({ quality: 80, effort: 4 }).toBuffer();
        image.destroy?.();
        fs.writeFileSync(newPath, buf);
        const newSize = fs.statSync(newPath).size;
        totalSaved += Math.max(0, originalSize - newSize);
        console.log(
          `  ${file} -> ${newName}  ${(originalSize / 1024).toFixed(1)}KB -> ${(newSize / 1024).toFixed(1)}KB  (${((1 - newSize / originalSize) * 100).toFixed(0)}% smaller)`,
        );
        try {
          fs.rmSync(filePath);
        } catch {}
        continue;
      }

      const image = sharp(filePath);
      const buf = await image.webp({ quality: 75, effort: 6 }).toBuffer();
      image.destroy?.();
      const newSize = buf.length;

      if (newSize < originalSize) {
        fs.writeFileSync(filePath, buf);
        totalSaved += originalSize - newSize;
        console.log(
          `  ${file}  ${(originalSize / 1024).toFixed(1)}KB -> ${(newSize / 1024).toFixed(1)}KB  (${((1 - newSize / originalSize) * 100).toFixed(0)}% smaller)`,
        );
      } else {
        console.log(`  ${file}  already optimal (skipped)`);
      }
    } catch (err) {
      console.error(`  ${file}: error - ${err.message}`);
    }

    await new Promise((r) => setTimeout(r, 50));
  }

  const gifFiles = files.filter((f) => f.toLowerCase().endsWith(".gif"));
  for (const gif of gifFiles) {
    const gifPath = path.join(IMAGES_DIR, gif);
    if (fs.existsSync(gifPath)) {
      const size = fs.statSync(gifPath).size;
      console.log(
        `  ${gif}  ${(size / 1024 / 1024).toFixed(1)}MB — consider converting to video (MP4/WebM)`,
      );
    }
  }

  console.log(`\nDone! Total savings: ${(totalSaved / 1024).toFixed(1)}KB`);
}

optimize().catch(console.error);
