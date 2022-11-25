import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <p>
        Player component created by{" "}
        <a
          className="link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://saahild.com"
        >
   A cool person :)
        </a>
      </p>
    </div>
  );
};

export default Footer;
