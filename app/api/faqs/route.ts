import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let faqs;
    if (status) {
      faqs = await sql`
        SELECT id, question, answer, order_index as "orderIndex", status
        FROM faqs
        WHERE LOWER(status) = LOWER(${status})
        ORDER BY order_index ASC, id ASC
      `;
    } else {
      faqs = await sql`
        SELECT id, question, answer, order_index as "orderIndex", status
        FROM faqs
        ORDER BY order_index ASC, id ASC
      `;
    }

    return NextResponse.json(faqs);
  } catch (error) {
    console.error("GET /api/faqs error:", error);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, answer, orderIndex, status } = body;

    const result = await sql`
      INSERT INTO faqs (question, answer, order_index, status)
      VALUES (
        ${question || ""},
        ${answer || ""},
        ${orderIndex || 0},
        ${status || "Published"}
      )
      RETURNING id, question, answer, order_index as "orderIndex", status
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/faqs error:", error);
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, question, answer, orderIndex, status } = body;

    if (!id) {
      return NextResponse.json({ error: "FAQ ID is required" }, { status: 400 });
    }

    const result = await sql`
      UPDATE faqs
      SET question = ${question},
          answer = ${answer},
          order_index = ${orderIndex || 0},
          status = ${status || "Published"}
      WHERE id = ${id}
      RETURNING id, question, answer, order_index as "orderIndex", status
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("PUT /api/faqs error:", error);
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID parameter is required" }, { status: 400 });
    }

    await sql`DELETE FROM faqs WHERE id = ${parseInt(id)}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/faqs error:", error);
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
