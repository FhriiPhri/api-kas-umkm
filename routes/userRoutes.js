const express = require('express');
const router = express.Router();

// Mengimpor controller
const { register, getAllUsers } = require('../controllers/userController');

// Route untuk register
router.post('/register', async (req, res) => {
  try {
    const newUser = await register(req.body); // Menggunakan fungsi register dari controller
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route untuk mendapatkan semua pengguna
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers(); // Mengambil semua pengguna
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;