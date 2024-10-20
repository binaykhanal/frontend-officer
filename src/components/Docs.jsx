import React from "react";

const Docs = () => {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Libraries Used</h2>
      <p className="mb-2">
        <strong>Tailwind CSS</strong>: Used for responsive, utility-first
        styling.
      </p>
      <p className="mb-2">
        <strong>Supabase</strong>: Used for login, authentication, and storing
        posts.
      </p>
      <p>
        <strong>Ant Design (antd)</strong>: A React UI library for building
        responsive and elegant user interfaces.
      </p>
    </div>
  );
};

export default Docs;
