import type { Category, Part } from "./types";

export const CATEGORY_ORDER: Category[] = [
  "cpu",
  "motherboard",
  "ram",
  "gpu",
  "storage",
  "psu",
  "cooler",
  "case",
];

export const PARTS: Part[] = [
  // ── CPUs ─────────────────────────────────────────────
  { id: "cpu-14400f", category: "cpu", name: "Core i5-14400F", brand: "Intel", price: 199, spec: "10 cores · 4.7 GHz", socket: "LGA1700", watts: 65, perf: 52 },
  { id: "cpu-14700k", category: "cpu", name: "Core i7-14700K", brand: "Intel", price: 389, spec: "20 cores · 5.6 GHz", socket: "LGA1700", watts: 125, perf: 78 },
  { id: "cpu-14900k", category: "cpu", name: "Core i9-14900K", brand: "Intel", price: 549, spec: "24 cores · 6.0 GHz", socket: "LGA1700", watts: 150, perf: 92 },
  { id: "cpu-7600x", category: "cpu", name: "Ryzen 5 7600X", brand: "AMD", price: 229, spec: "6 cores · 5.3 GHz", socket: "AM5", watts: 105, perf: 55 },
  { id: "cpu-7800x3d", category: "cpu", name: "Ryzen 7 7800X3D", brand: "AMD", price: 399, spec: "8 cores · 3D V-Cache", socket: "AM5", watts: 120, perf: 88 },
  { id: "cpu-7950x", category: "cpu", name: "Ryzen 9 7950X", brand: "AMD", price: 579, spec: "16 cores · 5.7 GHz", socket: "AM5", watts: 170, perf: 95 },

  // ── Motherboards ─────────────────────────────────────
  { id: "mb-b760m-d4", category: "motherboard", name: "PRO B760M-A DDR4", brand: "MSI", price: 119, spec: "LGA1700 · DDR4 · mATX", socket: "LGA1700", ramType: "DDR4" },
  { id: "mb-b760m", category: "motherboard", name: "PRO B760M-A WIFI", brand: "MSI", price: 149, spec: "LGA1700 · DDR5 · mATX", socket: "LGA1700", ramType: "DDR5" },
  { id: "mb-z790", category: "motherboard", name: "ROG Strix Z790-E", brand: "ASUS", price: 399, spec: "LGA1700 · DDR5 · ATX", socket: "LGA1700", ramType: "DDR5" },
  { id: "mb-b650", category: "motherboard", name: "B650 AORUS Elite AX", brand: "Gigabyte", price: 199, spec: "AM5 · DDR5 · ATX", socket: "AM5", ramType: "DDR5" },
  { id: "mb-x670e", category: "motherboard", name: "ROG Crosshair X670E", brand: "ASUS", price: 499, spec: "AM5 · DDR5 · ATX", socket: "AM5", ramType: "DDR5" },

  // ── RAM ──────────────────────────────────────────────
  { id: "ram-fury16", category: "ram", name: "FURY Beast 16GB", brand: "Kingston", price: 49, spec: "2×8 GB · DDR4-3600", ramType: "DDR4", perf: 30 },
  { id: "ram-veng32", category: "ram", name: "Vengeance 32GB", brand: "Corsair", price: 109, spec: "2×16 GB · DDR5-6000", ramType: "DDR5", perf: 60 },
  { id: "ram-z5-32", category: "ram", name: "Trident Z5 RGB 32GB", brand: "G.Skill", price: 139, spec: "2×16 GB · DDR5-6400", ramType: "DDR5", perf: 70 },
  { id: "ram-dom64", category: "ram", name: "Dominator Titanium 64GB", brand: "Corsair", price: 249, spec: "2×32 GB · DDR5-6600", ramType: "DDR5", perf: 85 },

  // ── GPUs ─────────────────────────────────────────────
  { id: "gpu-4060", category: "gpu", name: "GeForce RTX 4060", brand: "NVIDIA", price: 299, spec: "8 GB GDDR6 · DLSS 3", watts: 115, perf: 45 },
  { id: "gpu-4070s", category: "gpu", name: "GeForce RTX 4070 Super", brand: "NVIDIA", price: 599, spec: "12 GB GDDR6X · DLSS 3", watts: 220, perf: 70 },
  { id: "gpu-7800xt", category: "gpu", name: "Radeon RX 7800 XT", brand: "AMD", price: 499, spec: "16 GB GDDR6 · FSR 3", watts: 263, perf: 66 },
  { id: "gpu-4080s", category: "gpu", name: "GeForce RTX 4080 Super", brand: "NVIDIA", price: 999, spec: "16 GB GDDR6X · DLSS 3", watts: 320, perf: 88 },
  { id: "gpu-7900xtx", category: "gpu", name: "Radeon RX 7900 XTX", brand: "AMD", price: 949, spec: "24 GB GDDR6 · FSR 3", watts: 355, perf: 85 },
  { id: "gpu-4090", category: "gpu", name: "GeForce RTX 4090", brand: "NVIDIA", price: 1599, spec: "24 GB GDDR6X · DLSS 3", watts: 450, perf: 100 },

  // ── Storage ──────────────────────────────────────────
  { id: "ssd-nv2", category: "storage", name: "NV2 1TB", brand: "Kingston", price: 59, spec: "NVMe Gen4 · 3500 MB/s", perf: 35 },
  { id: "ssd-980p", category: "storage", name: "980 PRO 1TB", brand: "Samsung", price: 99, spec: "NVMe Gen4 · 7000 MB/s", perf: 60 },
  { id: "ssd-990p", category: "storage", name: "990 PRO 2TB", brand: "Samsung", price: 169, spec: "NVMe Gen4 · 7450 MB/s", perf: 80 },
  { id: "ssd-sn850x", category: "storage", name: "Black SN850X 4TB", brand: "WD", price: 299, spec: "NVMe Gen4 · 7300 MB/s", perf: 90 },

  // ── PSUs ─────────────────────────────────────────────
  { id: "psu-cx650", category: "psu", name: "CX650", brand: "Corsair", price: 69, spec: "650 W · 80+ Bronze", watts: 650 },
  { id: "psu-rm750", category: "psu", name: "RM750x", brand: "Corsair", price: 109, spec: "750 W · 80+ Gold", watts: 750 },
  { id: "psu-gx850", category: "psu", name: "Focus GX-850", brand: "Seasonic", price: 139, spec: "850 W · 80+ Gold", watts: 850 },
  { id: "psu-hx1200", category: "psu", name: "HX1200", brand: "Corsair", price: 249, spec: "1200 W · 80+ Platinum", watts: 1200 },

  // ── Coolers ──────────────────────────────────────────
  { id: "cool-ak400", category: "cooler", name: "AK400", brand: "DeepCool", price: 35, spec: "Air · 66 CFM", watts: 180 },
  { id: "cool-nhd15", category: "cooler", name: "NH-D15", brand: "Noctua", price: 109, spec: "Dual-tower air", watts: 250 },
  { id: "cool-kraken", category: "cooler", name: "Kraken 240", brand: "NZXT", price: 139, spec: "240 mm AIO liquid", watts: 280 },
  { id: "cool-h150i", category: "cooler", name: "iCUE H150i Elite", brand: "Corsair", price: 189, spec: "360 mm AIO liquid", watts: 350 },

  // ── Cases ────────────────────────────────────────────
  { id: "case-4000d", category: "case", name: "4000D Airflow", brand: "Corsair", price: 94, spec: "ATX mid-tower · mesh" },
  { id: "case-h5", category: "case", name: "H5 Flow", brand: "NZXT", price: 89, spec: "ATX mid-tower · glass" },
  { id: "case-north", category: "case", name: "North", brand: "Fractal", price: 129, spec: "ATX · walnut front" },
  { id: "case-o11", category: "case", name: "O11 Dynamic EVO", brand: "Lian Li", price: 149, spec: "ATX · dual-chamber glass" },
];

export const partsByCategory = (cat: Category): Part[] =>
  PARTS.filter((p) => p.category === cat);

export const BASE_SYSTEM_WATTS = 100;

export const requiredWatts = (cpu?: Part, gpu?: Part): number =>
  Math.round(((cpu?.watts ?? 0) + (gpu?.watts ?? 0) + BASE_SYSTEM_WATTS) * 1.25);
