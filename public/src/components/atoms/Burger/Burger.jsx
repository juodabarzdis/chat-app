import classNames from "classnames";
import React from "react";
import styles from "./Burger.module.scss";

const Burger = ({ handleOpenContacts, openContacts }) => {
  const burgerClass = classNames(styles.burger, {
    [styles["burger--open"]]: openContacts,
  });

  return (
    <button className={burgerClass} onClick={handleOpenContacts}>
      <span className={styles.burger__line}></span>
      <span className={styles.burger__line}></span>
      <span className={styles.burger__line}></span>
    </button>
  );
};

export default Burger;
