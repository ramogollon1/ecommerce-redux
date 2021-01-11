import React, { useState } from "react";
import classnames from "classnames";
import { useDispatch } from "react-redux";
import styles from "./styles.css";
import useMediaQuery from "../../customHooks/useMediaQuery";
import {
  redeemProduct,
  getProductById,
} from "../../redux/actions/productActions";
import useHover from "../../customHooks/useHover";
import ProductOverlay from "../ProductOverlay";
import ShopMarker from "../ShopMarker";
import CoinImage from "../../app/assets/coin.svg";
import { ProductType, UserType } from "../../types/data";
import { getCurrentState } from "../../utils";

type Props = {
  product: ProductType;
  user: UserType;
};

function Product({ product, user }: Props) {
  const dispatch = useDispatch();
  const [redeem, setRedeem] = useState(false);
  const getStateData = getCurrentState();
  const { getProductIdSelected } = getStateData;

  const { img, name, cost, category } = product;
  const { points } = user;

  const isMediaMobile = useMediaQuery("(min-width: 992px)");
  const [hoverRef, isHovered] = useHover();

  const onHandleOnClickRedeem = () => {
    setRedeem(true);
    dispatch(redeemProduct(product, getProductIdSelected));
    dispatch(getProductById(product._id));
  };

  const canBuyProduct = points < cost;

  return (
    <li
      ref={hoverRef}
      className={classnames(styles.product, {
        [styles.isProductHover]: isHovered && !canBuyProduct && isMediaMobile,
      })}
    >
      <ShopMarker
        product={product}
        isMediaMobile={isMediaMobile}
        isProductHover={isHovered}
        user={user}
        canBuyProduct={canBuyProduct}
      />
      <div className={styles.wrapperImage}>
        <img
          className={styles.productImage}
          alt={name}
          src={isMediaMobile ? img.hdUrl : img.url}
        />
      </div>
      <div className={styles.productCost}>
        {cost} <CoinImage className={styles.coin} />
      </div>

      <p className={styles.productCategory}>{category}</p>
      <p className={styles.productName}>{name}</p>
      {isHovered && isMediaMobile && !canBuyProduct && (
        <ProductOverlay product={product} />
      )}
      {!isMediaMobile && (
        <button
          onClick={onHandleOnClickRedeem}
          className={classnames(styles.redeemButtonMobile, {
            [styles.buttonDisabled]: canBuyProduct,
          })}
        >
          {redeem ? "Redeemed" : "Redeem now"}
        </button>
      )}
    </li>
  );
}
export default Product;
