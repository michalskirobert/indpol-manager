"use client";

import { ProcessedChatroomParams } from "@/app/(protected)/messages/page";
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
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { UsersModal } from "./users-modal";

interface MessagesListProps {
  chatrooms: ProcessedChatroomParams[];
}

export default function MessagesList({ chatrooms }: MessagesListProps) {
  const [usersModalOpen, setUsersModalOpen] = useState(false);

  const { selectedUser, count } = useAppSelector(({ messages }) => messages);

  const dispatch = useAppDispatch();

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
            chatrooms?.map((room) => (
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
                    className="h-12 w-12"
                  />
                </ListItemPrefix>
                <div className="ml-4 overflow-hidden">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="truncate font-semibold"
                  >
                    {room.senderProfile.fullname}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="truncate font-normal"
                  >
                    {room.lastMessage?.content || ""}
                  </Typography>
                </div>
              </ListItem>
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
