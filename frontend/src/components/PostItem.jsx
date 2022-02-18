import React from "react";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  return (
    <>
      <div>PostItem</div>
      <div>{new Date(post.createdAt).toLocaleString("en-CA")}</div>
      {post.createdAt !== post.updatedAt ? (
        <div>Edit: {new Date(post.updatedAt).toLocaleString("en-CA")}</div>
      ) : null}
      <div>{post.title}</div>
      <div>{post.content}</div>
      <Link to={`/posts/${post.user.toString()}/${post._id}`}>View</Link>
    </>
  );
};

export default PostItem;
