import { Routes, Route, Navigate } from "react-router-dom";
import {
  CreatePost,
  Dashboard,
  EditPost,
  Home,
  Login,
  PageError,
  PostPage,
  Projects,
  Register,
  SearchPage,
  UserProfile,
} from "./pages";
import { Footer, Header } from "./components";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="bg min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route
            path="/dashboard"
            element={currentUser ? <Dashboard /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/projects"
            element={currentUser ? <Projects /> : <Navigate to={"/sign-in"} />}
          />
          <Route
            path="/create-post"
            element={
              currentUser ? <CreatePost /> : <Navigate to={"/sign-in"} />
            }
          />
          <Route
            path="/update-post/:id"
            element={currentUser ? <EditPost /> : <Navigate to={"/sign-in"} />}
          />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<PageError />} />
        </Routes>
        <Toaster />
      </div>

      <Footer />
    </>
  );
}

export default App;
