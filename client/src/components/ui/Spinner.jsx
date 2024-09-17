
export default function Spinner({
    size='h-14 w-14', 
    color= 'border-blue-500',
    borderThickness='border-4'
}) {
  return (
    <div
      className={`my-auto inline-block ${size} animate-spin rounded-full ${borderThickness} border-solid ${color} border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    >
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >
        Loading....
      </span>
    </div>
  );
}
