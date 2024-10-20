import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons"; // Importing the Ant Design delete icon

const Post = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

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

  const likePost = async (id, currentLikeCount) => {
    const { error } = await supabase
      .from("posts")
      .update({ like_count: currentLikeCount + 1 })
      .eq("id", id);

    if (error) {
      console.error("Error liking post:", error.message);
      alert("Failed to like post.");
    } else {
      fetchPosts();
    }
  };

  const repostPost = async (id, currentRepostCount) => {
    const { error } = await supabase
      .from("posts")
      .update({ repost_count: currentRepostCount + 1 })
      .eq("id", id);

    if (error) {
      console.error("Error reposting:", error.message);
      alert("Failed to repost.");
    } else {
      fetchPosts();
    }
  };

  const deletePost = async (id) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      console.error("Error deleting post:", error.message);
      alert("Failed to delete post.");
    } else {
      fetchPosts();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100">
      <button
        onClick={() => navigate("/new-post")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
      >
        Add New Post
      </button>
      {posts.map((post) => (
        <div
          key={post.id}
          className="relative mb-6 p-4 bg-white shadow-md rounded-lg"
        >
          <button
            onClick={() => deletePost(post.id)}
            className="absolute top-[50%] right-2 text-red-500 hover:text-red-700"
            aria-label="Delete post"
          >
            <DeleteOutlined />
          </button>
          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
          <p className="text-gray-700 mb-4">{post.content}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => likePost(post.id, post.like_count)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
            >
              Like ({post.like_count})
            </button>
            <button
              onClick={() => repostPost(post.id, post.repost_count)}
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
