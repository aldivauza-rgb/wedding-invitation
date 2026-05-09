"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

export default function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [40, 0]);

  return (
    <div
      ref={ref}
      className="min-h-screen w-full flex flex-col items-center justify-center px-8 py-24"
      style={{ backgroundColor: "#E8725E" }}
    >
      <motion.div
        style={{ opacity, y }}
        className="flex flex-col items-center gap-8 max-w-sm text-center"
      >
        {/* Ornament atas */}
        <div className="flex items-center gap-3 w-full justify-center">
          <div className="h-px flex-1 bg-white/40" />
          <span className="text-white/60 text-xs tracking-[0.4em] uppercase font-light">
            our story
          </span>
          <div className="h-px flex-1 bg-white/40" />
        </div>

        {/* Judul */}
        <h2 className="text-white text-3xl font-light leading-snug tracking-wide">
          Dua Jiwa,<br />Satu Perjalanan
        </h2>

        {/* Divider */}
        <div className="w-8 h-px bg-white/50" />

        {/* Body copy */}
        <div className="flex flex-col gap-5 text-white/85 text-[15px] leading-[1.85] font-light">
          <p>
            Setiap cinta punya awal ceritanya sendiri —
            sebuah momen kecil yang tanpa disadari
            mengubah segalanya.
          </p>
          <p>
            Begitu pula dengan <em>Mawan dan Wawan</em>.
            Dua jiwa yang bertemu di persimpangan waktu,
            saling menemukan dalam diam yang penuh makna,
            dan perlahan tumbuh menjadi satu
            dalam kepercayaan, kebersamaan, dan cinta
            yang dengan sadar memilih.
          </p>
          <p>
            Bukan sekadar kebetulan.
            Melainkan sebuah perjalanan
            yang sejak awal memang menuju ke sini —
            ke sebuah janji yang abadi.
          </p>
        </div>

        {/* Quote */}
        <div className="mt-2 px-4 py-5 border border-white/25 rounded-sm w-full">
          <p className="text-white text-sm italic leading-relaxed font-light">
            "Dan di antara tanda-tanda kebesaran-Nya,
            Dia menciptakan pasangan untukmu
            agar kamu menemukan ketenangan."
          </p>
          <p className="text-white/50 text-xs mt-2 tracking-widest uppercase">
            QS. Ar-Rum: 21
          </p>
        </div>

        {/* Ornament bawah */}
        <div className="flex items-center gap-3 w-full justify-center mt-2">
          <div className="h-px flex-1 bg-white/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <div className="h-px flex-1 bg-white/40" />
        </div>
      </motion.div>
    </div>
  );
}
