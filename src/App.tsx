import Loadable from 'react-loadable';
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Йде завантаження корзини...</div>,
});

const FullSneaker = React.lazy(() => import(/* webpackChunkName: "FullSneaker" */ './pages/FullSneaker'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
const BuyPage = React.lazy(() => import(/* webpackChunkName: "BuyPage" */'./components/BuyPage/BuyPage'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Йде завантаження корзини...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="sneaker/:id"
          element={
            <Suspense fallback={<div>Йде завантаження...</div>}>
              <FullSneaker />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Йде завантаження...</div>}>
              <NotFound />
            </Suspense>
          }
        />
        <Route
          path="/buypage"
          element={
            <Suspense fallback={<div>Йде завантаження...</div>}>
              <BuyPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
