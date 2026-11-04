import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const categories = await sql`
      SELECT name FROM portfolio_categories ORDER BY id ASC
    `;
    return NextResponse.json(categories.map((c) => c.name));
  } catch (error) {
    console.error("GET /api/portfolio/categories error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    await sql`
      INSERT INTO portfolio_categories (name)
      VALUES (${name.trim()})
      ON CONFLICT (name) DO NOTHING
    `;

    const all = await sql`SELECT name FROM portfolio_categories ORDER BY id ASC`;
    return NextResponse.json(all.map((c) => c.name), { status: 201 });
  } catch (error) {
    console.error("POST /api/portfolio/categories error:", error);
    return NextResponse.json({ error: "Failed to add category" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json({ error: "Name parameter is required" }, { status: 400 });
    }

    await sql`DELETE FROM portfolio_categories WHERE name = ${name}`;
    const all = await sql`SELECT name FROM portfolio_categories ORDER BY id ASC`;
    return NextResponse.json(all.map((c) => c.name));
  } catch (error) {
    console.error("DELETE /api/portfolio/categories error:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
