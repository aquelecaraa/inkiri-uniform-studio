import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Upload, Type, RotateCcw, Trash2, Zap, Truck, CalendarClock, AlertTriangle, MessageCircle, Shirt, Palette, Layers, Ruler, Package } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
  const model = (MODELS.find((m) => m.id === modelId) ?? STUDIO_MODELS[0])!;
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
  const [font, setFont] = useState(FONTS[0].css);
  const [textColor, setTextColor] = useState("#ffffff");
  const [fabric, setFabric] = useState<FabricId>(model.fabric);
  const [tech, setTech] = useState<"dtf" | "bordado">("dtf");
  const [uni, setUni] = useState<Grid>(emptyGrid());
  const [baby, setBaby] = useState<Grid>(emptyGrid());
  const [logistic, setLogistic] = useState<"urgente" | "nacional">("urgente");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; mode: "move" | "resize"; sx: number; sy: number; ox: number; oy: number; ow: number } | null>(null);

  useEffect(() => { setFabric(model.fabric); setPurpose(model.purpose); }, [model.id]);

  const total = gridTotal(uni) + gridTotal(baby);
  const tier = getTier(total);
  const priority = isPriorityDate(date);
  const selected = els.find((e) => e.id === sel);

  const add = (e: Omit<El, "id" | "x" | "y" | "w" | "view" | "pos">) => {
    const q = (QUICK.find((q) => q.view === view) ?? QUICK[0])!;
    const id = crypto.randomUUID();
    setEls((p) => [...p, { ...e, id, x: q.x, y: q.y, w: e.kind === "text" ? 34 : q.w, view, pos: q.label }]);
    setSel(id);
  };
  const update = (id: string, patch: Partial<El>) => setEls((p) => p.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  const onFile = (f?: File) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => add({ kind: "image", src: String(r.result) });
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
    <section id="simulador" data-wa="Fiz uma simulação e quero fechar meu pedido de uniformes" className="py-16 md:py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-8">
          <span className="text-primary font-semibold uppercase tracking-widest text-xs">Estúdio Inkiri Express</span>
          <h2 className="text-4xl md:text-6xl font-bold uppercase mt-2">Monte seu uniforme em tempo real</h2>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 justify-start md:justify-center mb-6">
          {PURPOSES.map((p) => (
            <button key={p.id} onClick={() => { setPurpose(p.id); const first = STUDIO_MODELS.find((m) => m.purpose === p.id); if (first) setModelId(first.id); }}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold border transition ${purpose === p.id ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card hover:bg-accent"}`}>
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 items-start">
          {/* Stage */}
          <div className="sticky top-9 z-20 lg:top-20">
            <div className="rounded-2xl bg-card border border-border p-3 shadow-2xl">
              <div ref={stage} onPointerMove={onMove} onPointerUp={() => (drag.current = null)} onPointerDown={() => setSel(null)}
                className="@container relative mx-auto aspect-[400/440] max-h-[42vh] lg:max-h-none w-full rounded-xl bg-stage overflow-hidden touch-none select-none">
                <Garment shape={model.shape} body={body} sleeve={sleeve} collar={collar} view={view} className="absolute inset-0 h-full w-full p-4" />
                {els.filter((e) => e.view === view).map((e) => (
                  <div key={e.id} onPointerDown={(ev) => onDown(ev, e, "move")}
                    className={`absolute cursor-move -translate-x-1/2 -translate-y-1/2 ${sel === e.id ? "outline-2 outline-dashed outline-primary" : ""}`}
                    style={{ left: `${e.x}%`, top: `${e.y}%`, width: `${e.w}%` }}>
                    {e.kind === "image" ? <img src={e.src} alt="Logo" draggable={false} className="w-full h-auto pointer-events-none" />
                      : <div className="pointer-events-none text-center font-bold leading-none" style={{ fontFamily: e.font, color: e.color, fontSize: `calc(${e.w} * 0.09cqw + 0.6rem)` }}>{e.text}</div>}
                    {sel === e.id && <span onPointerDown={(ev) => onDown(ev, e, "resize")} className="absolute -right-2 -bottom-2 h-5 w-5 rounded-full bg-primary border-2 border-ice cursor-se-resize" />}
                  </div>
                ))}
                <span className="absolute left-3 top-3 rounded bg-ice-foreground/80 text-ice px-2 py-1 text-[11px] font-semibold uppercase">{view === "front" ? "Frente" : "Costas"}</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="flex rounded-lg border border-border overflow-hidden">
                  {(["front", "back"] as View[]).map((v) => (
                    <button key={v} onClick={() => setView(v)} className={`px-4 py-2 text-sm font-semibold ${view === v ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
                      {v === "front" ? "Frente" : "Costas"}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground truncate">{model.name}</p>
                <button onClick={() => setView(view === "front" ? "back" : "front")} className="p-2 rounded-lg border border-border hover:bg-accent" aria-label="Girar"><RotateCcw className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          {/* Panel */}
          <div className="rounded-2xl bg-card border border-border">
            <div className="grid grid-cols-6 border-b border-border">
              {TABS.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)} className={`flex flex-col items-center gap-1 py-3 text-[11px] sm:text-xs font-semibold border-b-2 transition ${tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                  <t.icon className="h-5 w-5" />{t.label}
                </button>
              ))}
            </div>
            <div className="p-5 min-h-[340px] space-y-4">
              {tab === "modelo" && (
                <div className="grid grid-cols-2 gap-3">
                  {models.map((m) => (
                    <button key={m.id} onClick={() => setModelId(m.id)} className={`rounded-xl border p-3 text-left transition ${m.id === model.id ? "border-primary bg-primary/10" : "border-border hover:bg-accent"}`}>
                      <div className="bg-stage rounded-lg aspect-square mb-2"><Garment shape={m.shape} body={body} sleeve={sleeve} collar={collar} className="h-full w-full p-2" /></div>
                      <span className="text-sm font-semibold leading-tight block">{m.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {tab === "cores" && (<>
                <div className="flex gap-2 flex-wrap">
                  {([["body", "Corpo"], ...(hasSleeves ? [["sleeve", "Mangas"]] : []), ...(model.hasCollar || ["apron", "shorts", "pants"].includes(model.shape) ? [["collar", model.shape === "apron" ? "Alças" : ["shorts", "pants"].includes(model.shape) ? "Cós/Punhos" : "Gola & Punhos"]] : [])] as [typeof part, string][]).map(([k, l]) => (
                    <button key={k} onClick={() => setPart(k)} className={`rounded-lg px-4 py-2 text-sm font-semibold border ${part === k ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}>{l}</button>
                  ))}
                </div>
                <div className="grid grid-cols-6 gap-3">
                  {swatches.map((c) => (
                    <button key={c.hex} title={c.name} onClick={() => setCurrent(c.hex)}
                      className={`aspect-square rounded-full border-2 transition ${current === c.hex ? "border-primary scale-110 shadow-glow" : "border-border"}`} style={{ background: c.hex }} />
                  ))}
                </div>
                <p className="text-sm">Selecionada: <b>{colorName(current)}</b></p>
                {isStockColor(current) ? (
                  <div className="flex items-center gap-2 rounded-lg bg-primary/15 text-primary px-3 py-2 text-sm font-semibold"><CheckCircle2 className="h-4 w-4" />Cor disponível a pronta-entrega (Produção 24h)</div>
                ) : (
                  <div className="flex items-center gap-2 rounded-lg bg-warning/15 text-warning px-3 py-2 text-sm font-semibold"><AlertTriangle className="h-4 w-4" />Cor sob encomenda — prazo a confirmar</div>
                )}
              </>)}

              {tab === "arte" && (<>
                <label className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/60 p-5 cursor-pointer hover:bg-primary/10 font-semibold">
                  <Upload className="h-5 w-5 text-primary" /> Enviar logo / estampa (PNG, SVG, JPG)
                  <input type="file" accept="image/png,image/svg+xml,image/jpeg" className="hidden" onChange={(e) => { onFile(e.target.files?.[0]); e.target.value = ""; }} />
                </label>
                <div className="flex gap-2">
                  <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Nome, cargo, frase ou número" className="flex-1 rounded-lg bg-input/40 border border-input px-3 py-2 text-sm" />
                  <button onClick={() => { if (text.trim()) { add({ kind: "text", text, font, color: textColor }); setText(""); } }} className="rounded-lg bg-primary text-primary-foreground px-3 font-semibold flex items-center gap-1"><Type className="h-4 w-4" />Inserir</button>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                  <select value={font} onChange={(e) => { setFont(e.target.value); if (selected?.kind === "text") update(selected.id, { font: e.target.value }); }} className="rounded-lg bg-input/40 border border-input px-2 py-2 text-sm">
                    {FONTS.map((f) => <option key={f.label} value={f.css}>{f.label}</option>)}
                  </select>
                  {["#ffffff", "#111214", "#facc15", "#dc2626", "#1d4ed8", "#15803d"].map((c) => (
                    <button key={c} onClick={() => { setTextColor(c); if (selected?.kind === "text") update(selected.id, { color: c }); }} className={`h-7 w-7 rounded-full border-2 ${textColor === c ? "border-primary" : "border-border"}`} style={{ background: c }} aria-label="Cor do texto" />
                  ))}
                </div>
                {selected ? (
                  <div className="rounded-xl border border-border p-3 space-y-3">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Posicionamento rápido</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {QUICK.map((q) => (
                        <button key={q.label} onClick={() => { update(selected.id, { x: q.x, y: q.y, w: selected.kind === "text" ? Math.max(q.w, 20) : q.w, view: q.view, pos: q.label }); setView(q.view); }}
                          className={`rounded-lg border px-2 py-2 text-xs font-semibold ${selected.pos === q.label ? "border-primary text-primary" : "border-border hover:bg-accent"}`}>{q.label}</button>
                      ))}
                    </div>
                    <label className="block text-xs text-muted-foreground">Tamanho
                      <input type="range" min={5} max={80} value={selected.w} onChange={(e) => update(selected.id, { w: +e.target.value })} className="w-full accent-[var(--primary)]" />
                    </label>
                    <button onClick={() => { setEls((p) => p.filter((e) => e.id !== selected.id)); setSel(null); }} className="flex items-center gap-1 text-sm text-destructive"><Trash2 className="h-4 w-4" />Remover elemento</button>
                  </div>
                ) : <p className="text-sm text-muted-foreground">Arraste os elementos na peça. Toque em um elemento para ajustar tamanho e posição.</p>}
                {els.length > 0 && <p className="text-xs text-muted-foreground">{els.length} elemento(s): {positions.join(" · ")}</p>}
              </>)}

              {tab === "tecido" && (<>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Tecido recomendado</p>
                <div className="space-y-2">
                  {(Object.keys(FABRICS) as FabricId[]).map((f) => (
                    <button key={f} onClick={() => setFabric(f)} className={`w-full text-left rounded-xl border p-3 ${fabric === f ? "border-primary bg-primary/10" : "border-border hover:bg-accent"}`}>
                      <div className="flex items-center justify-between font-semibold text-sm">{FABRICS[f].name}{f === model.fabric && <span className="text-[10px] uppercase bg-primary text-primary-foreground rounded px-1.5 py-0.5">Recomendado</span>}</div>
                      <p className="text-xs text-muted-foreground mt-1">{FABRICS[f].tip}</p>
                    </button>
                  ))}
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground pt-2">Técnica in-house</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  <button onClick={() => setTech("dtf")} className={`rounded-xl border p-3 text-left ${tech === "dtf" ? "border-primary bg-primary/10" : "border-border"}`}>
                    <b className="text-sm">Impressão DTF Digital</b>
                    <p className="text-xs text-muted-foreground mt-1">Sem limite de cores, permite degradês/fotos, zero custo de tela e alta durabilidade em qualquer tecido (inclusive Corta-Vento e Dry-Fit).</p>
                  </button>
                  <button onClick={() => setTech("bordado")} className={`rounded-xl border p-3 text-left ${tech === "bordado" ? "border-primary bg-primary/10" : "border-border"}`}>
                    <b className="text-sm">Bordado Computadorizado Industrial</b>
                    <p className="text-xs text-muted-foreground mt-1">Ideal para Polos, Moletons e Corta-Vento — máxima sofisticação e durabilidade.</p>
                  </button>
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
                          <input type="number" min={0} inputMode="numeric" value={g[s] || ""} placeholder="0"
                            onChange={(e) => set({ ...g, [s]: Math.max(0, parseInt(e.target.value) || 0) })}
                            className="mt-1 w-full rounded-lg bg-input/40 border border-input py-2 text-center text-base text-foreground" />
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </>)}

              {tab === "entrega" && (<>
                <div className="grid gap-2">
                  <button onClick={() => setLogistic("urgente")} className={`flex gap-3 rounded-xl border p-3 text-left ${logistic === "urgente" ? "border-primary bg-primary/10" : "border-border"}`}>
                    <Zap className="h-5 w-5 text-primary shrink-0" /><span className="text-sm"><b>Urgência 24h:</b> Retirada ou Entrega Expressa (ABC Paulista e Grande SP)</span>
                  </button>
                  <button onClick={() => setLogistic("nacional")} className={`flex gap-3 rounded-xl border p-3 text-left ${logistic === "nacional" ? "border-primary bg-primary/10" : "border-border"}`}>
                    <Truck className="h-5 w-5 text-primary shrink-0" /><span className="text-sm"><b>Envio Nacional Express</b> (Sedex / Transportadora com rastreio)</span>
                  </button>
                </div>
                <label className="block text-sm font-semibold">Você tem uma data limite ou data marcada para o evento?
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 w-full rounded-lg bg-input/40 border border-input px-3 py-2 [color-scheme:dark]" />
                </label>
                {date && (priority
                  ? <div className="flex items-center gap-2 rounded-lg bg-destructive/15 text-destructive px-3 py-2 text-sm font-semibold"><CalendarClock className="h-4 w-4" />Prioridade máxima na esteira de produção</div>
                  : <div className="flex items-center gap-2 rounded-lg bg-primary/15 text-primary px-3 py-2 text-sm font-semibold"><CheckCircle2 className="h-4 w-4" />Prazo confortável — produção garantida</div>)}
              </>)}
            </div>

            {/* Summary */}
            <div className="border-t border-border p-5 space-y-3 bg-muted/40 rounded-b-2xl">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-semibold"><Package className="h-4 w-4 text-primary" />Total: {total} peças</span>
                <span className="text-xs font-semibold text-primary">{tier?.label ?? `Mínimo ${MIN_ORDER} peças`}</span>
              </div>
              <div>
                <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary transition-all" style={{ width: `${Math.min(100, (total / 100) * 100)}%` }} />
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
              <button disabled={total < MIN_ORDER} onClick={() => setOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-4 font-bold text-base shadow-glow disabled:opacity-40 disabled:shadow-none hover:brightness-110 transition">
                <MessageCircle className="h-5 w-5" />Receber Orçamento Express no WhatsApp
              </button>
              {total < MIN_ORDER && <button onClick={() => setTab("grade")} className="w-full text-xs underline text-muted-foreground">Ir para a grade de tamanhos</button>}
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
          <DialogDescription>Só faltam 3 dados para enviarmos ao comercial.</DialogDescription>
        </DialogHeader>
        <form className="space-y-3" onSubmit={(ev) => { ev.preventDefault(); if (valid) onSubmit(n.trim(), e.trim(), w.trim()); }}>
          {([["Seu nome", n, setN, "text"], ["Nome da Empresa ou Evento", e, setE, "text"], ["WhatsApp (com DDD)", w, setW, "tel"]] as const).map(([l, v, s, t]) => (
            <label key={l} className="block text-sm font-semibold">{l}
              <input type={t} value={v} maxLength={80} onChange={(x) => s(x.target.value)} className="mt-1 w-full rounded-lg bg-input/40 border border-input px-3 py-2.5" />
            </label>
          ))}
          <button disabled={!valid} className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-3.5 font-bold disabled:opacity-40">
            <MessageCircle className="h-5 w-5" />Enviar para o WhatsApp
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
