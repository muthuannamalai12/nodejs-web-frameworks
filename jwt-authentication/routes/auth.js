const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    role = role || 'user';
    
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = new User({ username, password: hashedPassword });
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } 
  catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});


const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  
  return jwt.sign ( 
               { 
                userId: user._id, 
                 username: user.username, 
                 role: user.role 
              }, 
             'your_secret_key_here', 
             { expiresIn: '1h' } 
        );
};

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = generateToken(user);
  
    res.status(200).json({ token: token });
  } 
  catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});