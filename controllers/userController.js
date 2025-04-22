const User = require('../models/User');

// Fungsi untuk mendaftarkan pengguna baru
const register = async (userData) => {
  // Bisa tambahkan validasi atau hash password di sini
  try {
    const newUser = await User.create(userData); // Menyimpan user baru ke database
    return newUser;
  } catch (error) {
    throw new Error('Error saat mendaftarkan pengguna');
  }
};

// Fungsi untuk mengambil semua pengguna
const getAllUsers = async () => {
  try {
    return await User.findAll();
  } catch (error) {
    throw new Error('Error mengambil data pengguna');
  }
};

module.exports = {
  register,
  getAllUsers,
};