import { useState, useEffect } from "react";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { loginRoute } from "../../utils/APIRoutes";
import Button from "../../components/atoms/Button";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    const { email, password } = form;
    e.preventDefault();

    Axios.post(loginRoute, { email, password })
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
        <label htmlFor="email">User E-mail</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email..."
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password..."
          onChange={handleInputChange}
        />
        <Button theme="text">Login</Button>
        <span className={styles["form__span"]}>
          Don't have an account? <Link to="/register">Register.</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
