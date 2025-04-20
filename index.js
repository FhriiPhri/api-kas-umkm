// server.js (atau index.js)
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


dotenv.config();
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Kas UMKM Aktif 🚀');
  });  

// public routes
app.use('/api/auth', authRoutes);

// protected routes
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));