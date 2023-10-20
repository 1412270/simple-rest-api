import express from 'express';
import pkg from 'body-parser';
const { urlencoded, json } = pkg;

const app = express();
const port = 3000;

import sequelize from './database.js';
import User from './user.js';

// Sync models with database
sequelize.sync();

// Middleware for parsing request body
app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// CRUD routes for User model
app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
});

app.post('/users', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

app.put('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        await user.update(req.body);
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        await user.destroy();
        res.json({ message: 'User deleted' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});