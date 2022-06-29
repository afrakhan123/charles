import React, { Fragment } from 'react';
import { Footer, Header } from './@shared';
import './App.css';
import InventoryPage from './components/inventory-page/InventoryPage';

function App() {
  return (
    <Fragment>
      <Header />
      <div style={{ padding: '20px 40px' }}>
        <InventoryPage />
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
