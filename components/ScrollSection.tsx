"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

interface ScrollSectionProps {
  framesPath: string;
  totalFrames: number;
  exitTransition?: boolean;
  children?: (scrollYProgress: MotionValue<number>) => React.ReactNode;
}

export default function ScrollSection({
  framesPath,
  totalFrames,
  exitTransition = false,
  children,
}: ScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Exit transition: zoom into lantern area + fade to black
  const exitScale = useTransform(scrollYProgress, [0.82, 1], [1, 1.45]);
  const exitFade  = useTransform(scrollYProgress, [0.82, 1], [0, 1]);

  // Sync canvas internal resolution to display size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Preload frames
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(totalFrames);
    let loaded = 0;
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = `${framesPath}/frame_${String(i).padStart(4, "0")}.jpg`;
      img.onload = () => {
        loaded++;
        if (loaded === totalFrames) setReady(true);
      };
      images[i] = img;
    }
    framesRef.current = images;
  }, [framesPath, totalFrames]);

  function drawFrame(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    const cw = ctx.canvas.width;
    const ch = ctx.canvas.height;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = cw / ch;
    let sx, sy, sw, sh;
    if (imgAspect > canvasAspect) {
      sh = img.naturalHeight; sw = sh * canvasAspect;
      sx = (img.naturalWidth - sw) / 2; sy = 0;
    } else {
      sw = img.naturalWidth; sh = sw / canvasAspect;
      sx = 0; sy = (img.naturalHeight - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }

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
      const frameIndex = Math.min(Math.floor(progress * (totalFrames - 1)), totalFrames - 1);
      if (frameIndex !== lastFrame) {
        const img = framesRef.current[frameIndex];
        if (img?.complete) { drawFrame(ctx, img); lastFrame = frameIndex; }
      }
      rafId = requestAnimationFrame(tick);
    };

    const first = framesRef.current[0];
    if (first?.complete) drawFrame(ctx, first);
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [ready, scrollYProgress, totalFrames]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-black">

        {/* Canvas wrapper — zoom centered on lantern area (bottom-center) */}
        <motion.div
          className="absolute inset-0"
          style={exitTransition ? { scale: exitScale, transformOrigin: "50% 72%" } : undefined}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </motion.div>

        {/* Black fade overlay for exit */}
        {exitTransition && (
          <motion.div
            className="absolute inset-0 bg-black pointer-events-none"
            style={{ opacity: exitFade }}
          />
        )}

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        )}

        {children?.(scrollYProgress)}
      </div>
    </div>
  );
}
