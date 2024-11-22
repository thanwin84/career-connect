type Props = {
  className?: string;
  parcentage: number
};

export default function ProgressBar({
    className,
    parcentage
}: Props) {
  
  return (
    <div className={`w-full h-2 bg-gray-200 rounded-md ${className}`}>
        <div className={`w-[${parcentage.toString()+"%"}] h-full bg-green-400`}>
        </div>
    </div>
  );
}