import { UserProps } from "@/types/user";
import { getJobPosition } from "@/utils/process-user-data";
import { Button } from "@material-tailwind/react";
import { MessageCircle, ShieldUser, User } from "lucide-react";
import Link from "next/link";

interface Props {
  id: string;
  data: UserProps | null;
}

export const Profile = ({ id, data }: Props) => {
  return (
    <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
      <div className="mt-4">
        <h3 className="mb-1 text-heading-6 font-bold text-dark dark:text-white">
          {data?.fullname}
        </h3>
        <div className="my-2 flex justify-center gap-1">
          {data?.role === "admin" ? <ShieldUser /> : <User />}
          <p className="font-bold">{getJobPosition(data?.jobPosition)}</p>
        </div>
        <Link
          className="font-medium text-blue-400 underline"
          href={`mailto:${data?.email}`}
        >
          {data?.email}
        </Link>
        <div className="mx-auto mt-4 max-w-[720px]">
          <h4 className="font-medium text-dark dark:text-white">About Me</h4>
          <p>{data?.desc || "No data"}</p>
        </div>
      </div>
      {data?.id !== id && (
        <Button className="mt-2 inline-flex items-center gap-2">
          <MessageCircle />
          Send message
        </Button>
      )}
    </div>
  );
};
