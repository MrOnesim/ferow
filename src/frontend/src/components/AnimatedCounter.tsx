import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  delay?: number;
}

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  label,
  delay = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(ref as React.RefObject<HTMLElement>, {
    root: null,
    threshold: 0.1,
  });

  const inView = !!intersection?.isIntersecting;

  useEffect(() => {
    if (!inView || started) return;

    const timer = setTimeout(() => {
      setStarted(true);
      const startTime = performance.now();

      const update = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setCount(Math.round(target * eased));

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, started, target, duration, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="flex flex-col items-center text-center"
    >
      <span className="text-5xl md:text-6xl font-display font-black text-foreground tracking-tight leading-none">
        {prefix}
        {count.toLocaleString("fr-FR")}
        {suffix}
      </span>
      <span className="mt-2 text-sm font-body text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  );
}
