import React from "react";
import { FaQuestionCircle, FaTicketAlt, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="heading">
        <h1>Create Blog Post and Connect to People</h1>
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
      <Link to="/posts/:userId" className="btn btn-block">
        <FaTicketAlt />
        View My Post
      </Link>
    </>
  );
};

export default Home;
