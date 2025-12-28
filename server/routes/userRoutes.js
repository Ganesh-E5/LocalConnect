const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { updateUserProfile,changePassword } = require('../controllers/userController');

const { registerUser, loginUser } = require('../controllers/authController');
const verifyToken = require('../middleware/auth');

router.post('/', registerUser);          
router.post('/login', loginUser);        

router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error in /me:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.patch('/me', verifyToken, updateUserProfile);

router.patch("/change-password", verifyToken, changePassword);
module.exports = router;