import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";

const handlers = auth.handler();

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
export const PATCH = handlers.PATCH;

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const pathStr = Array.isArray(path) ? path.join("/") : "";

  // Strictly block public account creation / sign-ups
  if (pathStr.startsWith("sign-up")) {
    return NextResponse.json(
      {
        error: "Public administrator registration is disabled. Accounts can only be provisioned internally by the system owner.",
      },
      { status: 403 }
    );
  }

  return handlers.POST(req, context);
}
