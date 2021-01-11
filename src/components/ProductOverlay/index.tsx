import React, { useState } from "react";
import styles from "./styles.css";
import { useDispatch } from "react-redux";
import { getCurrentState } from "../../utils";
import {
  redeemProduct,
  getProductById,
  fetchUser,
} from "../../redux/actions/productActions";
import { ProductType } from "../../types/data";

import classnames from "classnames";

type Props = {
  product: ProductType;
};

function ProductOverlay({ product }: Props) {
  const dispatch = useDispatch();
  const [redeem, setRedeem] = useState(false);
  const getStateData = getCurrentState();
  const { getProductIdSelected } = getStateData;

  const onHandleOnClickRedeem = () => {
    setRedeem(true);
    dispatch(redeemProduct(product, getProductIdSelected));
    dispatch(getProductById(product._id));
    dispatch(fetchUser());
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.wrapperProductMoney}>
        <button
          disabled={redeem}
          onClick={onHandleOnClickRedeem}
          className={classnames(styles.redeemButton, {
            [styles.redeemedButton]: redeem,
          })}
        >
          {redeem ? "Redeemed" : "Redeem now"}
        </button>
      </div>
    </div>
  );
}

export default ProductOverlay;
