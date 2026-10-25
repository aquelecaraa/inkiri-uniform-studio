import { useEffect, useState } from "react";
import { Zap, FileCheck2, Palette, TrendingDown, MousePointerClick, Warehouse, Factory, Truck, MessageCircle, Check, X, Star, MapPin, Phone, Mail, Clock, Calculator, Sparkles, ShieldCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Garment } from "./Garment";
import workshopImage from "../../assets/inkiri-workshop.jpg";
import { CATALOG, CATALOG_TABS, MODELS, FABRICS, recommendSize, waLink, type CatalogTab } from "@/lib/inkiri";

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
  const links = [["#como", "Como funciona"], ["#catalogo", "Catálogo"], ["#tecnologia", "DTF x Bordado"], ["#medidas", "Medidas"], ["#faq", "FAQ"]];
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-700 ease-out motion-reduce:animate-none">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo em dois balões */}
        <a href="#topo" aria-label="Inkiri DTF — voltar ao topo" className="flex items-center gap-1.5 shrink-0 transition-all duration-300 ease-out hover:scale-105">
          <span className="relative rounded-2xl rounded-bl-sm bg-ice px-3.5 py-1 font-display text-lg md:text-xl font-extrabold uppercase leading-none tracking-wide text-ice-foreground shadow-sm">
            Inkiri
            <span aria-hidden className="absolute -bottom-1.5 left-0 h-3 w-3 bg-ice [clip-path:polygon(0_0,100%_0,0_100%)]" />
          </span>
          <span className="rounded-full border-[1.5px] border-sky-300/80 bg-gradient-to-r from-primary to-sky-500 px-3.5 py-1 font-display text-lg md:text-xl font-extrabold uppercase leading-none tracking-wide text-primary-foreground shadow-sm">
            DTF
          </span>
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
        <a href="#simulador" className={`btn-shine shrink-0 rounded-full bg-gradient-to-r from-primary to-sky-500 text-primary-foreground px-5 py-2 text-xs md:text-sm font-bold ${PRESS_PRIMARY}`}>
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

export function Catalog({ onSimulate }: { onSimulate: (id: string) => void }) {
  const [tab, setTab] = useState<CatalogTab>("todos");
  const items = CATALOG.filter((c) => tab === "todos" || c.tab.includes(tab));
  return (
    <section id="catalogo" data-wa="Quero saber sobre o estoque a pronta-entrega" className={`relative py-16 md:py-24 scroll-mt-24 ${ENTER}`}>
      <div className="relative mx-auto max-w-7xl px-4">
        <span className="text-sky-400 font-bold uppercase tracking-widest text-xs">Estoque a pronta-entrega</span>
        <h2 className="text-4xl md:text-6xl font-extrabold uppercase mt-1">Campeões de venda</h2>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {CATALOG_TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold border ${PRESS} ${tab === t.id ? "bg-primary text-primary-foreground border-primary shadow-sm" : "border-white/10 bg-card/60 backdrop-blur-md hover:border-primary/50 hover:bg-accent"}`}>{t.label}</button>
          ))}
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((c) => {
            const m = MODELS.find((x) => x.id === c.id)!;
            return (
              <article key={c.id} className="group rounded-2xl border border-white/10 bg-card/70 backdrop-blur-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-md">
                <div className="bg-stage aspect-square p-6 overflow-hidden relative">
                  <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                    <Garment shape={m.shape} body={c.color} collar={c.color === "#ffffff" ? "#1f2a44" : "#ffffff"} className="h-full w-full drop-shadow-md" />
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-extrabold uppercase leading-tight">{m.name}</h3>
                  <p className="text-xs text-sky-400 font-bold mt-1 uppercase tracking-wider">{FABRICS[m.fabric].name}</p>
                  <p className="text-sm text-muted-foreground mt-2 flex-1">{c.spec}</p>
                  <button onClick={() => onSimulate(c.id)} className={`mt-4 rounded-xl bg-primary text-primary-foreground py-3 text-sm font-bold shadow-sm transition-colors duration-200 hover:bg-primary/90 ${PRESS}`}>
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
  const rows = [
    ["Custo de tela/matriz", "Zero", "Zero", "Cobra por cor"],
    ["Fotos e degradês", true, false, false],
    ["Cores ilimitadas", true, "Até 12 linhas", false],
    ["Não racha / não descasca", true, true, "Com o tempo"],
    ["Algodão, sintéticos e impermeáveis", true, "Maioria", "Limitado"],
    ["Lotes pequenos (10 peças)", true, true, false],
    ["Acabamento premium", "Alto", "Máximo", "Médio"],
  ] as const;
  const cell = (v: string | boolean) => v === true ? <Check className="h-5 w-5 text-sky-400 mx-auto" /> : v === false ? <X className="h-5 w-5 text-destructive mx-auto" /> : <span className="text-sm font-semibold">{v}</span>;
  return (
    <section id="tecnologia" data-wa="Tenho uma arte colorida para avaliar em DTF" className={`py-16 md:py-24 bg-card/50 border-y border-white/10 scroll-mt-24 ${ENTER}`}>
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold uppercase text-center">DTF Digital vs. Bordado vs. Serigrafia</h2>
        <p className="text-center text-muted-foreground mt-3 max-w-2xl mx-auto">O DTF da Inkiri não cobra telas, aceita fotos e degradês, não racha e adere em algodão, sintéticos e impermeáveis. O Bordado Computadorizado é a escolha para Polos, Moletons e Corta-Vento com máxima sofisticação.</p>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/15 bg-card/80 backdrop-blur-xl shadow-lg">
          <table className="w-full text-center min-w-[560px]">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 text-left text-sm uppercase tracking-wider text-muted-foreground">Critério</th>
                <th className="p-4 text-sky-400 font-display text-2xl uppercase bg-primary/10 border-x border-primary/20">⚡ DTF Inkiri</th>
                <th className="p-4 font-display text-xl uppercase">Bordado</th>
                <th className="p-4 font-display text-xl uppercase text-muted-foreground">Serigrafia</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([l, a, b, c]) => (
                <tr key={l} className="border-t border-white/10 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-left text-sm font-bold">{l}</td>
                  <td className="p-4 bg-primary/10 border-x border-primary/20 font-bold text-white">{cell(a)}</td>
                  <td className="p-4">{cell(b)}</td>
                  <td className="p-4 text-muted-foreground">{cell(c)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-primary/40 bg-primary/10 backdrop-blur-md p-6">
            <b className="text-sky-300 text-lg">⚡ Use DTF quando:</b>
            <p className="text-sm text-muted-foreground mt-1.5">a arte é colorida, tem foto, degradê, patrocinadores ou o tecido é Dry-Fit, UV ou impermeável.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <b className="text-lg">🧵 Use Bordado quando:</b>
            <p className="text-sm text-muted-foreground mt-1.5">o objetivo é imagem institucional premium em Polos, Moletons, Jaquetas e Aventais.</p>
          </div>
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
  const [tab, setTab] = useState<"empresas" | "eventos">("empresas");
  const data = {
    empresas: [["Logística ABC", "polo", "#1f2a44"], ["Clínica Vida", "babylook", "#ffffff"], ["Engenharia Forte", "longsleeve", "#3b3f45"], ["Bistrô Santo André", "tshirt", "#111214"]],
    eventos: [["Corrida São Bernardo", "tshirt", "#dc2626"], ["Festival de Verão", "tank", "#1d4ed8"], ["Convenção Tech SP", "tshirt", "#15803d"], ["Equipe Trilha UV", "longsleeve", "#8a8d93"]],
  } as const;
  const testimonials = [
    ["Pedimos numa terça à tarde e na quarta cedo a equipe já estava uniformizada. Inacreditável.", "Marina R., RH — Santo André"],
    ["300 camisetas DTF coloridas para a corrida em 24h, com nota fiscal. Salvaram nosso evento.", "Carlos M., Organizador de eventos"],
    ["Bordado impecável nas polos e entrega via Sedex para Curitiba no prazo combinado.", "Juliana P., Franquia de Serviços"],
  ];
  return (
    <section id="portfolio" data-wa="Vi o portfólio e quero algo parecido para minha empresa" className={`py-16 md:py-24 bg-card/40 border-y border-white/10 scroll-mt-24 ${ENTER}`}>
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold uppercase text-center">Quem já confia na Inkiri</h2>
        <div className="mt-6 flex justify-center gap-2">
          {([["empresas", "Empresas Padronizadas"], ["eventos", "Eventos Atendidos em 24h"]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={`rounded-full px-5 py-2.5 text-sm font-bold border ${PRESS} ${tab === k ? "bg-primary text-primary-foreground border-primary shadow-sm" : "border-white/10 bg-card/60 backdrop-blur-md"}`}>{l}</button>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">
          {data[tab].map(([n, s, c]) => (
            <div key={n} className="group rounded-2xl overflow-hidden border border-white/10 bg-card/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
              <div className="bg-stage aspect-square p-6 overflow-hidden">
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                  <Garment shape={s} body={c} collar={c === "#ffffff" ? "#1d4ed8" : "#ffffff"} className="h-full w-full drop-shadow-md" />
                </div>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <p className="text-sm font-bold">{n}</p>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-primary/20 text-sky-300 border border-primary/30">24h</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {testimonials.map(([t, a]) => (
            <figure key={a} className="rounded-2xl bg-card/60 backdrop-blur-xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1">
              <div className="flex gap-1 text-warning">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <blockquote className="mt-3 text-sm leading-relaxed">“{t}”</blockquote>
              <figcaption className="mt-3 text-xs font-bold text-sky-400">{a}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const faqs = [
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
          <p className="font-display text-3xl font-extrabold uppercase">Inkiri<span className="text-primary-foreground bg-primary px-1.5 py-0.5 ml-1 rounded">DTF</span></p>
          <p className="mt-2 opacity-75 font-medium">Uniformes Prontos em 24 Horas.</p>
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
