import { useState, useEffect } from "react";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginRoute } from "../../utils/APIRoutes";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    const { username, password } = form;
    e.preventDefault();

    axios
      .post(loginRoute, { username, password })
      .then((res) => {
        localStorage.setItem("chat-app-user", JSON.stringify(res.data.user));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          onChange={handleInputChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
        <button type="submit">Login</button>
        <span>
          Don't have an account? <Link to="/register">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
