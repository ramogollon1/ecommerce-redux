import {
  SET_FILTER_BY,
  PRODUCTS_FILTERED,
  GET_PRODUCT_ID_SELECTED,
  REDEEM_PRODUCT,
  FETCH_USER,
  FETCH_PRODUCTS_LIST,
  LOADING,
} from "./types";

import axios from "axios";
import { Dispatch } from "react";
import { ProductType } from "../../types/data";

const PRODUCTS_API_URL = "https://coding-challenge-api.aerolab.co/products";
const USER_API_URL = "https://coding-challenge-api.aerolab.co/user/me";
const HISTORY_API_URL = "https://coding-challenge-api.aerolab.co/user/history";
const REDEEM_API_URL = "https://coding-challenge-api.aerolab.co/redeem";
const POINTS_API_URL = "https://coding-challenge-api.aerolab.co/user/points";
const { TOKEN_API } = process.env;
let PRODUCT_SELECTED = [];

const OPTIONS = {
  headers: { Authorization: `Bearer ${TOKEN_API}` },
};

export const onHandleProductsFiltered = (productsFiltered: []) => (
  dispatch: Dispatch<any>
) => {
  dispatch({
    type: PRODUCTS_FILTERED,
    payload: productsFiltered,
  });
};
export const setFilterBy = (filterBy: string) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: SET_FILTER_BY,
    payload: filterBy,
  });
};

export const getProductById = (id: string) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: GET_PRODUCT_ID_SELECTED,
    payload: id,
  });
};

export const handleOnFilterProductById = async (id: string) => {
  const getHistoryAll = await getHistory();
  const productFilteredById = await getHistoryAll.filter(
    (product) => product._id === id
  );
  return productFilteredById;
};

export const getHistory = () => {
  return axios
    .get(`${HISTORY_API_URL}?`, OPTIONS)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export const redeemProduct = (product: ProductType, id: string) => async (
  dispatch: Dispatch<any>
) => {
  const { _id } = product;
  const data = { productId: _id };
  return axios
    .post(REDEEM_API_URL, data, OPTIONS)
    .then((response) => {
      dispatch({
        type: REDEEM_PRODUCT,
        payload: product,
      });
    })
    .catch((err) => console.log(err));
};

export const fetchUser = () => (dispatch: Dispatch<any>) =>
  axios
    .get(USER_API_URL, OPTIONS)
    .then((response) => {
      dispatch({
        type: FETCH_USER,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));

export const fetchProductsList = () => (dispatch: Dispatch<any>) => {
  return axios
    .get(PRODUCTS_API_URL, OPTIONS)
    .then((response) => {
      dispatch({
        type: FETCH_PRODUCTS_LIST,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};

export const setLoading = () => {
  return {
    type: LOADING,
  };
};
