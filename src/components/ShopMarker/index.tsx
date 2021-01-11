import React from "react";
import styles from "./styles.css";
import MarkerShopWhite from "../../app/assets/buy-white.svg";
import MarkerShopBlue from "../../app/assets/buy-blue.svg";
import CoinImage from "../../app/assets/coin.svg";
import { ProductType, UserType } from "../../types/data";

type Props = {
  product: ProductType;
  isProductHover: boolean;
  user: UserType;
  canBuyProduct: boolean;
  isMediaMobile: boolean;
};

function shopMarker({
  isProductHover,
  user,
  product,
  canBuyProduct,
  isMediaMobile,
}: Props) {
  const { cost } = product;
  const { points } = user;
  const restPoints = Math.abs(points - cost);
  return (
    <>
      {canBuyProduct ? (
        <div className={styles.wrapperNeedCoin}>
          <span className={styles.restPoints}>You need {restPoints}</span>
          <CoinImage className={styles.restCoin} />
        </div>
      ) : (
        <div className={styles.shopMarker}>
          {isProductHover && isMediaMobile ? (
            <MarkerShopWhite />
          ) : (
            <MarkerShopBlue />
          )}
        </div>
      )}
    </>
  );
}

export default shopMarker;
