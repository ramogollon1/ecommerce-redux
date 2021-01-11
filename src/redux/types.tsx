export type AppState = {
  productsStore: {
    loading: boolean;
    productsList: [];
    user: [];
    productRedeemed: [];
    getProductIdSelected: [];
    filterBy: "MOST_RECENT";
    productsFiltered: [];
  };
};
