import React from 'react';
import './App.css'

import TransactionList from './components/TransactionList';

function App() {
  return (
    <div className='main-container'>
    <h1>TRANSACTION DASHBOARD</h1>
      
      <TransactionList />
    </div>
  );
}

export default App;
