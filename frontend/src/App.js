import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import PrivateRoute from "./components/privateRoute";
import { Home, Login, Register, NewPost } from "./pages/index";
import Post from "./pages/Post";
import Posts from "./pages/Posts";
import UserPosts from "./pages/UserPosts";
import { Button } from "@material-ui/core";
import PublicUserPost from "./pages/PublicUserPost";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-post" element={<PrivateRoute />}>
              <Route path="/new-post" element={<NewPost />} />
            </Route>
            <Route path="/edit-post/:postId" element={<PrivateRoute />}>
              <Route path="/edit-post/:postId" element={<EditPost />} />
            </Route>
            <Route path="/posts" element={<PrivateRoute />}>
              <Route path="/posts" element={<Posts />} />
            </Route>
            <Route path="/posts/:userId" element={<PrivateRoute />}>
              <Route path="/posts/:userId" element={<UserPosts />} />
            </Route>
            <Route path="/posts/:postId/pub" element={<PrivateRoute />}>
              <Route path="/posts/:postId/pub" element={<PublicUserPost />} />
            </Route>
            <Route path="/posts/:userId/:postId" element={<PrivateRoute />}>
              <Route path="/posts/:userId/:postId" element={<Post />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
