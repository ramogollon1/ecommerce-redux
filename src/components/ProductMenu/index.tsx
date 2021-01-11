import React from "react";
import styles from "./styles.css";
import classnames from "classnames";
import { useDispatch } from "react-redux";
import {
  setFilterBy,
  onHandleProductsFiltered,
} from "../../redux/actions/productActions";
import { getCurrentState, sortByMinPrice, sortByMaxPrice } from "../../utils";
import { MOST_RECENT, MIN_PRICE, MAX_PRICE } from "./types";

type ButtonType = {
  type: string;
  filterBy: string;
  title: string;
};

const BUTTONS = [
  { type: MOST_RECENT, filterBy: "Most recent", title: "Most recent" },
  { type: MIN_PRICE, filterBy: "minPrice", title: "Lowest price" },
  { type: MAX_PRICE, filterBy: "maxPrice", title: "Highest price" },
];

function ProductMenu() {
  const dispatch = useDispatch();
  const getStateData = getCurrentState();
  const { filterBy, productsList } = getStateData;

  const onHandleOnClickFilter = (FilterBy: string) => {
    dispatch(setFilterBy(FilterBy));
    switch (FilterBy) {
      case MOST_RECENT:
        dispatch(onHandleProductsFiltered(productsList));
        return;
      case MIN_PRICE:
        const productSortByMin = sortByMinPrice(productsList, "cost");
        dispatch(onHandleProductsFiltered(productSortByMin));
        return;
      case MAX_PRICE:
        const productSortByMax = sortByMaxPrice(productsList, "cost");
        dispatch(onHandleProductsFiltered(productSortByMax));
        return;
      default:
        dispatch(onHandleProductsFiltered(productsList));
        return;
    }
  };
  return (
    <div className={styles.productMenu}>
      <div className={styles.filtersContainer}>
        <div className={styles.sortByText}>
          <p>Sort by</p>
        </div>
        <div className={styles.wrapperButton}>
          {BUTTONS.map((button: ButtonType, i: number) => (
            <button
              key={i}
              onClick={() => onHandleOnClickFilter(button.type)}
              className={classnames(styles.filterButton, {
                [styles.filterButtonActive]: filterBy === button.type,
              })}
            >
              {button.filterBy}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductMenu;
