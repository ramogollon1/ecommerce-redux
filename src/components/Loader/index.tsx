import React from "react";
import styles from "./styles.css";
import LoaderImage from "../../app/assets/loader.svg";
import classnames from "classnames";

type Props = {
  className?: string;
};

export default function Loader({ className }: Props) {
  return <LoaderImage className={classnames(styles.loader, className)} />;
}
