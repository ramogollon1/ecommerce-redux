import React from "react";
import { Link } from "react-router-dom";
import NotFoundImage from "../../app/assets/404.svg";
import styles from "./styles.css";
import stylesGlobal from "../../app/styles/global.scss";
import stylesButton from "../../app/styles/buttons.scss";

const PageNotFound = () => (
  <div className={stylesGlobal.container}>
    <div className={styles.notFound}>
      <NotFoundImage className={styles.notFoundImage} />
      <div className={styles.wrapperButtonNotFound}>
        <Link className={stylesButton.buttonPrimary} to="/">
          Back home
        </Link>
      </div>
    </div>
  </div>
);

export default PageNotFound;
