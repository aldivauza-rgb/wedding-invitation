"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "motion/react";

const TOTAL_FRAMES = 192;
const FRAME_PATH = (i: number) =>
  `/assets/s1/frames/frame_${String(i).padStart(4, "0")}.jpg`;

export default function MysterySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.75, 0.9], [16, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) setReady(true);
      };
      images[i] = img;
    }

    framesRef.current = images;
  }, []);

  // Draw frame to canvas — cover fit
  function drawFrame(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    const cw = ctx.canvas.width;
    const ch = ctx.canvas.height;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = cw / ch;

    let sx, sy, sw, sh;
    if (imgAspect > canvasAspect) {
      sh = img.naturalHeight;
      sw = sh * canvasAspect;
      sx = (img.naturalWidth - sw) / 2;
      sy = 0;
    } else {
      sw = img.naturalWidth;
      sh = sw / canvasAspect;
      sx = 0;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }

  // RAF loop — scroll → frame index → canvas draw
  useEffect(() => {
    if (!ready) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let lastFrame = -1;

    const tick = () => {
      const progress = scrollYProgress.get();
      const frameIndex = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );

      if (frameIndex !== lastFrame) {
        const img = framesRef.current[frameIndex];
        if (img?.complete) {
          drawFrame(ctx, img);
          lastFrame = frameIndex;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    // Draw first frame immediately
    const first = framesRef.current[0];
    if (first?.complete) drawFrame(ctx, first);

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [ready, scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-black">

        {/* Canvas — frame sequence player */}
        <canvas
          ref={canvasRef}
          width={390}
          height={844}
          className="absolute inset-0 w-full h-full"
        />

        {/* Loading indicator */}
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        )}

        {/* Mystery text */}
        <motion.div
          className="absolute bottom-24 left-0 right-0 flex flex-col items-center gap-2 px-8"
          style={{ opacity: textOpacity, y: textY }}
        >
          <p className="text-white/50 text-xs tracking-[0.4em] uppercase font-light">
            psst...
          </p>
          <p className="text-white text-xl text-center font-light tracking-wide leading-relaxed">
            kamu mendapat undangan...
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <p className="text-white/40 text-xs tracking-[0.3em] uppercase">scroll</p>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>

      </div>
    </div>
  );
}
