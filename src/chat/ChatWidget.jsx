import React, { useState, useEffect, useRef } from 'react';
import './ChatWidget.css';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      if (ws.current) ws.current.close();
      ws.current = null;
      setIsConnected(false);
      return;
    }
    async function connect() {
      const response = await fetch('/api/auth/ws-ticket');
      const { ticket } = await response.json();
      const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
      ws.current = new WebSocket(`${protocol}${window.location.host}/ws`);
      ws.current.onopen = () => ws.current.send(JSON.stringify({ type: 'auth', ticket }));
      ws.current.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.type === 'auth_success') setIsConnected(true);
        if (msg.type === 'new_message') {

          if (msg.senderRole !== 'user') {
            setMessages(prev => [...prev, msg]);
          }
        }
      };
    }
    connect();
    return () => { if (ws.current) ws.current.close(); };
  }, [isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (currentMessage && ws.current && isConnected) {
      ws.current.send(JSON.stringify({ type: 'user_message', content: currentMessage }));
      setMessages(prev => [...prev, { senderRole: 'user', content: currentMessage }]);
      setCurrentMessage('');
    }
  };

  if (!isOpen) {
    return (
      <button className="chat-open-button" onClick={() => setIsOpen(true)}>
        Chat
      </button>
    );
  }

  return (
    <div className="chat-widget-box">
      <div className="chat-header">
        <h3>Live Chat</h3>
        <button onClick={() => setIsOpen(false)}>&times;</button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.senderRole}`}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <form className="chat-input" onSubmit={handleSend}>
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}