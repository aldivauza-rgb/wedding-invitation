"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

function FadeItem({
  scrollYProgress,
  inStart,
  inEnd,
  outStart,
  outEnd,
  children,
  className,
}: {
  scrollYProgress: any;
  inStart: number;
  inEnd: number;
  outStart: number;
  outEnd: number;
  children: React.ReactNode;
  className?: string;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [inStart, inEnd, outStart, outEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [inStart, inEnd], [22, 0]);

  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div
        className="sticky top-0 h-[100dvh] overflow-hidden flex items-center justify-center pb-16"
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

        <div className="relative flex flex-col items-center gap-7 max-w-sm text-center px-8">

          {/* 1. Judul */}
          <FadeItem scrollYProgress={scrollYProgress}
            inStart={0.02} inEnd={0.12} outStart={0.82} outEnd={0.95}>
            <h2 className="text-white text-[2rem] font-light leading-snug tracking-wide">
              Dua Jiwa,<br />Satu Perjalanan
            </h2>
          </FadeItem>

          {/* 2. Divider */}
          <FadeItem scrollYProgress={scrollYProgress}
            inStart={0.1} inEnd={0.18} outStart={0.82} outEnd={0.95}>
            <div className="w-6 h-px bg-white/50" />
          </FadeItem>

          {/* 3. Paragraf pertama */}
          <FadeItem scrollYProgress={scrollYProgress}
            inStart={0.18} inEnd={0.28} outStart={0.82} outEnd={0.95}>
            <p className="text-white/90 text-[15px] leading-[1.9] font-light">
              Setiap cinta punya awal ceritanya sendiri —
              sebuah momen kecil yang tanpa disadari
              mengubah segalanya.
            </p>
          </FadeItem>

          {/* 4. Paragraf kedua */}
          <FadeItem scrollYProgress={scrollYProgress}
            inStart={0.3} inEnd={0.4} outStart={0.82} outEnd={0.95}>
            <p className="text-white/90 text-[15px] leading-[1.9] font-light">
              Bukan sekadar kebetulan.
              Melainkan sebuah perjalanan
              yang sejak awal memang menuju ke sini —
              ke sebuah janji yang abadi.
            </p>
          </FadeItem>

          {/* 5. Quote */}
          <FadeItem scrollYProgress={scrollYProgress}
            inStart={0.44} inEnd={0.55} outStart={0.82} outEnd={0.95}
            className="px-2">
            <p className="text-white/80 text-sm italic leading-relaxed font-light">
              "Dan di antara tanda-tanda kebesaran-Nya,
              Dia menciptakan pasangan untukmu
              agar kamu menemukan ketenangan."
            </p>
            <p className="text-white/50 text-xs mt-2 tracking-widest uppercase">
              QS. Ar-Rum: 21
            </p>
          </FadeItem>

        </div>
      </div>
    </div>
  );
}
