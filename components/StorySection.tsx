"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fade in immediately when section enters viewport, fade out near exit
  const opacity = useTransform(scrollYProgress, [0, 0.07, 0.82, 0.96], [0, 1, 1, 0]);

  // Parallax: text floats up relative to sticky bg as scroll progresses
  const y = useTransform(scrollYProgress, [0, 1], ["2%", "-22%"]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div
        className="sticky top-0 h-[100dvh] overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(160deg, #F08878 0%, #E86A58 55%, #D95E50 100%)",
          paddingBottom: "24vh",
        }}
      >
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />

        {/* Bottom gradient → Section 2 navy */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #050A14)" }} />

        {/* Text block — semua muncul sekaligus, floating parallax */}
        <motion.div
          style={{ opacity, y }}
          className="relative flex flex-col items-center gap-5 max-w-sm text-center px-8"
        >
          <h2 className="text-white text-[2rem] font-light leading-snug tracking-wide">
            Dua Jiwa,<br />Satu Perjalanan
          </h2>

          <div className="w-6 h-px bg-white/50" />

          <div className="flex flex-col gap-4 text-white/90 text-[15px] leading-[1.9] font-light">
            <p>
              Setiap cinta punya awal ceritanya sendiri —
              sebuah momen kecil yang tanpa disadari
              mengubah segalanya.
            </p>
            <p>
              Bukan sekadar kebetulan. Melainkan sebuah perjalanan
              yang sejak awal memang menuju ke sini —
              ke sebuah janji yang abadi.
            </p>
          </div>

          <div className="mt-1 px-2">
            <p className="text-white/80 text-sm italic leading-relaxed font-light">
              "Dan di antara tanda-tanda kebesaran-Nya,<br />
              Dia menciptakan pasangan untukmu<br />
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
