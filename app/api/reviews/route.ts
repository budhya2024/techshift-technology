import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { deleteFromStorage, extractStorageKey } from "@/lib/storage";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let reviews;
    if (status) {
      reviews = await sql`
        SELECT id, name, role, company, image, content, rating, date, status
        FROM reviews
        WHERE LOWER(status) = LOWER(${status})
        ORDER BY id DESC
      `;
    } else {
      reviews = await sql`
        SELECT id, name, role, company, image, content, rating, date, status
        FROM reviews
        ORDER BY id DESC
      `;
    }

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, role, company, image, content, rating, date, status } = body;

    const result = await sql`
      INSERT INTO reviews (name, role, company, image, content, rating, date, status)
      VALUES (
        ${name || "Anonymous"},
        ${role || ""},
        ${company || null},
        ${image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"},
        ${content || ""},
        ${rating || 5},
        ${date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })},
        ${status || "Published"}
      )
      RETURNING id, name, role, company, image, content, rating, date, status
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, role, company, image, content, rating, date, status } = body;

    if (!id) {
      return NextResponse.json({ error: "Review ID is required" }, { status: 400 });
    }

    // Clean up old avatar from storage if replaced
    const existing = await sql`SELECT image FROM reviews WHERE id = ${id}`;
    if (existing.length > 0 && existing[0].image && existing[0].image !== image) {
      const oldKey = extractStorageKey(existing[0].image);
      if (oldKey) {
        deleteFromStorage(oldKey).catch((err) =>
          console.warn(`Failed to delete replaced review avatar "${oldKey}":`, err)
        );
      }
    }

    const result = await sql`
      UPDATE reviews
      SET name = ${name},
          role = ${role},
          company = ${company || null},
          image = ${image},
          content = ${content},
          rating = ${rating || 5},
          date = ${date},
          status = ${status || "Published"}
      WHERE id = ${id}
      RETURNING id, name, role, company, image, content, rating, date, status
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("PUT /api/reviews error:", error);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID parameter is required" }, { status: 400 });
    }

    // Retrieve review to remove associated object storage file
    const existing = await sql`SELECT image FROM reviews WHERE id = ${parseInt(id)}`;
    if (existing.length > 0 && existing[0].image) {
      const storageKey = extractStorageKey(existing[0].image);
      if (storageKey) {
        deleteFromStorage(storageKey).catch((err) =>
          console.warn(`Failed to delete review image "${storageKey}" from Neon Object Storage:`, err)
        );
      }
    }

    await sql`DELETE FROM reviews WHERE id = ${parseInt(id)}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/reviews error:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
