const express = require('express');
const router = express.Router();
const {
  addTransaction,
  getTransactions,
  getDailyReport
} = require('../controllers/transactionController');

router.post('/', addTransaction);
router.get('/', getTransactions);
router.get('/daily-report', getDailyReport);

module.exports = router;