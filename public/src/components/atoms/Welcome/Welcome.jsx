import React from "react";
import styles from "./Welcome.module.scss";

const Welcome = (props) => {
  const { currentUser } = props;

  return (
    <div className={styles["welcome-container"]}>
      <div className={styles["welcome-container__content"]}>
        <p>Welcome, {currentUser && currentUser.firstName}!</p>
        <p>Select a user to start chatting.</p>
      </div>
    </div>
  );
};

export default Welcome;
