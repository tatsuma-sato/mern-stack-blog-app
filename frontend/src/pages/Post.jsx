import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Modal from "react-modal";
import BackButton from "../components/BackButton";
import { FaPlus } from "react-icons/fa";
import { getUserPost } from "../features/posts/postSlice";
import { useParams, useNavigate } from "react-router-dom";

const Post = () => {
  const { post, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.posts
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId, postId } = useParams();
  console.log(userId, postId);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getUserPost({ userId, postId }));
  }, [isError, message, userId, postId]);

  if (isLoading) return <Spinner />;

  if (isError) return <h3>Something went wrong</h3>;

  return (
    <>
      <div>
        <header>
          <BackButton url={`/${userId}`} />
          <h1>{post.title}</h1>
          <h2>Created: {post.createdAt}</h2>
          <h2>By: {post.author}</h2>
        </header>
        <div>
          <p>{post.content}</p>
        </div>

        <button>
          <FaPlus />
          Add Comment
        </button>
      </div>
    </>
  );
};

export default Post;
