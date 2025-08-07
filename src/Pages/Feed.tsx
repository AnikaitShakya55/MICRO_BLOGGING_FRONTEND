import { useEffect, useState } from "react";
import { Blog } from "../types";
import useGetFetch from "../hooks/useGetFetch";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const useGetFeed = useGetFetch("/getMyFeed");
  const loggedInToken = localStorage.getItem("token") || null;
  // API
  useEffect(() => {
    const fetchFeed = () => {
      useGetFeed.fetchGetData(true).then((data) => {
        console.log("feed data", data);
        setBlogs(data.data);
      });
    };
    if (!loggedInToken) {
      navigate("/login");
    } else {
      fetchFeed();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Your Feed</h1>
      {blogs.map((blog) => (
        <div key={blog._id} className="border p-4 mb-2 rounded">
          <p>{blog.content}</p>
          <small>
            Posted by {blog.user?.username} on{" "}
            {new Date(blog.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default Feed;
