export const Loading = () => {
  return (
    <div className="col-span-12 rounded-[10px] bg-white py-6 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4">
      <h2 className="mb-5.5 px-7.5 text-body-2xlg font-bold text-dark dark:text-white">
        Chats
      </h2>

      <ul className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, key) => (
          <li key={key}>
            <div className="flex items-center gap-2 px-5">
              <div className="h-[56px] w-[56px] shrink-0 animate-pulse rounded-full bg-gray-300"></div>
              <div className="flex-grow">
                <div className="mb-1 h-[16px] w-1/3 animate-pulse bg-gray-200"></div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="h-[16px] w-1/3 animate-pulse bg-gray-200"></div>
                  <div className="h-[14px] w-1/4 animate-pulse bg-gray-200"></div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
