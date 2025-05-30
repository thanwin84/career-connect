type Props = {
  size?: string;
  color?: string;
  borderThickness?: string;
  className?: string;
};

export default function Spinner({
  size = 'h-8 w-8',
  color = 'border-gray-400',
  borderThickness = 'border-2',
  className,
}: Props) {
  return (
    <div
      className={`inline-block ${size} animate-spin rounded-full ${borderThickness} border-solid ${color} border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${className}`}
      role='status'
    >
      <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
        Loading....
      </span>
    </div>
  );
}
