import HeroVideo from "../components/HeroVideo";
import DivisiSection from "../components/DivisiSection";
import ProjectSection from "../components/ProjectSection";
import About from "../components/About";
// import JobOfferSection from "../components/JobOfferSection";
import Footer from "../components/Footer";
import ChatWidget from "../components/ChatWidget";
import Berita from "../components/Berita";
import Jadwal from "../components/Jadwal";
import Polling from "../components/Polling";
import Tag from "../components/Tag";
import Tautan from "../components/Tautan";

export default function Home() {
  return (
    <main>
      <HeroVideo />
      <About />
      <DivisiSection />
      <ProjectSection />
      {/* <JobOfferSection /> */}
      <Berita />
      {/* <Jadwal /> */}
      {/* <Polling /> */}
      <Tag />
      <Tautan />
      <Footer />
      <ChatWidget />
    </main>
  );
}
