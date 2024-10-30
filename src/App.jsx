import React, { useState } from 'react';
import './App.css';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      // Add user's message
      const newMessages = [...messages, { text: input, sender: "user" }];
      
      // Clear the input field
      setInput("");

      // Simulate response from "ChatGPT"
      setTimeout(() => {
        const botResponse = generateBotResponse(input);
        setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
      }, 500);
    }
  };

  const generateBotResponse = (userMessage) => {
    // Simple logic to respond to user (customize this as needed)
    if (userMessage.toLowerCase().includes("hello")) {
      return "Hi there! How can I assist you today?";
    } else if (userMessage.toLowerCase().includes("how are you")) {
      return "I'm here to help you with any questions you have!";
    } else {
      return "I'm here to help with anything you need!";
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <div className="message-content">{message.text}</div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;