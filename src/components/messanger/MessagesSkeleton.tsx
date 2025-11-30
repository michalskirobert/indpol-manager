export const MessagesSkeleton = () => {
  return (
    <div className="flex h-full max-h-full flex-col overflow-hidden rounded-lg bg-white shadow-md">
      <header className="flex items-center border-b border-gray-200 bg-gray-50 px-6 py-4">
        <div className="mr-4 h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
        <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
      </header>
      <main className="flex-grow space-y-4 overflow-y-auto bg-gray-50 px-6 py-4">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] animate-pulse rounded-lg px-4 py-2 shadow-sm ${
              idx % 2 === 0
                ? "self-start rounded-bl-none bg-gray-200"
                : "self-end rounded-br-none bg-gray-300"
            }`}
          >
            <div className="h-4 w-full rounded bg-gray-300"></div>
          </div>
        ))}
        <div />
      </main>
      <footer className="flex items-center gap-3 border-t border-gray-200 bg-white px-6 py-4">
        <div className="flex-grow animate-pulse rounded bg-gray-200 py-2"></div>
        <div className="h-10 w-20 animate-pulse rounded bg-gray-300"></div>
      </footer>
    </div>
  );
};
