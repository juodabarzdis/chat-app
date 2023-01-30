import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";
import {
  FaEllipsisV,
  FaPlus,
  FaPaperPlane,
  FaHistory,
  FaUserFriends,
  FaAddressBook,
  FaFolderOpen,
  FaPhoneAlt,
  FaVideo,
} from "react-icons/fa";

const Button = (props) => {
  const { icon, onClick, theme, size, children } = props;

  const iconMap = {
    dots: <FaEllipsisV />,
    plus: <FaPlus />,
    send: <FaPaperPlane />,
    history: <FaHistory />,
    friends: <FaUserFriends />,
    addressBook: <FaAddressBook />,
    folder: <FaFolderOpen />,
    phone: <FaPhoneAlt />,
    video: <FaVideo />,
  };

  const buttonClass = classNames(styles.button, {
    [styles["button--secondary"]]: theme === "secondary",
    [styles["button--text"]]: theme === "text",
    [styles["button--medium"]]: size === "medium",
  });

  return (
    <button className={buttonClass} onClick={onClick}>
      {iconMap[icon] ? iconMap[icon] : children}
    </button>
  );
};

export default Button;
