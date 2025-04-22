const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, email, password, name } = req.body;

    // Cek apakah email atau username sudah ada
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email sudah terdaftar' });
    }

    // Buat user baru
    const user = await User.create({
      username,
      email,
      password,
      name
    });

    res.status(201).json({
      message: 'User berhasil didaftarkan',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        name: user.name,
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};