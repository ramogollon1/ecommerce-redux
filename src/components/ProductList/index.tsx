import React from "react";
import styles from "./styles.css";
import Product from "../Product";
import { ProductType, UserType } from "../../types/data";

type Props = {
  products: [];
  maxLength?: number;
  user: UserType;
};

function ProductList({ products, maxLength, user }: Props) {
  const productsLenght = products.length || 0;
  return (
    <ul className={styles.productListContainer}>
      {products &&
        products
          .slice(0, maxLength || productsLenght)
          .map((product: ProductType, i: number) => (
            <Product key={i} product={product} user={user} />
          ))}
    </ul>
  );
}

export default ProductList;
