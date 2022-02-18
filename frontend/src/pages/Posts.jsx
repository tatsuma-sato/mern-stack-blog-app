import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BackButton from "../components/BackButton";
import PostItem from "../components/PostItem";
import Spinner from "../components/Spinner";
import { getAllPosts, reset } from "../features/posts/postSlice";
import "./styles.css";


const Posts = () => {
  const { posts, isLoading, isSuccess } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackButton url="/" />
      <h1>All Posts</h1>
      <div className="post-container">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} isPublic={true}/>
        ))}
      </div>
    </>
  );
};

export default Posts;
