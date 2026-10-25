import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Upload, Type, RotateCcw, Trash2, Zap, Truck, CalendarClock, AlertTriangle, MessageCircle, Shirt, Palette, Layers, Ruler, Package } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Garment } from "./Garment";
import {
  PURPOSES, STUDIO_MODELS, MODELS, FABRICS, STOCK_COLORS, EXTRA_COLORS, SIZES, MIN_ORDER, TIERS,
  type Purpose, type FabricId, type Grid, emptyGrid, gridTotal, getTier, isPriorityDate, isStockColor, colorName, waLink,
} from "@/lib/inkiri";

type View = "front" | "back";
type El = { id: string; kind: "image" | "text"; src?: string; text?: string; font?: string; color?: string; x: number; y: number; w: number; view: View; pos: string };

const QUICK: { label: string; view: View; x: number; y: number; w: number }[] = [
  { label: "Peito Esquerdo", view: "front", x: 64, y: 30, w: 14 },
  { label: "Centro da Frente", view: "front", x: 50, y: 42, w: 36 },
  { label: "Manga Esquerda", view: "front", x: 86, y: 28, w: 9 },
  { label: "Manga Direita", view: "front", x: 14, y: 28, w: 9 },
  { label: "Costas Superior", view: "back", x: 50, y: 20, w: 32 },
  { label: "Costas Central", view: "back", x: 50, y: 45, w: 42 },
];
/* ── Tokens de estilo (somente classes Tailwind) ─────────────────────── */
const ENTER = "animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out fill-mode-backwards motion-reduce:animate-none";
const GLASS = "bg-card/60 backdrop-blur-md border border-border";
const PRESS = "transition-colors duration-200 motion-reduce:transition-none";
const PRESS_PRIMARY = `${PRESS} hover:shadow-primary/40`;
const CHOICE = "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/60";

const FONTS = [
  { label: "Industrial", css: "'Barlow Condensed', sans-serif" },
  { label: "Moderna", css: "'Manrope', sans-serif" },
  { label: "Serifada", css: "Georgia, serif" },
  { label: "Esportiva", css: "Impact, 'Arial Black', sans-serif" },
];
const TABS = [
  { id: "modelo", label: "Modelo", icon: Shirt },
  { id: "cores", label: "Cores", icon: Palette },
  { id: "arte", label: "Arte", icon: Upload },
  { id: "tecido", label: "Tecido", icon: Layers },
  { id: "grade", label: "Grade", icon: Ruler },
  { id: "entrega", label: "Entrega", icon: Truck },
] as const;

export function Studio({ modelId, setModelId }: { modelId: string; setModelId: (id: string) => void }) {
  const model = (MODELS.find((m) => m.id === modelId) ?? MODELS[0] ?? { id: "polo", name: "Camisa Gola Polo", shape: "polo" as const, purpose: "empresarial" as const, fabric: "piquet" as const, hasCollar: true, studio: true });
  const [purpose, setPurpose] = useState<Purpose>(model.purpose);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("modelo");
  const [body, setBody] = useState("#1f2a44");
  const [sleeve, setSleeve] = useState("#1f2a44");
  const [collar, setCollar] = useState("#ffffff");
  const [part, setPart] = useState<"body" | "sleeve" | "collar">("body");
  const [view, setView] = useState<View>("front");
  const [els, setEls] = useState<El[]>([]);
  const [sel, setSel] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [font, setFont] = useState(FONTS[0]?.css ?? "sans-serif");
  const [textColor, setTextColor] = useState("#ffffff");
  const [fabric, setFabric] = useState<FabricId>(model.fabric);
  const [tech, setTech] = useState<"dtf" | "bordado">("dtf");
  const [uni, setUni] = useState<Grid>(emptyGrid());
  const [baby, setBaby] = useState<Grid>(emptyGrid());
  const [logistic, setLogistic] = useState<"urgente" | "nacional">("urgente");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [fileError, setFileError] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; mode: "move" | "resize"; sx: number; sy: number; ox: number; oy: number; ow: number } | null>(null);

  useEffect(() => { setFabric(model.fabric); setPurpose(model.purpose); setPart("body"); }, [model.id]);
  useEffect(() => { setTab("modelo"); }, [modelId]);

  const total = gridTotal(uni) + gridTotal(baby);
  const tier = getTier(total);
  const priority = isPriorityDate(date);
  const selected = els.find((e) => e.id === sel);

  const add = (e: Omit<El, "id" | "x" | "y" | "w" | "view" | "pos">) => {
    const q = (QUICK.find((q) => q.view === view) ?? { label: "Centro da Frente", x: 50, y: 42, w: 36 });
    const id = crypto.randomUUID();
    setEls((p) => [...p, { ...e, id, x: q.x, y: q.y, w: e.kind === "text" ? 34 : q.w, view, pos: q.label }]);
    setSel(id);
  };
  const update = (id: string, patch: Partial<El>) => setEls((p) => p.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  const onFile = (f?: File) => {
    if (!f) return;
    setFileError("");
    if (!["image/png", "image/svg+xml", "image/jpeg"].includes(f.type)) {
      setFileError("Formato inválido. Envie PNG, SVG ou JPG.");
      return;
    }
    setFileLoading(true);
    const r = new FileReader();
    r.onerror = () => { setFileLoading(false); setFileError("Não foi possível ler a imagem. Tente outro arquivo."); };
    r.onload = () => {
      const src = String(r.result);
      const image = new Image();
      image.onload = () => { add({ kind: "image", src }); setFileLoading(false); };
      image.onerror = () => { setFileLoading(false); setFileError("Imagem inválida. Tente outro arquivo."); };
      image.src = src;
    };
    r.readAsDataURL(f);
  };

  const onDown = (e: React.PointerEvent, el: El, mode: "move" | "resize") => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setSel(el.id);
    drag.current = { id: el.id, mode, sx: e.clientX, sy: e.clientY, ox: el.x, oy: el.y, ow: el.w };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current; const r = stage.current?.getBoundingClientRect();
    if (!d || !r) return;
    const dx = ((e.clientX - d.sx) / r.width) * 100;
    const dy = ((e.clientY - d.sy) / r.height) * 100;
    if (d.mode === "move") update(d.id, { x: Math.min(98, Math.max(2, d.ox + dx)), y: Math.min(98, Math.max(2, d.oy + dy)), pos: "Personalizada" });
    else update(d.id, { w: Math.min(80, Math.max(5, d.ow + dx * 2)) });
  };

  const positions = Array.from(new Set(els.map((e) => `${e.pos} (${e.view === "front" ? "Frente" : "Costas"}${e.kind === "text" ? `, texto "${e.text}"` : ", logo"})`)));
  const gridStr = (g: Grid) => SIZES.filter((s) => g[s] > 0).map((s) => `${s}:${g[s]}`).join(" ") || "—";

  const buildMsg = (nome: string, empresa: string, whats: string) => {
    const purposeLabel = PURPOSES.find((p) => p.id === purpose)?.label;
    const cores = `Corpo ${colorName(body)}${model.shape !== "tank" && model.shape !== "apron" ? ` / Mangas ${colorName(sleeve)}` : ""}${model.hasCollar ? ` / Gola-Punhos ${colorName(collar)}` : ""}`;
    return `Olá, equipe Inkiri! Fiz uma simulação no site:
- Cliente/Empresa: ${nome} — ${empresa} (WhatsApp: ${whats})
- Propósito: ${purposeLabel}
- Modelo e Cores: ${model.name} | ${cores}
- Tecido e Técnica: ${FABRICS[fabric].name} + ${tech === "dtf" ? "Impressão DTF Digital" : "Bordado Computadorizado"}
- Posição das Logos/Textos: ${positions.join(" + ") || "A definir"}
- Quantidade Total: ${total} peças${tier ? ` (${tier.label})` : ""} | Grade: Tradicional/Unissex [${gridStr(uni)}] · Baby Look [${gridStr(baby)}]
- Logística/Prazo: ${logistic === "urgente" ? "Urgência 24h ABC/SP (Retirada ou Entrega Expressa)" : "Envio Nacional Express (Sedex/Transportadora)"}${date ? ` | Data do evento: ${new Date(date + "T12:00").toLocaleDateString("pt-BR")}${priority ? " ⚠️ PRIORIDADE MÁXIMA" : ""}` : ""}`;
  };

  const models = STUDIO_MODELS.filter((m) => m.purpose === purpose);
  const swatches = [...STOCK_COLORS, ...EXTRA_COLORS];
  const current = part === "body" ? body : part === "sleeve" ? sleeve : collar;
  const setCurrent = part === "body" ? setBody : part === "sleeve" ? setSleeve : setCollar;
  const hasSleeves = !["tank", "apron", "shorts", "pants"].includes(model.shape);

  return (
    <section id="simulador" data-wa="Fiz uma simulação e quero fechar meu pedido de uniformes" className="relative py-16 md:py-24 border-t border-border scroll-mt-24">
      <div className={`relative mx-auto max-w-7xl px-4 ${ENTER}`}>
        <div className="mb-8">
          <span className="text-primary font-semibold uppercase tracking-widest text-xs">Estúdio Inkiri Express</span>
          <h2 className="text-4xl md:text-6xl font-bold uppercase mt-2">Seu uniforme. Sua identidade.</h2>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 justify-start mb-6">
          {PURPOSES.map((p) => (
            <Button variant="ghost" key={p.id} onClick={() => { setPurpose(p.id); const first = STUDIO_MODELS.find((m) => m.purpose === p.id); if (first) setModelId(first.id); }}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold border ${PRESS} ${purpose === p.id ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30" : "border-border bg-card/60 backdrop-blur-md hover:bg-accent"}`}>
              {p.label}
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 items-start">
          {/* Stage */}
          <div className="studio-preview sticky top-16 md:top-20 z-20">
            <div className={`rounded-lg ${GLASS} p-3 shadow-2xl shadow-foreground/5`}>
              <div ref={stage} onPointerMove={onMove} onPointerUp={() => (drag.current = null)} onPointerDown={() => setSel(null)}
                data-testid="garment-stage" className="@container relative mx-auto aspect-[400/440] w-[min(100%,220px)] lg:w-full rounded-lg bg-stage ring-1 ring-border overflow-hidden touch-none select-none">
                <Garment shape={model.shape} body={body} sleeve={sleeve} collar={collar} view={view} className="absolute inset-0 h-full w-full p-4" />
                {els.filter((e) => e.view === view).map((e) => (
                  <div key={e.id} onPointerDown={(ev) => onDown(ev, e, "move")}
                    className={`absolute cursor-move -translate-x-1/2 -translate-y-1/2 transition-transform ${sel === e.id ? "outline-2 outline-dashed outline-primary scale-[1.02]" : ""}`}
                    style={{ left: `${Math.max(10, Math.min(90, e.x))}%`, top: `${Math.max(10, Math.min(90, e.y))}%`, width: `${e.w}%` }}>
                    {e.kind === "image" ? (
                      <img src={e.src} alt="Logo" draggable={false} className="w-full h-auto pointer-events-none drop-shadow-sm" />
                    ) : (
                      <svg viewBox="0 0 300 60" className="w-full h-auto pointer-events-none drop-shadow-sm overflow-visible">
                        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill={e.color} fontFamily={e.font} fontSize="26" textLength="280" lengthAdjust="spacingAndGlyphs" fontWeight="bold">
                          {e.text}
                        </text>
                      </svg>
                    )}
                    {sel === e.id && <span onPointerDown={(ev) => onDown(ev, e, "resize")} className="absolute -right-2 -bottom-2 h-5 w-5 rounded-full bg-primary border-2 border-card shadow-md cursor-se-resize" />}
                  </div>
                ))}
                <span className="absolute left-3 top-3 rounded bg-ice-foreground/80 backdrop-blur-md border border-border text-ice px-2 py-1 text-[11px] font-semibold uppercase">{view === "front" ? "Frente" : "Costas"}</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="flex rounded-lg border border-border overflow-hidden">
                  {(["front", "back"] as View[]).map((v) => (
                    <Button variant="ghost" key={v} onClick={() => setView(v)} className={`px-4 py-2 text-sm font-semibold transition-all duration-300 ease-out hover:brightness-110 ${view === v ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
                      {v === "front" ? "Frente" : "Costas"}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground min-w-0 leading-tight">{model.name}</p>
                <Button variant="ghost" onClick={() => setView(view === "front" ? "back" : "front")} className={`p-2 rounded-lg border border-border hover:bg-accent ${PRESS}`} aria-label="Alternar frente e costas" title="Alternar frente e costas"><RotateCcw className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>

          {/* Panel */}
          <div className={`rounded-lg ${GLASS} shadow-2xl shadow-foreground/5`}>
            <div className="grid grid-cols-6 border-b border-border">
              {TABS.map((t) => (
                <Button variant="ghost" key={t.id} aria-pressed={tab === t.id} onClick={() => setTab(t.id)} className={`flex flex-col items-center gap-1 py-3 text-[11px] sm:text-xs font-semibold border-b-2 transition-all duration-300 ease-out ${tab === t.id ? "border-primary text-primary bg-primary/10" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
                  <t.icon className="h-5 w-5" />{t.label}
                </Button>
              ))}
            </div>
            <div className="p-5 min-h-[340px] space-y-4">
              {tab === "modelo" && (
                <div className="grid grid-cols-2 gap-3">
                  {models.map((m) => (
                    <Button variant="ghost" key={m.id} aria-pressed={m.id === model.id} onClick={() => setModelId(m.id)} className={`flex-col items-stretch justify-start rounded-lg border p-3 text-left ${CHOICE} ${m.id === model.id ? "border-primary bg-primary/10" : "border-border hover:bg-accent"}`}>
                      <div className="bg-stage rounded-lg aspect-square w-full mb-2"><Garment shape={m.shape} body={body} sleeve={sleeve} collar={collar} className="h-full w-full p-2" /></div>
                      <span className="text-sm font-semibold leading-tight block">{m.name}</span>
                    </Button>
                  ))}
                </div>
              )}

              {tab === "cores" && (<>
               <div className="flex gap-2 flex-wrap">
                  {([["body", "Corpo"], ...(hasSleeves ? [["sleeve", "Mangas"]] : []), ...(model.hasCollar || ["apron", "shorts", "pants"].includes(model.shape) ? [["collar", model.shape === "apron" ? "Alças" : ["shorts", "pants"].includes(model.shape) ? "Cós/Punhos" : "Gola & Punhos"]] : [])] as [typeof part, string][]).map(([k, l]) => (
                    <Button variant="ghost" key={k} onClick={() => setPart(k)} className={`rounded-lg px-4 py-2 text-sm font-semibold border ${PRESS} ${part === k ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30" : "border-border bg-muted/50"}`}>{l}</Button>
                  ))}
                </div>
                <div className="grid grid-cols-6 gap-3">
                  {swatches.map((c) => (
                    <Button variant="ghost" key={c.hex} title={c.name} aria-label={c.name} aria-pressed={current === c.hex} onClick={() => setCurrent(c.hex)}
                      className={`h-auto p-0 aspect-square rounded-full border-2 ${PRESS} ${current === c.hex ? "border-primary scale-110 hover:scale-110 shadow-glow ring-2 ring-primary/40" : "border-border"}`} style={{ background: c.hex }} />
                  ))}
                </div>
                <p className="text-sm">Selecionada: <b>{colorName(current)}</b></p>
                {isStockColor(current) ? (
                  <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/15 backdrop-blur-md text-primary px-3 py-2 text-sm font-semibold"><CheckCircle2 className="h-4 w-4" />Cor disponível a pronta-entrega (Produção 24h)</div>
                ) : (
                  <div className="flex items-center gap-2 rounded-lg border border-warning/20 bg-warning/15 backdrop-blur-md text-warning px-3 py-2 text-sm font-semibold"><AlertTriangle className="h-4 w-4" />Cor sob encomenda — prazo a confirmar</div>
                )}
              </>)}

              {tab === "arte" && (<>
                <label className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/60 bg-muted/50 p-5 cursor-pointer font-semibold transition-all duration-300 ease-out hover:scale-[1.02] hover:border-primary hover:bg-primary/10 hover:shadow-lg hover:brightness-110">
                  <Upload className="h-5 w-5 text-primary" /> {fileLoading ? "Carregando imagem…" : "Enviar logo / estampa (PNG, SVG, JPG)"}
                  <input aria-label="Enviar logo" disabled={fileLoading} type="file" accept="image/png,image/svg+xml,image/jpeg" className="sr-only" onChange={(e) => { onFile(e.target.files?.[0]); e.target.value = ""; }} />
                </label>
                {fileError && <p role="alert" className="text-sm text-destructive">{fileError}</p>}
                <div className="flex gap-2">
                  <input aria-label="Texto da personalização" value={text} onChange={(e) => setText(e.target.value)} placeholder="Nome, cargo, frase ou número" className="min-w-0 flex-1 rounded-lg bg-muted/50 border border-border outline-none transition-all duration-300 focus:border-primary/60 focus:ring-2 focus:ring-primary/30 px-3 py-2 text-sm" />
                  <Button disabled={!text.trim()} onClick={() => { if (text.trim()) { add({ kind: "text", text, font, color: textColor }); setText(""); } }} className={`rounded-lg px-3 font-semibold flex items-center gap-1 ${PRESS_PRIMARY}`}><Type className="h-4 w-4" />Inserir</Button>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                  <select aria-label="Fonte do texto" value={font} onChange={(e) => { setFont(e.target.value); if (selected?.kind === "text") update(selected.id, { font: e.target.value }); }} className="rounded-lg bg-muted/50 border border-border outline-none transition-all duration-300 focus:border-primary/60 focus:ring-2 focus:ring-primary/30 px-2 py-2 text-sm">
                    {FONTS.map((f) => <option key={f.label} value={f.css}>{f.label}</option>)}
                  </select>
                  {["#ffffff", "#111214", "#facc15", "#dc2626", "#1d4ed8", "#15803d"].map((c) => (
                    <Button variant="ghost" key={c} onClick={() => { setTextColor(c); if (selected?.kind === "text") update(selected.id, { color: c }); }} className={`h-7 w-7 p-0 rounded-full border-2 ${PRESS} ${textColor === c ? "border-primary scale-110 hover:scale-110 ring-2 ring-primary/40" : "border-border"}`} style={{ background: c }} aria-label={`Texto ${colorName(c)}`} aria-pressed={textColor === c} />
                  ))}
                </div>
                {selected ? (
                  <div className="rounded-lg border border-border bg-muted/50 backdrop-blur-md p-3 space-y-3">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Posicionamento rápido</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {QUICK.map((q) => (
                        <Button variant="ghost" key={q.label} onClick={() => { update(selected.id, { x: q.x, y: q.y, w: selected.kind === "text" ? Math.max(q.w, 20) : q.w, view: q.view, pos: q.label }); setView(q.view); }}
                          className={`rounded-lg border px-2 py-2 text-xs font-semibold transition-all duration-300 ease-out hover:scale-105 hover:brightness-110 ${selected.pos === q.label ? "border-primary text-primary bg-primary/10" : "border-border hover:bg-accent"}`}>{q.label}</Button>
                      ))}
                    </div>
                    <label className="block text-xs text-muted-foreground">Tamanho
                      <input type="range" min={5} max={80} value={selected.w} onChange={(e) => update(selected.id, { w: +e.target.value })} className="w-full accent-[var(--primary)]" />
                    </label>
                    <Button variant="ghost" onClick={() => { setEls((p) => p.filter((e) => e.id !== selected.id)); setSel(null); }} className="flex items-center gap-1 text-sm text-destructive"><Trash2 className="h-4 w-4" />Remover elemento</Button>
                  </div>
                ) : <p className="text-sm text-muted-foreground">Nenhuma arte selecionada.</p>}
                {els.length > 0 && <p className="text-xs text-muted-foreground">{els.length} elemento(s): {positions.join(" · ")}</p>}
              </>)}

              {tab === "tecido" && (<>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Tecido recomendado</p>
                <div className="space-y-2">
                  {(Object.keys(FABRICS) as FabricId[]).map((f) => (
                    <Button variant="ghost" key={f} onClick={() => setFabric(f)} className={`flex-col items-stretch w-full text-left rounded-lg border p-3 ${CHOICE} ${fabric === f ? "border-primary bg-primary/10" : "border-border hover:bg-accent"}`}>
                      <div className="flex flex-wrap gap-2 items-center justify-between font-semibold text-sm">{FABRICS[f].name}{f === model.fabric && <span className="text-[10px] uppercase bg-primary text-primary-foreground rounded px-1.5 py-0.5">Recomendado</span>}</div>
                      <p className="text-xs text-muted-foreground mt-1">{FABRICS[f].tip}</p>
                    </Button>
                  ))}
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground pt-2">Técnica in-house</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  <Button variant="ghost" onClick={() => setTech("dtf")} className={`flex-col items-start rounded-lg border p-3 text-left ${CHOICE} ${tech === "dtf" ? "border-primary bg-primary/10" : "border-border"}`}>
                    <b className="text-sm">Impressão DTF Digital</b>
                    <p className="text-xs text-muted-foreground mt-1">Sem limite de cores, permite degradês/fotos, zero custo de tela e alta durabilidade em qualquer tecido (inclusive Corta-Vento e Dry-Fit).</p>
                  </Button>
                  <Button variant="ghost" onClick={() => setTech("bordado")} className={`flex-col items-start rounded-lg border p-3 text-left ${CHOICE} ${tech === "bordado" ? "border-primary bg-primary/10" : "border-border"}`}>
                    <b className="text-sm">Bordado Computadorizado Industrial</b>
                    <p className="text-xs text-muted-foreground mt-1">Ideal para Polos, Moletons e Corta-Vento — máxima sofisticação e durabilidade.</p>
                  </Button>
                </div>
                {tech === "bordado" && ["dryfit"].includes(fabric) && <p className="text-xs text-warning">Dica: em Dry-Fit/UV recomendamos DTF para manter leveza do tecido.</p>}
              </>)}

              {tab === "grade" && (<>
                {([["Tradicional / Unissex", uni, setUni], ["Baby Look Feminina", baby, setBaby]] as const).map(([label, g, set]) => (
                  <div key={label}>
                    <p className="text-sm font-semibold mb-2">{label} <span className="text-muted-foreground font-normal">({gridTotal(g)})</span></p>
                    <div className="grid grid-cols-6 gap-2">
                      {SIZES.map((s) => (
                        <label key={s} className="text-center text-xs font-semibold text-muted-foreground">{s}
                          <input aria-label={`${label} ${s}`} type="number" min={0} inputMode="numeric" value={g[s] || ""} placeholder="0"
                            onChange={(e) => set({ ...g, [s]: Math.max(0, parseInt(e.target.value) || 0) })}
                            className="mt-1 w-full rounded-lg bg-muted/50 border border-border outline-none transition-all duration-300 focus:border-primary/60 focus:ring-2 focus:ring-primary/30 py-2 text-center text-base text-foreground" />
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </>)}

              {tab === "entrega" && (<>
                <div className="grid gap-2">
                  <Button variant="ghost" onClick={() => setLogistic("urgente")} className={`flex gap-3 rounded-lg border p-3 text-left ${CHOICE} ${logistic === "urgente" ? "border-primary bg-primary/10" : "border-border"}`}>
                    <Zap className="h-5 w-5 text-primary shrink-0" /><span className="text-sm"><b>Urgência 24h:</b> Retirada ou Entrega Expressa (ABC Paulista e Grande SP)</span>
                  </Button>
                  <Button variant="ghost" onClick={() => setLogistic("nacional")} className={`flex gap-3 rounded-lg border p-3 text-left ${CHOICE} ${logistic === "nacional" ? "border-primary bg-primary/10" : "border-border"}`}>
                    <Truck className="h-5 w-5 text-primary shrink-0" /><span className="text-sm"><b>Envio Nacional Express</b> (Sedex / Transportadora com rastreio)</span>
                  </Button>
                </div>
                <label className="block text-sm font-semibold">Você tem uma data limite ou data marcada para o evento?
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 w-full rounded-lg bg-muted/50 border border-border outline-none transition-all duration-300 focus:border-primary/60 focus:ring-2 focus:ring-primary/30 px-3 py-2" />
                </label>
                {date && (priority
                  ? <div className="flex items-center gap-2 rounded-lg bg-destructive/15 text-destructive px-3 py-2 text-sm font-semibold"><CalendarClock className="h-4 w-4" />Prioridade máxima na esteira de produção</div>
                  : <div className="flex items-center gap-2 rounded-lg bg-primary/15 text-primary px-3 py-2 text-sm font-semibold"><CheckCircle2 className="h-4 w-4" />Data informada — prazo a confirmar</div>)}
              </>)}
            </div>

            {/* Summary */}
            <div className="border-t border-border p-5 space-y-3 bg-muted/60 backdrop-blur-md rounded-b-lg">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-semibold"><Package className="h-4 w-4 text-primary" />Total: {total} peças</span>
                <span className="text-xs font-semibold text-primary">{tier?.label ?? `Mínimo ${MIN_ORDER} peças`}</span>
              </div>
              <div>
                <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-700 ease-out" style={{ width: `${Math.min(100, (total / 100) * 100)}%` }} />
                </div>
                <div className="grid grid-cols-3 mt-2 text-[10px] sm:text-[11px] leading-tight">
                  {TIERS.map((t) => (
                    <div key={t.id} className={`${tier?.id === t.id ? "text-primary font-bold" : "text-muted-foreground"} ${t.id === "atacado" ? "text-right" : t.id === "empresarial" ? "text-center" : ""}`}>
                      {t.label}<br />{t.range}
                    </div>
                  ))}
                </div>
                {total > 0 && total < 100 && <p className="text-xs mt-2 text-muted-foreground">Faltam <b className="text-foreground">{(total < 10 ? 10 : total < 30 ? 30 : 100) - total}</b> peças para o próximo nível de benefício.</p>}
              </div>
              {total < MIN_ORDER && <p className="text-xs text-warning flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5" />Pedido mínimo de {MIN_ORDER} peças. Preencha a grade.</p>}
              <Button variant="ghost" disabled={total < MIN_ORDER} onClick={() => setOpen(true)}
                className={`w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-4 font-bold text-base shadow-glow disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed ${PRESS_PRIMARY}`}>
                <MessageCircle className="h-5 w-5" />Receber Orçamento Express no WhatsApp
              </Button>
              {total < MIN_ORDER && <Button variant="ghost" onClick={() => setTab("grade")} className="w-full text-xs underline text-muted-foreground">Ir para a grade de tamanhos</Button>}
            </div>
          </div>
        </div>
      </div>
      <LeadModal open={open} onOpenChange={setOpen} onSubmit={(n, e, w) => { window.open(waLink(buildMsg(n, e, w)), "_blank"); setOpen(false); }} />
    </section>
  );
}

function LeadModal({ open, onOpenChange, onSubmit }: { open: boolean; onOpenChange: (o: boolean) => void; onSubmit: (n: string, e: string, w: string) => void }) {
  const [n, setN] = useState(""); const [e, setE] = useState(""); const [w, setW] = useState("");
  const valid = useMemo(() => n.trim().length > 1 && e.trim().length > 1 && w.replace(/\D/g, "").length >= 10, [n, e, w]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl uppercase">Sua ficha técnica está pronta</DialogTitle>
          <DialogDescription>O resumo será aberto no WhatsApp. Envie o arquivo original da arte na conversa.</DialogDescription>
        </DialogHeader>
        <form className="space-y-3" onSubmit={(ev) => { ev.preventDefault(); if (valid) onSubmit(n.trim(), e.trim(), w.trim()); }}>
          {([["Seu nome", n, setN, "text"], ["Nome da Empresa ou Evento", e, setE, "text"], ["WhatsApp (com DDD)", w, setW, "tel"]] as const).map(([l, v, s, t]) => (
            <label key={l} className="block text-sm font-semibold">{l}
              <input required type={t} autoComplete={t === "tel" ? "tel" : l === "Seu nome" ? "name" : "organization"} value={v} maxLength={80} onChange={(x) => s(x.target.value)} className="mt-1 w-full rounded-lg bg-muted/50 border border-border outline-none transition-all duration-300 focus:border-primary/60 focus:ring-2 focus:ring-primary/30 px-3 py-2.5" />
            </label>
          ))}
          {w && w.replace(/\D/g, "").length < 10 && <p role="status" className="text-xs text-destructive">Informe o telefone com DDD, com pelo menos 10 dígitos.</p>}
          <Button variant="ghost" disabled={!valid} className={`w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-3.5 font-bold disabled:opacity-40 disabled:cursor-not-allowed ${PRESS_PRIMARY}`}>
            <MessageCircle className="h-5 w-5" />Enviar para o WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}