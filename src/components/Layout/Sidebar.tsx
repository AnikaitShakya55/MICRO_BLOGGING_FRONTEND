import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const loggedInToken = localStorage.getItem("token") || null;
  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") || "{}" || "undefined"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4 shadow-lg fixed">
      <h1
        className="text-2xl font-bold mb-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        MicroBlog
      </h1>

      {loggedInUser?.username && (
        <p className="mb-4 text-sm text-gray-300">
          👋 Hey, {loggedInUser.username}
        </p>
      )}

      <nav className="flex flex-col gap-4 text-lg">
        <Link to="/blogSpot" className="hover:text-gray-300">
          📰 BlogSpot
        </Link>
        <Link to="/feed" className="hover:text-gray-300">
          📰 My Feed
        </Link>
        <Link to="/my-blogs" className="hover:text-gray-300">
          📰 My Blogs
        </Link>
        {loggedInToken && (
          <Link to="/create-blog" className="hover:text-gray-300">
            ✍️ Create Blog
          </Link>
        )}
        {!loggedInToken ? (
          <Link to="/login" className="hover:text-gray-300">
            🔐 Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="text-left hover:text-gray-300"
          >
            🚪 Logout
          </button>
        )}
        {!loggedInToken && (
          <Link to="/register" className="hover:text-gray-300">
            🔐 Register
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
