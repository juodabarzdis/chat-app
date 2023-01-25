import { useEffect, useState } from "react";
import Axios from "axios";
import styles from "./ContactsHeader.module.scss";
import { searchRoute } from "../../../utils/APIRoutes";
import Button from "../Button";
import { FaSearch } from "react-icons/fa";

const ContactsHeader = ({
  handleOpenInfo,
  search,
  setSearch,
  setSearchResults,
}) => {
  useEffect(() => {
    try {
      Axios.get(searchRoute, {
        params: {
          username: search,
        },
      }).then((res) => {
        setSearchResults(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles["header-container"]}>
      <div className={styles.top}>
        <h1 className={styles["top__title"]}>Contacts</h1>
        <div className={styles["top__buttons"]}>
          <Button icon="plus" theme="secondary" />
          <Button icon="dots" />
        </div>
      </div>
      <form className={styles.search} type="submit">
        <FaSearch className={styles["search__icon"]} />
        <input
          className={styles["search__input"]}
          type="text"
          placeholder="Search Here..."
          name="search"
          value={search}
          onChange={handleSearch}
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
