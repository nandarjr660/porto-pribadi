export default function Loading() {
  return (
    <div className="min-h-dvh bg-paper flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-4">
        <div className="w-[200px] h-[3px] bg-border overflow-hidden">
          <div
            className="h-full bg-accent w-1/3"
            style={{ animation: "loadingBar 1.2s linear infinite" }}
          />
        </div>
        <p className="font-mono text-[11px] text-muted uppercase tracking-widest">
          Memuat…
        </p>
      </div>
    </div>
  );
}
