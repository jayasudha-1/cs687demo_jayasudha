import { useState } from "react";
import axios from "axios";
import "./Chatbot.css"; // Import the CSS file

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    // Append user message to chat history
    setChatHistory([...chatHistory, { sender: "user", text: userMessage }]);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/chat", {
        userMessage: userMessage,
      });

      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: "bot", text: response.data.response },
      ]);

      setUserMessage(""); // Clear input field
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="chat-container">
      <p className="assistant-title">💰 SmartFinance AI - Your Finance Guide</p>

      <div className="chat-box">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <strong>{msg.sender === "user" ? "You" : "Assistant"}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="input-box">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message"
          className="input-field"
        />
        <div className="button-container">
          <button onClick={sendMessage} disabled={loading} className="send-button">
            {loading ? "Sending..." : "Send"}
          </button>
          <button onClick={handleClearChat} className="clear-button">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
