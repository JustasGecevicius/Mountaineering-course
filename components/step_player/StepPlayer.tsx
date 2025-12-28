type StepPlayerProps = {
  steps: { type: "span"; value: string }[];
  currentStepIndex?: number;
};

export const StepPlayer = (props: StepPlayerProps) => {
  const { steps, currentStepIndex } = props;
  return (
    <div>
      Step Number {currentStepIndex !== undefined ? currentStepIndex + 1 : 1} / {steps.length}
      <div className="p-4 border rounded-md mt-2 w-full">{steps[currentStepIndex || 0]}</div>
    </div>
  );
};
