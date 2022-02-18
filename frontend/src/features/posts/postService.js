import axios from "axios";
const API_URL = "/api/posts/";

// create a new post
const createPost = async (postDate, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, postDate, config);
  return response.data;
};

// get user posts
const getUserPosts = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + userId, config);
  return response.data;
};

// get user post
const getUserPost = async ({ userId, postId }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + userId + "/" + postId, config);
  return response.data;
};

const postService = {
  createPost,
  getUserPosts,
  getUserPost,
};

export default postService;
