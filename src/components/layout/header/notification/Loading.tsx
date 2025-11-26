export const Loading = () => {
  return (
    <ul className={`mb-3 max-h-[23rem] space-y-1.5 overflow-y-auto`}>
      {Array.from([1]).map((key) => (
        <li role="menuitem" key={`notif-skeleton-${key}`}>
          <div
            className={`flex h-[56px] w-full animate-pulse items-center gap-4 rounded-lg bg-gray-100 px-2 py-1.5`}
          >
            <div className="h-[25px] w-[25px] animate-pulse bg-gray-400"></div>
            <div>
              <div className="mb-1 h-[20px] w-[57px] animate-pulse bg-gray-400"></div>
              <div className="h-[17px] w-[57px] animate-pulse bg-gray-400"></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
