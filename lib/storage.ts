import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  forcePathStyle: true,
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  region: process.env.AWS_REGION || "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export const BUCKET_NAME = "assets";

export function getPublicUrl(key: string): string {
  const endpoint = (process.env.AWS_ENDPOINT_URL_S3 || "").replace(/\/$/, "");
  const cleanKey = key.replace(/^\//, "");
  return `${endpoint}/${BUCKET_NAME}/${cleanKey}`;
}

export async function uploadToStorage(
  buffer: Buffer | Uint8Array,
  key: string,
  contentType: string
): Promise<string> {
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
  return getPublicUrl(key);
}

export async function deleteFromStorage(key: string): Promise<void> {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })
  );
}

export function extractStorageKey(url: string | null | undefined): string | null {
  if (!url || typeof url !== "string") return null;

  // External images (Unsplash, static app assets, etc.) should never be deleted from Neon storage
  if (url.includes("unsplash.com") || url.startsWith("/images/") || url.startsWith("/assets/images/")) {
    return null;
  }

  const bucketPrefix = `/${BUCKET_NAME}/`;

  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("neon.tech") || parsed.hostname.includes("object")) {
      if (parsed.pathname.includes(bucketPrefix)) {
        const idx = parsed.pathname.indexOf(bucketPrefix);
        return parsed.pathname.substring(idx + bucketPrefix.length);
      }
      if (parsed.pathname.includes("/uploads/")) {
        const idx = parsed.pathname.indexOf("/uploads/");
        return parsed.pathname.substring(idx + 1);
      }
    }
  } catch {
    if (url.includes(bucketPrefix)) {
      const idx = url.indexOf(bucketPrefix);
      return url.substring(idx + bucketPrefix.length);
    }
    if (url.startsWith("uploads/")) return url;
    if (url.startsWith("/uploads/")) return url.substring(1);
  }

  return null;
}
