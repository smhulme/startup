const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
require('dotenv').config();
const uuid = require('uuid');
const http = require('http');
const { WebSocketServer } = require('ws');
const emailService = require('./emailService.js');
const app = express();
const DB = require('./database.js'); // <-- Import the new database module

const authCookieName = 'token';

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
  const { username, password } = req.body;

  if (await DB.getUser(username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(username, password);
    setAuthCookie(res, user.token);
    res.send({ username: user.username, type: user.type });
  }
});

// POST /api/auth/login: Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await DB.getUser(username);

  if (user) {
    // Check if the password matches the stored hash
    if (await bcrypt.compare(password, user.password)) {
      // Generate and store a new token
      const newToken = uuid.v4();
      await DB.updateUserToken(user._id, newToken);

      // Auto-promote 'admin' user if type is missing or incorrect
      if (user.username === 'admin' && user.type !== 'admin') {
        await DB.updateUserType(user._id, 'admin');
        user.type = 'admin';
      }

      setAuthCookie(res, newToken);
      res.send({ username: user.username, type: user.type });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DELETE /api/auth/logout: Logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    // Clear the token in the database
    await DB.updateUserToken(user._id, null);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    req.user = user; // Attach user data to request
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// GET /api/user/me: Get current authenticated user details
apiRouter.get('/user/me', verifyAuth, (req, res) => {
  // The username is attached to req.user by verifyAuth
  res.send({ username: req.user.username });
});

// POST /api/booking: Submit a new booking
apiRouter.post('/booking', verifyAuth, async (req, res) => {
  const bookingData = {
    ...req.body,
    bookedBy: req.user.username, // Add the authenticated user
    timestamp: new Date()
  };

  try {
    const result = await DB.addBooking(bookingData);
    console.log(`New booking saved with id ${result.insertedId}`);
    res.status(201).send({ msg: 'Booking confirmed', bookingId: result.insertedId });
  } catch (error) {
    console.error('Failed to save booking:', error);
    res.status(500).send({ msg: 'Failed to save booking' });
  }
});

// GET /api/auth/ws-ticket: Generate a WebSocket ticket
apiRouter.get('/auth/ws-ticket', verifyAuth, (req, res) => {
  const ticket = uuid.v4();
  wsTickets.set(ticket, { id: req.user._id, username: req.user.username, type: req.user.type });
  setTimeout(() => wsTickets.delete(ticket), 30000);
  res.send({ ticket });
});

// GET /api/admin/chats: Get all open chats (Admin only)
apiRouter.get('/admin/chats', verifyAuth, async (req, res) => {
  console.log('GET /api/admin/chats - User:', req.user.username, 'Type:', req.user.type);
  if (req.user.type !== 'admin') {
    console.log('Access denied: User is not admin');
    res.status(403).send({ msg: 'Forbidden' });
    return;
  }
  const chats = await DB.getOpenChats();
  res.send(chats);
});

// GET /api/admin/chat/:chatId/messages: Get messages for a specific chat (Admin only)
apiRouter.get('/admin/chat/:chatId/messages', verifyAuth, async (req, res) => {
  if (req.user.type !== 'admin') {
    res.status(403).send({ msg: 'Forbidden' });
    return;
  }
  const messages = await DB.getChatMessages(req.params.chatId);
  res.send(messages);
});

// WebSocket server setup
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const activeConnections = new Map();
const wsTickets = new Map();

wss.on('connection', (ws) => {
  ws.on('message', async (messageBuffer) => {
    const message = JSON.parse(messageBuffer.toString());
    if (message.type === 'auth') {
      const userMap = wsTickets.get(message.ticket);
      if (userMap) {
        wsTickets.delete(message.ticket);
        ws.userId = userMap.id;
        ws.username = userMap.username;
        ws.isAdmin = userMap.type === 'admin';
        activeConnections.set(userMap.id.toString(), ws);
        ws.send(JSON.stringify({ type: 'auth_success' }));
      }
    }
    if (message.type === 'user_message' && ws.userId) {
      const { chat, isNew } = await DB.getOrCreateChat(ws.userId, ws.username);
      await DB.addMessage(chat._id, ws.userId, 'user', message.content);
      if (isNew) {
        emailService.sendNewChatEmail('User'); // Replace with actual username
      }
      console.log('Broadcasting to admins. Active connections:', activeConnections.size);
      activeConnections.forEach((clientWs) => {
        if (clientWs.isAdmin) {
          console.log('Sending new_message to admin');
          clientWs.send(JSON.stringify({ type: 'new_message', content: message.content, senderRole: 'user', chatId: chat._id.toString() }));
        }
      });
    }
    if (message.type === 'admin_reply' && ws.isAdmin) {
      const { targetChatId, targetUserId, content } = message;
      await DB.addMessage(targetChatId, ws.userId, 'admin', content);
      const targetWs = activeConnections.get(targetUserId);
      if (targetWs) {
        console.log(`Sending admin reply to user ${targetUserId}`);
        targetWs.send(JSON.stringify({ type: 'new_message', content, senderRole: 'admin' }));
      } else {
        console.log(`User ${targetUserId} not found in active connections`);
      }
    }
  });
  ws.on('close', () => {
    if (ws.userId) activeConnections.delete(ws.userId.toString());
  });
});

// FALLBACK & ERROR HANDLERS

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown (client-side routing)
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === 'production', // Only secure in prod
    httpOnly: true, // Not accessible via client-side JS
    sameSite: 'strict',
  });
}

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});