import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Home, Login, PageError, Projects, Register } from "./pages";
import { Footer, Header } from "./components";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <Header />
      <div className="bg min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route
            path="/dashboard?tab=profile"
            element={currentUser ? <Dashboard /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/projects"
            element={currentUser ? <Projects /> : <Navigate to={"/sign-in"} />}
          />
          <Route path="*" element={<PageError />} />
        </Routes>
        <Toaster />
      </div>
      <Footer />
    </>
  );
}

export default App;
