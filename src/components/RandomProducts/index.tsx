import React from "react";
import styles from "./styles.css";
import ProductList from "../ProductList";
import { UserType } from "../../types/data";

type Props = {
  products: [];
  user: UserType;
};

function RandomProducts({ products, user }: Props) {
  return (
    <>
      <h2 className={styles.sectionTitle}>Random Products</h2>
      <ProductList user={user} products={products} maxLength={4} />
    </>
  );
}

export default RandomProducts;
