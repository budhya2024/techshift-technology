import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const contacts = await sql`
      SELECT id, type, name, email, phone, company, message, created_at as "createdAt", status
      FROM contact_leads
      ORDER BY id DESC
    `;
    return NextResponse.json(contacts);
  } catch (error) {
    console.error("GET /api/contacts error:", error);
    return NextResponse.json({ error: "Failed to fetch contact leads" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, email, phone, company, message } = body;

    const now = new Date();
    const dateStr = now.toISOString().replace("T", " ").substring(0, 16);

    const result = await sql`
      INSERT INTO contact_leads (type, name, email, phone, company, message, created_at, status)
      VALUES (
        ${type || "contact"},
        ${name || "Anonymous"},
        ${email || ""},
        ${phone || null},
        ${company || null},
        ${message || ""},
        ${dateStr},
        'New'
      )
      RETURNING id, type, name, email, phone, company, message, created_at as "createdAt", status
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/contacts error:", error);
    return NextResponse.json({ error: "Failed to record contact lead" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
    }

    const result = await sql`
      UPDATE contact_leads
      SET status = ${status}
      WHERE id = ${id}
      RETURNING id, type, name, email, phone, company, message, created_at as "createdAt", status
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("PATCH /api/contacts error:", error);
    return NextResponse.json({ error: "Failed to update contact lead status" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID parameter is required" }, { status: 400 });
    }

    await sql`DELETE FROM contact_leads WHERE id = ${parseInt(id)}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/contacts error:", error);
    return NextResponse.json({ error: "Failed to delete contact lead" }, { status: 500 });
  }
}
