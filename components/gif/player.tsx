"use client";

import { parseGIF, decompressFrames } from "gifuct-js";
import { useEffect, useRef, useState } from "react";

type GifPlayerProps = {
  src: string; // e.g. "/gifs/example.gif" or full URL
  autoPlay?: boolean;
  loop?: boolean;
  width?: number;
  height?: number;
};

export default function GifPlayer({
  src,
  autoPlay = false,
  loop = true,
  width,
  height,
}: GifPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const framesRef = useRef<any[]>([]);
  const frameIndexRef = useRef(0);
  const playingRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  const [, forceRender] = useState(0); // UI updates only

  // ---------------------------
  // Fetch & decode GIF
  // ---------------------------
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

      const canvas = canvasRef.current!;
      canvas.width = width ?? gif.lsd.width;
      canvas.height = height ?? gif.lsd.height;

      ctxRef.current = canvas.getContext("2d");

      drawFrame(0);

      if (autoPlay) play();
    }

    loadGif();

    return () => {
      cancelled = true;
      stop();
    };
  }, [src]);

  // ---------------------------
  // Drawing
  // ---------------------------
  function drawFrame(index: number) {
    const ctx = ctxRef.current;
    const frame = framesRef.current[index];
    if (!ctx || !frame) return;

    const imageData = ctx.createImageData(frame.dims.width, frame.dims.height);

    imageData.data.set(frame.patch);

    ctx.putImageData(imageData, frame.dims.left, frame.dims.top);

    forceRender((n) => n + 1);
  }

  // ---------------------------
  // Playback controls
  // ---------------------------
  function play() {
    if (playingRef.current) return;
    playingRef.current = true;
    tick();
  }

  function stop() {
    playingRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  function tick() {
    if (!playingRef.current || !framesRef.current || typeof frameIndexRef.current !== "number")
      return;

    drawFrame(frameIndexRef.current);

    const frame = framesRef.current[frameIndexRef.current];
    const delay = Math.max((frame?.delay || 0) * 10, 20); // ms

    frameIndexRef.current++;

    if (frameIndexRef.current >= framesRef.current.length) {
      if (!loop) {
        stop();
        return;
      }
      frameIndexRef.current = 0;
    }

    timeoutRef.current = window.setTimeout(tick, delay);
  }

  function nextFrame() {
    stop();
    frameIndexRef.current = (frameIndexRef.current + 1) % framesRef.current.length;
    drawFrame(frameIndexRef.current);
  }

  function prevFrame() {
    stop();
    frameIndexRef.current =
      (frameIndexRef.current - 1 + framesRef.current.length) % framesRef.current.length;
    drawFrame(frameIndexRef.current);
  }

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: 8 }}>
      <canvas ref={canvasRef} style={{ border: "1px solid #ccc" }} />

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={prevFrame}>◀</button>
        <button onClick={play}>▶</button>
        <button onClick={stop}>⏸</button>
        <button onClick={nextFrame}>▶▶</button>
      </div>
    </div>
  );
}
