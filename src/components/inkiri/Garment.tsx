import { useEffect, useRef, useState } from "react";
import type { Shape } from "@/lib/inkiri";

type Props = {
  shape: Shape;
  color?: string;
  body?: string;
  view?: "front" | "back" | "side-right" | "side-left";
  className?: string;
};

type PhotoAsset = { name: string; w: number; h: number; ext?: "webp" | "png" };

const PHOTOS: Record<
  Shape,
  { front: PhotoAsset; back: PhotoAsset; sideRight?: PhotoAsset; sideLeft?: PhotoAsset }
> = {
  tshirt: {
    front: { name: "tshirt-front", w: 889, h: 1000 },
    back: { name: "tshirt-back", w: 891, h: 1000 },
    sideRight: { name: "tshirt-side-right", w: 889, h: 1000, ext: "png" },
    sideLeft: { name: "tshirt-side-left", w: 889, h: 1000, ext: "png" },
  },
  longsleeve: {
    front: { name: "longsleeve-front", w: 918, h: 1000 },
    back: { name: "longsleeve-back", w: 910, h: 1000 },
    sideRight: { name: "longsleeve-side-right", w: 889, h: 1000, ext: "png" },
    sideLeft: { name: "longsleeve-side-left", w: 889, h: 1000, ext: "png" },
  },
  polo: {
    front: { name: "polo-front", w: 825, h: 1000 },
    back: { name: "polo-back", w: 823, h: 1000 },
    sideRight: { name: "polo-side-right", w: 889, h: 1000, ext: "png" },
    sideLeft: { name: "polo-side-left", w: 889, h: 1000, ext: "png" },
  },
  crewneck: {
    front: { name: "crewneck-front", w: 921, h: 1000 },
    back: { name: "crewneck-back", w: 906, h: 1000 },
    sideRight: { name: "crewneck-side-right", w: 889, h: 1000, ext: "png" },
    sideLeft: { name: "crewneck-side-left", w: 889, h: 1000, ext: "png" },
  },
  hoodie: {
    front: { name: "hoodie-front", w: 856, h: 1000 },
    back: { name: "hoodie-back", w: 862, h: 1000 },
    sideRight: { name: "hoodie-side-right", w: 889, h: 1000, ext: "png" },
    sideLeft: { name: "hoodie-side-left", w: 889, h: 1000, ext: "png" },
  },
  jacket: {
    front: { name: "jacket-front", w: 916, h: 1000 },
    back: { name: "jacket-back", w: 905, h: 1000 },
    sideRight: { name: "jacket-side-right", w: 889, h: 1000, ext: "png" },
    sideLeft: { name: "jacket-side-left", w: 889, h: 1000, ext: "png" },
  },
  pants: {
    front: { name: "pants-front", w: 433, h: 1000 },
    back: { name: "pants-back", w: 426, h: 1000 },
    sideRight: { name: "pants-side-right", w: 889, h: 1000, ext: "png" },
    sideLeft: { name: "pants-side-left", w: 889, h: 1000, ext: "png" },
  },
  shorts: {
    front: { name: "shorts-front", w: 795, h: 1000 },
    back: { name: "shorts-back", w: 796, h: 1000 },
    sideRight: { name: "shorts-side-right", w: 889, h: 1000, ext: "png" },
    sideLeft: { name: "shorts-side-left", w: 889, h: 1000, ext: "png" },
  },
  shortspoli: {
    front: { name: "shortspoli-front", w: 841, h: 1000 },
    back: { name: "shortspoli-back", w: 839, h: 1000 },
    sideRight: { name: "shorts-side-right", w: 889, h: 1000, ext: "png" },
    sideLeft: { name: "shorts-side-left", w: 889, h: 1000, ext: "png" },
  },
  shortsuv: {
    front: { name: "shortsuv-front", w: 811, h: 1000 },
    back: { name: "shortsuv-back", w: 810, h: 1000 },
    sideRight: { name: "shorts-side-right", w: 889, h: 1000, ext: "png" },
    sideLeft: { name: "shorts-side-left", w: 889, h: 1000, ext: "png" },
  },
};

const MAX_H = 800;

type Loaded = { w: number; h: number; shade: Uint8ClampedArray; map: Uint8ClampedArray };
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
    const ext = a.ext ?? "webp";
    const base = import.meta.env.BASE_URL ?? "/";
    p = Promise.all([
      loadImage(`${base}garments/${a.name}.${ext}`),
      loadImage(`${base}garments/${a.name}.map.png`),
    ]).then(([shadeImg, mapImg]) => ({
      w,
      h,
      shade: pixels(shadeImg, w, h),
      map: pixels(mapImg, w, h),
    }));
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

function GarmentPhoto({
  asset,
  color,
  className,
}: {
  asset: PhotoAsset;
  color: string;
  className?: string | undefined;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const scale = Math.min(1, MAX_H / asset.h);
  const w = Math.round(asset.w * scale);
  const h = Math.round(asset.h * scale);

  useEffect(() => {
    let cancelled = false;
    loadAsset(asset)
      .then(({ w, h, shade, map }) => {
        const canvas = ref.current;
        const ctx = canvas?.getContext("2d");
        if (cancelled || !canvas || !ctx) return;
        const B = hexToRgb(color);
        const out = ctx.createImageData(w, h);
        const o = out.data;

        for (let i = 0; i < o.length; i += 4) {
          const a = shade[i + 3] ?? 0;
          if (a === 0) continue;

          // Canal B = linha de costura
          const seam = (map[i + 2] ?? 0) / 255;

          // Aplica o sombreamento real da foto + linha de costura em cor única sólida
          const g = ((shade[i] ?? 255) / 255) * (1 - seam * 0.22);

          o[i] = B[0] * g;
          o[i + 1] = B[1] * g;
          o[i + 2] = B[2] * g;
          o[i + 3] = a;
        }
        ctx.putImageData(out, 0, 0);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [asset, color]);

  if (failed) {
    return (
      <svg
        viewBox="0 0 400 440"
        className={className}
        role="img"
        aria-label="Prévia simplificada da peça"
      >
        <rect x="80" y="60" width="240" height="320" rx="16" fill={color} />
      </svg>
    );
  }

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
  const { shape, view = "front", className } = props;
  const color = props.color ?? props.body ?? "#1f2a44";
  const set = PHOTOS[shape];
  const asset =
    view === "back"
      ? set.back
      : view === "side-right"
        ? (set.sideRight ?? set.front)
        : view === "side-left"
          ? (set.sideLeft ?? set.front)
          : set.front;
  return <GarmentPhoto asset={asset} color={color} className={className} />;
}
