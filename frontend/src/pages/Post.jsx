import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Modal from "react-modal";
import BackButton from "../components/BackButton";
import { FaPlus } from "react-icons/fa";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteUserPost, getUserPost, getUserPosts } from "../features/posts/postSlice";
import { getComments, createComment } from "../features/comment/commentSlice";
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

const Post = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const { post, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.posts
  );

  const { comments, isLoading: isCommentsLoading } = useSelector(
    (state) => state.comments
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId, postId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getUserPost({ userId, postId }));
    dispatch(getComments({ userId, postId }));
  }, [isError, message, userId, postId]);

  const onCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ commentText, userId, postId }));
    closeModal();
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onDelete = () => {
    dispatch(deleteUserPost({ userId, postId }));
    dispatch(getUserPosts(userId));
    navigate(`/posts/${userId}`);
  };

  if (isLoading || isCommentsLoading) return <Spinner />;

  if (isError) return <h3>Something went wrong</h3>;

  return (
    <>
      <div>
        <header>
          <div className="btn-container">
            <BackButton url={`/posts/${userId}`} text="My Post" />
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

        <Link to={`/edit-post/${postId}`}>
          <button className="btn btn-reverse" style={{ margin: "2rem 0" }}>
            Edit
          </button>
        </Link>

        {userId === post.user && (
          <button className="btn" onClick={() => onDelete()}>
            Delete
          </button>
        )}

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
              return <Comment comment={comment} key={comment._id} />;
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

export default Post;
