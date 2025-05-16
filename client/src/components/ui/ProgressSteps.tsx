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
    <div className={`w-full bg-transparent ${className}`}>
      <div className="text-xl font-semibold mb-2">
        <span className="dark:text-slate-200 text-slate-700">
          {totalSteps === currentStep + 1
            ? 'Final step'
            : `Step ${currentStep + 1}`}
        </span>
        <span className="ml-4 text-slate-800 dark:text-blue-500">
          {stepTitles[currentStep]}
        </span>
      </div>
      <div className="py-2 flex gap-2">
        {stepTitles.map((stepTitle, index) => (
          <span
            key={stepTitle}
            className={`bg-slate-200 px-1 h-2 w-full rounded-md ${
              currentStep === index ? 'bg-slate-800 dark:bg-slate-600' : ''
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
