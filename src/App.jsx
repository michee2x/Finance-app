import React, { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message to the chat UI
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Update conversation state for context
    const userMessage = { role: "user", content: input };
    const updatedConversation = [...conversation, userMessage];

    try {
      const botMessage = await fetchChatGPTResponse(updatedConversation);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, sender: "bot" },
      ]);
      setConversation([...updatedConversation, { role: "assistant", content: botMessage }]);
    } catch (error) {
      console.error("Error fetching response from API:", error);
    }
  };

  // Custom fetch function to call OpenAI API
  const fetchChatGPTResponse = async (conversation) => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: conversation,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from ChatGPT API");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === "user" ? "user" : "bot"}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;