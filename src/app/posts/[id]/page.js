import { db } from "@/utils/dbConnection";

export default async function PostPage({ params }) {
  const { id } = params;
  const post = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
  const postData = post.rows[0];
  if (!postData) {
    return <p className="text-white">Post not found</p>;
  }
  const user = await db.query(
    "SELECT username, profile_image_url FROM users WHERE id = $1",
    [postData.user_id]
  );
  const userData = user.rows[0];
  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div className="p-6 shadow-lg rounded-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-white mb-4">{postData.title}</h1>
        <p className="text-white">{postData.content}</p>
      </div>
      <div className="flex items-center mt-6 bg-gray-800 p-4 rounded-lg shadow">
        <img
          src={userData?.profile_image_url}
          alt="Profile"
          className="w-12 h-12 rounded-full mr-4"
        />
        <p className="text-white font-semibold">
          {userData?.username || "Unknown User"}
        </p>
      </div>
    </div>
  );
}
