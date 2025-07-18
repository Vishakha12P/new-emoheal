const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
const path = require('path');

const users = [];

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../chatbot')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../chatbot/landing.html'));
});

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Email already registered.' });
  }
  // Store new user
  users.push({ name, email, password });
  console.log(`Registration successful: ${name}, ${email}`);
  res.json({ success: true, message: 'Registration successful!' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Check credentials
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }
  console.log(`Login successful: ${email}`);
  res.json({ success: true, message: 'Login successful!' });
});

app.listen(PORT, () => {
  console.log(`Dummy backend running on http://localhost:${PORT}`);
}); 