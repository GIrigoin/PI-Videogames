import React from "react";
import styles from "./NotFound.module.css";
import image from "../../assets/Logo.svg";
const NotFound = () => {
  return (
    <div className={styles.divTest}>
      <h1>Lo lamento, la página está en otro castillo</h1>
      <div>
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default NotFound;
