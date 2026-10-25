import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Studio } from "@/components/inkiri/Studio";
import { Header, Hero, Timeline, Catalog, Compare, SizeGuide, Portfolio, Faq, Footer, FloatingWhatsApp } from "@/components/inkiri/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inkiri DTF — Uniformes Prontos em 24 Horas | ABC Paulista" },
      { name: "description", content: "Uniformes empresariais e de eventos prontos em 24h com DTF e Bordado in-house. Simule sua peça online e receba orçamento no WhatsApp." },
      { property: "og:title", content: "Inkiri DTF — Uniformes Prontos em 24 Horas" },
      { property: "og:description", content: "Simulador 2D, estoque a pronta-entrega, DTF e Bordado Industrial. ABC Paulista com envio para todo o Brasil." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [modelId, setModelId] = useState("polo");
  const simulate = (id: string) => {
    setModelId(id);
    document.getElementById("simulador")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Timeline />
        <Studio modelId={modelId} setModelId={setModelId} />
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
