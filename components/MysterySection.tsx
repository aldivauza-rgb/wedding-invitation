"use client";

import { useTransform, MotionValue, motion } from "motion/react";
import ScrollSection from "./ScrollSection";

function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const textOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.75, 0.9], [16, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <>
      <motion.div
        className="absolute bottom-24 left-0 right-0 flex flex-col items-center gap-2 px-8"
        style={{ opacity: textOpacity, y: textY }}
      >
        <p className="text-white/50 text-xs tracking-[0.4em] uppercase font-light">psst...</p>
        <p className="text-white text-xl text-center font-light tracking-wide leading-relaxed">
          kamu mendapat undangan...
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2"
        style={{ opacity: indicatorOpacity }}
      >
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase">scroll</p>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </>
  );
}

export default function MysterySection() {
  return (
    <ScrollSection framesPath="/assets/s1/frames" totalFrames={192} exitTransition>
      {(scrollYProgress) => <Overlay scrollYProgress={scrollYProgress} />}
    </ScrollSection>
  );
}
