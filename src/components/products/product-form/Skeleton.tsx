export const ProductFormSkeleton = () => {
  return (
    <div className="h-full w-full">
      <div className="flex justify-between">
        <div>
          <div className="h-8 w-40 animate-pulse bg-gray-200"></div>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 4 }).map(() => (
            <div
              key={crypto.randomUUID()}
              className="h-8 w-39 animate-pulse bg-gray-200"
            ></div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex flex-col">
        <div className="animte-pulse h-30 w-full bg-gray-200"></div>
        <div className="mt-1 flex w-full gap-1">
          {Array.from({ length: 4 }).map((i) => (
            <div
              key={crypto.randomUUID()}
              className="h-10 w-full animate-pulse bg-gray-200"
            ></div>
          ))}
        </div>
        <div className="mt-1 flex flex-col gap-1">
          {Array.from({ length: 3 }).map((i) => (
            <div
              key={crypto.randomUUID()}
              className="h-25 w-full animate-pulse bg-gray-200"
            ></div>
          ))}
        </div>
        <div className="mt-1 flex gap-1">
          {Array.from({ length: 2 }).map((i) => (
            <div
              key={crypto.randomUUID()}
              className="h-10 w-full animate-pulse bg-gray-200"
            ></div>
          ))}
        </div>
        <div className="mt-3">
          <div className="mt-1 flex gap-1">
            {Array.from({ length: 3 }).map((i) => (
              <div
                key={crypto.randomUUID()}
                className="h-10 w-full animate-pulse bg-gray-200"
              ></div>
            ))}
          </div>
          <div className="mt-1">
            <div className="h-10 w-full animate-pulse bg-gray-200"></div>
          </div>
          <div className="mt-1 h-[300px] w-full animate-pulse bg-gray-200"></div>
          <div className="mx-auto mt-2 h-12 w-30 animate-pulse bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};
