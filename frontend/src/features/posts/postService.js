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

// get user post
const getAllPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// get public user post
const getPublicUserPost = async (postId) => {
  const response = await axios.get(API_URL + `${postId}/pub`);
  return response.data;
};

// update user post
const updateUserPost = async (
  userId,
  postId,
  title,
  imageSrc,
  content,
  token
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // console.log(postTitle, postImageSrc, postContent);

  const response = await axios.put(
    API_URL + userId + "/" + postId,
    {
      title,
      imageSrc,
      content,
    },
    config
  );
  return response.data;
};

const postService = {
  createPost,
  getUserPosts,
  getUserPost,
  getAllPosts,
  getPublicUserPost,
  updateUserPost,
};

export default postService;
