import User from "@/models/User";
import { Session } from "next-auth";

export const updateLastSeen = async (session: Session) => {
  await User.findByIdAndUpdate(session.user.id, {
    $set: { lastSeenAt: new Date() },
  });

  return { lastSeenAt: new Date() };
};
