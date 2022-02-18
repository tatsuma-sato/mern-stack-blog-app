import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Modal from "react-modal";
import BackButton from "../components/BackButton";
import { FaPlus } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { getPublicUserPost, getUserPost } from "../features/posts/postSlice";
import {
  getComments,
  createComment,
  getPublicComments,
  createPublicComment,
} from "../features/comment/commentSlice";
import Comment from "../components/Comment";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

const PublicUserPost = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const { post, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.posts
  );

  const { user } = useSelector((state) => state.auth);

  const { comments, isLoading: isCommentsLoading } = useSelector(
    (state) => state.comments
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { postId } = useParams();
  const userId = user._id;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getPublicUserPost(postId));
    dispatch(getPublicComments(postId));
  }, [isError, message, postId, dispatch]);

  const onCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(createPublicComment({ commentText, userId, postId }));
    closeModal();
    navigate(`/posts/${postId}/pub`);
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isLoading || isCommentsLoading) return <Spinner />;

  if (isError) return <h3>Something went wrong</h3>;

  return (
    <>
      <div>
        <header>
          <div className="btn-container">
            {/* <BackButton url={`/posts/${userId}`} text="My Post" /> */}
            <BackButton url={`/posts`} text="All Posts" />
          </div>
          <h1>{post.title}</h1>
          <img src={post.imageSrc} alt={post.title} style={{ width: "100%" }} />
          <p>Created: {post.createdAt}</p>
          <h2>By: {post.author}</h2>
        </header>
        <div>
          <p>{post.content}</p>
        </div>

        <button
          onClick={openModal}
          className="btn"
          style={{ margin: "2rem 0" }}
        >
          <FaPlus />
          Add Comment
        </button>

        <div className="comment-container">
          {comments.length > 0 &&
            comments.map((comment) => {
              return comment.map((item) => (
                <Comment comment={item} key={item._id} />
              ));
            })}
        </div>

        <Modal
          isOpen={modalIsOpen}
          inRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Comment"
        >
          <h2>Add Comment</h2>
          <button className="btn-close" onClick={closeModal}>
            X
          </button>
          <form onSubmit={onCommentSubmit}>
            <div className="form-group">
              <textarea
                name="commentText"
                id="commentText"
                className="form-control"
                placeholder="Note Text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default PublicUserPost;
