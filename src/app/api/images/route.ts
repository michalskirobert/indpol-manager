import { cloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder");
  const currentFolder = `indpol/${folder}`;

  if (!folder) {
    return NextResponse.json(
      { error: "Missing folder parameter" },
      { status: 400 },
    );
  }

  const prefix = folder.endsWith("/") ? currentFolder : `${currentFolder}/`;

  let resources: string[] = [];
  let nextCursor: string | undefined = undefined;

  try {
    do {
      const res = await cloudinary.api.resources({
        type: "upload",
        prefix,
        max_results: 100,
        next_cursor: nextCursor,
      });

      resources.push(
        ...res.resources.map((r: any) => ({
          public_id: r.public_id,
          secure_url: r.secure_url,
          format: r.format,
          width: r.width,
          height: r.height,
          bytes: r.bytes,
          created_at: r.created_at,
        })),
      );

      nextCursor = res.next_cursor;
    } while (nextCursor);

    return NextResponse.json({
      folder,
      count: resources.length,
      resources,
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(
        { error: error.message ?? "Cloudinary error" },
        { status: 500 },
      );
  }
}
