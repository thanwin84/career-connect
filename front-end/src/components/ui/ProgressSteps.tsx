type Props = {
  totalSteps: number;
  currentStep: number;
  stepTitles: string[];
  className?: string;
};

export default function ProgressSteps({
  totalSteps,
  currentStep,
  stepTitles,
  className,
}: Props) {
  return (
    <div className={`w-full bg-slate-50 dark:bg-zinc-900 ${className}`}>
      <div className="text-xl font-semibold">
        <span className="dark:text-slate-200">
          {totalSteps === currentStep + 1
            ? 'Final step'
            : `Step ${currentStep + 1}`}
        </span>
        <span className="ml-4 text-slate-600 dark:text-slate-400">
          {stepTitles[currentStep]}
        </span>
      </div>
      <div className="py-2 flex gap-2">
        {stepTitles.map((stepTitle, index) => (
          <span
            key={stepTitle}
            className={`bg-blue-200 px-1 h-2 w-full rounded-md ${
              currentStep === index ? 'bg-blue-600' : ''
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}