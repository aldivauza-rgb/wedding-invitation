"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

export default function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15], [32, 0]);

  return (
    <div
      ref={ref}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-8 py-24 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #F08878 0%, #E86A58 50%, #D95E50 100%)",
      }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Gradient bottom — blend into Section 2 dark navy */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050A14)" }}
      />

      <motion.div
        style={{ opacity, y }}
        className="relative flex flex-col items-center gap-7 max-w-sm text-center"
      >
        {/* Judul */}
        <h2 className="text-white text-[2rem] font-light leading-snug tracking-wide">
          Dua Jiwa,<br />Satu Perjalanan
        </h2>

        {/* Divider tipis */}
        <div className="w-6 h-px bg-white/50" />

        {/* Body copy */}
        <div className="flex flex-col gap-5 text-white/90 text-[15px] leading-[1.9] font-light">
          <p>
            Setiap cinta punya awal ceritanya sendiri —
            sebuah momen kecil yang tanpa disadari
            mengubah segalanya.
          </p>
          <p>
            Dua jiwa yang bertemu di persimpangan waktu,
            saling menemukan dalam diam yang penuh makna,
            dan perlahan tumbuh menjadi satu
            dalam kepercayaan, kebersamaan,
            dan cinta yang dengan sadar memilih.
          </p>
          <p>
            Bukan sekadar kebetulan.
            Melainkan sebuah perjalanan
            yang sejak awal memang menuju ke sini —
            ke sebuah janji yang abadi.
          </p>
        </div>

        {/* Quote tanpa border */}
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
  );
}
