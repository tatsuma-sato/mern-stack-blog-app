import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import PostItem from "../components/PostItem";
import Spinner from "../components/Spinner";
import { getUserPosts, reset } from "../features/posts/postSlice";

const UserPosts = () => {
  const { posts, isLoading, isSuccess } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  let { userId } = useParams();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getUserPosts(userId));
  }, [dispatch]);


  if (isLoading) return <Spinner />;

  return (
    <>
      <BackButton url="/" text="Home"/>
      <h1>{user.name}'s Posts</h1>
      <div className="post-container">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

export default UserPosts;
