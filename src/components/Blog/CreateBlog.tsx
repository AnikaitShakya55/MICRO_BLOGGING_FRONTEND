import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePostFetch from "../../hooks/usePostFetch";

const CreateBlog = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const loggedInToken = localStorage.getItem("token") || null;
  // API
  const useCreateBlog = usePostFetch("/create-blogs");

  useEffect(() => {
    if (!loggedInToken) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const obj = { id: loggedInUser._id, content: content };
    useCreateBlog.postData(obj, true).then((data) => {
      setContent("");
      navigate("/blogSpot");
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 border p-4 rounded"
    >
      <h2 className="text-xl font-semibold mb-4">Create Blog</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        rows={5}
        placeholder="What's on your mind?"
        required
      ></textarea>
      <button type="submit" className="btn" disabled={useCreateBlog.postLoader}>
        {useCreateBlog.postLoader ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default CreateBlog;
