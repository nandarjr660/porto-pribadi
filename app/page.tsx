import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Roadmap from "../components/Roadmap";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <main className="relative flex flex-col">
      <Navbar />
      <Hero />
      <div className="relative z-20">
        <About />
        <Roadmap />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}