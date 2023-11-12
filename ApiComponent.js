import React, { useState, useEffect } from 'react';

const ApiComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Make a GET request to your API endpoint
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      // Check if the request was successful (status code 200)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the JSON response
      const result = await response.json();

      // Update the state with the fetched data
      setData(result);
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name} 
            <p>{item.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApiComponent;
