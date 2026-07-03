import type { Category } from "../data/types";

const paths: Record<Category, JSX.Element> = {
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" fill="currentColor" stroke="none" opacity="0.6" />
      {[8, 12, 16].map((v) => (
        <g key={v}>
          <line x1={v} y1="2.5" x2={v} y2="6" />
          <line x1={v} y1="18" x2={v} y2="21.5" />
          <line x1="2.5" y1={v} x2="6" y2={v} />
          <line x1="18" y1={v} x2="21.5" y2={v} />
        </g>
      ))}
    </>
  ),
  motherboard: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <rect x="6.5" y="6.5" width="6" height="6" rx="1" />
      <line x1="16" y1="6" x2="16" y2="12" />
      <line x1="18.5" y1="6" x2="18.5" y2="12" />
      <rect x="6.5" y="15.5" width="11" height="2.5" rx="1" />
    </>
  ),
  gpu: (
    <>
      <rect x="2.5" y="7" width="19" height="10" rx="2" />
      <circle cx="9" cy="12" r="2.8" />
      <circle cx="16.5" cy="12" r="2.8" />
      <line x1="4" y1="17" x2="4" y2="20" />
      <line x1="8" y1="17" x2="8" y2="20" />
    </>
  ),
  ram: (
    <>
      <rect x="3" y="7" width="18" height="8" rx="1.5" />
      <line x1="6.5" y1="15" x2="6.5" y2="18" />
      <line x1="10.5" y1="15" x2="10.5" y2="18" />
      <line x1="14.5" y1="15" x2="14.5" y2="18" />
      <line x1="18" y1="15" x2="18" y2="18" />
      <line x1="7.5" y1="9.5" x2="7.5" y2="12.5" />
      <line x1="12" y1="9.5" x2="12" y2="12.5" />
      <line x1="16.5" y1="9.5" x2="16.5" y2="12.5" />
    </>
  ),
  storage: (
    <>
      <rect x="4" y="8" width="16" height="8" rx="2" />
      <circle cx="8.5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <line x1="12" y1="10.5" x2="17" y2="10.5" />
      <line x1="12" y1="13.5" x2="17" y2="13.5" />
    </>
  ),
  psu: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <circle cx="10" cy="12" r="3.4" />
      <path d="M10 9.6 v2.4 l1.8 1.4" />
      <line x1="16.5" y1="9" x2="18" y2="9" />
      <line x1="16.5" y1="12" x2="18" y2="12" />
      <line x1="16.5" y1="15" x2="18" y2="15" />
    </>
  ),
  cooler: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <path d="M12 10 C 14.5 7, 16.5 8.5, 16 11" />
      <path d="M14 12 C 17 14.5, 15.5 16.5, 13 16" />
      <path d="M10 13.5 C 7.5 16, 6 14, 7.5 11.5" />
      <path d="M10.5 11 C 8 8.5, 9.5 6.5, 12 7.5" />
    </>
  ),
  case: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2" />
      <line x1="9" y1="6" x2="15" y2="6" />
      <circle cx="12" cy="14" r="3.2" />
      <circle cx="12" cy="14" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
};

interface Props {
  category: Category;
  size?: number;
  className?: string;
}

export default function PartIcon({ category, size = 24, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[category]}
    </svg>
  );
}
