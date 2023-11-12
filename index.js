const express = require('express');
const app = express();
const port = 3007;

// Dummy data for demonstration
const data = [
  { category: 'Electronics', quantity: 5 },
  { category: 'Clothing', quantity: 8 },
  { category: 'Books', quantity: 15 },
  // ... Add more data as needed
];

// Endpoint to get data for the pie chart
app.get('/api/pie-chart', (req, res) => {
  // You can replace this logic with actual data retrieval based on the selected month
  // For simplicity, we're using dummy data here
  const selectedMonthData = data.filter(item => /* your month filtering logic here */ true);

  // Create a map to store categories and their total quantities
  const categoryMap = new Map();

  // Calculate the total quantity for each category
  selectedMonthData.forEach(item => {
    const { category, quantity } = item;
    if (categoryMap.has(category)) {
      categoryMap.set(category, categoryMap.get(category) + quantity);
    } else {
      categoryMap.set(category, quantity);
    }
  });

  // Convert the map to an array of objects
  const pieChartData = Array.from(categoryMap).map(([category, quantity]) => ({
    category,
    quantity,
  }));

  // Send the response
  res.json(pieChartData);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
