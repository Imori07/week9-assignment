import { db } from "@/utils/dbConnection";

export async function POST(req) {
  const body = await req.json();
  const { title, content, clerkUserId, username, email, profileImageUrl } =
    body;
  await db.query(
    "INSERT INTO users (clerk_user_id, username, email, profile_image_url) VALUES ($1, $2, $3, $4) ON CONFLICT (clerk_user_id) DO UPDATE SET profile_image_url = EXCLUDED.profile_image_url",
    [clerkUserId, username, email, profileImageUrl]
  );
  await db.query(
    "INSERT INTO posts (user_id, title, content) VALUES ((SELECT id FROM users WHERE clerk_user_id = $1), $2, $3)",
    [clerkUserId, title, content]
  );
  return new Response(JSON.stringify({ message: "Post created!" }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
