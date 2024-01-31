const express = require('express');
const app = express();

const port = 3001; // Use a different port from your React app

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
