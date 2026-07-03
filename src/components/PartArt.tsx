import type { Category } from "../data/types";

/** Brand → [accent, accent2] used to tint the product art. */
const BRAND_ACCENTS: Record<string, [string, string]> = {
  Intel: ["#3b82f6", "#00e5ff"],
  AMD: ["#ff4d2e", "#ff9a3c"],
  NVIDIA: ["#76b900", "#c6ff5c"],
  MSI: ["#ff2e4d", "#ff7a5c"],
  ASUS: ["#00e5ff", "#6c5ce7"],
  Gigabyte: ["#ff8a00", "#ffc94d"],
  Kingston: ["#ff3d5a", "#ff8a5c"],
  Corsair: ["#ffd23c", "#ff9a3c"],
  "G.Skill": ["#b06cff", "#ff6ad5"],
  Samsung: ["#3b6cff", "#00d4ff"],
  WD: ["#00b8ff", "#6c5ce7"],
  Seasonic: ["#00d4a3", "#00e5ff"],
  DeepCool: ["#00e5c3", "#3b82f6"],
  Noctua: ["#c98a5a", "#e8b48a"],
  NZXT: ["#b06cff", "#6c5ce7"],
  "Lian Li": ["#8ab6ff", "#e0e6ff"],
  Fractal: ["#e0e6ff", "#8ab6ff"],
};

const FALLBACK: [string, string] = ["#6c5ce7", "#00e5ff"];

export const brandAccent = (brand: string): [string, string] =>
  BRAND_ACCENTS[brand] ?? FALLBACK;

interface Props {
  category: Category;
  brand: string;
  /** unique id prefix so gradients don't clash between instances */
  uid: string;
  className?: string;
}

/** Stylised product illustration for a PC component, tinted with brand colors. */
export default function PartArt({ category, brand, uid, className }: Props) {
  const [a1, a2] = brandAccent(brand);
  const gid = `${uid}-grad`;

  const fanBlades = (cx: number, cy: number, r: number, n: number, slow = false) => (
    <g>
      <g className={slow ? "pc-fan pc-fan--slow" : "pc-fan"} style={{ transformOrigin: `${cx}px ${cy}px` }}>
        {Array.from({ length: n }, (_, i) => (
          <path
            key={i}
            d={`M ${cx} ${cy} L ${cx + r * 0.72} ${cy - r * 0.32} A ${r * 0.8} ${r * 0.8} 0 0 1 ${cx + r * 0.36} ${cy + r * 0.68} Z`}
            fill={a2}
            opacity="0.8"
            transform={`rotate(${(360 / n) * i} ${cx} ${cy})`}
          />
        ))}
      </g>
      <circle cx={cx} cy={cy} r={r * 0.24} fill={a1} />
    </g>
  );

  const art: Record<Category, JSX.Element> = {
    cpu: (
      <>
        {/* traces */}
        {[26, 45, 64].map((y) => (
          <g key={y} stroke={a1} strokeWidth="1" opacity="0.3">
            <line x1="14" y1={y} x2="42" y2={y} />
            <line x1="98" y1={y} x2="126" y2={y} />
          </g>
        ))}
        {/* substrate with pin frame */}
        <rect x="42" y="17" width="56" height="56" rx="6" fill="#171a2e" stroke="rgba(255,214,130,0.4)" strokeWidth="1.4" />
        <rect x="48" y="23" width="44" height="44" rx="3" fill="#101322" stroke="rgba(255,255,255,0.1)" />
        {/* die */}
        <rect x="58" y="33" width="24" height="24" rx="3" fill={`url(#${gid})`}>
          <animate attributeName="opacity" values="0.65;1;0.65" dur="2.4s" repeatCount="indefinite" />
        </rect>
        <circle cx="47.5" cy="22.5" r="1.6" fill="#ffd682" opacity="0.8" />
      </>
    ),
    motherboard: (
      <>
        <rect x="24" y="8" width="92" height="74" rx="5" fill="#12152a" stroke={a1} strokeWidth="1.2" strokeOpacity="0.5" />
        {/* socket */}
        <rect x="36" y="17" width="26" height="26" rx="2" fill="#0b0d18" stroke={a1} strokeWidth="1.2" />
        <rect x="43" y="24" width="12" height="12" rx="1.5" fill={`url(#${gid})`} opacity="0.85">
          <animate attributeName="opacity" values="0.5;0.95;0.5" dur="2.6s" repeatCount="indefinite" />
        </rect>
        {/* RAM slots */}
        {[74, 81, 88].map((x) => (
          <rect key={x} x={x} y="15" width="3.5" height="34" rx="1.5" fill="#1c2038" stroke="rgba(255,255,255,0.14)" strokeWidth="0.7" />
        ))}
        {/* PCIe slots */}
        <rect x="36" y="56" width="50" height="4.5" rx="2" fill="#1c2038" stroke="rgba(255,255,255,0.14)" strokeWidth="0.7" />
        <rect x="36" y="66" width="36" height="4.5" rx="2" fill="#1c2038" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" />
        {/* chipset heatsink */}
        <rect x="96" y="58" width="14" height="14" rx="3" fill={`url(#${gid})`} opacity="0.9" />
        {/* caps */}
        {[100, 106, 112].map((x) => (
          <circle key={x} cx={x} cy="22" r="2.4" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        ))}
      </>
    ),
    gpu: (
      <>
        {/* bracket */}
        <rect x="10" y="23" width="5" height="44" rx="2" fill="#1c2038" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
        {/* card body */}
        <rect x="17" y="26" width="110" height="38" rx="6" fill="#12152a" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
        {/* accent stripe */}
        <rect x="17" y="26" width="110" height="5" rx="2.5" fill={`url(#${gid})`}>
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </rect>
        {/* fans */}
        <circle cx="48" cy="46" r="13" fill="#0b0d18" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        {fanBlades(48, 46, 12, 3)}
        <circle cx="94" cy="46" r="13" fill="#0b0d18" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        {fanBlades(94, 46, 12, 3)}
        {/* PCIe fingers */}
        <rect x="32" y="64" width="52" height="4" rx="1.5" fill="#c9a24f" opacity="0.85" />
      </>
    ),
    ram: (
      <>
        {[46, 74].map((x, i) => (
          <g key={x}>
            <rect x={x} y="12" width="20" height="60" rx="2.5" fill="#14172c" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
            {/* RGB top bar */}
            <rect x={x + 2.5} y="14.5" width="15" height="6" rx="3" fill={`url(#${gid})`}>
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2.8s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </rect>
            {/* heatspreader grooves */}
            {[28, 37, 46, 55].map((y) => (
              <line key={y} x1={x + 3} y1={y} x2={x + 17} y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
            ))}
            {/* pins */}
            <rect x={x + 2} y="68" width="16" height="3" fill="#c9a24f" opacity="0.8" />
          </g>
        ))}
      </>
    ),
    storage: (
      <>
        {/* M.2 stick */}
        <rect x="20" y="30" width="100" height="30" rx="3.5" fill="#101528" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
        {/* edge connector */}
        <rect x="20" y="36" width="5" height="18" fill="#c9a24f" opacity="0.85" />
        {/* controller */}
        <rect x="33" y="37" width="17" height="16" rx="2" fill={`url(#${gid})`}>
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2.2s" repeatCount="indefinite" />
        </rect>
        {/* NAND chips */}
        <rect x="56" y="36" width="24" height="18" rx="2" fill="#1c2038" stroke="rgba(255,255,255,0.16)" strokeWidth="0.8" />
        <rect x="85" y="36" width="24" height="18" rx="2" fill="#1c2038" stroke="rgba(255,255,255,0.16)" strokeWidth="0.8" />
        {/* screw notch */}
        <circle cx="116" cy="45" r="3" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      </>
    ),
    psu: (
      <>
        <rect x="28" y="14" width="84" height="62" rx="6" fill="#12152a" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
        {/* fan */}
        <circle cx="58" cy="45" r="20" fill="#0b0d18" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <circle cx="58" cy="45" r="20" fill="none" stroke={`url(#${gid})`} strokeWidth="1.8" opacity="0.9" />
        {fanBlades(58, 45, 17, 4, true)}
        {/* modular ports */}
        {[24, 36, 48, 60].map((y) => (
          <rect key={y} x="92" y={y} width="12" height="7" rx="1.5" fill="#1c2038" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" />
        ))}
        {/* badge */}
        <rect x="88" y="64" width="18" height="7" rx="3.5" fill={`url(#${gid})`} opacity="0.9" />
      </>
    ),
    cooler: (
      <>
        {/* fin stack */}
        <rect x="60" y="16" width="38" height="46" rx="3" fill="#161a30" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
        {[22, 28, 34, 40, 46, 52, 58].map((y) => (
          <line key={y} x1="62" y1={y} x2="96" y2={y} stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
        ))}
        {/* heatpipes */}
        <path d="M68 68 C 66 60 66 22 72 14" fill="none" stroke={a1} strokeWidth="2.4" opacity="0.75" />
        <path d="M88 68 C 92 60 92 22 86 14" fill="none" stroke={a1} strokeWidth="2.4" opacity="0.75" />
        {/* base */}
        <rect x="62" y="64" width="34" height="7" rx="2.5" fill="#1c2038" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
        {/* front fan */}
        <circle cx="42" cy="40" r="17" fill="#0b0d18" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <circle cx="42" cy="40" r="17" fill="none" stroke={`url(#${gid})`} strokeWidth="1.8" opacity="0.9" />
        {fanBlades(42, 40, 14, 4)}
      </>
    ),
    case: (
      <>
        <rect x="44" y="6" width="52" height="76" rx="7" fill="#12152a" stroke="rgba(255,255,255,0.16)" strokeWidth="1.2" />
        {/* glass panel */}
        <rect x="50" y="12" width="30" height="64" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" strokeWidth="0.8" />
        {/* RGB strip */}
        <rect x="85" y="12" width="3.5" height="64" rx="1.75" fill={`url(#${gid})`} className="pc-rgb" />
        {/* internal fans */}
        {[30, 56].map((cy) => (
          <g key={cy}>
            <circle cx="65" cy={cy} r="9" fill="#0b0d18" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
            <circle cx="65" cy={cy} r="9" fill="none" stroke={`url(#${gid})`} strokeWidth="1.4" opacity="0.85" />
            {fanBlades(65, cy, 7, 4, true)}
          </g>
        ))}
        {/* feet */}
        <rect x="48" y="82" width="12" height="3.5" rx="1.75" fill="#1c2038" />
        <rect x="80" y="82" width="12" height="3.5" rx="1.75" fill="#1c2038" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 140 90" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label={category}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={a1} />
          <stop offset="100%" stopColor={a2} />
        </linearGradient>
      </defs>
      {/* soft glow floor */}
      <ellipse cx="70" cy="82" rx="52" ry="7" fill={a1} opacity="0.12" />
      {art[category]}
    </svg>
  );
}
