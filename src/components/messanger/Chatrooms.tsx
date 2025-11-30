"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { setSelectedUser } from "@/store/slices/messages";
import {
  Avatar,
  Card,
  ListItem,
  ListItemPrefix,
  Typography,
  List,
} from "@material-tailwind/react";
import { CustomButton } from "../shared/button/CustomButton";
import { Dot, User, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { UsersModal } from "./users-modal";
import { useRouter } from "next/navigation";
import { checkIsUserOnline } from "@/utils/check-is-user-online";
import { useGetChatroomsQuery } from "@/store/services/messages";
import { ProcessedChatroomParams } from "@/types/message";

interface MessagesListProps {
  chatrooms: ProcessedChatroomParams[];
}

export default function MessagesList({ chatrooms }: MessagesListProps) {
  const [usersModalOpen, setUsersModalOpen] = useState(false);

  const { selectedUser, count } = useAppSelector(({ messages }) => messages);

  const { data, isSuccess } = useGetChatroomsQuery(undefined, {
    pollingInterval: 5000,
  });

  const router = useRouter();

  const dispatch = useAppDispatch();

  const chatroomsList = useMemo(() => {
    if (isSuccess) return data;
    return chatrooms;
  }, [chatrooms, data, isSuccess]);

  return (
    <div className="h-full w-full max-w-md md:max-w-sm lg:max-w-md xl:max-w-lg">
      <div className="flex items-center justify-between gap-2">
        <Typography variant="h5" className="mb-4 mt-3 px-4">
          Messages
          {count ? (
            <span className="text-bold text-blue-500">({count})</span>
          ) : (
            ""
          )}
        </Typography>
        <CustomButton
          icon={<UserPlus />}
          color="blue"
          content="New chat"
          variant="text"
          className="text-xs"
          onClick={() => setUsersModalOpen(true)}
        />
      </div>
      <Card className="h-full overflow-y-auto rounded-lg shadow-md">
        <List className="divide-y divide-gray-200">
          {!chatrooms.length ? (
            <ListItem>
              <Typography
                variant="h3"
                className="w-full text-center text-gray-400"
              >
                No chatrooms
              </Typography>
            </ListItem>
          ) : (
            chatroomsList?.map((room) => (
              <div className="flex items-center gap-2">
                <ListItem
                  key={room.roomId}
                  className={`cursor-pointer px-4 py-3 transition-colors duration-200 hover:bg-blue-50 ${
                    selectedUser?.id === room.senderProfile._id.toString()
                      ? "bg-blue-100"
                      : ""
                  } ${!room.lastMessage?.read && selectedUser?.id !== room.senderProfile._id.toString() ? "bg-blue-50 font-semibold" : ""}`}
                  onClick={() => dispatch(setSelectedUser(room.senderProfile))}
                >
                  <ListItemPrefix>
                    <Avatar
                      variant="circular"
                      alt={room.senderProfile.fullname}
                      src={
                        room.senderProfile.profileImgSrc ||
                        `/images/user/empty_img_${room.senderProfile.gender}.jpg`
                      }
                      className="h-12 w-12 flex-shrink-0"
                    />
                  </ListItemPrefix>
                  <div className="ml-4 flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="truncate font-semibold"
                      >
                        {room.senderProfile.fullname}
                      </Typography>
                      <Dot
                        className={
                          checkIsUserOnline(room.senderProfile.lastSeenAt)
                            ? "text-green"
                            : "text-dark"
                        }
                        size={35}
                      />
                    </div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="truncate font-normal"
                    >
                      {room.lastMessage?.content || ""}
                    </Typography>
                  </div>
                </ListItem>
                <div className="ml-auto">
                  <CustomButton
                    icon={<User />}
                    variant="filled"
                    color="blue"
                    className="p-1"
                    onClick={() =>
                      router.push(`/users/${room.senderProfile._id.toString()}`)
                    }
                  />
                </div>
              </div>
            ))
          )}
        </List>
      </Card>
      <UsersModal
        open={usersModalOpen}
        toggle={() => setUsersModalOpen((prev) => !prev)}
      />
    </div>
  );
}
