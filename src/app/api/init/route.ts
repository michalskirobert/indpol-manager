import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json(
    {
      Working: true,
    },
    { status: 200 },
  );
};
