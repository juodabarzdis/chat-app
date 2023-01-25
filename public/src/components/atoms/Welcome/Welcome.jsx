import React from "react";
import styles from "./Welcome.module.scss";

const Welcome = (props) => {
  const { currentUser } = props;

  return (
    <div className={styles["welcome-container"]}>
      <div className={styles["welcome-container__content"]}>
        <p>Welcome {currentUser && currentUser.username}!</p>
        <p>Select user to chat.</p>
      </div>
    </div>
  );
};

export default Welcome;
