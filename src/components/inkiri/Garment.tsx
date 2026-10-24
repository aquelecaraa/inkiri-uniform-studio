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
  tshirt: "M145 50 Q200 88 255 50 L300 76 L300 420 L100 420 L100 76 Z",
  longsleeve: "M145 50 Q200 88 255 50 L300 76 L300 420 L100 420 L100 76 Z",
  polo: "M145 50 Q200 80 255 50 L300 76 L300 420 L100 420 L100 76 Z",
  crewneck: "M145 50 Q200 88 255 50 L302 76 L302 405 L98 405 L98 76 Z",
  hoodie: "M145 50 Q200 88 255 50 L302 76 L302 405 L98 405 L98 76 Z",
  jacket: "M150 48 L200 60 L250 48 L302 76 L302 412 L98 412 L98 76 Z",
  babylook: "M150 56 Q200 90 250 56 L288 78 Q272 230 292 420 L108 420 Q128 230 112 78 Z",
  tank: "M152 40 Q200 100 248 40 L266 40 Q272 128 306 148 L306 420 L94 420 L94 148 Q128 128 134 40 Z",
  apron: "M152 50 L248 50 L254 150 Q326 158 318 420 L82 420 Q74 158 146 150 Z",
  shorts: "M92 70 L308 70 L330 300 L214 312 L200 160 L186 312 L70 300 Z",
  pants: "M112 40 L288 40 L302 405 L216 405 L200 140 L184 405 L98 405 Z",
};
const SHORT_L = "M145 50 L62 88 L34 164 L100 186 L100 76 Z";
const SHORT_R = "M255 50 L338 88 L366 164 L300 186 L300 76 Z";
const CAP_L = "M150 56 L80 90 L62 150 L112 166 L112 78 Z";
const CAP_R = "M250 56 L320 90 L338 150 L288 166 L288 78 Z";
const LONG_L = "M145 50 L70 86 L26 336 L72 346 L100 176 L100 76 Z";
const LONG_R = "M255 50 L330 86 L374 336 L328 346 L300 176 L300 76 Z";
const CUFF_L = "M26 336 L72 346 L67 372 L21 362 Z";
const CUFF_R = "M374 336 L328 346 L333 372 L379 362 Z";

export function Garment({ shape, body, sleeve, collar, view = "front", className }: Props) {
  const s = sleeve ?? body;
  const c = collar ?? body;
  const stroke = "rgba(0,0,0,0.28)";
  const short = ["tshirt", "polo"].includes(shape);
  const long = ["longsleeve", "crewneck", "hoodie", "jacket"].includes(shape);
  const cap = shape === "babylook";
  const id = `sh-${shape}`;

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
          <path d="M145 50 L200 82 L178 104 L132 66 Z" fill={c} stroke={stroke} strokeWidth="1.5" />
          <path d="M255 50 L200 82 L222 104 L268 66 Z" fill={c} stroke={stroke} strokeWidth="1.5" />
          <rect x="190" y="82" width="20" height="78" fill={body} stroke={stroke} strokeWidth="1.5" />
          <circle cx="200" cy="105" r="3" fill={stroke} /><circle cx="200" cy="135" r="3" fill={stroke} />
        </>) : <path d="M140 52 Q200 40 260 52 L258 68 Q200 58 142 68 Z" fill={c} stroke={stroke} strokeWidth="1.5" />}
        <path d="M34 164 L100 186 L98 196 L31 174 Z" fill={c} stroke={stroke} strokeWidth="1.5" />
        <path d="M366 164 L300 186 L302 196 L369 174 Z" fill={c} stroke={stroke} strokeWidth="1.5" />
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
