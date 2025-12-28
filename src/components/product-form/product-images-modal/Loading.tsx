export const ImagesSkeleton = () => (
  <>
    {Array.from({ length: 15 }).map((_, idx) => (
      <div
        key={idx}
        className="h-[120px] w-full animate-pulse rounded-md bg-gray-200"
      />
    ))}
  </>
);
