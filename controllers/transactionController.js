const Transaction = require('../models/transaction');

// Tambah transaksi
exports.addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Ambil semua
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ order: [['date', 'DESC']] });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Laporan harian
exports.getDailyReport = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const allToday = await Transaction.findAll({ where: { date: today } });

    const pemasukan = allToday.filter(t => t.type === 'pemasukan')
      .reduce((acc, t) => acc + t.amount, 0);
    const pengeluaran = allToday.filter(t => t.type === 'pengeluaran')
      .reduce((acc, t) => acc + t.amount, 0);

    res.json({
      date: today,
      pemasukan,
      pengeluaran,
      keuntungan: pemasukan - pengeluaran,
      omzet: pemasukan
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};