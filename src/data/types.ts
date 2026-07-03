export type Category =
  | "cpu"
  | "motherboard"
  | "gpu"
  | "ram"
  | "storage"
  | "psu"
  | "cooler"
  | "case";

export interface Part {
  id: string;
  category: Category;
  name: string;
  brand: string;
  price: number;
  /** short spec line shown under the name */
  spec: string;
  /** CPU + motherboard + cooler: socket compatibility */
  socket?: "LGA1700" | "AM5";
  /** motherboard + ram: memory generation */
  ramType?: "DDR4" | "DDR5";
  /** cpu/gpu: power draw in watts, psu: capacity in watts */
  watts?: number;
  /** relative performance score 0-100 used for the build meter */
  perf?: number;
}

export interface Prebuilt {
  id: string;
  company: string;
  model: string;
  tier: "flagship" | "performance" | "starter";
  price: number;
  oldPrice?: number;
  accent: string;
  accent2: string;
  perf: number;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    cooling: string;
    psu: string;
  };
}

export interface CartItem {
  id: string;
  kind: "prebuilt" | "custom";
  title: string;
  subtitle: string;
  price: number;
  accent: string;
  accent2?: string;
  qty: number;
}
