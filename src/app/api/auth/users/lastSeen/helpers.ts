import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { Session } from "next-auth";

export const updateLastSeen = async (session: Session) => {
  const db = await getCollection("BackOffice", "users");

  await db.updateOne(
    { _id: new ObjectId(session.user.id) },
    { $set: { lastSeenAt: new Date() } },
  );

  return { lastSeenAt: new Date() };
};
