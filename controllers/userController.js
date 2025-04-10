const { db } = require('../models'); 
console.log(db);
module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await db.User.findAll();  // ใช้ db.User แทน
      res.json(users);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await db.User.findByPk(id);  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error('Error fetching user by ID:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async createUser(req, res) {
    const { username, email, password } = req.body;
    try {
      const newUser = await db.User.create({  
        username,
        email,
        password_hash: password, 
        created_at: new Date(),
      });
      res.status(201).json(newUser);
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(400).json({ error: 'Unable to create user' });
    }
  }
};
