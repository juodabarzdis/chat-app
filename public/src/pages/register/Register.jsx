import { useState, useEffect } from "react";
import styles from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { registerRoute } from "../../utils/APIRoutes";

const Register = () => {
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
    e.preventDefault();

    Axios.post(registerRoute, form)
      .then((res) => {
        console.log(res);
        localStorage.setItem("chat-app-user", JSON.stringify(res.data));
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
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
        <label htmlFor="repeatPassword">Repeat password</label>
        <input
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          placeholder="Repeat password"
          onChange={handleInputChange}
        />
        <button type="submit">Register</button>
        <span>
          already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
