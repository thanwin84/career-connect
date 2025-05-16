import { SkeletonLoader } from '@/components/ui';

export default function NotificationSkeleton({
  count = 4,
}: {
  count?: number;
}) {
  return (
    <div className='bg-inherit w-full max-w-md rounded-md'>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className='flex items-start gap-3 px-4 py-3 border-b last:border-none'
        >
          {/* Blue dot (static placeholder) */}
          <div className='w-2 h-2 bg-blue-400 rounded-full mt-2' />

          {/* Skeleton content */}
          <div className='flex-1 space-y-2'>
            <SkeletonLoader className='h-4 w-5/6' />
            <SkeletonLoader className='h-3 w-1/3' />
          </div>
        </div>
      ))}
    </div>
  );
}
