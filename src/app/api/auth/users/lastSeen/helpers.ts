import { getBOModels } from "@/models/dbModels";
import { Session } from "next-auth";

export const updateLastSeen = async (session: Session) => {
  const { User } = await getBOModels();

  await User.findByIdAndUpdate(session.user.id, {
    $set: { lastSeenAt: new Date() },
  });

  return { lastSeenAt: new Date() };
};
