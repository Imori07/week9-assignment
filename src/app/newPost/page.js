"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function NewPostPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);

  useEffect(() => {
    isLoaded && (user ? setContent(true) : router.push("/sign-in"));
  }, [isLoaded, user, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { id: clerkUserId, username, emailAddresses, imageUrl } = user;
    const email = emailAddresses[0]?.emailAddress || "";
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: event.target.title.value,
        content: event.target.content.value,
        clerkUserId,
        username,
        email,
        profileImageUrl: imageUrl,
      }),
    });
    router.push("/posts");
    setLoading(false);
  };

  return content ? (
    <div className="max-w-lg mx-auto mt-10 p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-white">
        Add a New Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium text-white">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div>
          <label htmlFor="content" className="block font-medium text-white">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Submitting..." : "Submit Your Post"}
        </button>
      </form>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
