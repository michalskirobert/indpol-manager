import { AlertErrorIcon } from "@/components/shared/alert/icons";

export const Error = () => {
  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
      <div className="mt-6 flex items-end justify-between">
        <dl>
          <dt className="mb-1.5 flex gap-2 text-heading-6 font-bold text-dark dark:text-white">
            <AlertErrorIcon />
            Error
          </dt>
          <dd className="text-sm font-medium text-dark-6">
            An error occurred while fetching" means your app or browser couldn't
            retrieve data from a server
          </dd>
        </dl>
      </div>
    </div>
  );
};
