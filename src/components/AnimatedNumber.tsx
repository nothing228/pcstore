import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

/** Counts up to `value` when scrolled into view, and re-animates on change. */
export default function AnimatedNumber({ value, prefix = "", suffix = "", duration = 1.2 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(v).toLocaleString("en-US")}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [inView, value, mv, prefix, suffix, duration]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}
