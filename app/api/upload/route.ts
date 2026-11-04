import { NextRequest, NextResponse } from "next/server";
import { uploadToStorage } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique key
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const key = `uploads/${Date.now()}-${sanitizedName}`;

    const url = await uploadToStorage(buffer, key, file.type || "application/octet-stream");

    return NextResponse.json({
      success: true,
      key,
      url,
      size: file.size,
      contentType: file.type,
    });
  } catch (error) {
    console.error("POST /api/upload error:", error);
    return NextResponse.json({ error: "Failed to upload file to Neon Object Storage" }, { status: 500 });
  }
}
