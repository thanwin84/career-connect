interface SkeletonProps {
  className?: string;
}

export default function SkeletonLoader({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-400 rounded ${className}`}
    />
  );
}
