import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Sidebar from "./components/Layout/Sidebar";
import CreateBlog from "./components/Blog/CreateBlog";
import Feed from "./Pages/Feed";
import MyBlogs from "./Pages/MyBlogs";
import AllBlogs from "./Pages/AllBlogs";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/blogSpot" element={<AllBlogs />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
