import React from "react";
import styles from "./styles.css";
import CoinImage from "../../app/assets/coin.svg";
import { UserType } from "../../types/data";

type Props = {
  user: UserType;
};

function Points({ user }: Props) {
  const { name, points } = user;
  return (
    <div className={styles.wrapperPoints}>
      <p className={styles.username}>{name || "John Kite"}</p>
      <div className={styles.redeem}>
        <span className={styles.points}>{points || 0}</span>
        <CoinImage />
      </div>
    </div>
  );
}

export default Points;
