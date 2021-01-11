import React, { useEffect } from "react";
import ProductList from "../ProductList";
import { useDispatch } from "react-redux";
import { getCurrentState } from "../../utils";
import ProductMenu from "../ProductMenu";
import RandomProducts from "../RandomProducts";
import Nav from "../Nav";
import Footer from "../Footer";
import styles from "./styles.css";
import stylesGlobal from "../../app/styles/global.scss";
import classnames from "classnames";
import { getRandomItem } from "../../utils";
import {
  fetchUser,
  fetchProductsList,
  onHandleProductsFiltered,
  setLoading,
} from "../../redux/actions/productActions";
import usePagination from "../../customHooks/usePagination";

const PRODUCTS_PER_PAGE = 16;
const NAME_BANNER = "Electronics";

function ProductContainer() {
  const dispatch = useDispatch();
  const getStateData = getCurrentState();
  const { productsList, user, productsFiltered } = getStateData;
  const { currentDataPage, jumpPage, maxPage, currentPage } = usePagination(
    productsFiltered,
    PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchProductsList());
    dispatch(setLoading());
    dispatch(onHandleProductsFiltered(productsList));
  }, [dispatch]);

  const handleShowMoreProducts = (page: number) => {
    jumpPage(page);
  };

  const randomProductList = getRandomItem(productsList);
  const pages = [...Array(maxPage)];

  return (
    <div className={styles.home}>
      <Nav user={user} />
      <div className={styles.productContainer}>
        <div className={styles.hero}>
          <div className={styles.heroBackground} />
          <h1 className={styles.heroTitle}>{NAME_BANNER}</h1>
        </div>
        <div className={stylesGlobal.section}>
          <div className={styles.containerProducts}>
            <ProductMenu />
            <ProductList user={user} products={currentDataPage()} />
            <div className={styles.wrapperPagination}>
              {pages.map((page: number, i: number) => {
                const pageNumber = ++i;
                return (
                  <button
                    className={classnames(styles.paginationButton, {
                      [styles.paginationActive]: currentPage === pageNumber,
                    })}
                    onClick={() => handleShowMoreProducts(pageNumber)}
                    key={pageNumber}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className={stylesGlobal.section}>
          <div className={styles.containerProducts}>
            <RandomProducts user={user} products={randomProductList} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductContainer;
