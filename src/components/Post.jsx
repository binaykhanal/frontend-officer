import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data: posts, error } = await supabase.from("posts").select("*");
    if (error) {
      console.error("Error fetching posts:", error.message);
      alert("Failed to fetch posts.");
    } else {
      setPosts(posts);
    }
  };

  const likePost = async (id) => {
    const { error } = await supabase
      .from("posts")
      .update({ like_count: supabase.raw("like_count") }) // Incorrect usage
      .eq("id", id);

    if (error) {
      console.error("Error liking post:", error.message);
      alert("Failed to like post.");
    } else {
      fetchPosts(); // Refetch posts to get updated like count
    }
  };

  const repostPost = async (id) => {
    const { error } = await supabase
      .from("posts")
      .update({ repost_count: supabase.raw("repost_count") }) // Incorrect usage
      .eq("id", id);

    if (error) {
      console.error("Error reposting:", error.message);
      alert("Failed to repost.");
    } else {
      fetchPosts(); // Refetch posts to get updated repost count
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100">
      {posts.map((post) => (
        <div key={post.id} className="mb-6 p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
          <p className="text-gray-700 mb-4">{post.content}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => likePost(post.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
            >
              Like ({post.like_count})
            </button>
            <button
              onClick={() => repostPost(post.id)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
            >
              Repost ({post.repost_count})
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
