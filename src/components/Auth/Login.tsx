import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePostFetch from "../../hooks/usePostFetch";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const useFetchLogin = usePostFetch("/login");
  const loggedInToken = localStorage.getItem("token") || null;

  useEffect(() => {
    if (loggedInToken) {
      navigate("/create-blog");
    }
    // eslint-disable-next-line
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    useFetchLogin.postData({ email, password }, true).then((data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      navigate("/blogSpot");
    });
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto p-4 mt-10 border rounded"
    >
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="input mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="btn">
        {useFetchLogin.postLoader ? <CircularProgress size={25} /> : "Login"}
      </button>
    </form>
  );
};

export default Login;
