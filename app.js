// app.js
const express = require('express');
const cookieParser = require('cookie-parser'); // Add cookie-parser to handle cookies
const path = require('path');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(cookieParser()); // Use cookie parser middleware
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', userRoutes); // This routes the /auth paths to userRoutes

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
