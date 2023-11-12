const express = require('express');
const app = express();
const PORT = process.env.PORT || 3006;

// Dummy data for demonstration purposes
const data = [
  { month: 'January', priceRange: '0-100', count: 5 },
  { month: 'January', priceRange: '101-200', count: 8 },
  { month: 'January', priceRange: '201-300', count: 12 },
  { month: 'January', priceRange: '301-400', count: 17 },
  { month: 'January', priceRange: '401-500', count: 12 },
  { month: 'January', priceRange: '501-600', count: 12 },
  { month: 'January', priceRange: '601-700', count: 12 },
  { month: 'January', priceRange: '701-800', count: 12 },
  { month: 'January', priceRange: '801-900', count: 12 },
  { month: 'January', priceRange: '901-above', count: 12 },
  // ... add more data for other months and price ranges
];

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// API endpoint to get bar chart data for a selected month
app.get('/api/bar-chart/:month', (req, res) => {
  const selectedMonth = req.params.month;
  const filteredData = data.filter(item => item.month === selectedMonth);
  res.json(filteredData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
