interface Props {
  accent: string;
  accent2: string;
  /** unique id prefix so gradients don't clash between instances */
  uid: string;
  className?: string;
}

/** Stylised gaming tower with glass panel, spinning fans and RGB glow. */
export default function PCIllustration({ accent, accent2, uid, className }: Props) {
  const g = (name: string) => `${uid}-${name}`;
  return (
    <svg viewBox="0 0 300 340" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gaming PC">
      <defs>
        <linearGradient id={g("body")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1d2e" />
          <stop offset="100%" stopColor="#0b0d18" />
        </linearGradient>
        <linearGradient id={g("rgb")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor={accent2} />
        </linearGradient>
        <linearGradient id={g("glass")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.03)" />
        </linearGradient>
        <radialGradient id={g("glow")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={g("gpu")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor={accent2} />
        </linearGradient>
      </defs>

      {/* ambient glow */}
      <ellipse cx="150" cy="320" rx="130" ry="22" fill={g("glow").length ? `url(#${g("glow")})` : undefined} opacity="0.8" />

      {/* tower body */}
      <rect x="55" y="20" width="190" height="290" rx="16" fill={`url(#${g("body")})`} stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

      {/* RGB strip on the front edge */}
      <rect x="228" y="34" width="5" height="262" rx="2.5" fill={`url(#${g("rgb")})`} className="pc-rgb-strip" />

      {/* glass side panel */}
      <rect x="68" y="34" width="150" height="262" rx="10" fill={`url(#${g("glass")})`} stroke="rgba(255,255,255,0.14)" strokeWidth="1" />

      {/* motherboard hint */}
      <rect x="84" y="50" width="118" height="150" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" />

      {/* CPU block */}
      <rect x="120" y="66" width="46" height="46" rx="6" fill="#131629" stroke={accent} strokeWidth="1.4" />
      <rect x="131" y="77" width="24" height="24" rx="3" fill={`url(#${g("rgb")})`} opacity="0.9">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
      </rect>

      {/* RAM sticks */}
      {[176, 186].map((x) => (
        <g key={x}>
          <rect x={x} y="62" width="7" height="54" rx="2" fill="#131629" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
          <rect x={x + 1.5} y="66" width="4" height="46" rx="1.5" fill={`url(#${g("rgb")})`} opacity="0.75">
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite" />
          </rect>
        </g>
      ))}

      {/* GPU card */}
      <g>
        <rect x="88" y="150" width="112" height="34" rx="7" fill="#12152a" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <rect x="88" y="150" width="112" height="5" rx="2.5" fill={`url(#${g("gpu")})`}>
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </rect>
        {/* GPU fans */}
        {[116, 168].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="169" r="11" fill="#0b0d18" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <g className="pc-fan" style={{ transformOrigin: `${cx}px 169px` }}>
              {[0, 120, 240].map((r) => (
                <path
                  key={r}
                  d={`M ${cx} 169 L ${cx + 8} ${169 - 4} A 9 9 0 0 1 ${cx + 4} ${169 + 8} Z`}
                  fill={accent2}
                  opacity="0.85"
                  transform={`rotate(${r} ${cx} 169)`}
                />
              ))}
            </g>
            <circle cx={cx} cy="169" r="3" fill={accent} />
          </g>
        ))}
      </g>

      {/* case fans (bottom) */}
      {[112, 174].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="248" r="22" fill="#0d1020" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
          <circle cx={cx} cy="248" r="22" fill="none" stroke={`url(#${g("rgb")})`} strokeWidth="2" opacity="0.9" className="pc-fan-ring" />
          <g className="pc-fan pc-fan--slow" style={{ transformOrigin: `${cx}px 248px` }}>
            {[0, 90, 180, 270].map((r) => (
              <path
                key={r}
                d={`M ${cx} 248 L ${cx + 16} ${248 - 7} A 17 17 0 0 1 ${cx + 9} ${248 + 15} Z`}
                fill="rgba(255,255,255,0.22)"
                transform={`rotate(${r} ${cx} 248)`}
              />
            ))}
          </g>
          <circle cx={cx} cy="248" r="4.5" fill={accent2} />
        </g>
      ))}

      {/* power LED */}
      <circle cx="90" cy="27" r="3.5" fill={accent2}>
        <animate attributeName="opacity" values="1;0.35;1" dur="2.6s" repeatCount="indefinite" />
      </circle>

      {/* feet */}
      <rect x="70" y="310" width="34" height="8" rx="4" fill="#171a2c" />
      <rect x="196" y="310" width="34" height="8" rx="4" fill="#171a2c" />
    </svg>
  );
}
