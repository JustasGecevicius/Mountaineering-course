import { Application, Frame, ParsedGif, parseGIF } from "gifuct-js";
import { useEffect, useState } from "react";

export const useGif = (gifPath: string) => {
  const [parsedGif, setParsedGif] = useState<ParsedGif | null>(null);
  useEffect(() => {
    const fetchGif = async () => {
      const response = await fetch(gifPath);
      const gifArrayBuffer = await response.arrayBuffer();
      const gif = parseGIF(gifArrayBuffer);
      setParsedGif(gif);
    };
    fetchGif();
  }, []);
  return parsedGif;
};

export const useGifFrames = (parsedGif: ParsedGif | null) => {
  const [frames, setFrames] = useState<(Application | Frame)[] | null>(null);
  useEffect(() => {
    if (parsedGif) setFrames(parsedGif.frames);
  }, [parsedGif]);
  return frames;
};
