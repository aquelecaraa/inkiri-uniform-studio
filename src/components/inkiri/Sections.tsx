import { useEffect, useRef, useState } from "react";
import { Zap, FileCheck2, Palette, TrendingDown, MousePointerClick, Warehouse, Factory, Truck, MessageCircle, Check, X, Star, MapPin, Phone, Mail, Clock, Calculator, Layers } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Garment } from "./Garment";
import { CATALOG, CATALOG_TABS, MODELS, FABRICS, recommendSize, waLink, type CatalogTab } from "@/lib/inkiri";

// 1. COMPONENTE DA ANIMAÇÃO (Movido para aqui para evitar erros de importação no Lovable)
export function SilkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const speed = 0.02;
    const scale = 2;
    const noiseIntensity = 0.8;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const noise = (x: number, y: number) => {
      const G = 2.71828;
      const rx = G * Math.sin(G * x);
      const ry = G * Math.sin(G * y);
      return (rx * ry * (1 + x)) % 1;
    };

    const animate = () => {
      const { width, height } = canvas;
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0a0f1d'); 
      gradient.addColorStop(0.5, '#162032');
      gradient.addColorStop(1, '#0a0f1d');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let x = 0; x < width; x += 3) {
        for (let y = 0; y < height; y += 3) {
          const u = (x / width) * scale;
          const v = (y / height) * scale;
          const tOffset = speed * time;
          let tex_x = u;
          let tex_y = v + 0.03 * Math.sin(8.0 * tex_x - tOffset);

          const pattern = 0.6 + 0.4 * Math.sin(
            5.0 * (tex_x + tex_y + Math.cos(3.0 * tex_x + 5.0 * tex_y) + 0.02 * tOffset) +
            Math.sin(20.0 * (tex_x + tex_y - 0.1 * tOffset))
          );
          const rnd = noise(x, y);
          const intensity = Math.max(0, pattern - rnd / 15.0 * noiseIntensity);
          
          const r = Math.floor(40 * intensity);
          const g = Math.floor(70 * intensity);
          const b = Math.floor(150 * intensity);
          const a = 255;

          const index = (y * width + x) * 4;
          if (index < data.length) {
            data[index] = r; data[index + 1] = g; data[index + 2] = b; data[index + 3] = a;
            if (x + 1 < width) { data[index + 4] = r; data[index + 5] = g; data[index + 6] = b; data[index + 7] = a; }
            if (y + 1 < height) { const idxY = index + width * 4; if (idxY < data.length) { data[idxY] = r; data[idxY + 1] = g; data[idxY + 2] = b; data[idxY + 3] = a; } }
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);

      const overlayGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) / 2);
      overlayGradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
      overlayGradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, width, height);

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}


// 2. SEÇÕES DO SITE
export function TopBar() {
  return (
    <div className="sticky top-0 z-40 bg-primary text-primary-foreground text-[11px] sm:text-sm font-semibold py-2 px-3 text-center shadow-md">
      <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary-foreground animate-pulse shadow-sm" />⚡ Produção Expressa 24h Ativa <span className="hidden sm:inline">| Atendimento Imediato para ABC Paulista, SP e Envio Nacional</span></span>
    </div>
  );
}

export function Header() {
  return (
    <header className="border-b border-border bg-background/90 backdrop-blur sticky top-[36px] sm:top-[40px] z-30 shadow-sm transition-all">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <a href="#topo" className="font-display text-2xl font-extrabold uppercase tracking-wide cursor-pointer hover:scale-105 transition-transform">Inkiri<span className="text-primary">DTF</span></a>
        <nav className="hidden md:flex gap-6 text-sm font-semibold text-muted-foreground">
          {[["#como", "Como funciona"], ["#catalogo", "Catálogo"], ["#tecnologia", "DTF x Bordado"], ["#medidas", "Medidas"], ["#faq", "FAQ"]].map(([h, l]) => <a key={h} href={h} className="cursor-pointer transition-colors duration-300 hover:text-primary">{l}</a>)}
        </nav>
        <a href="#simulador" className="rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-bold shadow-md cursor-pointer transition-all duration-300 hover:scale-105 hover:brightness-110">Simular</a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="topo" data-wa="Olá! Preciso de uniformes com urgência. Podem me ajudar?" className="relative overflow-hidden bg-black text-white">
      <SilkBackground />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      <div className="relative z-20 mx-auto max-w-7xl px-4 py-16 md:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/20 text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur">ABC Paulista · Envio para todo o Brasil</span>
          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.95] drop-shadow-lg text-white">Uniformes prontos em <span className="text-primary">24 horas.</span><br />Sem atrasos, sem dor de cabeça.</h1>
          <p className="mt-6 text-lg font-medium text-gray-200 max-w-xl drop-shadow-md">Padronização imediata para empresas e eventos de última hora: estoque inteligente a pronta entrega + personalização in-house com DTF Digital e Bordado Industrial.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href="#simulador" className="rounded-xl bg-primary text-primary-foreground px-8 py-4 font-bold text-center shadow-glow cursor-pointer transition-all duration-300 hover:scale-105 hover:brightness-110 text-lg">Simular Meu Uniforme</a>
            <a href={waLink("Olá, equipe Inkiri! Quero um orçamento rápido de uniformes.")} target="_blank" rel="noreferrer" className="rounded-xl border border-white/20 bg-white/10 backdrop-blur px-8 py-4 font-bold text-center flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/20 text-white shadow-sm text-lg"><MessageCircle className="h-5 w-5" />Orçamento WhatsApp</a>
          </div>
        </div>
        <div className="relative h-[340px] sm:h-[440px] animate-in fade-in zoom-in duration-1000">
          <Garment shape="polo" body="#ffffff" collar="#1d4ed8" className="absolute left-0 top-6 w-[55%] drop-shadow-2xl -rotate-6 transition-transform hover:rotate-0 duration-500" />
          <Garment shape="hoodie" body="#111214" collar="#111214" className="absolute right-0 top-0 w-[52%] drop-shadow-2xl rotate-6 transition-transform hover:rotate-0 duration-500" />
          <Garment shape="tshirt" body="#15803d" className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[50%] drop-shadow-2xl transition-transform hover:-translate-y-4 duration-500" />
        </div>
      </div>
      <div className="relative z-20 mx-auto max-w-7xl px-4 pb-12 grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300">
        {[[Zap, "Produção Recorde 24h"], [FileCheck2, "Emissão de Nota Fiscal (CNPJ)"], [Palette, "Sem Limite de Cores (DTF)"], [TrendingDown, "Desconto Progressivo por Volume"]].map(([I, l]) => {
          const Icon = I as typeof Zap;
          return <div key={l as string} className="rounded-xl border border-white/10 bg-black/40 backdrop-blur p-5 flex items-center gap-3 shadow-sm hover:border-primary/50 transition-colors cursor-default"><Icon className="h-7 w-7 text-primary shrink-0" /><span className="text-sm font-bold text-white">{l as string}</span></div>;
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
    <section id="como" data-wa="Quero entender como funciona a produção em 24h" className="py-16 md:py-24 bg-card text-foreground border-y border-border">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-4xl md:text-6xl font-bold uppercase text-center text-primary font-display">Como entregamos em 24 horas</h2>
        <div className="mt-16 grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-primary/20" />
          {steps.map(([Icon, t, d], i) => (
            <div key={t} className="relative text-center group">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center relative shadow-lg group-hover:scale-110 transition-transform duration-300"><Icon className="h-8 w-8" /><span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-foreground text-background text-sm font-bold flex items-center justify-center border-2 border-card">{i + 1}</span></div>
              <h3 className="mt-6 text-xl font-bold uppercase text-foreground group-hover:text-primary transition-colors">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground font-medium">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Catalog({ onSimulate }: { onSimulate: (id: string) => void }) {
  const [tab, setTab] = useState<CatalogTab>("todos");
  const items = CATALOG.filter((c) => tab === "todos" || c.tab.includes(tab));
  return (
    <section id="catalogo" data-wa="Quero saber sobre o estoque a pronta-entrega" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <span className="text-primary font-bold uppercase tracking-widest text-xs">Estoque a pronta-entrega</span>
        <h2 className="text-4xl md:text-6xl font-bold uppercase font-display mt-2">Campeões de venda</h2>
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {CATALOG_TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold border cursor-pointer transition-all duration-300 hover:scale-105 ${tab === t.id ? "bg-primary text-primary-foreground border-primary shadow-glow" : "border-border bg-card hover:bg-primary/10 hover:text-primary"}`}>{t.label}</button>
          ))}
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((c) => {
            const m = MODELS.find((x) => x.id === c.id)!;
            return (
              <article key={c.id} className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col group hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                <div className="bg-muted aspect-square p-6 overflow-hidden"><Garment shape={m.shape} body={c.color} collar={c.color === "#ffffff" ? "#1f2a44" : "#ffffff"} className="h-full w-full group-hover:scale-105 transition-transform duration-500 drop-shadow-md" /></div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-bold uppercase leading-tight font-display">{m.name}</h3>
                  <p className="text-xs text-primary font-bold mt-1.5 uppercase tracking-wide">{FABRICS[m.fabric].name}</p>
                  <p className="text-sm text-muted-foreground mt-3 flex-1 font-medium">{c.spec}</p>
                  <button onClick={() => onSimulate(c.id)} className="mt-5 w-full rounded-xl bg-primary text-primary-foreground py-3.5 text-sm font-bold shadow-md cursor-pointer transition-all duration-300 hover:brightness-110 hover:scale-105">Simular Peça</button>
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
  const rows = [
    ["Custo de tela/matriz", "Zero", "Zero", "Cobra por cor"],
    ["Fotos e degradês", true, false, false],
    ["Cores ilimitadas", true, "Até 12 linhas", false],
    ["Não racha / não descasca", true, true, "Com o tempo"],
    ["Algodão, sintéticos e impermeáveis", true, "Maioria", "Limitado"],
    ["Lotes pequenos (10 peças)", true, true, false],
    ["Acabamento premium", "Alto", "Máximo", "Médio"],
  ] as const;
  const cell = (v: string | boolean) => v === true ? <Check className="h-6 w-6 text-primary mx-auto" /> : v === false ? <X className="h-6 w-6 text-destructive mx-auto" /> : <span className="text-sm font-bold">{v}</span>;
  return (
    <section id="tecnologia" data-wa="Tenho uma arte colorida para avaliar em DTF" className="py-16 md:py-24 bg-muted border-y border-border">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-4xl md:text-6xl font-bold uppercase text-center font-display">DTF Digital vs. Bordado vs. Serigrafia</h2>
        <p className="text-center text-muted-foreground font-medium mt-4 max-w-3xl mx-auto text-lg">O DTF da Inkiri não cobra telas, aceita fotos e degradês, não racha e adere em algodão, sintéticos e impermeáveis. O Bordado Computadorizado é a escolha para Polos, Moletons e Corta-Vento com máxima sofisticação.</p>
        <div className="mt-12 overflow-x-auto rounded-3xl border border-border shadow-lg bg-card">
          <table className="w-full text-center min-w-[560px]">
            <thead><tr className="bg-background border-b border-border"><th className="p-5 text-left text-sm text-muted-foreground">Critério Técnico</th><th className="p-5 text-primary font-display text-2xl uppercase bg-primary/5">DTF Inkiri</th><th className="p-5 font-display text-2xl uppercase">Bordado</th><th className="p-5 font-display text-2xl uppercase text-muted-foreground">Serigrafia</th></tr></thead>
            <tbody>{rows.map(([l, a, b, c]) => <tr key={l} className="border-t border-border hover:bg-muted/30 transition-colors"><td className="p-5 text-left text-sm font-bold">{l}</td><td className="p-5 bg-primary/5">{cell(a)}</td><td className="p-5">{cell(b)}</td><td className="p-5">{cell(c)}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border-2 border-primary bg-primary/5 p-6 shadow-sm"><b className="text-primary text-lg flex items-center gap-2"><Zap className="h-5 w-5" />Use DTF quando:</b><p className="text-sm font-medium text-muted-foreground mt-2">A arte for colorida, contiver foto, degradê, ou quando o tecido for Dry-Fit, proteção UV ou corta-vento impermeável.</p></div>
          <div className="rounded-2xl border-2 border-border bg-card p-6 shadow-sm"><b className="text-foreground text-lg flex items-center gap-2"><Layers className="h-5 w-5" />Use Bordado quando:</b><p className="text-sm font-medium text-muted-foreground mt-2">O objetivo for uma imagem institucional corporativa premium (em camisas Polo, Moletons, Jaquetas e Aventais de brim).</p></div>
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
    <section id="medidas" data-wa="Tenho dúvida sobre os tamanhos dos uniformes" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-[1.4fr_1fr] gap-10">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold uppercase font-display">Guia de medidas</h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            {[["Tradicional / Unissex", table], ["Baby Look Feminina", baby]].map(([t, rows]) => (
              <div key={t as string} className="rounded-2xl border border-border overflow-hidden shadow-sm hover:border-primary/50 transition-colors">
                <p className="bg-muted px-5 py-3 font-bold text-sm border-b border-border">{t as string} (cm)</p>
                <table className="w-full text-sm text-center"><thead><tr className="text-muted-foreground font-semibold"><th className="py-3">Tam.</th><th>Largura</th><th>Altura</th></tr></thead>
                  <tbody>{(rows as (string | number)[][]).map((r) => <tr key={r[0]} className={`border-t border-border transition-colors ${result === r[0] ? "bg-primary/10 text-primary font-extrabold" : "hover:bg-muted/50 font-medium"}`}><td className="py-3">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody></table>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-8 self-start shadow-lg">
          <h3 className="text-2xl font-bold uppercase flex items-center gap-2 text-primary font-display"><Calculator className="h-7 w-7" />Calculadora de Tamanho</h3>
          <p className="text-sm font-medium text-muted-foreground mt-2 mb-6">Insira os dados do colaborador para uma recomendação automática.</p>
          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm font-bold text-foreground">Altura (cm)<input type="number" inputMode="numeric" value={h} onChange={(e) => setH(e.target.value)} placeholder="175" className="mt-2 w-full rounded-xl bg-background border border-border px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" /></label>
            <label className="text-sm font-bold text-foreground">Peso (kg)<input type="number" inputMode="numeric" value={w} onChange={(e) => setW(e.target.value)} placeholder="75" className="mt-2 w-full rounded-xl bg-background border border-border px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" /></label>
          </div>
          <div className="mt-6 rounded-xl bg-card border border-border p-6 text-center shadow-inner">
            {result ? <><p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Recomendado</p><p className="font-display text-7xl font-extrabold text-primary mt-2 animate-in zoom-in duration-300">{result}</p></> : <p className="text-sm font-medium text-muted-foreground py-4">Digite altura e peso para ver a recomendação.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Portfolio() {
  const [tab, setTab] = useState<"empresas" | "eventos">("empresas");
  const data = {
    empresas: [["Logística ABC", "polo", "#1f2a44"], ["Clínica Vida", "babylook", "#ffffff"], ["Construtora Forte", "jacket", "#3b3f45"], ["Bistrô Santo André", "apron", "#111214"]],
    eventos: [["Corrida São Bernardo", "tshirt", "#dc2626"], ["Festival de Verão", "tank", "#1d4ed8"], ["Convenção Tech SP", "tshirt", "#15803d"], ["Equipe Trilha UV", "longsleeve", "#8a8d93"]],
  } as const;
  const testimonials = [
    ["Pedimos numa terça à tarde e na quarta cedo a equipe já estava uniformizada. Inacreditável.", "Marina R., RH — Santo André"],
    ["300 camisetas DTF coloridas para a corrida em 24h, com nota fiscal. Salvaram nosso evento.", "Carlos M., Organizador de eventos"],
    ["Bordado impecável nas polos e entrega via Sedex para Curitiba no prazo combinado.", "Juliana P., Franquia de Serviços"],
  ];
  return (
    <section id="portfolio" data-wa="Vi o portfólio e quero algo parecido para minha empresa" className="py-16 md:py-24 bg-muted border-y border-border">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-4xl md:text-6xl font-bold uppercase text-center font-display">Quem já confia na Inkiri</h2>
        <div className="mt-8 flex justify-center gap-3">
          {([["empresas", "Empresas Padronizadas"], ["eventos", "Eventos Atendidos em 24h"]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={`rounded-full px-6 py-3 text-sm font-bold border cursor-pointer transition-all duration-300 hover:scale-105 ${tab === k ? "bg-primary text-primary-foreground border-primary shadow-md" : "border-border bg-card hover:text-primary hover:border-primary/50"}`}>{l}</button>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {data[tab].map(([n, s, c]) => (
            <div key={n} className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-shadow group animate-in fade-in zoom-in duration-500">
              <div className="bg-background aspect-square p-6"><Garment shape={s} body={c} collar={c === "#ffffff" ? "#15803d" : "#ffffff"} className="h-full w-full group-hover:scale-105 transition-transform duration-500" /></div>
              <p className="p-4 text-center text-sm font-bold">{n}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {testimonials.map(([t, a]) => (
            <figure key={a} className="rounded-2xl bg-card border border-border p-8 shadow-sm hover:border-primary/50 transition-colors">
              <div className="flex gap-1 text-warning mb-4">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
              <blockquote className="mt-3 text-base font-medium italic text-foreground">“{t}”</blockquote>
              <figcaption className="mt-4 text-sm font-bold text-muted-foreground">— {a}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const faqs = [
    ["Quais as vantagens do DTF da Inkiri?", "Sem limite de cores, aceita fotos e degradês, não tem custo de tela/matrizes, é viável a partir de poucas peças e adere com perfeição em algodão, poliéster, poliamida, dry-fit e tecidos impermeáveis."],
    ["A estampa DTF resiste a lavagens?", "Sim! Com lavagem do avesso e sem o uso de secadora em alta temperatura, a estampa mantém a vibração da cor e a elasticidade por dezenas de lavagens, sem rachar ou desbotar."],
    ["Quais arquivos de imagem devo enviar?", "Preferencialmente vetor em formato PDF, AI ou CDR. Também aceitamos arquivos PNG com fundo transparente em alta resolução (300 DPI). Nossa equipe técnica revisa toda arte gratuitamente antes de produzir."],
    ["Vocês enviam uniformes para fora de São Paulo?", "Sim, atendemos todo o Brasil via Sedex ou transportadora parceira com código de rastreio. O nosso prazo de produção in-house continua sendo de 24h; o frete é calculado de forma transparente no fechamento do orçamento."],
    ["Como funciona a logística expressa no ABC Paulista?", "Para as cidades de Santo André, São Bernardo do Campo, São Caetano do Sul, Diadema, Mauá e proximidades da Grande SP, oferecemos opção de retirada em mãos ou entrega via motoboy express em até 24h após a aprovação da arte."],
    ["Vocês emitem nota fiscal para empresas?", "Sim, somos uma empresa homologada. Emitimos nota fiscal eletrônica para CNPJ e CPF em 100% dos pedidos faturados."],
  ];
  return (
    <section id="faq" data-wa="Tenho uma dúvida sobre os pedidos" className="py-16 md:py-24 bg-card">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-4xl md:text-6xl font-bold uppercase text-center font-display text-primary">Dúvidas Frequentes</h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="border-border">
              <AccordionTrigger className="text-left text-lg font-bold hover:text-primary cursor-pointer transition-colors py-5">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-medium text-base pb-6 leading-relaxed">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background border-t-4 border-primary">
      <div className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-4 gap-10 text-sm">
        <div>
          <p className="font-display text-4xl font-extrabold uppercase">Inkiri<span className="text-primary-foreground bg-primary px-1.5 ml-1 rounded-sm">DTF</span></p>
          <p className="mt-3 font-medium opacity-80 text-base">Uniformes Prontos em 24 Horas.</p>
        </div>
        <div className="space-y-3 font-medium">
          <p className="flex items-center gap-3 text-base"><MapPin className="h-5 w-5 text-primary" />ABC Paulista - SP</p>
          <p className="opacity-70 ml-8">Envio Nacional Expresso</p>
        </div>
        <div className="space-y-4 font-medium">
          <a href={waLink("Olá, equipe Inkiri!")} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-base cursor-pointer hover:text-primary transition-colors"><Phone className="h-5 w-5 text-primary" />(11) 94088-2448</a>
          <a href="mailto:contato@inkiri.com.br" className="flex items-center gap-3 text-base cursor-pointer hover:text-primary transition-colors"><Mail className="h-5 w-5 text-primary" />contato@inkiri.com.br</a>
        </div>
        <div className="space-y-2 font-medium">
          <p className="flex items-center gap-3 font-bold text-base mb-3"><Clock className="h-5 w-5 text-primary" />Atendimento</p>
          <p className="opacity-80">Segunda a Sexta — 08h às 18h</p>
          <p className="opacity-80">Sábados — 08h às 12h</p>
        </div>
      </div>
      <div className="bg-black/20">
        <p className="text-center text-xs font-medium opacity-60 py-6">© {new Date().getFullYear()} Inkiri DTF. Todos os direitos reservados.</p>
      </div>
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
      className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)] cursor-pointer hover:scale-110 transition-transform duration-300">
      <MessageCircle className="h-8 w-8" />
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
    </a>
  );
}