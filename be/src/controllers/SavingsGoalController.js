const SavingsGoal = require('../models/SavingGoal');

const getAllSavingsGoals = async (req, res) => {
  try {
    const goals = await SavingsGoal.find();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saving goals', error });
  }
};

const addSavingsGoal = async (req, res) => {
  const { userId, name, targetAmount, currentAmount, startDate, endDate, categoryId } = req.body;
  
  try {
    const newGoal = new SavingsGoal({
      userId,
      name,
      targetAmount,
      currentAmount,
      startDate,
      endDate,
      categoryId
    });
    
    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    res.status(500).json({ message: 'Error saving the goal', error });
  }
};

module.exports = { getAllSavingsGoals, addSavingsGoal };
