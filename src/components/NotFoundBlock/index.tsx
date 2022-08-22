import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.container}>
      <span className={styles.emoji}>🤯</span>
      <h2>This is definitely not the right page</h2>
      <span className={styles.description}>
        Unfortunately, the page that you're looking for isn't found
      </span>
    </div>
  );
};

export default NotFoundBlock;
