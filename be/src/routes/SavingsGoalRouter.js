const express = require('express');
const { getAllSavingsGoals, addSavingsGoal } = require('../controllers/SavingsGoalController');
const router = express.Router();

router.get('/goals', getAllSavingsGoals);
router.post('/goals', addSavingsGoal);

module.exports = router;
