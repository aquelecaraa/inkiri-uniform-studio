import { useEffect, useRef, useState } from "react";
import { Zap, FileCheck2, Palette, TrendingDown, MousePointerClick, Warehouse, Factory, Truck, MessageCircle, Check, MapPin, Phone, Mail, Clock, Calculator, Sparkles, ShieldCheck, Box, Image as ImageIcon, Layers, Award, Timer, Briefcase, CalendarCheck, HardHat, Utensils, Sun } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Garment } from "./Garment";
import workshopImage from "../../assets/inkiri-workshop.jpg";
import inkiriLogo from "../../assets/inkiri-logo.png";
import { CATALOG, CATALOG_TABS, MODELS, FABRICS, MODEL_3D_BY_SHAPE, recommendSize, waLink, type CatalogTab, type Shape } from "@/lib/inkiri";

/* ── Tokens de estilo (Limpos, Profissionais e Equilibrados) ─────────── */
const ENTER = "animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out fill-mode-backwards motion-reduce:animate-none";
const GLASS = "bg-card/80 backdrop-blur-xl border border-white/10 shadow-xl";
const PRESS = "cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02] active:scale-95";
const PRESS_PRIMARY = `${PRESS} shadow-md shadow-black/15 hover:shadow-md`;

export function TopBar() {
  return (
    <div className="sticky top-0 z-40 bg-primary text-primary-foreground text-[11px] sm:text-sm font-bold py-2 px-3 text-center shadow-md">
      <span className="inline-flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-white animate-ping" />
        ⚡ Produção Expressa 24h Ativa <span className="hidden sm:inline">| Atendimento Imediato para ABC Paulista, SP e Envio Nacional</span>
      </span>
    </div>
  );
}

export function Header() {
  const links = [["#como", "Como funciona"], ["#catalogo", "Catálogo"], ["#tecnologia", "Por que DTF?"], ["#sobre", "A Solução"], ["#medidas", "Medidas"], ["#faq", "FAQ"]];
  return (
    <header className="sticky top-8 sm:top-9 z-30 border-b border-white/10 bg-background/80 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-700 ease-out motion-reduce:animate-none">
      <div className="mx-auto max-w-7xl px-4 h-14 md:h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#topo" aria-label="Inkiri — voltar ao topo" className="flex items-center shrink-0 transition-all duration-300 ease-out hover:scale-105">
          <img src={inkiriLogo} alt="Inkiri" className="h-10 md:h-12 w-auto object-contain" />
        </a>

        {/* Links de navegação */}
        <nav aria-label="Principal" className="hidden md:flex items-center gap-2">
          {links.map(([h, l]) => (
            <a key={h} href={h} className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 lg:px-4 py-1.5 text-[11px] lg:text-xs font-semibold text-foreground/80 transition-all duration-300 ease-out hover:border-primary/50 hover:bg-primary/10 hover:text-white">
              {l}
            </a>
          ))}
        </nav>

        {/* CTA Principal com brilho */}
        <a href="#simulador" className={`btn-shine shrink-0 rounded-full bg-primary text-primary-foreground px-5 py-2 text-xs md:text-sm font-bold ${PRESS_PRIMARY}`}>
          Simular Agora
        </a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="topo" data-wa="Olá! Preciso de uniformes com urgência. Podem me ajudar?" className="bg-hero relative overflow-hidden scroll-mt-24 border-b border-white/10">
      {/* Grade industrial de fundo sutil */}
      <div className="absolute inset-0 grid-lines opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className={`inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-primary/10 backdrop-blur-md text-sky-300 px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${ENTER}`}>
            <Sparkles className="h-3.5 w-3.5 text-sky-400" /> ABC Paulista · Envio Expresso para todo o Brasil
          </span>
          <h1 className={`mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.93] tracking-tight ${ENTER} delay-100`}>
            Uniformes prontos em{" "}
            <span className="text-sky-300">
              24 horas.
            </span>
            <br />
            Sem atrasos, sem dor de cabeça.
          </h1>
          <p className={`mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed ${ENTER} delay-200`}>
            Padronização imediata para empresas e eventos de última hora: estoque inteligente a pronta entrega + personalização in-house com <strong className="text-white font-semibold">DTF Digital</strong> e <strong className="text-white font-semibold">Bordado Industrial</strong>.
          </p>
          <div className={`mt-8 flex flex-col sm:flex-row gap-3.5 ${ENTER} delay-300`}>
            <a href="#simulador" className={`btn-shine rounded-xl bg-primary text-primary-foreground px-8 py-4 font-bold text-center text-base ${PRESS_PRIMARY}`}>
              Simular Meu Uniforme Agora
            </a>
            <a href={waLink("Olá, equipe Inkiri! Quero um orçamento rápido de uniformes.")} target="_blank" rel="noreferrer" className={`rounded-xl border border-white/15 bg-white/[0.04] backdrop-blur-xl px-7 py-4 font-bold text-center flex items-center justify-center gap-2 hover:bg-white/10 ${PRESS}`}>
              <MessageCircle className="h-5 w-5 text-sky-400" />Orçamento Rápido no WhatsApp
            </a>
          </div>
        </div>

        {/* Fotografia real de camisas polo reais no cabide (igual à imagem enviada por você) */}
        <div className={`relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl ${ENTER} delay-200 group`}>
          <div className="absolute inset-0 bg-slate-950 flex items-center justify-center overflow-hidden">
            {/* Foto fiel de camisas polo reais no cabide com maquinário industrial ao fundo */}
            <div className="absolute inset-0 opacity-95 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-[1.02]" style={{ backgroundImage: `url(${workshopImage})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-primary/90 backdrop-blur-md border border-sky-400/40 px-3.5 py-1 text-xs font-bold text-white shadow-md flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-sky-400 animate-ping" /> Estoque Pronta-Entrega
              </span>
              <span className="text-xs font-bold text-sky-300 bg-slate-900/90 px-3 py-1 rounded-full border border-white/10">
                Polo Piquet & Dry-Fit
              </span>
            </div>
            <p className="text-sm font-medium text-slate-200">
              Malhas de alta durabilidade e toque macio preparadas para receber sua estampa em 24h.
            </p>
          </div>
        </div>
      </div>

      {/* Cards de diferencial com borda limpa (sem excesso de brilho) */}
      <div className={`relative mx-auto max-w-7xl px-4 pb-14 grid grid-cols-2 md:grid-cols-4 gap-3.5 ${ENTER} delay-500`}>
        {[[Zap, "Produção Recorde 24h"], [FileCheck2, "Emissão de Nota Fiscal (CNPJ)"], [Palette, "Sem Limite de Cores (DTF)"], [TrendingDown, "Desconto Progressivo por Volume"]].map(([I, l]) => {
          const Icon = I as typeof Zap;
          return (
            <div key={l as string} className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl p-4.5 flex items-center gap-3.5 transition-all duration-300 hover:border-primary/50 hover:bg-card/90">
              <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-sky-400" />
              </div>
              <span className="text-sm font-bold leading-snug">{l as string}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Timeline() {
  const steps = [
    [MousePointerClick, "Escolha e Simule no Site", "Monte a peça, cores, logo e grade em minutos."],
    [Warehouse, "Estoque Inteligente", "Peças lisas já prontas na prateleira, sem esperar confecção."],
    [Factory, "Personalização In-House", "Maquinário próprio de DTF e Bordado Industrial."],
    [Truck, "Logística Prioritária", "Retirada ou envio expresso em até 24h."],
  ] as const;
  return (
    <section id="como" data-wa="Quero entender como funciona a produção em 24h" className={`relative py-16 md:py-24 bg-ice text-ice-foreground scroll-mt-24 overflow-hidden ${ENTER}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 border border-primary/30 text-primary px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest">Fluxo Industrial Express</span>
          <h2 className="mt-2 text-4xl md:text-6xl font-extrabold uppercase text-center">Como entregamos em 24 horas</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-9 left-[12%] right-[12%] h-1 rounded-full bg-slate-200" />
          {steps.map(([Icon, t, d], i) => (
            <div key={t} className="group relative text-center rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/5 border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-ice-foreground text-sky-400 flex items-center justify-center relative shadow-md transition-transform duration-300 ease-out group-hover:scale-105">
                <Icon className="h-7 w-7" />
                <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-primary text-primary-foreground text-sm font-extrabold flex items-center justify-center shadow">{i + 1}</span>
              </div>
              <h3 className="mt-5 text-2xl font-extrabold uppercase">{t}</h3>
              <p className="mt-1.5 text-sm text-slate-600 font-medium">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Catalog3DPreview({ shape, color }: { shape: Shape; color: string }) {
  const viewerRef = useRef<(HTMLElement & {
    model?: {
      materials?: Array<{
        pbrMetallicRoughness: {
          setBaseColorFactor: (rgba: [number, number, number, number]) => void;
          baseColorTexture?: { setTexture: (tex: unknown) => void } | null;
        };
      }>;
    };
    createTexture?: (uri: string) => Promise<unknown>;
  }) | null>(null);
  const [loaded, setLoaded] = useState(false);
  const modelSrc = `${import.meta.env.BASE_URL ?? "/"}${MODEL_3D_BY_SHAPE[shape]}`;

  useEffect(() => {
    setLoaded(false);
    const el = viewerRef.current;
    if (!el) return;
    const onLoad = () => setLoaded(true);
    if (el.model?.materials?.length) setLoaded(true);
    el.addEventListener("load", onLoad);
    return () => el.removeEventListener("load", onLoad);
  }, [modelSrc]);

  useEffect(() => {
    const el = viewerRef.current;
    if (!el || !loaded) return;
    let cancelled = false;
    (async () => {
      const materials = el.model?.materials;
      if (!materials?.length || !el.createTexture) return;
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 256, 64);
      const tex = await el.createTexture(canvas.toDataURL("image/png"));
      if (cancelled) return;
      for (const mat of materials) {
        mat.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);
        mat.pbrMetallicRoughness.baseColorTexture?.setTexture(tex);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [color, loaded, modelSrc]);

  return (
    <model-viewer
      key={modelSrc}
      ref={viewerRef}
      src={modelSrc}
      alt="Visualização 3D da peça"
      camera-controls
      auto-rotate
      shadow-intensity="1"
      shadow-softness="0.85"
      exposure="1.05"
      touch-action="pan-y"
      className="inkiri-model-viewer h-full w-full"
    />
  );
}

export function Catalog({ onSimulate }: { onSimulate: (id: string, color?: string) => void }) {
  const [tab, setTab] = useState<CatalogTab>("todos");
  const [globalMode, setGlobalMode] = useState<"2d" | "3d">("2d");
  const [cardMode, setCardMode] = useState<Record<string, "2d" | "3d">>({});
  const items = CATALOG.filter((c) => tab === "todos" || c.tab.includes(tab));

  const handleGlobalMode = (m: "2d" | "3d") => {
    setGlobalMode(m);
    setCardMode({});
  };

  return (
    <section id="catalogo" data-wa="Quero saber sobre o estoque a pronta-entrega" className={`relative py-16 md:py-24 scroll-mt-24 ${ENTER}`}>
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-sky-400 font-bold uppercase tracking-widest text-xs">Estoque a pronta-entrega</span>
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase mt-1">Campeões de venda</h2>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-card/70 backdrop-blur-md p-1 self-start md:self-auto">
            <button
              type="button"
              onClick={() => handleGlobalMode("2d")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                globalMode === "2d" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-white"
              }`}
            >
              <ImageIcon className="h-3.5 w-3.5" /> Foto Real
            </button>
            <button
              type="button"
              onClick={() => handleGlobalMode("3d")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                globalMode === "3d" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-white"
              }`}
            >
              <Box className="h-3.5 w-3.5" /> Modelo 3D
            </button>
          </div>
        </div>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {CATALOG_TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold border ${PRESS} ${tab === t.id ? "bg-primary text-primary-foreground border-primary shadow-sm" : "border-white/10 bg-card/60 backdrop-blur-md hover:border-primary/50 hover:bg-accent"}`}>{t.label}</button>
          ))}
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((c) => {
            const m = MODELS.find((x) => x.id === c.id)!;
            const mode = cardMode[c.id] ?? globalMode;
            return (
              <article key={c.id} className="group rounded-2xl border border-white/10 bg-card/70 backdrop-blur-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-md">
                <div className="bg-stage aspect-square p-4 overflow-hidden relative">
                  <div className="absolute top-2.5 right-2.5 z-10 inline-flex rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 p-0.5 text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setCardMode((p) => ({ ...p, [c.id]: "2d" }))}
                      className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                        mode === "2d" ? "bg-primary text-primary-foreground" : "text-slate-300 hover:text-white"
                      }`}
                    >
                      Foto
                    </button>
                    <button
                      type="button"
                      onClick={() => setCardMode((p) => ({ ...p, [c.id]: "3d" }))}
                      className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                        mode === "3d" ? "bg-primary text-primary-foreground" : "text-slate-300 hover:text-white"
                      }`}
                    >
                      3D
                    </button>
                  </div>
                  {mode === "3d" ? (
                    <div className="h-full w-full">
                      <Catalog3DPreview shape={m.shape} color={c.color} />
                    </div>
                  ) : (
                    <div className="h-full w-full p-2 transition-transform duration-500 group-hover:scale-105">
                      <Garment shape={m.shape} color={c.color} className="h-full w-full drop-shadow-md" />
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-extrabold uppercase leading-tight">{m.name}</h3>
                  <p className="text-xs text-sky-400 font-bold mt-1 uppercase tracking-wider">{FABRICS[m.fabric].name}</p>
                  <p className="text-sm text-muted-foreground mt-2 flex-1">{c.spec}</p>
                  <button onClick={() => onSimulate(c.id, c.color)} className={`mt-4 rounded-xl bg-primary text-primary-foreground py-3 text-sm font-bold shadow-sm transition-colors duration-200 hover:bg-primary/90 ${PRESS}`}>
                    Simular Minha Logo Nesta Peça
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Compare() {
  const dtfHighlights = [
    "Zero custo de telas ou matrizes",
    "Fotos, degradês e cores ilimitadas",
    "Alta definição e toque flexível que não racha",
    "Viável de pequenos lotes a grandes tiragens",
  ];
  const compatibleFabrics = [
    ["Algodão penteado e moletom pesado", "Fidelidade total de cores em camisetas 30.1 e agasalhos flanelados de alta gramatura."],
    ["Poliamida, poliéster e tecidos esportivos", "Aderência elástica ideal para linha Dry-Fit, corridas, academias e eventos ao ar livre."],
    ["Tecidos com proteção UV e impermeáveis", "Aplicação segura e durável inclusive em camisas UV50+ e jaquetas corta-vento impermeáveis."],
  ] as const;

  return (
    <section id="tecnologia" data-wa="Tenho uma arte colorida para avaliar em DTF" className={`py-16 md:py-24 bg-card/50 border-y border-white/10 scroll-mt-24 ${ENTER}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-primary/10 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-sky-300">
            <Sparkles className="h-3.5 w-3.5 text-sky-400" /> Por que DTF?
          </span>
          <h2 className="mt-3 text-4xl md:text-6xl font-extrabold uppercase">Por que Tecnologia DTF?</h2>
          <p className="mt-3 text-base md:text-lg text-muted-foreground">
            A evolução da estamparia têxtil sem limitações de cor, tecido ou complexidade.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-6 items-stretch">
          {/* Card 1: Sem limite de cores e sem custo de telas */}
          <div className={`rounded-3xl ${GLASS} p-7 md:p-9 flex flex-col justify-between relative overflow-hidden`}>
            <div>
              <div className="inline-flex items-center gap-2 rounded-xl bg-primary/15 border border-primary/30 px-3.5 py-2 text-sky-300 text-xs font-bold uppercase tracking-wider">
                <Palette className="h-4 w-4 text-sky-400" /> Tecnologia DTF Inkiri
              </div>
              <h3 className="mt-5 text-2xl md:text-3xl font-extrabold uppercase leading-tight">
                Sem limite de cores e sem custo de telas
              </h3>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                Diferente da serigrafia tradicional, a impressão <strong className="text-white">DTF (Direct to Film)</strong> não exige a criação de matrizes ou telas por cor. Isso permite imprimir fotos, ilustrações coloridas, degradês e detalhes complexos em pequenas ou grandes tiragens com custo super competitivo.
              </p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                {dtfHighlights.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 rounded-xl bg-white/[0.03] border border-white/10 px-3.5 py-2.5 text-xs md:text-sm font-semibold">
                    <span className="h-5 w-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
                      <Check className="h-3.5 w-3.5 text-sky-400" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                ⚡ Impressão Digital de Alta Definição In-House
              </span>
              <a href="#simulador" className={`rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-xs md:text-sm font-bold ${PRESS_PRIMARY}`}>
                Testar Minha Logo no Simulador
              </a>
            </div>
          </div>

          {/* Card 2: Compatível com diversos tipos de tecido */}
          <div className={`rounded-3xl ${GLASS} p-7 md:p-9 flex flex-col justify-between`}>
            <div>
              <div className="inline-flex items-center gap-2 rounded-xl bg-primary/15 border border-primary/30 px-3.5 py-2 text-sky-300 text-xs font-bold uppercase tracking-wider">
                <Layers className="h-4 w-4 text-sky-400" /> Versatilidade Total
              </div>
              <h3 className="mt-5 text-2xl md:text-3xl font-extrabold uppercase leading-tight">
                Compatível com diversos tipos de tecido
              </h3>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                O DTF adere com perfeição tanto em tecidos <strong className="text-white">100% algodão</strong> quanto em tecidos <strong className="text-white">sintéticos, mistos e tecnológicos</strong>:
              </p>

              <div className="mt-6 space-y-3.5">
                {compatibleFabrics.map(([title, desc]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-start gap-3.5 transition-colors hover:border-primary/40">
                    <div className="h-8 w-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-sky-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm md:text-base text-white">{title}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground font-medium">
                Não desbota, não trinca e acompanha a elasticidade da malha.
              </span>
              <a href="#catalogo" className={`rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-2.5 text-xs md:text-sm font-bold ${PRESS}`}>
                Ver Nossos Produtos
              </a>
            </div>
          </div>
        </div>

        {/* Destaque complementar do site inkiri.com.br: Bordados Computadorizados */}
        <div className="mt-6 rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/15 via-card/80 to-card/80 backdrop-blur-xl p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-300">
              🧵 Também disponível In-House
            </span>
            <h3 className="mt-1 text-2xl md:text-3xl font-extrabold uppercase">
              Bordados Computadorizados Customizados Para Sua Empresa
            </h3>
            <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
              Dê o toque de sofisticação e durabilidade que sua marca merece com nosso bordado industrial de alta precisão. Qualidade premium, sem atrasos e a agilidade que o seu negócio precisa para Camisas Polo, Moletons e Jaquetas Corta-Vento.
            </p>
          </div>
          <a
            href={waLink("Olá, equipe Inkiri! Quero avaliar minha logo para DTF ou Bordado.")}
            target="_blank"
            rel="noreferrer"
            className={`shrink-0 rounded-xl bg-primary text-primary-foreground px-6 py-3.5 text-sm font-bold flex items-center gap-2 ${PRESS_PRIMARY}`}
          >
            <MessageCircle className="h-4 w-4" /> Avaliar Minha Arte no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export function SizeGuide() {
  const [h, setH] = useState(""); const [w, setW] = useState("");
  const result = +h > 120 && +w > 30 ? recommendSize(+h, +w) : null;
  const table = [["PP", 48, 66], ["P", 50, 68], ["M", 53, 71], ["G", 56, 74], ["GG", 59, 77], ["XG", 62, 80]];
  const baby = [["PP", 40, 58], ["P", 42, 60], ["M", 44, 62], ["G", 46, 64], ["GG", 48, 66], ["XG", 50, 68]];
  return (
    <section id="medidas" data-wa="Tenho dúvida sobre os tamanhos dos uniformes" className={`py-16 md:py-24 scroll-mt-24 ${ENTER}`}>
      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-[1.4fr_1fr] gap-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase">Guia de medidas</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {[["Tradicional / Unissex", table], ["Baby Look", baby]].map(([t, rows]) => (
              <div key={t as string} className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl overflow-hidden shadow-lg">
                <p className="bg-primary/15 border-b border-white/10 px-4 py-2.5 font-bold text-sm text-sky-300">{t as string} (cm)</p>
                <table className="w-full text-sm text-center">
                  <thead><tr className="text-muted-foreground"><th className="py-2.5">Tam.</th><th>Largura</th><th>Altura</th></tr></thead>
                  <tbody>
                    {(rows as (string | number)[][]).map((r) => (
                      <tr key={r[0]} className={`border-t border-white/10 transition-colors ${result === r[0] ? "bg-primary/20 text-sky-300 font-extrabold" : ""}`}>
                        <td className="py-2.5 font-bold">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
        <div className={`rounded-2xl ${GLASS} p-6 self-start shadow-xl`}>
          <h3 className="text-2xl font-extrabold uppercase flex items-center gap-2"><Calculator className="h-6 w-6 text-sky-400" />Calculadora de tamanho ideal</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="text-sm font-semibold">Altura (cm)<input type="number" inputMode="numeric" value={h} onChange={(e) => setH(e.target.value)} placeholder="175" className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 outline-none transition-all duration-300 focus:border-sky-400 px-3 py-2.5" /></label>
            <label className="text-sm font-semibold">Peso (kg)<input type="number" inputMode="numeric" value={w} onChange={(e) => setW(e.target.value)} placeholder="75" className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 outline-none transition-all duration-300 focus:border-sky-400 px-3 py-2.5" /></label>
          </div>
          <div className="mt-5 rounded-xl bg-primary/10 border border-primary/20 p-5 text-center">
            {result ? <><p className="text-sm text-sky-300 font-semibold">Tamanho recomendado</p><p className="font-display text-7xl font-extrabold text-white">{result}</p></> : <p className="text-sm text-muted-foreground">Digite altura e peso para ver a recomendação.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Portfolio() {
  const pillars = [
    [Zap, "Padronização Imediata", "Sua equipe uniformizada e transmitindo profissionalismo amanhã mesmo."],
    [Award, "Acabamento de Alto Padrão", "Rapidez não significa perda de qualidade. Costuras reforçadas e modelagem que valoriza quem veste."],
    [Timer, "Foco no seu Prazo", "Se prometemos para amanhã, entregamos amanhã. Sem desculpas."],
  ] as const;

  const solutions = [
    [Briefcase, "Uniformes Corporativos", "Camisas polo e camisetas sociais que garantem um visual elegante para sua equipe de escritório, vendas e atendimento ao público."],
    [CalendarCheck, "Camisetas para Eventos & Feiras", "Soluções em lotes rápidos para staff, congressos, feiras, lançamentos e ações promocionais em tempo recorde."],
    [HardHat, "Linha Operacional & Logística", "Peças confeccionadas em tecidos de alta resistência, desenvolvidas para suportar a rotina pesada da indústria e logística."],
    [Utensils, "Food Service & Restaurantes", "Uniformes práticos, resistentes e fáceis de lavar, atendendo cozinhas profissionais, bistrôs e equipes de salão."],
    [Sun, "Linha Esportiva (Dry-Fit & UV50+)", "Camisetas tecnológicas com proteção solar certificada e secagem rápida para corridas, eventos ao ar livre e equipes em campo."],
    [ShieldCheck, "Inverno & Corta-Vento", "Jaquetas corta-vento impermeáveis e moletons flanelados personalizados com DTF de alta fixação ou bordado industrial."],
  ] as const;

  return (
    <section id="sobre" data-wa="Preciso de uniformes com entrega rápida sem atrasos" className={`py-16 md:py-24 bg-card/40 border-y border-white/10 scroll-mt-24 ${ENTER}`}>
      <div className="mx-auto max-w-7xl px-4">
        {/* Bloco 1: Esqueça os Prazos Intermináveis das Confecções Tradicionais */}
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-primary/10 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-sky-300">
              ⚡ Produção Agilizada Inkiri
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase leading-[0.98]">
              Esqueça os Prazos Intermináveis das Confecções Tradicionais
            </h2>
            <p className="mt-4 text-lg font-semibold text-sky-300">
              Nascemos para resolver o maior gargalo do mercado: a lentidão que trava o seu negócio.
            </p>
            <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
              Sabemos que a sua empresa não pode parar e que eventos não mudam de data porque a entrega atrasou. Enquanto o mercado pede semanas para entregar um pedido, nós revolucionamos o processo. Unimos <strong className="text-white">estoque inteligente</strong>, <strong className="text-white">maquinário de ponta</strong> e uma equipe focada em processos ágeis para entregar uniformes de alto padrão em apenas <strong className="text-white">24 horas</strong>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#simulador" className={`rounded-xl bg-primary text-primary-foreground px-6 py-3.5 text-sm font-bold ${PRESS_PRIMARY}`}>
                Resolver Meu Pedido Agora
              </a>
              <a
                href={waLink("Olá! Tenho urgência em uniformes e preciso de entrega rápida.")}
                target="_blank"
                rel="noreferrer"
                className={`rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-bold flex items-center gap-2 hover:bg-white/10 ${PRESS}`}
              >
                <MessageCircle className="h-4 w-4 text-sky-400" /> Falar com Atendimento Express
              </a>
            </div>
          </div>

          <div className="space-y-4">
            {pillars.map(([Icon, title, desc]) => (
              <div key={title} className={`rounded-2xl ${GLASS} p-5 md:p-6 flex items-start gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40`}>
                <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                  <Icon className="h-6 w-6 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold uppercase">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bloco 2: Soluções Expressas para Cada Necessidade (do site inkiri.com.br) */}
        <div className="mt-16 pt-14 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-400">
              Para Todos os Segmentos
            </span>
            <h3 className="mt-1 text-3xl md:text-5xl font-extrabold uppercase">
              Soluções Expressas para Cada Necessidade
            </h3>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              Não importa o seu nicho, nós temos o modelo ideal pronto para receber sua marca.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map(([Icon, title, desc]) => (
              <div key={title} className="group rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
                <div className="h-11 w-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5 text-sky-400" />
                </div>
                <h4 className="mt-4 text-xl font-extrabold uppercase">{title}</h4>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const faqs: [string, string][] = [
    ["Quais as vantagens do DTF?", "Sem limite de cores, aceita fotos e degradês, não tem custo de tela, é viável a partir de poucas peças e adere em algodão, poliéster, poliamida, dry-fit e tecidos impermeáveis."],
    ["O DTF resiste a lavagens?", "Sim. Com lavagem do avesso e sem secadora em alta temperatura, a estampa mantém cor e elasticidade por dezenas de lavagens, sem rachar."],
    ["Quais arquivos devo enviar?", "Preferencialmente vetor em PDF, AI ou CDR. Também aceitamos PNG com fundo transparente em 300 DPI. Nossa equipe revisa a arte antes de produzir."],
    ["Vocês enviam para todo o Brasil?", "Sim, via Sedex ou transportadora com código de rastreio. O prazo de produção continua de 24h e o frete é calculado no orçamento."],
    ["Como funciona a logística expressa no ABC Paulista?", "Para Santo André, São Bernardo, São Caetano, Diadema, Mauá e Grande SP oferecemos retirada no local ou entrega expressa em até 24h após aprovação da arte."],
    ["Emitem nota fiscal?", "Sim, emitimos nota fiscal para CNPJ e CPF em todos os pedidos."],
  ];
  return (
    <section id="faq" data-wa="Tenho uma dúvida sobre os pedidos" className={`py-16 md:py-24 scroll-mt-24 ${ENTER}`}>
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold uppercase text-center">Perguntas frequentes</h2>
        <Accordion type="single" collapsible className="mt-8 space-y-2">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="rounded-xl border border-white/10 bg-card/40 px-4">
              <AccordionTrigger className="text-left text-base font-bold hover:text-sky-400">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ice text-ice-foreground border-t-4 border-primary">
      <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <img src={inkiriLogo} alt="Inkiri" className="h-12 md:h-14 w-auto object-contain mb-3" />
          <p className="opacity-75 font-medium">Uniformes Prontos em 24 Horas.</p>
        </div>
        <div className="space-y-2"><p className="flex items-center gap-2 font-semibold"><MapPin className="h-4 w-4 text-primary" />ABC Paulista - SP</p><p className="opacity-75">Envio para todo o Brasil</p></div>
        <div className="space-y-2 font-semibold">
          <a href={waLink("Olá, equipe Inkiri!")} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary"><Phone className="h-4 w-4 text-primary" />(11) 94088-2448</a>
          <a href="mailto:contato@inkiri.com.br" className="flex items-center gap-2 hover:text-primary"><Mail className="h-4 w-4 text-primary" />contato@inkiri.com.br</a>
        </div>
        <div className="space-y-1"><p className="flex items-center gap-2 font-bold"><Clock className="h-4 w-4 text-primary" />Atendimento</p><p className="opacity-75">Seg-Sex 08h às 18h</p><p className="opacity-75">Sáb 08h às 12h</p></div>
      </div>
      <p className="text-center text-xs opacity-60 pb-6">© {new Date().getFullYear()} Inkiri DTF. Todos os direitos reservados.</p>
    </footer>
  );
}

export function FloatingWhatsApp() {
  const [msg, setMsg] = useState("Olá, equipe Inkiri! Quero um orçamento de uniformes.");
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-wa]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setMsg(e.target.getAttribute("data-wa")!); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return (
    <a href={waLink(msg)} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" title={msg}
      className={`fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center ${PRESS_PRIMARY}`}>
      <MessageCircle className="h-7 w-7" />
      <span className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-35" />
    </a>
  );
}
