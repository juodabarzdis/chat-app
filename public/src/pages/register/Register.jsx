import { useState, useEffect, useContext } from "react";
import styles from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../../context/socketContext";
import Axios from "axios";
import { registerRoute } from "../../utils/APIRoutes";
import Button from "../../components/atoms/Button";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const { user } = useContext(MainContext);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post(registerRoute, form)
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
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Enter your first name..."
          onChange={handleInputChange}
        />
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Enter your first name..."
          onChange={handleInputChange}
        />
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your E-mail..."
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password..."
          onChange={handleInputChange}
        />
        <label htmlFor="repeatPassword">Repeat password</label>
        <input
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          placeholder="Repeat password..."
          onChange={handleInputChange}
        />
        <Button theme="text">Register</Button>
        <span className={styles["form__span"]}>
          Already have an account? <Link to="/login">Login.</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
