export default function OverviewCardsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
        >
          <div className="size-12 animate-pulse rounded-full bg-gray-200 dark:bg-dark-2" />

          <div className="mt-6 flex items-end justify-between">
            <div>
              <div className="mb-1.5 h-7 w-18 animate-pulse bg-gray-200" />

              <div className="h-5 w-20 animate-pulse bg-gray-200" />
            </div>

            <div className="h-5 w-15 animate-pulse bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
