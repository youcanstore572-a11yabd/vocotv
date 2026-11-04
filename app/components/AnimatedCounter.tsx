'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ 
  value, 
  suffix = '', 
  prefix = '',
  decimals = 0,
  duration = 2 
}: { 
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isInView && mounted) {
      let startTime: number | null = null;
      let animationFrame: number;
      const startValue = 0;
      const endValue = value;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min(1, (timestamp - startTime) / (duration * 1000));
        
        if (progress < 1) {
          // Cubic ease-out curve for natural deceleration
          const easingProgress = 1 - Math.pow(1 - progress, 3);
          setCount(startValue + (endValue * easingProgress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(endValue);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [value, duration, isInView, mounted]);

  // Format with Canadian locale standards (en-CA uses comma for thousands, period for decimals)
  const formatValue = (val: number) => {
    if (decimals > 0) {
      return val.toLocaleString('en-CA', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }
    return Math.floor(val).toLocaleString('en-CA');
  };

  const formattedCount = formatValue(count);
  const realNumber = formatValue(value);

  return (
    <span ref={ref} suppressHydrationWarning>
      {!mounted ? `${prefix}${realNumber}${suffix}` : `${prefix}${formattedCount}${suffix}`}
    </span>
  );
}