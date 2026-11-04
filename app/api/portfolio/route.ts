import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { deleteFromStorage, extractStorageKey } from "@/lib/storage";

export async function GET() {
  try {
    const projects = await sql`
      SELECT id, category, title, description, image, tags, live_url as "liveUrl"
      FROM portfolio_projects
      ORDER BY id DESC
    `;
    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET /api/portfolio error:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, title, description, image, tags, liveUrl } = body;

    const result = await sql`
      INSERT INTO portfolio_projects (category, title, description, image, tags, live_url)
      VALUES (
        ${category || "Development"},
        ${title || "Untitled Project"},
        ${description || ""},
        ${image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop&q=80"},
        ${JSON.stringify(tags || [])},
        ${liveUrl || "https://techshifttechnology.com"}
      )
      RETURNING id, category, title, description, image, tags, live_url as "liveUrl"
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/portfolio error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, category, title, description, image, tags, liveUrl } = body;

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    // Clean up old image from storage if replaced
    const existing = await sql`SELECT image FROM portfolio_projects WHERE id = ${id}`;
    if (existing.length > 0 && existing[0].image && existing[0].image !== image) {
      const oldKey = extractStorageKey(existing[0].image);
      if (oldKey) {
        deleteFromStorage(oldKey).catch((err) =>
          console.warn(`Failed to delete replaced project image "${oldKey}":`, err)
        );
      }
    }

    const result = await sql`
      UPDATE portfolio_projects
      SET category = ${category},
          title = ${title},
          description = ${description},
          image = ${image},
          tags = ${JSON.stringify(tags || [])},
          live_url = ${liveUrl}
      WHERE id = ${id}
      RETURNING id, category, title, description, image, tags, live_url as "liveUrl"
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("PUT /api/portfolio error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID parameter is required" }, { status: 400 });
    }

    // Retrieve project to remove associated object storage file
    const existing = await sql`SELECT image FROM portfolio_projects WHERE id = ${parseInt(id)}`;
    if (existing.length > 0 && existing[0].image) {
      const storageKey = extractStorageKey(existing[0].image);
      if (storageKey) {
        deleteFromStorage(storageKey).catch((err) =>
          console.warn(`Failed to delete project image "${storageKey}" from Neon Object Storage:`, err)
        );
      }
    }

    await sql`DELETE FROM portfolio_projects WHERE id = ${parseInt(id)}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/portfolio error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
