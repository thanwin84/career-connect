type Props = {
  className?: string;
};
export default function Logo({ className }: Props) {
  return (
    <div className={`${className}`}>
      <span className="text-lg font-bold text-blue-600">CAREER</span>
      <span className="text-lg font-bold text-blue-400 ml-1">CONNECT</span>
    </div>
  );
}
