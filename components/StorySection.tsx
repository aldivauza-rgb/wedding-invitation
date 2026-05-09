"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax: text enters wide/scaled, settles, then floats up on exit
  const textScale   = useTransform(scrollYProgress, [0, 0.2], [1.12, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.18, 0.75, 1], [0, 1, 1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 1], ["4%", "-12%"]);
  const titleSpacing = useTransform(scrollYProgress, [0, 0.2], ["0.15em", "0.04em"]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div
        className="sticky top-0 h-[100dvh] overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(160deg, #F08878 0%, #E86A58 55%, #D95E50 100%)",
        }}
      >
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />

        {/* Bottom gradient → Section 2 navy */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #050A14)" }}
        />

        {/* Parallax text block */}
        <motion.div
          style={{ scale: textScale, opacity: textOpacity, y: textY }}
          className="relative flex flex-col items-center gap-7 max-w-sm text-center px-8"
        >
          <motion.h2
            style={{ letterSpacing: titleSpacing }}
            className="text-white text-[2rem] font-light leading-snug"
          >
            Dua Jiwa,<br />Satu Perjalanan
          </motion.h2>

          <div className="w-6 h-px bg-white/50" />

          <div className="flex flex-col gap-5 text-white/90 text-[15px] leading-[1.9] font-light">
            <p>
              Setiap cinta punya awal ceritanya sendiri —
              sebuah momen kecil yang tanpa disadari
              mengubah segalanya.
            </p>
            <p>
              Bukan sekadar kebetulan.
              Melainkan sebuah perjalanan
              yang sejak awal memang menuju ke sini —
              ke sebuah janji yang abadi.
            </p>
          </div>

          <div className="mt-1 px-2">
            <p className="text-white/80 text-sm italic leading-relaxed font-light">
              "Dan di antara tanda-tanda kebesaran-Nya,
              Dia menciptakan pasangan untukmu
              agar kamu menemukan ketenangan."
            </p>
            <p className="text-white/50 text-xs mt-2 tracking-widest uppercase">
              QS. Ar-Rum: 21
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
