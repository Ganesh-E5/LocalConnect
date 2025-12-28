require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('LocalConnect Backend is running 🚀');
});

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/request',require('./routes/requestRoutes'))
app.use('/api/service-categories',require('./routes/categoryRoutes'))
app.use('/api', require('./routes/protected'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
