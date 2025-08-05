const User = require('../models/User');

// Get profile info
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // We'll get user ID from the token

    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update profile info
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { skills, experience } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (skills) user.skills = skills;
    if (experience) user.experience = experience;

    await user.save();

    res.json({ message: 'Profile updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserProfile, updateUserProfile };
