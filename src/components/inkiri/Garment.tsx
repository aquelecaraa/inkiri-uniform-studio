import { useEffect, useRef, useState, useId } from "react";
import type { Shape } from "@/lib/inkiri";

type Props = {
  shape: Shape;
  body: string;
  sleeve?: string;
  collar?: string;
  view?: "front" | "back";
  className?: string;
};

const BODY: Record<Shape, string> = {
  tshirt: "M160 65 L130 90 L125 180 L115 410 L285 410 L275 180 L270 90 L240 65 Z",
  longsleeve: "M160 65 L130 90 L125 180 L115 410 L285 410 L275 180 L270 90 L240 65 Z",
  polo: "M160 65 L130 90 L125 180 L115 410 L285 410 L275 180 L270 90 L240 65 Z",
  crewneck: "M160 65 L130 90 L125 180 L115 400 L285 400 L275 180 L270 90 L240 65 Z",
  hoodie: "M160 65 L130 90 L125 180 L115 400 L285 400 L275 180 L270 90 L240 65 Z",
  jacket: "M160 65 L130 90 L125 180 L115 400 L285 400 L275 180 L270 90 L240 65 Z",
  babylook: "M160 65 L130 90 L125 170 Q140 250 115 400 L285 400 Q260 250 275 170 L270 90 L240 65 Z",
  tank: "M170 40 Q200 60 230 40 L250 40 Q240 140 280 410 L120 410 Q160 140 150 40 Z",
  apron: "M152 50 L248 50 L254 150 Q326 158 318 420 L82 420 Q74 158 146 150 Z",
  shorts: "M120 70 L280 70 L300 300 L210 300 L200 150 L190 300 L100 300 Z",
  pants: "M120 40 L280 40 L300 400 L210 400 L200 150 L190 400 L100 400 Z",
};

const SHORT_L = "M130 90 L50 170 L75 200 L125 180 Z";
const SHORT_R = "M270 90 L350 170 L325 200 L275 180 Z";
const CAP_L = "M130 90 L80 130 L95 150 L125 140 Z";
const CAP_R = "M270 90 L320 130 L305 150 L275 140 Z";
const LONG_L = "M130 90 L30 110 L45 350 L85 340 L125 180 Z";
const LONG_R = "M270 90 L370 110 L355 350 L315 340 L275 180 Z";
const CUFF_L = "M45 350 L85 340 L80 370 L40 380 Z";
const CUFF_R = "M355 350 L315 340 L320 370 L360 380 Z";

function GarmentSvg({ shape, body, sleeve, collar, view = "front", className }: Props) {
  const s = sleeve ?? body;
  const c = collar ?? body;
  const stroke = "rgba(0,0,0,0.28)";
  const short = ["tshirt", "polo"].includes(shape);
  const long = ["longsleeve", "crewneck", "hoodie", "jacket"].includes(shape);
  const cap = shape === "babylook";
  const id = useId();

  return (
    <svg viewBox="0 0 400 440" className={className} role="img" aria-label="Peça">
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.18" />
          <stop offset="0.25" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.75" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      
      {shape === "hoodie" && (
        <path d="M138 56 Q130 -6 200 -2 Q270 -6 262 56 Q200 30 138 56 Z" fill={c} stroke={stroke} strokeWidth="2" />
      )}
      
      {short && (<><path d={SHORT_L} fill={s} stroke={stroke} strokeWidth="2" /><path d={SHORT_R} fill={s} stroke={stroke} strokeWidth="2" /></>)}
      {cap && (<><path d={CAP_L} fill={s} stroke={stroke} strokeWidth="2" /><path d={CAP_R} fill={s} stroke={stroke} strokeWidth="2" /></>)}
      {long && (<>
        <path d={LONG_L} fill={s} stroke={stroke} strokeWidth="2" />
        <path d={LONG_R} fill={s} stroke={stroke} strokeWidth="2" />
        <path d={CUFF_L} fill={c} stroke={stroke} strokeWidth="2" />
        <path d={CUFF_R} fill={c} stroke={stroke} strokeWidth="2" />
      </>)}
      
      <path d={BODY[shape]} fill={body} stroke={stroke} strokeWidth="2" />
      <path d={BODY[shape]} fill={`url(#${id})`} />

      {(shape === "crewneck" || shape === "hoodie") && (
        <rect x="98" y="385" width="204" height="22" fill={c} stroke={stroke} strokeWidth="2" />
      )}
      {shape === "crewneck" && <path d="M145 50 Q200 88 255 50 L248 62 Q200 100 152 62 Z" fill={c} stroke={stroke} strokeWidth="1.5" />}
      {(shape === "tshirt" || shape === "longsleeve" || shape === "babylook") && view === "front" && (
        <path d={shape === "babylook" ? "M150 56 Q200 90 250 56" : "M145 50 Q200 88 255 50"} fill="none" stroke={c} strokeWidth="7" />
      )}
      {shape === "polo" && (<>
        {view === "front" ? (<>
          {/* Peitilho e Botões */}
          <rect x="185" y="65" width="30" height="90" fill={body} stroke={stroke} strokeWidth="1.5" />
          <circle cx="200" cy="95" r="3.5" fill={stroke} /><circle cx="200" cy="125" r="3.5" fill={stroke} /><circle cx="200" cy="145" r="3.5" fill={stroke} />
          {/* Gola formatada para copiar a foto real */}
          <path d="M160 65 L130 115 L180 115 L200 65 Z" fill={c} stroke={stroke} strokeWidth="1.5" />
          <path d="M240 65 L270 115 L220 115 L200 65 Z" fill={c} stroke={stroke} strokeWidth="1.5" />
        </>) : <path d="M160 65 Q200 45 240 65 L235 80 Q200 65 165 80 Z" fill={c} stroke={stroke} strokeWidth="1.5" />}
      </>)}
      {shape === "hoodie" && view === "front" && (<>
        <path d="M138 300 L262 300 L285 380 L115 380 Z" fill="none" stroke={stroke} strokeWidth="2.5" />
        <line x1="185" y1="70" x2="182" y2="150" stroke={stroke} strokeWidth="3" />
        <line x1="215" y1="70" x2="218" y2="150" stroke={stroke} strokeWidth="3" />
      </>)}
      {shape === "jacket" && (<>
        <path d="M150 48 L200 60 L250 48 L250 30 Q200 22 150 30 Z" fill={c} stroke={stroke} strokeWidth="2" />
        {view === "front" && <line x1="200" y1="60" x2="200" y2="412" stroke={stroke} strokeWidth="3" strokeDasharray="4 3" />}
        {view === "front" && <><line x1="120" y1="260" x2="160" y2="250" stroke={stroke} strokeWidth="2" /><line x1="280" y1="260" x2="240" y2="250" stroke={stroke} strokeWidth="2" /></>}
      </>)}
      {shape === "apron" && (<>
        <path d="M152 50 Q200 -20 248 50" fill="none" stroke={c} strokeWidth="8" />
        <path d="M82 170 L20 200 M318 170 L380 200" stroke={c} strokeWidth="8" />
        {view === "front" && <rect x="140" y="270" width="120" height="70" rx="4" fill="none" stroke={stroke} strokeWidth="2" />}
      </>)}
      {shape === "shorts" && <rect x="92" y="70" width="216" height="22" fill={c} stroke={stroke} strokeWidth="2" />}
      {shape === "pants" && (<>
        <rect x="112" y="40" width="176" height="24" fill={c} stroke={stroke} strokeWidth="2" />
        <rect x="98" y="385" width="86" height="20" fill={c} stroke={stroke} strokeWidth="2" />
        <rect x="216" y="385" width="86" height="20" fill={c} stroke={stroke} strokeWidth="2" />
      </>)}
    </svg>
  );
}

type PhotoAsset = { name: string; w: number; h: number }; 
const PHOTOS: Partial<Record<Shape, { front: PhotoAsset; back?: PhotoAsset }>> = {
  tshirt: {
    front: { name: "tshirt-front", w: 1288, h: 1448 },
    back: { name: "tshirt-back", w: 1291, h: 1448 },
  },
  longsleeve: {
    front: { name: "longsleeve-front", w: 1329, h: 1448 },
    back: { name: "longsleeve-back", w: 1318, h: 1448 },
  },
  polo: {
    front: { name: "polo-front", w: 1194, h: 1448 },
    back: { name: "polo-back", w: 1192, h: 1448 },
  },
  babylook: {
    front: { name: "babylook-front", w: 1399, h: 1448 },
    back: { name: "babylook-back", w: 1396, h: 1448 },
  },
  tank: { front: { name: "tank-front", w: 801, h: 1448 } },
};

const MAX_H = 800; 

type Loaded = { w: number; h: number; shade: Uint8ClampedArray; regions: Uint8ClampedArray };
const cache = new Map<string, Promise<Loaded>>();

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
    img.src = src;
  });
}

function pixels(img: HTMLImageElement, w: number, h: number): Uint8ClampedArray {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas 2D indisponível");
  ctx.drawImage(img, 0, 0, w, h);
  return ctx.getImageData(0, 0, w, h).data;
}

function loadAsset(a: PhotoAsset): Promise<Loaded> {
  let p = cache.get(a.name);
  if (!p) {
    const scale = Math.min(1, MAX_H / a.h);
    const w = Math.round(a.w * scale);
    const h = Math.round(a.h * scale);
    p = Promise.all([loadImage(`/garments/${a.name}.webp`), loadImage(`/garments/${a.name}.regions.png`)]).then(
      ([shadeImg, regImg]) => ({ w, h, shade: pixels(shadeImg, w, h), regions: pixels(regImg, w, h) }),
    );
    p.catch(() => cache.delete(a.name)); 
    cache.set(a.name, p);
  }
  return p;
}

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return [255, 255, 255];
  const n = parseInt(m[1] ?? "ffffff", 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function GarmentPhoto({ asset, body, sleeve, collar, className }: { asset: PhotoAsset; body: string; sleeve: string; collar: string; className?: string | undefined }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const scale = Math.min(1, MAX_H / asset.h);
  const w = Math.round(asset.w * scale);
  const h = Math.round(asset.h * scale);

useEffect(() => {
    let cancelled = false;
    loadAsset(asset)
      .then(({ w, h, shade, regions }) => {
        const canvas = ref.current;
        const ctx = canvas?.getContext("2d");
        if (cancelled || !canvas || !ctx) return;
        const B = hexToRgb(body);
        const S = hexToRgb(sleeve);
        const C = hexToRgb(collar);
        const out = ctx.createImageData(w, h);
        const o = out.data;
        
        for (let i = 0; i < o.length; i += 4) {
          const a = (shade[i + 3] ?? 0);
          if (a === 0) continue; 
          
          // Recupera a suavidade da máscara (anti-aliasing)
          let ws = (regions[i] ?? 0) / 255; 
          let wc = (regions[i + 1] ?? 0) / 255; 
          
          // Normaliza os pesos para evitar estouro de cor e vazamentos nas costuras
          const sum = ws + wc;
          if (sum > 1) {
            ws /= sum;
            wc /= sum;
          }
          const wb = 1 - ws - wc;
          
          // Aplica o sombreamento real da foto
          const g = (shade[i] ?? 255) / 255; 
          
          o[i] = (B[0] * wb + S[0] * ws + C[0] * wc) * g;
          o[i + 1] = (B[1] * wb + S[1] * ws + C[1] * wc) * g;
          o[i + 2] = (B[2] * wb + S[2] * ws + C[2] * wc) * g;
          o[i + 3] = a;
        }
        ctx.putImageData(out, 0, 0);
      })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, [asset, body, sleeve, collar]);

  if (failed) return <svg viewBox="0 0 400 440" className={className} role="img" aria-label="Prévia simplificada da peça"><path d={BODY.tshirt} fill={body} /><path d={SHORT_L} fill={sleeve} /><path d={SHORT_R} fill={sleeve} /></svg>;
  return (
    <canvas
      ref={ref}
      width={w}
      height={h}
      role="img"
      aria-label="Peça"
      className={`${className ?? ""} object-contain mix-blend-multiply`}
      style={{ aspectRatio: `${w} / ${h}` }}
    />
  );
}

export function Garment(props: Props) {
  const { shape, body, view = "front", className } = props;
  const set = PHOTOS[shape];
  const asset = set ? (view === "back" ? set.back : set.front) : undefined;
  if (!asset) return <GarmentSvg {...props} />;
  const sleeve = props.sleeve ?? body;
  const collar = props.collar ?? body;
  return <GarmentPhoto asset={asset} body={body} sleeve={sleeve} collar={collar} className={className} />;
}