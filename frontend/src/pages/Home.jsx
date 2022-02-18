import React from "react";
import { FaQuestionCircle, FaTicketAlt, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  let userId;
  if (user) {
    userId = user._id.toString();
  }
  return (
    <>
      <section className="heading">
        <h2>
          Create Blog Post <br /> and <br /> Connect with People
        </h2>
        <p>Please option from below</p>
      </section>

      <Link to="/new-post" className="btn btn-reverse btn-block">
        <FaQuestionCircle />
        Create New Blog Post
      </Link>
      <Link to="/posts" className="btn btn-reverse btn-block">
        <FaSearch />
        All Posts
      </Link>
      <Link to={`/posts/${userId}`} className="btn btn-block">
        <FaTicketAlt />
        View My Post
      </Link>
    </>
  );
};

export default Home;
