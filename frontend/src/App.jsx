import { Route, Routes } from "react-router-dom";
import AmbientBackground from "./components/AmbientBackground";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";
import Home from "./pages/Home";
import ServiceDetail from "./pages/ServiceDetail";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <div className="relative z-10">
        <ScrollManager />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}
