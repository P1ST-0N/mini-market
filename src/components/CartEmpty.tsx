import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from 'assets/img/empty-cart.png';

export const CartEmpty: React.FC = () => (
  <div className="cart cart--empty">
    <h2>
      Корзина порожня<span>😕</span>
    </h2>
    <p>
    Напевно ви ще нічого не замовили.
      <br />
      Для того, щоби замовити товар, перейдіть на головну сторінку.
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Повернутися назад</span>
    </Link>
  </div>
);
