import HeroVideo from "../components/HeroVideo";
import DivisiSection from "../components/DivisiSection";
import ProjectSection from "../components/ProjectSection";
import JobOfferSection from "../components/JobOfferSection";
import Footer from "../components/Footer";
import ChatWidget from "../components/ChatWidget";

export default function Home() {
  return (
    <main>
      <HeroVideo />
      <DivisiSection />
      <ProjectSection />
      <JobOfferSection />
      <Footer />
      <ChatWidget />
    </main>
  );
}
