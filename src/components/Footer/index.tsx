import React from "react";
import styles from "./styles.css";
import UpArrowIcon from "../../app/assets/up-arrow.svg";

function Footer() {
  const onHandleOnClickUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className={styles.footer}>
      <p>E-commerce Aerolab - 2021</p>
      <UpArrowIcon className={styles.upArrowIcon} onClick={onHandleOnClickUp} />
    </div>
  );
}

export default Footer;
