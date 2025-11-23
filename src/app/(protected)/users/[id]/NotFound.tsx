import pageNotFoundImg from "@public/images/page_not_found.jpg";
import Image from "next/image";

export const UserNotFound = () => {
  return (
    <div className="flex h-[35vh] items-center justify-center overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <Image
          {...{
            src: pageNotFoundImg,
            className: "h-1/2 w-1/2",
            alt: "Page not found",
          }}
        />
        <h3 className="mb-1 text-heading-6 font-bold dark:text-white">
          User was not found.
        </h3>
      </div>
    </div>
  );
};
