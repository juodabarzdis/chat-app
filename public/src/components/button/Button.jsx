import React from "react";
import styles from "./Button.module.scss";
import { FaPaperPlane } from "react-icons/fa";

const Button = () => {
  return (
    <button className={styles.button}>
      <FaPaperPlane className={styles["button__icon"]} />
    </button>
  );
};

export default Button;
