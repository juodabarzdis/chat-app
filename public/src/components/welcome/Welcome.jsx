import React from "react";
import styles from "./Welcome.module.scss";

const Welcome = (props) => {
  const { currentUser } = props;

  return (
    <>
      <p>Welcome {currentUser && currentUser.username}!</p>
      <p>You can start chatting. Select user.</p>
    </>
  );
};

export default Welcome;
