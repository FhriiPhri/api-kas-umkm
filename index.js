require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db'); // koneksi DB
const transactionsRoute = require('./routes/transactionRoutes'); // route transaksi

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('API UMKM Kas Online ✅');
});

// Route
app.use('/api/users', userRoutes);

// Gunakan routes transaksi
app.use('/api/transactions', transactionsRoute);

// Coba koneksi ke database
db.authenticate()
  .then(() => {
    console.log('✅ Database connected');
    return db.sync(); // sinkronisasi model dengan DB
  })
  .then(() => {
    console.log('✅ Database synced');
  })
  .catch((err) => {
    console.error('❌ Failed to connect DB:', err);
  });

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});