import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { reset, createNewPost } from "../features/posts/postSlice";

const DEFALUT_IMAGE =
  "https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png";

const NewPost = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.posts
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageSrc, setImageSrc] = useState(DEFALUT_IMAGE);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate(`/posts/${user._id.toString()}`);
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewPost({ title, content, imageSrc }));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Post</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        {/* <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div> */}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageSrc">Image URL</label>
            <input
              type="text"
              name="imageSrc"
              id="imageSrc"
              value={imageSrc}
              onChange={(e) => setImageSrc(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              id="content"
              className="form-control"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewPost;
