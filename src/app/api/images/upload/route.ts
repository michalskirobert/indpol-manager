import { NextResponse } from "next/server";
import type { UploadApiResponse } from "cloudinary";
import { cloudinary } from "@lib/cloudinary";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");
  const path = formData.get("path") as string;

  if (!file || typeof (file as File).arrayBuffer !== "function") {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await (file as File).arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: path || "temp" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as UploadApiResponse);
        },
      );

      stream.end(buffer);
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return NextResponse.json(
      { error: "Upload failed", details: err },
      { status: 500 },
    );
  }
}

export const DELETE = async (req: Request) => {
  try {
    const { public_id } = await req.json();

    if (!public_id) {
      return new Response(JSON.stringify({ error: "Missing public_id" }), {
        status: 400,
      });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
};
