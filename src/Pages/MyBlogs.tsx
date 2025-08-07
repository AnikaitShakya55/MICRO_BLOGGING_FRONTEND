import { useEffect, useState } from "react";
import { Blog } from "../types";
import useGetFetch from "../hooks/useGetFetch";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const loggedInToken = localStorage.getItem("token") || null;
  // api;s
  const useGetMyBlogs = useGetFetch("/my-blogs");

  useEffect(() => {
    const fetchBlogs = () => {
      useGetMyBlogs.fetchGetData().then((data) => {
        setBlogs(data.data);
      });
    };
    if (!loggedInToken) {
      navigate("/login");
    } else {
      fetchBlogs();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">My Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog._id} className="border p-4 mb-2 rounded">
          <p>{blog.content}</p>
          <small>{new Date(blog.createdAt).toLocaleString()}</small>
        </div>
      ))}

      {blogs.length === 0 && <p>Blogs are not present</p>}
    </div>
  );
};

export default MyBlogs;
