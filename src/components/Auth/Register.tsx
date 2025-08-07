import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePostFetch from "../../hooks/usePostFetch";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const registerPostFetch = usePostFetch("/register");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const obj = {
      username,
      email,
      password,
      phone_no: phoneNo,
    };

    registerPostFetch.postData(obj, true).then((data) => {
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      navigate("/");
    });
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-md mx-auto p-4 mt-10 border rounded"
    >
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <input
        type="text"
        placeholder="Username"
        className="input mb-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="input mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Phone Number"
        className="input mb-4"
        value={phoneNo}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d{0,10}$/.test(value)) setPhoneNo(value);
        }}
        required
        pattern="\d{10}"
        title="Phone number must be exactly 10 digits"
      />

      <input
        type="password"
        placeholder="Password"
        className="input mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="btn"
        disabled={registerPostFetch.postLoader}
      >
        {registerPostFetch.postLoader ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
