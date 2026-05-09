"use client";

import { useTransform, MotionValue, motion } from "motion/react";
import ScrollSection from "./ScrollSection";

function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <motion.div
      className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2"
      style={{ opacity: indicatorOpacity }}
    >
      <p className="text-white/40 text-xs tracking-[0.3em] uppercase">scroll</p>
      <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
    </motion.div>
  );
}

export default function Section2() {
  return (
    <ScrollSection framesPath="/assets/s2/frames" totalFrames={192} enterTransition>
      {(scrollYProgress) => <Overlay scrollYProgress={scrollYProgress} />}
    </ScrollSection>
  );
}
