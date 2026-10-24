export const WHATSAPP_NUMBER = "5511940882448";
export const MIN_ORDER = 10;

export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export type Shape =
  | "tshirt" | "longsleeve" | "polo" | "babylook" | "tank"
  | "jacket" | "crewneck" | "hoodie" | "apron" | "shorts" | "pants";

export type Purpose = "empresarial" | "eventos" | "inverno";

export const PURPOSES: { id: Purpose; label: string }[] = [
  { id: "empresarial", label: "Uniforme Empresarial" },
  { id: "eventos", label: "Camisas para Eventos" },
  { id: "inverno", label: "Linha Inverno / Operacional" },
];

export type FabricId = "algodao" | "piquet" | "dryfit" | "inverno";
export const FABRICS: Record<FabricId, { name: string; tip: string }> = {
  algodao: { name: "Algodão 30.1 Penteado", tip: "Conforto premium e toque macio para escritórios e eventos corporativos." },
  piquet: { name: "Malha Piquet Corporativa", tip: "Recomendado automaticamente para Camisa Polo; alta elegância e estrutura." },
  dryfit: { name: "Poliamida & Dry-Fit UV50+", tip: "Toque gelado, secagem rápida e proteção solar para eventos externos, corridas e trabalho ao sol." },
  inverno: { name: "Tecido Impermeável / Moletom Alta Gramatura", tip: "Para linha de inverno, corta-vento e agasalhos corporativos." },
};

export type Model = {
  id: string; name: string; shape: Shape; purpose: Purpose; fabric: FabricId;
  hasCollar?: boolean; studio: boolean;
};

export const MODELS: Model[] = [
  { id: "polo", name: "Camisa Gola Polo", shape: "polo", purpose: "empresarial", fabric: "piquet", hasCollar: true, studio: true },
  { id: "tshirt", name: "T-Shirt Tradicional (Gola Redonda)", shape: "tshirt", purpose: "empresarial", fabric: "algodao", studio: true },
  { id: "manga-longa", name: "T-Shirt Manga Longa (punho ribana)", shape: "longsleeve", purpose: "empresarial", fabric: "algodao", hasCollar: true, studio: true },
  { id: "babylook", name: "Baby Look Feminina", shape: "babylook", purpose: "empresarial", fabric: "algodao", studio: true },
  { id: "poliamida", name: "Camiseta Poliamida / Dry-Fit", shape: "tshirt", purpose: "eventos", fabric: "dryfit", studio: true },
  { id: "uv-curta", name: "Camiseta UV50+ Manga Curta", shape: "tshirt", purpose: "eventos", fabric: "dryfit", studio: true },
  { id: "uv-longa", name: "Camiseta UV50+ Manga Longa", shape: "longsleeve", purpose: "eventos", fabric: "dryfit", hasCollar: true, studio: true },
  { id: "regata", name: "Regata / Abadá", shape: "tank", purpose: "eventos", fabric: "dryfit", studio: true },
  { id: "corta-vento", name: "Jaqueta Corta-Vento Impermeável", shape: "jacket", purpose: "inverno", fabric: "inverno", hasCollar: true, studio: true },
  { id: "moletom-careca", name: "Moletom Careca", shape: "crewneck", purpose: "inverno", fabric: "inverno", hasCollar: true, studio: true },
  { id: "moletom-canguru", name: "Moletom Canguru (bolso e capuz)", shape: "hoodie", purpose: "inverno", fabric: "inverno", hasCollar: true, studio: true },
  { id: "avental", name: "Avental Gastronômico", shape: "apron", purpose: "inverno", fabric: "algodao", studio: true },
  { id: "jogger", name: "Calça Jogger Moletom", shape: "pants", purpose: "inverno", fabric: "inverno", studio: true },
  { id: "bermuda-moletom", name: "Bermuda Moletom", shape: "shorts", purpose: "inverno", fabric: "inverno", studio: true },
  { id: "bermuda-poliamida", name: "Bermuda Poliamida", shape: "shorts", purpose: "eventos", fabric: "dryfit", studio: true },
  { id: "bermuda-uv", name: "Bermuda UV", shape: "shorts", purpose: "eventos", fabric: "dryfit", studio: true },
];

export const STUDIO_MODELS = MODELS.filter((m) => !["jogger", "bermuda-moletom", "bermuda-poliamida", "bermuda-uv"].includes(m.id));

export type CatalogTab = "todos" | "corporativo" | "eventos" | "uv" | "inverno" | "bermudas" | "gastronomia";
export const CATALOG_TABS: { id: CatalogTab; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "corporativo", label: "Corporativo & Polos" },
  { id: "eventos", label: "Eventos & T-Shirts" },
  { id: "uv", label: "Linha UV & Esportiva" },
  { id: "inverno", label: "Inverno (Corta-Vento & Moletom)" },
  { id: "bermudas", label: "Bermudas & Calças" },
  { id: "gastronomia", label: "Gastronomia (Aventais & Dólmãs)" },
];

export const CATALOG: { id: string; tab: CatalogTab[]; spec: string; color: string }[] = [
  { id: "corta-vento", tab: ["inverno"], spec: "Tactel impermeável, forro em tela, zíper frontal", color: "#1f2a44" },
  { id: "moletom-careca", tab: ["inverno"], spec: "Moletom 3 cabos flanelado, 50% algodão", color: "#8a8d93" },
  { id: "moletom-canguru", tab: ["inverno"], spec: "Moletom flanelado com capuz forrado e bolso canguru", color: "#111214" },
  { id: "jogger", tab: ["bermudas", "inverno"], spec: "Moletom peluciado, punho e cós em ribana", color: "#3b3f45" },
  { id: "bermuda-moletom", tab: ["bermudas"], spec: "Moletom leve, cordão e bolsos laterais", color: "#8a8d93" },
  { id: "bermuda-poliamida", tab: ["bermudas", "uv"], spec: "Poliamida com elastano, secagem rápida", color: "#1f2a44" },
  { id: "bermuda-uv", tab: ["bermudas", "uv"], spec: "Tecido UV50+ com proteção solar certificada", color: "#1d4ed8" },
  { id: "polo", tab: ["corporativo"], spec: "Malha Piquet 100% algodão, gola e punho ribana", color: "#1f2a44" },
  { id: "tshirt", tab: ["eventos", "corporativo"], spec: "Algodão 30.1 penteado, 160 g/m²", color: "#ffffff" },
  { id: "manga-longa", tab: ["corporativo", "eventos"], spec: "Algodão 30.1 penteado, punho em ribana", color: "#3b3f45" },
  { id: "poliamida", tab: ["eventos", "uv"], spec: "Poliamida dry-fit, toque gelado", color: "#15803d" },
  { id: "uv-curta", tab: ["uv"], spec: "Dry-Fit UV50+, antiodor, manga curta", color: "#dc2626" },
  { id: "uv-longa", tab: ["uv"], spec: "Dry-Fit UV50+, manga longa com polegar", color: "#1d4ed8" },
  { id: "avental", tab: ["gastronomia"], spec: "Brim leve, alças reguláveis e bolso frontal", color: "#111214" },
];

export const STOCK_COLORS = [
  { name: "Preto", hex: "#111214" },
  { name: "Branco", hex: "#ffffff" },
  { name: "Azul Marinho", hex: "#1f2a44" },
  { name: "Cinza Mescla", hex: "#8a8d93" },
  { name: "Chumbo", hex: "#3b3f45" },
  { name: "Vermelho", hex: "#dc2626" },
  { name: "Azul Royal", hex: "#1d4ed8" },
  { name: "Verde", hex: "#15803d" },
];
export const EXTRA_COLORS = [
  { name: "Amarelo", hex: "#facc15" },
  { name: "Laranja", hex: "#f97316" },
  { name: "Rosa", hex: "#ec4899" },
  { name: "Vinho", hex: "#7f1d1d" },
];
export const isStockColor = (hex: string) => STOCK_COLORS.some((c) => c.hex === hex);
export const colorName = (hex: string) =>
  [...STOCK_COLORS, ...EXTRA_COLORS].find((c) => c.hex === hex)?.name ?? hex;

export const SIZES = ["PP", "P", "M", "G", "GG", "XG"] as const;
export type Size = (typeof SIZES)[number];
export type Grid = Record<Size, number>;
export const emptyGrid = (): Grid => ({ PP: 0, P: 0, M: 0, G: 0, GG: 0, XG: 0 });
export const gridTotal = (g: Grid) => SIZES.reduce((s, k) => s + (Number(g[k]) || 0), 0);

export type Tier = { id: string; label: string; range: string; min: number; max: number };
export const TIERS: Tier[] = [
  { id: "express", label: "Lote Express", range: "10 a 29 peças", min: 10, max: 29 },
  { id: "empresarial", label: "Lote Empresarial", range: "30 a 99 peças · Desconto Progressivo", min: 30, max: 99 },
  { id: "atacado", label: "Lote Atacado / Grandes Eventos", range: "100+ peças · Condição Especial", min: 100, max: Infinity },
];
export const getTier = (qty: number): Tier | null =>
  TIERS.find((t) => qty >= t.min && qty <= t.max) ?? null;

export const isPriorityDate = (date: string, now = new Date()) => {
  if (!date) return false;
  const diff = (new Date(date + "T23:59:59").getTime() - now.getTime()) / 86400000;
  return diff <= 3;
};

export const recommendSize = (heightCm: number, weightKg: number): string => {
  const order = ["P", "M", "G", "GG", "XG"];
  let i = weightKg < 62 ? 0 : weightKg < 76 ? 1 : weightKg < 90 ? 2 : weightKg < 105 ? 3 : 4;
  if (heightCm >= 186 && i < 4) i++;
  if (heightCm < 160 && i > 0 && weightKg < 70) i--;
  return order[i]!;
};
