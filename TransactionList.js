import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './transactionlist.css'

const TransactionList = () => {
  const [selectedMonth, setSelectedMonth] = useState('03'); // Default to March
  const [searchText, setSearchText] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3009/api/transactions?month=${selectedMonth}&search=${searchText}&page=${currentPage}`
      );

      setTransactions(response.data.transactions);
      setTotalTransactions(response.data.totalTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, searchText, currentPage]);

  const handleSearchChange = event => {
    setSearchText(event.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='transaction-container'>
        <input className='input-section' type="text" placeholder="Search transaction" value={searchText} onChange={handleSearchChange} />
      <label className='select-section'>
        Select Month:
        <select className='selected-section' value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
          {/* Add options for Jan to Dec */}
          {/* You can use a loop to generate the options dynamically */}
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">Sepember</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
          {/* ... Continue for other months */}
          <option value="12">December</option>
        </select>
      </label>

      
<div className='table-section'>
      <table >
        <thead>
          <tr>
          <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold}</td>
              <td><img src = {transaction.image} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <p>Total Transactions: {totalTransactions}</p>
      <div className='page-btn'>
      <button className='prev-btn' onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button className='prev-btn' onClick={handleNextPage} disabled={currentPage * 10 >= totalTransactions}>
        Next
      </button>
      </div>
    </div>
  );
};

export default TransactionList;
