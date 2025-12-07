import { DotIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getChatrooms } from "@/app/api/chat/get-chatrooms";
import { getSession } from "@/lib/auth";
import { checkIsUserOnline } from "@/utils/check-is-user-online";
import { Link } from "./Link";

export async function ChatsCard() {
  const session = await getSession();

  if (!session) return null;

  const chatrooms = await getChatrooms(session);

  return (
    <div className="col-span-12 rounded-[10px] bg-white py-6 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4">
      <h2 className="mb-5.5 px-7.5 text-body-2xlg font-bold text-dark dark:text-white">
        Chats
      </h2>

      <ul>
        {chatrooms.map((chat, key) => (
          <li key={key}>
            <Link senderProfile={chat.senderProfile}>
              <div className="relative shrink-0">
                <Image
                  src={
                    chat.senderProfile.profileImgSrc ||
                    `/images/user/empty_img_${chat.senderProfile.gender}.jpg`
                  }
                  width={56}
                  height={56}
                  className="size-14 rounded-full object-cover"
                  alt={"Avatar for " + chat.senderProfile.fullname}
                />

                <span
                  className={cn(
                    "absolute bottom-0 right-0 size-3.5 rounded-full ring-2 ring-white dark:ring-dark-2",
                    checkIsUserOnline(chat.senderProfile.lastSeenAt)
                      ? "bg-green"
                      : "bg-orange-light",
                  )}
                />
              </div>

              <div className="relative flex-grow">
                <h3 className="text-left font-medium text-dark dark:text-white">
                  {chat.senderProfile.fullname}
                </h3>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "truncate text-sm font-medium dark:text-dark-5 xl:max-w-[8rem]",
                      !chat.lastMessage?.read && "text-dark-4 dark:text-dark-6",
                    )}
                  >
                    {chat.lastMessage?.content}
                  </span>

                  <DotIcon />

                  {chat.lastMessage?.createdAt && (
                    <time
                      className="text-xs"
                      dateTime={chat.lastMessage?.createdAt.toString()}
                    >
                      {new Intl.DateTimeFormat("pl", {
                        timeStyle: "short",
                        dateStyle: "short",
                      }).format(chat.lastMessage.createdAt)}
                    </time>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
