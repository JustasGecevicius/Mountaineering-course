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
};

export default function GifPlayer({
  src,
  autoPlay = false,
  loop = true,
  width,
  height,
  frameDelay,
}: GifPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const framesRef = useRef<any[]>([]);
  const frameIndexRef = useRef(0);
  const playingRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  const [, forceRender] = useState(0); // UI updates only
  const [isPaused, setIsPaused] = useState(false);

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

  return (
    <div className="relative rounded-3xl overflow-hidden">
      <canvas ref={canvasRef} />
      <div
        className="flex gap-2 absolute bottom-0 top-0 left-0 right-0 justify-between"
        onClick={startStop}
      >
        {isPaused && (
          <div className="absolute top-0 bottom-0 left-0 right-0 inset-0 bg-black/30 flex items-center">
            <div className="w-full flex justify-between items-center p-4">
              <img onClick={prevFrame} src="/left_arrow.png" alt="left_arrow" className="w-8" />
              <img src="/pause_button.png" alt="pause_button" className="w-8" />
              <img
                onClick={nextFrame}
                src="/right_arrow.png"
                alt="right_arrow"
                className="w-8 aspect-square"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
