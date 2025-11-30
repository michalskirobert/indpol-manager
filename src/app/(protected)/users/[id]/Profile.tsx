import { CustomButton } from "@/components/shared/button/CustomButton";
import { useAppDispatch } from "@/store";
import { useCreateChatroomMutation } from "@/store/services/messages";
import { setSelectedUser } from "@/store/slices/messages";
import { UserProps } from "@/types/user";
import { getJobPosition } from "@/utils/process-user-data";

import { MessageCircle, ShieldUser, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  data: UserProps | null;
}

export const Profile = ({ id, data }: Props) => {
  const [create] = useCreateChatroomMutation();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const createChatroom = async () => {
    if (!data) return;

    await create({ recipientId: data._id.toString() }).unwrap();

    dispatch(setSelectedUser(data));
    router.push("/messages");
  };

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
        <CustomButton
          icon={<MessageCircle />}
          onClick={createChatroom}
          content="Send message"
        />
      )}
    </div>
  );
};
