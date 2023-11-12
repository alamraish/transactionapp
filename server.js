const express = require('express');
const cors = require('cors');
const app = express();
const port = 3009;

app.use(cors()); // Enable CORS for all routes

// Dummy transactions data for demonstration
const transactionsData = [
  // Sample data format: { id, title, description, price, date }
  // ... Add more transactions as needed
];

// Endpoint to get transactions for the selected month and page
app.get('/api/transactions', (req, res) => {
  const selectedMonth = req.query.month || '03'; // Default to March if no month is specified
  const searchText = req.query.search || '';
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10; // Adjust the page size as needed

  // Filter transactions based on the selected month and search text
  const filteredTransactions = transactionsData.filter(transaction =>
    transaction.date.startsWith(selectedMonth) &&
    (transaction.title.includes(searchText) ||
      transaction.description.includes(searchText) ||
      transaction.price.toString().includes(searchText))
  );

  // Calculate pagination indices
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Get the transactions for the current page
  const transactionsForPage = filteredTransactions.slice(startIndex, endIndex);

  // Send the response
  res.json({
    transactions: transactionsForPage,
    totalTransactions: filteredTransactions.length,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
