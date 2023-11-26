const { processApiData } = require('./app');

// Wrap the code in an async function
(async () => {
  try {
    const url = 'http://144.22.133.47:8000/api/get-list';
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from API: ${response.statusText}`);
    }

    const apiData = await response.json();
    processApiData(apiData);

    // Note: It's assumed that you have access to the 'res' object here
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
