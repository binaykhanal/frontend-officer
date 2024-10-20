import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient.js";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const submitPost = async () => {
    // Validate input fields
    if (!title || !content) {
      alert("Please fill in both the title and content fields.");
      return;
    }

    const { error } = await supabase.from("posts").insert([{ title, content }]);
    if (error) {
      console.error("Error submitting post:", error.message);
      alert("Error submitting post.");
    } else {
      setTitle("");
      setContent("");
      alert("Post submitted successfully!");

      navigate("/");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={submitPost}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit Post
      </button>
    </div>
  );
};

export default NewPost;
