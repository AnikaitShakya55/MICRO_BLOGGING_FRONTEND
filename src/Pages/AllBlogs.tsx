import React, { useEffect, useState } from "react";
import useGetFetch from "../hooks/useGetFetch";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../redux/snackbarSlice";

interface Blog {
  _id: string;
  content: string;
  user: {
    _id: string;
    username: string;
    email: string;
    followers: string[];
  };
  createdAt: string;
}

const AllBlogs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>([]);
  const loggedInToken = localStorage.getItem("token") || null;
  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") || "{}" || "undefined"
  );
  const fetchAllBlogs = useGetFetch("/getAllBlogs");
  const fetchActiveUser = useGetFetch("/currentUserDetails");

  useEffect(() => {
    if (!loggedInToken) {
      navigate("/login");
    }

    if (loggedInUser) {
      const fetchBlogs = () => {
        fetchAllBlogs.fetchGetData(true).then((data) => {
          setBlogs(data.data);
        });
      };

      const fetchCurrentUser = async () => {
        fetchActiveUser.fetchGetData(true).then((data) => {
          localStorage.setItem("loggedInUser", JSON.stringify(data.data));
          setFollowingIds(data.data.following);
        });
      };

      fetchCurrentUser().then(() => {
        fetchBlogs();
      });
    }
    // eslint-disable-next-line
  }, []);

  const toggleFollow = async (userId: string) => {
    const isFollowing = followingIds.includes(userId);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL_ENDPOINT}/${
          isFollowing ? "unfollow" : "follow"
        }/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        setFollowingIds((prev) =>
          isFollowing ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
      } else {
        dispatch(
          showSnackbar({ message: "Something went wrong", severity: "error" })
        );
      }
    } catch (error) {
      console.error("Follow/Unfollow Error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 All Blogs</h1>

      {fetchAllBlogs.getLoader && (
        <p className="text-center">Loading blogs...</p>
      )}

      {!fetchAllBlogs.getLoader && blogs.length === 0 && (
        <p className="text-center text-gray-500">No blogs found.</p>
      )}

      <div className="space-y-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* Circular profile icon */}
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
                  {blog.user.username.charAt(0).toUpperCase()}
                </div>

                {/* Username & email */}
                <div>
                  <p className="font-medium text-sm">{blog.user.username}</p>
                  <p className="text-xs text-gray-500">{blog.user.email}</p>
                </div>
              </div>

              {/* Follow / Following Button */}
              {loggedInUser._id !== blog.user._id && (
                <div className="flex flex-col items-end">
                  <button
                    onClick={() => toggleFollow(blog.user._id)}
                    className={`text-sm px-3 py-1 rounded-full font-medium transition-colors ${
                      followingIds.includes(blog.user._id)
                        ? "bg-green-100 text-green-600 border border-green-300"
                        : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-blue-100 hover:text-blue-600"
                    }`}
                  >
                    {followingIds.includes(blog.user._id)
                      ? "Following"
                      : "Follow"}
                  </button>

                  {/* Follows You Label */}
                  {blog.user.followers?.includes(loggedInUser._id) && (
                    <span className="text-xs text-gray-400 mt-1">
                      Follows you
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Blog content */}
            <p className="text-gray-800 text-base mb-2">{blog.content}</p>
            <div className="text-right text-sm text-gray-400">
              {new Date(blog.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
