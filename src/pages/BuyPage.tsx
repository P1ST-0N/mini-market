import React from 'react';

import styles from '../components/BuyPage/BuyPage.module.scss';

const BuyPage: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>&#129392;</span>
        <br />
        Дякуємо що відвідали наш магазин!
      </h1>
      <p className={styles.description}>
        Все буде Україна!
      </p>
    </div>
  );
};

export default BuyPage;