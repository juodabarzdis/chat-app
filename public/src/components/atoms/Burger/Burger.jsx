import React from "react";
import styles from "./Burger.module.scss";

const Burger = ({ handleOpenContacts }) => {
  return (
    <button className={styles.burger} onClick={handleOpenContacts}>
      <span className={styles.burger__line}></span>
      <span className={styles.burger__line}></span>
      <span className={styles.burger__line}></span>
    </button>
  );
};

export default Burger;
