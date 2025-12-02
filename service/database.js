const { MongoClient, ObjectId } = require('mongodb'); // Import ObjectId
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
let db;
let usersCollection;
let bookingsCollection;
let chatsCollection;    // NEW
let messagesCollection; // NEW

(async function connectToDb() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('startup');
    usersCollection = db.collection('users');
    bookingsCollection = db.collection('bookings');
    chatsCollection = db.collection('chats');       // NEW
    messagesCollection = db.collection('messages'); // NEW
  } catch (ex) {
    console.error(`Failed to connect to MongoDB: ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(username) {
  return usersCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return usersCollection.findOne({ token: token });
}

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
    type: 'user', // Default type
  };
  await usersCollection.insertOne(user);
  return user;
}

async function updateUserToken(userId, token) {
  if (token) {
    await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $set: { token: token } });
  } else {
    await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $unset: { token: '' } });
  }
}

// NEW: Helper to promote user to admin (used in index.js)
async function updateUserType(userId, type) {
  await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $set: { type: type } });
}

async function addBooking(bookingData) {
  const result = await bookingsCollection.insertOne(bookingData);
  return result;
}

// --- NEW CHAT FUNCTIONS ---

async function getOpenChats() {
  // Returns all chats, sorted by most recently updated
  return chatsCollection.find({}).sort({ updatedAt: -1 }).toArray();
}

async function getOrCreateChat(userId, username) {
  // Check if chat exists for this user with 'open' status
  let chat = await chatsCollection.findOne({ userId, status: 'open' });
  let isNew = false;
  if (!chat) {
    const newChat = { userId, username, status: 'open', createdAt: new Date() };
    const result = await chatsCollection.insertOne(newChat);
    chat = { _id: result.insertedId, ...newChat };
    isNew = true;
  }
  return { chat, isNew };
}

async function addMessage(chatId, senderId, senderRole, content) {
  const message = {
    chatId: new ObjectId(chatId),
    senderId: new ObjectId(senderId),
    senderRole: senderRole,
    content: content,
    timestamp: new Date()
  };
  await messagesCollection.insertOne(message);

  // Update the parent chat with the last message preview
  await chatsCollection.updateOne(
    { _id: new ObjectId(chatId) },
    {
      $set: {
        lastMessage: content,
        updatedAt: new Date()
      }
    }
  );
}

async function getChatMessages(chatId) {
  return messagesCollection.find({ chatId: new ObjectId(chatId) }).sort({ timestamp: 1 }).toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  updateUserToken,
  updateUserType,
  addBooking,
  getOpenChats,
  getOrCreateChat,
  addMessage,
  getChatMessages,
};