import { useEffect, useState } from "react";
import { Zap, FileCheck2, Palette, TrendingDown, MousePointerClick, Warehouse, Factory, Truck, MessageCircle, Check, X, Star, MapPin, Phone, Mail, Clock, Calculator } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Garment } from "./Garment";
import { CATALOG, CATALOG_TABS, MODELS, FABRICS, recommendSize, waLink, type CatalogTab } from "@/lib/inkiri";

export function TopBar() {
  return (
    <div className="sticky top-0 z-40 bg-primary text-primary-foreground text-[11px] sm:text-sm font-semibold py-2 px-3 text-center">
      <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary-foreground animate-pulse" />⚡ Produção Expressa 24h Ativa <span className="hidden sm:inline">| Atendimento Imediato para ABC Paulista, SP e Envio Nacional</span></span>
    </div>
  );
}

export function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <a href="#topo" className="font-display text-2xl font-extrabold uppercase tracking-wide">Inkiri<span className="text-primary">DTF</span></a>
        <nav className="hidden md:flex gap-6 text-sm text-muted-foreground">
          {[["#como", "Como funciona"], ["#catalogo", "Catálogo"], ["#tecnologia", "DTF x Bordado"], ["#medidas", "Medidas"], ["#faq", "FAQ"]].map(([h, l]) => <a key={h} href={h} className="hover:text-foreground">{l}</a>)}
        </nav>
        <a href="#simulador" className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-bold">Simular</a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="topo" data-wa="Olá! Preciso de uniformes com urgência. Podem me ajudar?" className="bg-hero relative overflow-hidden">
      <div className="absolute inset-0 grid-lines" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider">ABC Paulista · Envio para todo o Brasil</span>
          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.95]">Uniformes prontos em <span className="text-primary">24 horas.</span><br />Sem atrasos, sem dor de cabeça.</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">Padronização imediata para empresas e eventos de última hora: estoque inteligente a pronta entrega + personalização in-house com DTF Digital e Bordado Industrial.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#simulador" className="rounded-xl bg-primary text-primary-foreground px-7 py-4 font-bold text-center shadow-glow hover:brightness-110">Simular Meu Uniforme Agora</a>
            <a href={waLink("Olá, equipe Inkiri! Quero um orçamento rápido de uniformes.")} target="_blank" rel="noreferrer" className="rounded-xl border border-border bg-card px-7 py-4 font-bold text-center flex items-center justify-center gap-2 hover:bg-accent"><MessageCircle className="h-5 w-5 text-primary" />Orçamento Rápido no WhatsApp</a>
          </div>
        </div>
        <div className="relative h-[340px] sm:h-[440px]">
          <Garment shape="polo" body="#1f2a44" collar="#ffffff" className="absolute left-0 top-6 w-[55%] drop-shadow-2xl -rotate-6" />
          <Garment shape="hoodie" body="#3b3f45" collar="#111214" className="absolute right-0 top-0 w-[52%] drop-shadow-2xl rotate-6" />
          <Garment shape="tshirt" body="#15803d" className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[50%] drop-shadow-2xl" />
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 pb-12 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[[Zap, "Produção Recorde 24h"], [FileCheck2, "Emissão de Nota Fiscal (CNPJ)"], [Palette, "Sem Limite de Cores (DTF)"], [TrendingDown, "Desconto Progressivo por Volume"]].map(([I, l]) => {
          const Icon = I as typeof Zap;
          return <div key={l as string} className="rounded-xl border border-border bg-card/70 p-4 flex items-center gap-3"><Icon className="h-6 w-6 text-primary shrink-0" /><span className="text-sm font-semibold">{l as string}</span></div>;
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
    <section id="como" data-wa="Quero entender como funciona a produção em 24h" className="py-16 md:py-24 bg-ice text-ice-foreground">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-4xl md:text-6xl font-bold uppercase text-center">Como entregamos em 24 horas</h2>
        <div className="mt-12 grid md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-ice-foreground/15" />
          {steps.map(([Icon, t, d], i) => (
            <div key={t} className="relative text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-ice-foreground text-primary flex items-center justify-center relative"><Icon className="h-7 w-7" /><span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">{i + 1}</span></div>
              <h3 className="mt-4 text-2xl font-bold uppercase">{t}</h3>
              <p className="mt-1 text-sm opacity-70">{d}</p>
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
        <span className="text-primary font-semibold uppercase tracking-widest text-xs">Estoque a pronta-entrega</span>
        <h2 className="text-4xl md:text-6xl font-bold uppercase">Campeões de venda</h2>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {CATALOG_TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold border ${tab === t.id ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card hover:bg-accent"}`}>{t.label}</button>
          ))}
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((c) => {
            const m = MODELS.find((x) => x.id === c.id)!;
            return (
              <article key={c.id} className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
                <div className="bg-stage aspect-square p-6"><Garment shape={m.shape} body={c.color} collar={c.color === "#ffffff" ? "#1f2a44" : "#ffffff"} className="h-full w-full" /></div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-xl font-bold uppercase leading-tight">{m.name}</h3>
                  <p className="text-xs text-primary font-semibold mt-1">{FABRICS[m.fabric].name}</p>
                  <p className="text-sm text-muted-foreground mt-2 flex-1">{c.spec}</p>
                  <button onClick={() => onSimulate(c.id)} className="mt-4 rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-bold hover:brightness-110">Simular Minha Logo Nesta Peça</button>
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
  const cell = (v: string | boolean) => v === true ? <Check className="h-5 w-5 text-primary mx-auto" /> : v === false ? <X className="h-5 w-5 text-destructive mx-auto" /> : <span className="text-sm">{v}</span>;
  return (
    <section id="tecnologia" data-wa="Tenho uma arte colorida para avaliar em DTF" className="py-16 md:py-24 bg-card border-y border-border">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-4xl md:text-6xl font-bold uppercase text-center">DTF Digital vs. Bordado vs. Serigrafia</h2>
        <p className="text-center text-muted-foreground mt-3 max-w-2xl mx-auto">O DTF da Inkiri não cobra telas, aceita fotos e degradês, não racha e adere em algodão, sintéticos e impermeáveis. O Bordado Computadorizado é a escolha para Polos, Moletons e Corta-Vento com máxima sofisticação.</p>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-center min-w-[560px]">
            <thead><tr className="bg-muted"><th className="p-4 text-left text-sm">Critério</th><th className="p-4 text-primary font-display text-xl uppercase">DTF Inkiri</th><th className="p-4 font-display text-xl uppercase">Bordado</th><th className="p-4 font-display text-xl uppercase text-muted-foreground">Serigrafia</th></tr></thead>
            <tbody>{rows.map(([l, a, b, c]) => <tr key={l} className="border-t border-border"><td className="p-4 text-left text-sm font-semibold">{l}</td><td className="p-4 bg-primary/5">{cell(a)}</td><td className="p-4">{cell(b)}</td><td className="p-4">{cell(c)}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-primary/40 bg-primary/10 p-5"><b className="text-primary">Use DTF quando:</b><p className="text-sm text-muted-foreground mt-1">a arte é colorida, tem foto, degradê, patrocinadores ou o tecido é Dry-Fit, UV ou impermeável.</p></div>
          <div className="rounded-xl border border-border p-5"><b>Use Bordado quando:</b><p className="text-sm text-muted-foreground mt-1">o objetivo é imagem institucional premium em Polos, Moletons, Jaquetas e Aventais.</p></div>
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
      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-[1.4fr_1fr] gap-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold uppercase">Guia de medidas</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {[["Tradicional / Unissex", table], ["Baby Look", baby]].map(([t, rows]) => (
              <div key={t as string} className="rounded-2xl border border-border overflow-hidden">
                <p className="bg-muted px-4 py-2 font-semibold text-sm">{t as string} (cm)</p>
                <table className="w-full text-sm text-center"><thead><tr className="text-muted-foreground"><th className="py-2">Tam.</th><th>Largura</th><th>Altura</th></tr></thead>
                  <tbody>{(rows as (string | number)[][]).map((r) => <tr key={r[0]} className={`border-t border-border ${result === r[0] ? "bg-primary/15 text-primary font-bold" : ""}`}><td className="py-2 font-semibold">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody></table>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 self-start">
          <h3 className="text-2xl font-bold uppercase flex items-center gap-2"><Calculator className="h-6 w-6 text-primary" />Calculadora de tamanho ideal</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="text-sm font-semibold">Altura (cm)<input type="number" inputMode="numeric" value={h} onChange={(e) => setH(e.target.value)} placeholder="175" className="mt-1 w-full rounded-lg bg-input/40 border border-input px-3 py-2.5" /></label>
            <label className="text-sm font-semibold">Peso (kg)<input type="number" inputMode="numeric" value={w} onChange={(e) => setW(e.target.value)} placeholder="75" className="mt-1 w-full rounded-lg bg-input/40 border border-input px-3 py-2.5" /></label>
          </div>
          <div className="mt-5 rounded-xl bg-muted p-5 text-center">
            {result ? <><p className="text-sm text-muted-foreground">Tamanho recomendado</p><p className="font-display text-7xl font-extrabold text-primary">{result}</p></> : <p className="text-sm text-muted-foreground">Digite altura e peso para ver a recomendação.</p>}
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
    <section id="portfolio" data-wa="Vi o portfólio e quero algo parecido para minha empresa" className="py-16 md:py-24 bg-card border-y border-border">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-4xl md:text-6xl font-bold uppercase text-center">Quem já confia na Inkiri</h2>
        <div className="mt-6 flex justify-center gap-2">
          {([["empresas", "Empresas Padronizadas"], ["eventos", "Eventos Atendidos em 24h"]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={`rounded-full px-5 py-2 text-sm font-semibold border ${tab === k ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}>{l}</button>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {data[tab].map(([n, s, c]) => (
            <div key={n} className="rounded-2xl overflow-hidden border border-border">
              <div className="bg-stage aspect-square p-6"><Garment shape={s} body={c} collar={c === "#ffffff" ? "#15803d" : "#ffffff"} className="h-full w-full" /></div>
              <p className="p-3 text-sm font-semibold">{n}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {testimonials.map(([t, a]) => (
            <figure key={a} className="rounded-2xl bg-background border border-border p-6">
              <div className="flex gap-0.5 text-warning">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <blockquote className="mt-3 text-sm">“{t}”</blockquote>
              <figcaption className="mt-3 text-xs text-muted-foreground">{a}</figcaption>
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
    <section id="faq" data-wa="Tenho uma dúvida sobre os pedidos" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-4xl md:text-6xl font-bold uppercase text-center">Perguntas frequentes</h2>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}><AccordionTrigger className="text-left text-base">{q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{a}</AccordionContent></AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ice text-ice-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-4 gap-8 text-sm">
        <div><p className="font-display text-3xl font-extrabold uppercase">Inkiri<span className="text-primary-foreground bg-primary px-1 ml-1">DTF</span></p><p className="mt-2 opacity-70">Uniformes Prontos em 24 Horas.</p></div>
        <div className="space-y-2"><p className="flex items-center gap-2"><MapPin className="h-4 w-4" />ABC Paulista - SP</p><p className="opacity-70">Envio para todo o Brasil</p></div>
        <div className="space-y-2">
          <a href={waLink("Olá, equipe Inkiri!")} target="_blank" rel="noreferrer" className="flex items-center gap-2"><Phone className="h-4 w-4" />(11) 94088-2448</a>
          <a href="mailto:contato@inkiri.com.br" className="flex items-center gap-2"><Mail className="h-4 w-4" />contato@inkiri.com.br</a>
        </div>
        <div className="space-y-1"><p className="flex items-center gap-2 font-semibold"><Clock className="h-4 w-4" />Atendimento</p><p className="opacity-70">Seg-Sex 08h às 18h</p><p className="opacity-70">Sáb 08h às 12h</p></div>
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
      className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-glow hover:scale-105 transition">
      <MessageCircle className="h-7 w-7" />
      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
    </a>
  );
}
