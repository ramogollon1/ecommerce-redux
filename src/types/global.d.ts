declare module "*.png";
declare module "*.svg";
declare module "*.gif";
declare module "*.jpg";
declare module "*.css";
declare module "*.scss";

declare namespace NodeJS {
  interface Global {
    localStorage: {
      getItem: (key: string) => any;
      setItem: (key: string, value: string) => any;
    };
  }
}
