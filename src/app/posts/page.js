import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function PostsPage({ searchParams }) {
  const { sort } = searchParams;
  const posts = await db.query(`
    SELECT posts.*, users.username, users.profile_image_url 
    FROM posts 
    JOIN users ON posts.user_id = users.id
  `);
  const wrangledPosts = posts.rows;
  if (sort === "desc") {
    wrangledPosts.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sort === "asc") {
    wrangledPosts.sort((a, b) => a.title.localeCompare(b.title));
  }
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-4xl font-bold text-white text-center mb-6">
        A List of All Our Posts
      </h1>
      <div className="grid gap-6 max-w-2xl mx-auto">
        {wrangledPosts.map((post) => (
          <div key={post.id} className="p-6 shadow-lg rounded-lg bg-gray-900">
            <h2 className="text-xl font-semibold text-white">{post.title}</h2>
            <div className="flex items-center mt-4">
              <img
                src={
                  post.profile_image_url ||
                  "https://clerk.dev/images/user-profile.svg"
                }
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <p className="text-gray-300">{post.username || "Unknown User"}</p>
            </div>
            <Link
              href={`/posts/${post.id}`}
              className="inline-block mt-3 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition shadow"
            >
              📖 Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
