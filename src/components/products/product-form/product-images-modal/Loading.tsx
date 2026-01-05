export const ImagesSkeleton = () => (
  <div className="flex flex-col gap-2">
    <div className="flex gap-2">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div
          key={idx}
          className="h-[120px] w-full animate-pulse rounded-md bg-gray-200"
        />
      ))}
    </div>
    <div className="flex gap-2">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div
          key={idx}
          className="h-[120px] w-full animate-pulse rounded-md bg-gray-200"
        />
      ))}
    </div>
  </div>
);
