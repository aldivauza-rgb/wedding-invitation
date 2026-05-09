"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

function Line({
  scrollYProgress, inStart, inEnd,
  children, className,
}: {
  scrollYProgress: any; inStart: number; inEnd: number;
  children: React.ReactNode; className?: string;
}) {
  const opacity = useTransform(scrollYProgress, [inStart, inEnd, 0.84, 0.96], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [inStart, inEnd], [18, 0]);
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
        className="sticky top-0 h-[100dvh] overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(160deg, #F08878 0%, #E86A58 55%, #D95E50 100%)",
          paddingBottom: "28vh",
        }}
      >
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #050A14)" }} />

        <div className="relative flex flex-col items-center gap-5 max-w-sm text-center px-8">

          {/* Line 1 — judul baris 1 */}
          <Line scrollYProgress={scrollYProgress} inStart={0.02} inEnd={0.09}>
            <span className="text-white text-[2rem] font-light leading-snug tracking-wide block">
              Dua Jiwa,
            </span>
          </Line>

          {/* Line 2 — judul baris 2 */}
          <Line scrollYProgress={scrollYProgress} inStart={0.07} inEnd={0.14} className="-mt-4">
            <span className="text-white text-[2rem] font-light leading-snug tracking-wide block">
              Satu Perjalanan
            </span>
          </Line>

          {/* Divider */}
          <Line scrollYProgress={scrollYProgress} inStart={0.13} inEnd={0.19}>
            <div className="w-6 h-px bg-white/50 mx-auto" />
          </Line>

          {/* Para 1 — baris 1 */}
          <Line scrollYProgress={scrollYProgress} inStart={0.19} inEnd={0.26} className="-mb-3">
            <p className="text-white/90 text-[15px] leading-[1.9] font-light">
              Setiap cinta punya awal ceritanya sendiri —
            </p>
          </Line>

          {/* Para 1 — baris 2 */}
          <Line scrollYProgress={scrollYProgress} inStart={0.25} inEnd={0.32} className="-mb-3">
            <p className="text-white/90 text-[15px] leading-[1.9] font-light">
              sebuah momen kecil yang tanpa disadari
            </p>
          </Line>

          {/* Para 1 — baris 3 */}
          <Line scrollYProgress={scrollYProgress} inStart={0.31} inEnd={0.38}>
            <p className="text-white/90 text-[15px] leading-[1.9] font-light">
              mengubah segalanya.
            </p>
          </Line>

          {/* Para 2 — baris 1 */}
          <Line scrollYProgress={scrollYProgress} inStart={0.38} inEnd={0.45} className="-mb-3">
            <p className="text-white/90 text-[15px] leading-[1.9] font-light">
              Bukan sekadar kebetulan. Melainkan sebuah perjalanan
            </p>
          </Line>

          {/* Para 2 — baris 2 */}
          <Line scrollYProgress={scrollYProgress} inStart={0.44} inEnd={0.51}>
            <p className="text-white/90 text-[15px] leading-[1.9] font-light">
              yang sejak awal memang menuju ke sini —<br />ke sebuah janji yang abadi.
            </p>
          </Line>

          {/* Quote */}
          <Line scrollYProgress={scrollYProgress} inStart={0.53} inEnd={0.61} className="mt-1 px-2">
            <p className="text-white/80 text-sm italic leading-relaxed font-light">
              "Dan di antara tanda-tanda kebesaran-Nya,<br />
              Dia menciptakan pasangan untukmu<br />
              agar kamu menemukan ketenangan."
            </p>
          </Line>

          {/* Atribusi */}
          <Line scrollYProgress={scrollYProgress} inStart={0.60} inEnd={0.67} className="-mt-2">
            <p className="text-white/50 text-xs tracking-widest uppercase">
              QS. Ar-Rum: 21
            </p>
          </Line>

        </div>
      </div>
    </div>
  );
}
