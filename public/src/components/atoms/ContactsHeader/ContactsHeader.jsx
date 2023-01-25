import React from "react";
import styles from "./ContactsHeader.module.scss";

import { FaSearch } from "react-icons/fa";

import Button from "../Button";

const ContactsHeader = ({ handleOpenInfo }) => {
  return (
    <div className={styles["header-container"]}>
      <div className={styles.top}>
        <h1 className={styles["top__title"]}>Contacts</h1>
        <div className={styles["top__buttons"]}>
          <Button icon="plus" theme="secondary" />
          <Button icon="dots" />
        </div>
      </div>
      <form className={styles.search}>
        <FaSearch className={styles["search__icon"]} />
        <input
          className={styles["search__input"]}
          type="text"
          placeholder="Search Here..."
          name="search"
        />
      </form>
      <div className={styles["icons-row"]}>
        <Button icon="history" />
        <Button icon="friends" />
        <Button icon="addressBook" />
        <Button icon="folder" onClick={handleOpenInfo} />
      </div>
    </div>
  );
};

export default ContactsHeader;
