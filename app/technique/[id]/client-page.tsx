"use client";
import GifPlayer from "@/components/gif/player";
import { StepPlayer } from "@/components/step_player/StepPlayer";
import { useState } from "react";

type ClientPageProps = {
  gifUrl: string;
  steps: any;
};

export function ClientPage(props: ClientPageProps) {
  const { gifUrl, steps } = props;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  return (
    <>
      <GifPlayer src={gifUrl} autoPlay loop frameDelay={1000} onStepChange={setCurrentStepIndex} />
      <StepPlayer steps={steps} currentStepIndex={currentStepIndex} />
    </>
  );
}
