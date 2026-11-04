import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;
const authBaseUrl = process.env.NEON_AUTH_BASE_URL;

if (!databaseUrl || !authBaseUrl) {
  console.error("Missing DATABASE_URL or NEON_AUTH_BASE_URL in environment.");
  process.exit(1);
}

const args = process.argv.slice(2);
const command = args[0];

async function run() {
  if (command === "list") {
    const sql = neon(databaseUrl);
    const users = await sql`
      SELECT id, name, email, role, "createdAt"
      FROM neon_auth.user
      ORDER BY "createdAt" DESC
    `;
    console.log("\n=== Registered Administrators ===");
    console.table(users);
    return;
  }

  if (command === "create" || command === "add") {
    const email = args[1];
    const password = args[2];
    const name = args[3] || "Administrator";

    if (!email || !password) {
      console.log("Usage: node scripts/manage-admin.mjs create <email> <password> [name]");
      process.exit(1);
    }

    const res = await fetch(`${authBaseUrl}/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "http://localhost:3000",
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Failed to create admin:", data);
      process.exit(1);
    }

    console.log(`\n✓ Administrator account successfully created:`);
    console.log(`  Name:  ${name}`);
    console.log(`  Email: ${email}`);
    return;
  }

  console.log("Admin Management Utility:");
  console.log("  node scripts/manage-admin.mjs list");
  console.log("  node scripts/manage-admin.mjs create <email> <password> [name]");
}

run().catch(console.error);
