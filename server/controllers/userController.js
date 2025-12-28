const User = require('../models/User');
const bcrypt = require("bcryptjs");

const updateUserProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, phno, location, skills } = req.body;

    const updates = {
        name,
        phno,
        location,
        skills
    };

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true } 
        )

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Profile updated successfully', user });
    } catch (err) {
        if (err.name === 'ValidationError') {
             return res.status(400).json({ message: err.message });
        }
        console.error('Profile update error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const changePassword = async (req,res) => {
    try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both fields required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password incorrect" });
    }

    user.password = newPassword; 
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
    updateUserProfile,
    changePassword
};