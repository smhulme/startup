const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Use port 4000 as required by the instructions
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON middleware to parse request bodies
app.use(express.json());

// Cookie middleware to parse cookies
app.use(cookieParser());

// === AUTHENTICATION ENDPOINTS ===
// POST /api/auth/create - For new user registration
// POST /api/auth/login - For user login
// DELETE /api/auth/logout - For user logout

// === APPLICATION ENDPOINTS ===
// GET /api/user/me - A restricted endpoint to get current user
// POST /api/booking - A restricted endpoint to submit a booking

// Serve static files from 'public' (for when deployed)
app.use(express.static('public'));

// Default error handler
app.use((err, req, res, next) => {
  res.status(500).send({ type: err.name, message: err.message });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});