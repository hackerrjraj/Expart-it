import HeroSlider from "../components/HeroSlider";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import About from "../components/About";
import Ticker from "../components/Ticker";
import AwardsSection from "../components/AwardsSection";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Services />
      <Portfolio />
      <About />
      <Ticker />
      <AwardsSection />
      <Testimonials />
    </>
  );
}
