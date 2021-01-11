export type ProductType = {
  _id: string;
  img: {
    url: string;
    hdUrl: string;
  };
  name: string;
  cost: number;
  category: string;
};

export type UserType = {
  createDate: string;
  name: string;
  points: number;
  redeemHistory: [];
};
