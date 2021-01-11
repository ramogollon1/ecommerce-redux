import {
  SET_FILTER_BY,
  PRODUCTS_FILTERED,
  REDEEM_PRODUCT,
  FETCH_USER,
  FETCH_PRODUCTS_LIST,
  LOADING,
  GET_PRODUCT_ID_SELECTED,
} from "../actions/types";

const initialState = {
  loading: false,
  user: [] as string[],
  productsList: [] as string[],
  productsFiltered: [] as string[],
  productRedeemed: [] as string[],
  getProductIdSelected: [] as string[],
  filterBy: "MOST_RECENT",
};

interface IReduxGetProductsAction {
  type: string;
  payload: [];
}

export default function (
  state = initialState,
  action: IReduxGetProductsAction
) {
  switch (action.type) {
    case SET_FILTER_BY:
      return {
        ...state,
        filterBy: action.payload,
        loading: false,
      };
    case REDEEM_PRODUCT:
      return {
        ...state,
        productRedeemed: action.payload,
        loading: false,
      };
    case FETCH_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case FETCH_PRODUCTS_LIST:
      return {
        ...state,
        productsList: action.payload,
        loading: false,
      };
    case GET_PRODUCT_ID_SELECTED:
      return {
        ...state,
        getProductIdSelected: action.payload,
        loading: false,
      };
    case PRODUCTS_FILTERED:
      return {
        ...state,
        productsFiltered: action.payload,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
