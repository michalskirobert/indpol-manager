"use client";

export default function Loading() {
  return (
    <div className="flex h-[82vh] flex-col gap-4 bg-gray-50 p-4 dark:bg-gray-900 md:flex-row">
      <div className="max-h-[82vh] w-full overflow-y-auto rounded-lg bg-white shadow-md dark:bg-gray-800 md:w-1/3">
        <div className="h-full w-full max-w-md md:max-w-sm lg:max-w-md xl:max-w-lg">
          <div className="mb-4 px-4">
            <div className="h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="h-full overflow-y-auto rounded-lg shadow-md">
            <ul className="divide-y divide-gray-200">
              {[...Array(6)].map((_, index) => (
                <li
                  key={index}
                  className="flex cursor-pointer items-center gap-4 px-4 py-3 transition-colors duration-200 hover:bg-blue-50"
                >
                  <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="ml-4 flex flex-col gap-2 overflow-hidden">
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-3 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex max-h-[82vh] w-full flex-col rounded-lg bg-white shadow-md dark:bg-gray-800 md:w-2/3">
        <div></div>
      </div>
    </div>
  );
}
