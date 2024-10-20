// Router.jsx
import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Post from "../Post";
import Auth from "../Auth";
import NewPost from "../NewPost";
import Docs from "../Docs";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Post />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/new-post" element={<NewPost />} />
      <Route path="/docs" element={<Docs />} />
    </Route>
  )
);

export default Router;
