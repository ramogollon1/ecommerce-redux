import React from "react";
import { Link } from "react-router-dom";
import Points from "../Points";
import styles from "./styles.css";
import stylesGlobal from "../../app/styles/global.scss";
import AerolabLogo from "../../app/assets/aerolab-logo.svg";
import { UserType } from "../../types/data";

type User = {
  user: UserType;
};

function Nav({ user }: User) {
  return (
    <nav className={styles.nav}>
      <div className={stylesGlobal.container}>
        <div className={styles.containerNav}>
          <Link className={styles.linkLogo} to={"/"}>
            <AerolabLogo />
          </Link>
          <div className={styles.navRight}>
            <Points user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
