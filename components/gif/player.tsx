"use client";

import { parseGIF, decompressFrames } from "gifuct-js";
import { SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";

type GifPlayerProps = {
  src: string; // e.g. "/gifs/example.gif" or full URL
  autoPlay?: boolean;
  loop?: boolean;
  width?: number;
  height?: number;
  frameDelay?: number;
  onStepChange?: (index: number) => void;
};

export default function GifPlayer({
  src,
  autoPlay = false,
  loop = true,
  width,
  height,
  frameDelay,
  onStepChange = () => {},
}: GifPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const framesRef = useRef<any[]>([]);
  const frameIndexRef = useRef(0);
  const playingRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  const [, forceRender] = useState(0); // UI updates only
  const [isPaused, setIsPaused] = useState(!autoPlay);

  // Drawing
  const drawFrame = useCallback((index: number) => {
    const ctx = ctxRef.current;
    const frame = framesRef.current[index];
    if (!ctx || !frame) return;

    const imageData = ctx.createImageData(frame.dims.width, frame.dims.height);

    imageData.data.set(frame.patch);

    ctx.putImageData(imageData, frame.dims.left, frame.dims.top);

    forceRender((n) => n + 1);
  }, []);

  const tick = useCallback(() => {
    if (!playingRef.current || !framesRef.current || typeof frameIndexRef.current !== "number")
      return;

    drawFrame(frameIndexRef.current);
    onStepChange(frameIndexRef.current);

    const frame = framesRef.current[frameIndexRef.current];
    const delay = Math.max(frameDelay || frame?.delay || 0, 20); // ms

    frameIndexRef.current++;

    if (frameIndexRef.current >= framesRef.current.length) {
      if (!loop) {
        return;
      }
      frameIndexRef.current = 0;
    }

    timeoutRef.current = window.setTimeout(tick, delay);
  }, [drawFrame, frameDelay, loop]);

  const nextFrame = useCallback(
    (e: SyntheticEvent) => {
      e?.stopPropagation();
      frameIndexRef.current = (frameIndexRef.current + 1) % framesRef.current.length;
      drawFrame(frameIndexRef.current);
      onStepChange(frameIndexRef.current);
    },
    [drawFrame]
  );

  // Playback controls
  const startStop = useCallback(() => {
    if (playingRef.current) {
      playingRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
        setIsPaused(true);
      }
    } else {
      playingRef.current = true;
      setIsPaused(false);
      tick();
    }
  }, []);

  const prevFrame = useCallback(
    (e: SyntheticEvent) => {
      e?.stopPropagation();
      frameIndexRef.current =
        (frameIndexRef.current - 1 + framesRef.current.length) % framesRef.current.length;
      drawFrame(frameIndexRef.current);
      onStepChange(frameIndexRef.current);
    },
    [drawFrame]
  );

  useEffect(() => {
    let cancelled = false;

    async function loadGif() {
      const res = await fetch(src);
      const buffer = await res.arrayBuffer();

      const gif = parseGIF(buffer);
      const frames = decompressFrames(gif, true);

      if (cancelled) return;

      framesRef.current = frames;
      frameIndexRef.current = 0;
      onStepChange(frameIndexRef.current);

      const canvas = canvasRef.current!;
      canvas.width = width ?? gif.lsd.width;
      canvas.height = height ?? gif.lsd.height;

      ctxRef.current = canvas.getContext("2d");

      drawFrame(0);

      if (autoPlay) startStop();
    }

    loadGif();

    return () => {
      cancelled = true;
    };
  }, [src]);

  const frameCount = framesRef.current.length;
  return <div className="gif-player">
    <canvas ref={canvasRef} />
    <div className="gif-progress"><span style={{ width: `${frameCount ? ((frameIndexRef.current + 1) / frameCount) * 100 : 0}%` }} /></div>
    <div className="gif-controls">
      <button aria-label="Previous frame" onClick={prevFrame}>‹</button>
      <button className="play-control" aria-label={isPaused ? "Play" : "Pause"} onClick={startStop}>{isPaused ? "▶" : "Ⅱ"}</button>
      <button aria-label="Next frame" onClick={nextFrame}>›</button>
      <span className="frame-count">{frameIndexRef.current + 1} / {frameCount || 1}</span>
      <span className="active-step">Interactive step guide</span>
    </div>
  </div>;
}
