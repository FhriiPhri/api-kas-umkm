const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Tambahkan ini
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

/**
 * POST /auth/register
 * Body: { nama, username, jurusan, email, password }
 */
router.post('/auth/register', async (req, res) => {
  try {
    const { nama, username, jurusan, email, password } = req.body;

    // 1. Cek apakah semua field terisi
    if (!nama || !username || !jurusan || !email || !password) {
      return res.status(400).json({ message: 'Nama, username, jurusan, email, dan password wajib diisi.' });
    }

    // 2. Cek apakah email sudah terdaftar
    const exist = await prisma.user.findUnique({ where: { email } });
    if (exist) {
      return res.status(400).json({ message: 'Email sudah terdaftar.' });
    }

    // 3. Hash password
    const hashed = await bcrypt.hash(password, 10);

    // 4. Simpan user baru
    const user = await prisma.user.create({
      data: {
        nama,
        username,
        jurusan,
        email,
        password: hashed
      }
    });

    // 5. Response sukses (tidak mengembalikan password)
    res.status(201).json({
      message: 'User berhasil register.',
      user: {
        id: user.id,
        nama: user.nama,
        username: user.username,
        jurusan: user.jurusan,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
});

/**
 * POST /auth/login
 * Body: { email, password }
 */
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Cek apakah email dan password ada
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi.' });
    }

    // 2. Cari user berdasarkan email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Email atau password salah.' });
    }

    // 3. Cek apakah password sesuai dengan yang ada di database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Email atau password salah.' });
    }

    // 4. Buat JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1h' });

    // 5. Response token dan data user
    res.status(200).json({
      message: 'Login sukses.',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
});

/**
 * GET /users
 * Mendapatkan semua user
 */
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        nama: true,
        username: true,
        jurusan: true,
        email: true,
        createdAt: true
      }
    });
    res.json({ users });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
});

module.exports = router;