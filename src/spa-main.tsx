import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { Studio } from "@/components/inkiri/Studio";
import {
  TopBar,
  Header,
  Hero,
  Timeline,
  Catalog,
  Compare,
  SizeGuide,
  Portfolio,
  Faq,
  Footer,
  FloatingWhatsApp,
} from "@/components/inkiri/Sections";

function App() {
  const [modelId, setModelId] = useState("polo");
  const [externalColor, setExternalColor] = useState<string | null>(null);
  const simulate = (id: string, color?: string) => {
    setModelId(id);
    if (color) setExternalColor(color);
    document.getElementById("simulador")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Timeline />
        <Studio modelId={modelId} setModelId={setModelId} externalColor={externalColor} />
        <Catalog onSimulate={simulate} />
        <Compare />
        <SizeGuide />
        <Portfolio />
        <Faq />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
