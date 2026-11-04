import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { deleteFromStorage, extractStorageKey } from "@/lib/storage";

export async function GET() {
  try {
    const services = await sql`
      SELECT id, title, description, link, bg_image as "bgImage", badge, category, order_index as "orderIndex"
      FROM services
      ORDER BY order_index ASC, id ASC
    `;
    return NextResponse.json(services);
  } catch (error) {
    console.error("GET /api/services error:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, link, bgImage, badge, category, orderIndex } = body;

    const result = await sql`
      INSERT INTO services (title, description, link, bg_image, badge, category, order_index)
      VALUES (${title || ""}, ${description || ""}, ${link || "/contact"}, ${bgImage || ""}, ${badge || null}, ${category || null}, ${orderIndex || 0})
      RETURNING id, title, description, link, bg_image as "bgImage", badge, category, order_index as "orderIndex"
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/services error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, description, link, bgImage, badge, category, orderIndex } = body;

    if (!id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    // Clean up old image from storage if replaced
    const existing = await sql`SELECT bg_image as "bgImage" FROM services WHERE id = ${id}`;
    if (existing.length > 0 && existing[0].bgImage && existing[0].bgImage !== bgImage) {
      const oldKey = extractStorageKey(existing[0].bgImage);
      if (oldKey) {
        deleteFromStorage(oldKey).catch((err) =>
          console.warn(`Failed to delete replaced service image "${oldKey}":`, err)
        );
      }
    }

    const result = await sql`
      UPDATE services
      SET title = ${title},
          description = ${description},
          link = ${link},
          bg_image = ${bgImage},
          badge = ${badge || null},
          category = ${category || null},
          order_index = ${orderIndex || 0}
      WHERE id = ${id}
      RETURNING id, title, description, link, bg_image as "bgImage", badge, category, order_index as "orderIndex"
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("PUT /api/services error:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID parameter is required" }, { status: 400 });
    }

    // Retrieve service to remove associated object storage file
    const existing = await sql`SELECT bg_image as "bgImage" FROM services WHERE id = ${parseInt(id)}`;
    if (existing.length > 0 && existing[0].bgImage) {
      const storageKey = extractStorageKey(existing[0].bgImage);
      if (storageKey) {
        deleteFromStorage(storageKey).catch((err) =>
          console.warn(`Failed to delete service image "${storageKey}" from Neon Object Storage:`, err)
        );
      }
    }

    await sql`DELETE FROM services WHERE id = ${parseInt(id)}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/services error:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
