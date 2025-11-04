const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

// Mock Cookie
const authCookieName = 'token';

// Placeholder for DB users
let users = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints 
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// POST /api/auth/create: Register a new user
apiRouter.post('/auth/create', async (req, res) => {
  // NOTE: This assumes the frontend uses 'username' and 'password' in the request body
  const { username, password } = req.body; 

  if (await findUser('username', username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(username, password);

    setAuthCookie(res, user.token);
    res.send({ username: user.username });
  }
});

// POST /api/auth/login: Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await findUser('username', username);

  if (user) {
    // For the mock, we just check if the user exists.
    if (password) { // Simple check to ensure password field is present
      user.token = uuid.v4(); // Generate new token
      setAuthCookie(res, user.token);
      res.send({ username: user.username });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DELETE /api/auth/logout: Logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    // In a real database, clear the token in the user record
    delete user.token; 
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// --- API ROUTES: APPLICATION DATA ---

// GET /api/user/me: Get current authenticated user details
apiRouter.get('/user/me', verifyAuth, (req, res) => {
  // The username is attached to req.user by verifyAuth
  res.send({ username: req.user.username });
});

// POST /api/booking: Submit a new booking
apiRouter.post('/booking', verifyAuth, (req, res) => {
  // MOCK: Logic for saving the booking goes here.
  const bookingData = { 
    ...req.body, 
    bookedBy: req.user.username,
    timestamp: new Date()
  };
  
  console.log(`MOCK: New booking received from ${req.user.username}`, bookingData);
  res.status(201).send({ msg: 'Booking confirmed (MOCK)', bookingId: uuid.v4() });
});

// --- MIDDLEWARE & FALLBACK ---

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user; // Attach user data to request
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown (client-side routing)
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


//  Creates and stores a mock user
async function createUser(username, password) {
  // NOTE: This mock does NOT hash the password.
  const user = {
    username: username,
    password: password, // Store plaintext in mock (not for production!)
    token: uuid.v4(),
  };
  users.push(user);

  return user;
}

/**
 * Finds a user by a given field (e.g., 'username' or 'token').
 */
async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === 'production', // Only secure in prod
    httpOnly: true, // Not accessible via client-side JS
    sameSite: 'strict',
  });
}

// --- SERVER INITIALIZATION ---

app.listen(port, () => {
  console.log(`Listening on port ${port} (MOCK SERVICE MODE)`);
});
