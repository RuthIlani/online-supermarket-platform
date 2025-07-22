const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Order Management API Executed!',
    timestamp: new Date().toISOString()
  });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`The service run on port ${PORT}`);
  console.log(`Check in the browser: http://localhost:${PORT}`);
});

module.exports = app;