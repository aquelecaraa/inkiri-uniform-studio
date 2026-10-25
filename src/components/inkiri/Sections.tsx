import { useEffect, useState } from "react";
import { Zap, FileCheck2, Palette, TrendingDown, MousePointerClick, Warehouse, Factory, Truck, MessageCircle, Check, X, MapPin, Phone, Calculator } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import workshop from "@/assets/inkiri-workshop.jpg";
import { Garment } from "./Garment";
import { CATALOG, CATALOG_TABS, MODELS, FABRICS, recommendSize, waLink, type CatalogTab } from "@/lib/inkiri";

/* ── Tokens de estilo (somente classes Tailwind) ─────────────────────── */
// Entrada suave (tw-animate-css). "fill-mode-backwards" evita o "flash" quando há delay.
const ENTER = "animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out fill-mode-backwards motion-reduce:animate-none";
// Glassmorphism: fundo semitransparente + blur + borda sutil.
const GLASS = "bg-card/60 backdrop-blur-md border border-border";
// Microinteração de impacto (botões de conversão / seletores).
const PRESS = "transition-colors duration-200 motion-reduce:transition-none";
const PRESS_PRIMARY = `${PRESS} hover:shadow-primary/40`;

export function TopBar() {
  return <div className="inkiri-topbar bg-primary text-primary-foreground text-xs font-semibold py-2 px-4 text-center"><Zap className="inline h-3.5 w-3.5 mr-2" />Produção expressa 24h <span className="mx-3 opacity-40">/</span> ABC Paulista · Envio nacional</div>;
}

export function Header() {
  const links = [["#como", "Como funciona"], ["#catalogo", "Coleção"], ["#tecnologia", "Personalização"], ["#medidas", "Medidas"]] as const;
  return <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md">
    <div className="mx-auto max-w-7xl px-4 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
      <a href="#topo" aria-label="Inkiri DTF — voltar ao topo" className="font-display text-3xl font-extrabold uppercase flex items-baseline gap-1">Inkiri<span className="text-primary text-xl">DTF</span><span className="hidden lg:block ml-4 pl-4 border-l border-border font-sans text-[10px] font-semibold text-muted-foreground">UNIFORMES<br />& PERSONALIZAÇÃO</span></a>
      <nav aria-label="Principal" className="hidden md:flex gap-6">{links.map(([href,label]) => <a key={href} href={href} className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">{label}</a>)}</nav>
      <Button asChild className="h-10 px-5"><a href="#simulador"><Palette />Criar meu uniforme</a></Button>
    </div>
  </header>;
}

export function Hero() {
  return <section id="topo" data-wa="Olá! Preciso de uniformes com urgência. Podem me ajudar?" className="hero-scene relative scroll-mt-24 text-cover-foreground">
    <img src={workshop} width={1920} height={1024} alt="Polos e camisetas em uma oficina de personalização — imagem ilustrativa" className="absolute inset-0 h-full w-full object-cover hero-photo" />
    <div className="absolute inset-0 hero-shade" />
    <div className="relative mx-auto max-w-7xl px-4 lg:px-8 py-14 md:py-20">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase"><span className="h-2 w-2 bg-primary rounded-full" />Estoque inteligente. Produção própria.</p>
      <h1 className="mt-6 text-6xl md:text-7xl font-extrabold uppercase leading-[0.96] max-w-xl">Uniformes<br />prontos em<br /><span className="text-cover-accent">24 horas.</span></h1>
      <p className="mt-6 text-sm md:text-base max-w-md text-cover-foreground/80 leading-relaxed">A identidade da sua equipe, do primeiro detalhe à última peça. DTF digital e bordado para empresas e eventos.</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Button asChild className="h-auto min-h-12 px-6"><a href="#simulador"><Palette />Simular meu uniforme</a></Button>
        <Button asChild variant="outline" className="h-auto min-h-12 px-5 bg-cover/30 text-cover-foreground border-cover-foreground/35 hover:bg-cover/70 hover:text-cover-foreground"><a href={waLink("Olá, equipe Inkiri! Quero um orçamento rápido de uniformes.")} target="_blank" rel="noreferrer"><MessageCircle />Falar com a Inkiri</a></Button>
      </div>
      <p className="mt-6 text-[11px] text-cover-foreground/70">A partir de 10 peças · Prazo sujeito à aprovação da arte e disponibilidade</p>
    </div>
    <div className="relative border-t border-cover-foreground/20 bg-cover/65">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 px-4 lg:px-8 py-5 gap-4">
        {[[Zap,"Produção expressa"],[FileCheck2,"Nota fiscal"],[Palette,"DTF & bordado"],[Truck,"Envio para todo o Brasil"]].map(([I,l]) => {const Icon=I as typeof Zap; return <div key={l as string} className="flex items-center gap-2 text-xs font-semibold"><Icon className="h-4 w-4 text-cover-accent shrink-0" />{l as string}</div>})}
      </div>
    </div>
  </section>;
}

export function Timeline() {
  const steps = [
    [MousePointerClick, "Escolha e Simule no Site", "Monte a peça, cores, logo e grade em minutos."],
    [Warehouse, "Estoque Inteligente", "Peças lisas já prontas na prateleira, sem esperar confecção."],
    [Factory, "Personalização In-House", "Maquinário próprio de DTF e Bordado Industrial."],
    [Truck, "Logística Prioritária", "Retirada ou envio expresso em até 24h."],
  ] as const;
  return (
    <section id="como" data-wa="Quero entender como funciona a produção em 24h" className={`py-16 md:py-24 bg-ice text-ice-foreground scroll-mt-24 ${ENTER}`}>
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-4xl md:text-6xl font-bold uppercase text-center">Como entregamos em 24 horas</h2>
        <div className="mt-12 grid md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-ice-foreground/15" />
          {steps.map(([Icon, t, d], i) => (
            <div key={t} className="group relative text-center">
              <div className="mx-auto h-16 w-16 rounded-lg bg-ice-foreground text-primary flex items-center justify-center relative shadow-lg transition-transform duration-300 ease-out group-hover:scale-110"><Icon className="h-7 w-7" /><span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">{i + 1}</span></div>
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
    <section id="catalogo" data-wa="Quero saber sobre o estoque a pronta-entrega" className={`py-16 md:py-24 scroll-mt-24 ${ENTER}`}>
      <div className="mx-auto max-w-7xl px-4">
        <span className="text-primary font-semibold uppercase tracking-widest text-xs">Estoque a pronta-entrega</span>
        <h2 className="text-4xl md:text-6xl font-bold uppercase">Uma peça para cada equipe</h2>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {CATALOG_TABS.map((t) => (
            <Button variant="ghost" key={t.id} onClick={() => setTab(t.id)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold border ${PRESS} ${tab === t.id ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30" : "border-border bg-card/60 backdrop-blur-md hover:bg-accent"}`}>{t.label}</Button>
          ))}
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((c) => {
            const m = MODELS.find((x) => x.id === c.id);
            if (!m) return null;
            return (
              <article key={c.id} className="group rounded-lg border border-border bg-card/60 backdrop-blur-md overflow-hidden flex flex-col transition-all duration-500 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-foreground/5">
                <div className="bg-stage aspect-square p-6 overflow-hidden">
                  <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                    <Garment shape={m.shape} body={c.color} collar={c.color === "#ffffff" ? "#1f2a44" : "#ffffff"} className="h-full w-full" />
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-xl font-bold uppercase leading-tight">{m.name}</h3>
                  <p className="text-xs text-primary font-semibold mt-1">{FABRICS[m.fabric].name}</p>
                  <p className="text-sm text-muted-foreground mt-2 flex-1">{c.spec}</p>
                  <Button variant="ghost" onClick={() => onSimulate(c.id)} className={`mt-4 rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-bold ${PRESS_PRIMARY}`}>Simular Minha Logo Nesta Peça</Button>
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
    <section id="tecnologia" data-wa="Tenho uma arte colorida para avaliar em DTF" className={`py-16 md:py-24 bg-card border-y border-border scroll-mt-24 ${ENTER}`}>
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-4xl md:text-6xl font-bold uppercase text-center">DTF Digital vs. Bordado vs. Serigrafia</h2>
        <p className="text-center text-muted-foreground mt-3 max-w-2xl mx-auto">O DTF da Inkiri não cobra telas, aceita fotos e degradês, não racha e adere em algodão, sintéticos e impermeáveis. O Bordado Computadorizado é a escolha para Polos, Moletons e Corta-Vento com máxima sofisticação.</p>
        <div className="mt-10 overflow-x-auto rounded-lg border border-border bg-card/40 backdrop-blur-md shadow-xl shadow-foreground/5">
          <table className="w-full text-center min-w-[560px]">
            <thead><tr className="bg-muted"><th className="p-4 text-left text-sm">Critério</th><th className="p-4 text-primary font-display text-xl uppercase">DTF Inkiri</th><th className="p-4 font-display text-xl uppercase">Bordado</th><th className="p-4 font-display text-xl uppercase text-muted-foreground">Serigrafia</th></tr></thead>
            <tbody>{rows.map(([l, a, b, c]) => <tr key={l} className="border-t border-border"><td className="p-4 text-left text-sm font-semibold">{l}</td><td className="p-4 bg-primary/5">{cell(a)}</td><td className="p-4">{cell(b)}</td><td className="p-4">{cell(c)}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-primary/40 bg-primary/10 backdrop-blur-md p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"><b className="text-primary">Use DTF quando:</b><p className="text-sm text-muted-foreground mt-1">a arte é colorida, tem foto, degradê, patrocinadores ou o tecido é Dry-Fit, UV ou impermeável.</p></div>
          <div className="rounded-lg border border-border bg-muted/50 backdrop-blur-md p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"><b>Use Bordado quando:</b><p className="text-sm text-muted-foreground mt-1">o objetivo é imagem institucional premium em Polos, Moletons, Jaquetas e Aventais.</p></div>
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
          <h2 className="text-4xl md:text-6xl font-bold uppercase">Guia de medidas</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {[["Tradicional / Unissex", table], ["Baby Look", baby]].map(([t, rows]) => (
              <div key={t as string} className="rounded-lg border border-border bg-card/40 backdrop-blur-md overflow-hidden shadow-xl shadow-foreground/5">
                <p className="bg-muted/50 px-4 py-2 font-semibold text-sm">{t as string} (cm)</p>
                <table className="w-full text-sm text-center"><thead><tr className="text-muted-foreground"><th className="py-2">Tam.</th><th>Largura</th><th>Altura</th></tr></thead>
                  <tbody>{(rows as (string | number)[][]).map((r) => <tr key={r[0]} className={`border-t border-border ${result === r[0] ? "bg-primary/15 text-primary font-bold" : ""}`}><td className="py-2 font-semibold">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody></table>
              </div>
            ))}
          </div>
        </div>
        <div className={`rounded-lg ${GLASS} shadow-xl shadow-foreground/5 p-6 self-start`}>
          <h3 className="text-2xl font-bold uppercase flex items-center gap-2"><Calculator className="h-6 w-6 text-primary" />Calculadora de tamanho ideal</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="text-sm font-semibold">Altura (cm)<input type="number" inputMode="numeric" value={h} onChange={(e) => setH(e.target.value)} placeholder="175" className="mt-1 w-full rounded-lg bg-muted/50 border border-border outline-none transition-all duration-300 focus:border-primary/60 focus:ring-2 focus:ring-primary/30 px-3 py-2.5" /></label>
            <label className="text-sm font-semibold">Peso (kg)<input type="number" inputMode="numeric" value={w} onChange={(e) => setW(e.target.value)} placeholder="75" className="mt-1 w-full rounded-lg bg-muted/50 border border-border outline-none transition-all duration-300 focus:border-primary/60 focus:ring-2 focus:ring-primary/30 px-3 py-2.5" /></label>
          </div>
          <div className="mt-5 rounded-lg bg-muted p-5 text-center">
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
  return (
    <section id="portfolio" data-wa="Vi o portfólio e quero algo parecido para minha empresa" className={`py-16 md:py-24 bg-card border-y border-border scroll-mt-24 ${ENTER}`}>
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-4xl md:text-6xl font-bold uppercase text-center">Possibilidades de personalização</h2>
        <p className="mt-3 text-center text-sm text-muted-foreground">Exemplos ilustrativos de aplicação, não projetos de clientes.</p>
        <div className="mt-6 flex justify-center gap-2">
          {([["empresas", "Empresas"], ["eventos", "Eventos"]] as const).map(([k, l]) => (
            <Button variant="ghost" key={k} onClick={() => setTab(k)} className={`rounded-full px-5 py-2 text-sm font-semibold border ${PRESS} ${tab === k ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30" : "border-border bg-card/60 backdrop-blur-md"}`}>{l}</Button>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {data[tab].map(([n, s, c]) => (
            <div key={n} className="group rounded-lg overflow-hidden border border-border bg-card/40 backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-foreground/5">
              <div className="bg-stage aspect-square p-6 overflow-hidden">
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                  <Garment shape={s} body={c} collar={c === "#ffffff" ? "#15803d" : "#ffffff"} className="h-full w-full" />
                </div>
              </div>
              <p className="p-3 text-sm font-semibold">{n}</p>
            </div>
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
  ] as const;
  return (
    <section id="faq" data-wa="Tenho uma dúvida sobre os pedidos" className={`py-16 md:py-24 scroll-mt-24 ${ENTER}`}>
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

        </div>
        <div><a href="#simulador" className="font-semibold text-primary">Criar meu uniforme →</a></div>
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
      entries.forEach((e) => { if (e.isIntersecting) setMsg(e.target.getAttribute("data-wa") ?? "Olá, equipe Inkiri!"); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return (
    <a href={waLink(msg)} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" title={msg}
      className={`fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-glow ${PRESS_PRIMARY}`}>
      <MessageCircle className="h-7 w-7" />
      
    </a>
  );
}