export const ProductsListSkeleton = () => {
  return (
    <div>
      <div className="flex w-full justify-between">
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((i) => (
            <div
              key={`skeleton-left-btns-${i}`}
              className="animate-puls h-11 w-30 rounded-md bg-gray-200"
            ></div>
          ))}
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 2 }).map((i) => (
            <div
              key={`skeleton-right-btns-${i}`}
              className="animate-puls h-11 w-30 rounded-md bg-gray-200"
            ></div>
          ))}
        </div>
      </div>
      <div className="mt-2 h-[500px] w-full animate-pulse rounded-md bg-gray-200"></div>
    </div>
  );
};
