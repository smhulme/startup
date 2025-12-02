import React, { useState, useEffect, useRef } from 'react';

export default function AdminDashboard() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const [ws, setWs] = useState(null);
  const messagesEndRef = useRef(null);
  const selectedChatRef = useRef(null); // Keep track of current chat for WebSocket

  useEffect(() => {
    fetchChats();
    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // Update ref whenever state changes so WebSocket can access the current value
  useEffect(() => {
    selectedChatRef.current = selectedChat;
    if (selectedChat) {
      fetchMessages(selectedChat._id);
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChats = async () => {
    try {
      const response = await fetch('/api/admin/chats');
      if (response.ok) {
        const data = await response.json();
        setChats(data);
      }
    } catch (error) {
      console.error('Failed to fetch chats:', error);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const response = await fetch(`/api/admin/chat/${chatId}/messages`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const connectWebSocket = async () => {
    try {
      const response = await fetch('/api/auth/ws-ticket');
      if (!response.ok) return;
      const { ticket } = await response.json();

      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

      socket.onopen = () => {
        console.log('Admin WS Connected');
        socket.send(JSON.stringify({ type: 'auth', ticket }));
      };

      socket.onmessage = (event) => {
        console.log('Admin WS Message:', event.data);
        const message = JSON.parse(event.data);

        if (message.type === 'new_message') {
          // Always refresh the sidebar list to show the new "Last Message"
          fetchChats();

          // If the message is for the currently open chat, append it directly
          if (selectedChatRef.current && message.chatId === selectedChatRef.current._id.toString()) {
            setMessages((prev) => [
              ...prev,
              {
                senderRole: message.senderRole,
                content: message.content,
                timestamp: new Date()
              }
            ]);
          }
        }
      };

      setWs(socket);
    } catch (error) {
      console.error('WebSocket connection failed:', error);
    }
  };

  const sendReply = () => {
    if (!ws || !selectedChat || !reply) return;

    const message = {
      type: 'admin_reply',
      targetChatId: selectedChat._id,
      targetUserId: selectedChat.userId,
      content: reply,
    };

    ws.send(JSON.stringify(message));

    // Optimistically add message
    setMessages([...messages, { senderRole: 'admin', content: reply, timestamp: new Date() }]);
    setReply('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container-fluid text-light p-4">
      <h1>Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-4">
          <h3>Open Chats</h3>
          <div className="list-group">
            {chats.map((chat) => (
              <button
                key={chat._id}
                className={`list-group-item list-group-item-action ${selectedChat?._id === chat._id ? 'active' : ''}`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">User: {chat.username || chat.userId}</h5>
                  <small>{new Date(chat.updatedAt || chat.createdAt).toLocaleTimeString()}</small>
                </div>
                <p className="mb-1 text-truncate">{chat.lastMessage || 'No messages yet'}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-8">
          {selectedChat ? (
            <>
              <h3>Chat with User {selectedChat.userId}</h3>
              <div className="chat-box bg-secondary p-3 mb-3" style={{ height: '400px', overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                  <div key={index} className={`mb-2 ${msg.senderRole === 'admin' ? 'text-end' : 'text-start'}`}>
                    <span className={`badge ${msg.senderRole === 'admin' ? 'bg-primary' : 'bg-light text-dark'}`}>
                      {msg.content}
                    </span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendReply()}
                />
                <button className="btn btn-primary" onClick={sendReply}>Send</button>
              </div>
            </>
          ) : (
            <p>Select a chat to view messages.</p>
          )}
        </div>
      </div>
    </div>
  );
}