const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// A test route — your frontend will call this
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Backend is alive!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});