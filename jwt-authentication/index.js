const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const verifyToken = require('./middleware/verifyToken');

// Parse JSON requests
app.use(bodyParser.json());

// Authentication routes
app.use('/auth', authRoutes);

// Route accessible to all authenticated users
app.get('/users/me', verifyToken, (req, res) => {
    const user = req.user;
    res.json( { 
                 username: user.username, 
                 role: user.role 
      } );
});

// Route accessible only to admins
app.get('/admin/resource', verifyToken, (req, res) => {
   const user = req.user;
   
  if (user.role !== 'admin') {
      return res.sendStatus(403);
   }
  
  res.json({ message: 'You have access to this protected route' });
});