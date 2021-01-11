import { useSelector } from "react-redux";
import { ProductType } from "../types/data";

export const getCurrentState = () =>
  useSelector((state: any) => state.productsStore, []) || [];

export const getRandomItem = (array: []): [] =>
  array.reduce(
    (a, v) => a.splice(Math.floor(Math.random() * a.length), 0, v) && a,
    []
  );

export const sortByMinPrice = (array: [], field: string) => {
  return [...array].sort((a: ProductType, b: ProductType) => {
    return a.cost - b.cost;
  });
};

export const sortByMaxPrice = (array: [], field: string) => {
  return [...array].sort((a: ProductType, b: ProductType) => {
    return b.cost - a.cost;
  });
};
