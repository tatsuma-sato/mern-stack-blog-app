import axios from "axios";

const API_URL = "/api/posts/";

// get post comments
const getComments = async (userId, postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    API_URL + userId + "/" + postId + "/comments",
    config
  );
  return response.data;
};

const getPublicComments = async (postId) => {
  const response = await axios.get(API_URL + postId + "/comments");
  return response.data;
};

// create post comment (public)
const createPublicComment = async (commentText, userId, postId, token) => {
  const response = await axios.post(API_URL + postId + "/pub", {
    comment: commentText,
    userId: userId,
  });
  return response.data;
};

// create post comment
const createComment = async (commentText, userId, postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "/" + userId + "/" + postId + "/comments",
    { comment: commentText },
    config
  );
  return response.data;
};

const commentService = {
  getComments,
  createComment,
  getPublicComments,
  createPublicComment,
};

export default commentService;
