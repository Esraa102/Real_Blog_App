import { Routes, Route } from "react-router-dom";
import { Dashboard, Home, Login, PageError, Projects, Register } from "./pages";
import { Header, Footer } from "./components";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<PageError />} />
        </Routes>
        <Toaster />
      </div>
      <Footer />
    </>
  );
}

export default App;
