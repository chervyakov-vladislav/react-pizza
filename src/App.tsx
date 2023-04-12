import React, { Suspense } from 'react';
import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';

const FullPizza = React.lazy(() => import('./pages/FullPizza'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Cart = React.lazy(() => import('./pages/Cart'));


function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='cart' element={
          <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
            <Cart />
          </Suspense>} />
        <Route path='pizza/:id' element={
          <Suspense fallback={<div>Идёт загрузка...</div>}>
            <FullPizza />
          </Suspense>
        } />
        <Route path='*' element={
          <Suspense fallback={<div>Идёт загрузка...</div>}>
            <NotFound />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
}

export default App;
