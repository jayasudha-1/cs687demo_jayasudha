import React, { useState } from "react";
import './Chatbot.css'; // Import the CSS file

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Predefined financial FAQs for fast responses
  const faq = {
    "What is a savings account?": "A savings account is a bank account that earns interest on your deposits, typically with low risk.",
    "How do I create budget?": "To create a budget, list your monthly income and expenses, then allocate funds for each category based on priorities.",
    "What is the best investment strategy?": "It depends on your financial goals and risk tolerance. Diversifying across stocks, bonds, and real estate is commonly recommended.",
    "What is compound interest?": "Compound interest is the interest on a loan or deposit that is calculated based on both the initial principal and the accumulated interest from previous periods.",
    "How do I start investing?": "To start investing, assess your financial goals, risk tolerance, and time horizon. Consider diversifying your portfolio with stocks, bonds, and other assets. It’s advisable to start small and gradually increase your investments as you learn.",
    "What is a credit score?": "A credit score is a numerical representation of your creditworthiness. It is based on your credit history, including your payment habits, outstanding debt, and length of credit history. A higher score can help you secure better loan terms.",
    "What is an emergency fund?": "An emergency fund is a savings buffer set aside for unexpected expenses such as medical bills, car repairs, or job loss. It’s typically recommended to have 3 to 6 months' worth of living expenses saved up.",
    "How can I reduce my debt?": "To reduce debt, prioritize high-interest debts, make more than the minimum payments, and avoid accumulating more debt. Consider debt consolidation or refinancing options to lower interest rates.",
    "What is the difference between a Roth IRA and a Traditional IRA?": "A Roth IRA allows you to contribute after-tax money, and qualified withdrawals are tax-free in retirement. A Traditional IRA allows you to contribute pre-tax money, but withdrawals are taxed as income in retirement.",
    "What is the stock market?": "The stock market is a collection of markets where stocks (shares of publicly traded companies) are bought and sold. It provides companies with capital and gives investors a chance to own a part of companies and potentially profit from their growth.",
    "What is the debt-to-income ratio?": "The debt-to-income ratio is the percentage of your monthly income that goes towards paying debts. A lower ratio is preferred by lenders, as it indicates that you have enough income to manage additional debt.",
    "What is diversification in investing?": "Diversification involves spreading your investments across different asset classes (stocks, bonds, real estate) to reduce risk. The goal is to avoid putting all your money into one type of investment, which can be risky if it underperforms.",
    "What is inflation?": "Inflation is the rate at which the general level of prices for goods and services rises, eroding the purchasing power of money. A moderate level of inflation is normal, but high inflation can negatively affect the economy.",
    "What is a 401(k) plan?": "A 401(k) is an employer-sponsored retirement savings plan that allows employees to contribute a portion of their salary on a pre-tax basis. Many employers also offer matching contributions, which can help boost your retirement savings.",
    "How do I calculate net worth?": "Net worth is calculated by subtracting your liabilities (debts) from your assets (what you own). If your assets exceed your liabilities, you have a positive net worth; if liabilities are higher, your net worth is negative.",
    "What are dividends?": "Dividends are payments made by companies to their shareholders, usually from profits. They can be a good source of income for investors who hold stocks in dividend-paying companies.",
    "What is a mortgage?": "A mortgage is a type of loan used to purchase real estate, where the property itself serves as collateral. Mortgages are typically repaid over 15 to 30 years with fixed or variable interest rates."
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputMessage) return;

    const newMessages = [...messages, { role: "user", content: inputMessage }];
    setMessages(newMessages);
    setInputMessage("");
    setLoading(true);

    // Check if the message matches any of the predefined FAQs
    const predefinedAnswer = faq[inputMessage.trim()];

    if (predefinedAnswer) {
      // Instant response for predefined questions
      setMessages([...newMessages, { role: "assistant", content: predefinedAnswer }]);
      setLoading(false);
    } else {
      // Check for "thank you" or "bye"
      if (inputMessage.toLowerCase().includes("thank you") || inputMessage.toLowerCase().includes("okay")) {
        setMessages([ 
          ...newMessages,
          { role: "assistant", content: "You're welcome! Let me know if you have any more questions." }
        ]);
        setLoading(false);
        return;
      } else if (inputMessage.toLowerCase().includes("bye")) {
        setMessages([ 
          ...newMessages,
          { role: "assistant", content: "Goodbye! It was a pleasure helping you. Feel free to reach out again!" }
        ]);
        setLoading(false);
        return;
      }

      // If the message includes "hi" or "hello", respond with the greeting
      if (inputMessage.toLowerCase().includes("hi") || inputMessage.toLowerCase().includes("hello")) {
        setMessages([ 
          ...newMessages,
          { role: "assistant", content: "Hello! I am your financial advisor. Ask me any finance-related questions." }
        ]);
        setLoading(false);
        return;
      }

      // Otherwise, process the message asynchronously with a timeout to simulate "thinking"
      try {
        setTimeout(async () => {
          // Call Mistral model for more complex queries
          const response = await fetch("http://localhost:11434/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "mistral",
              messages: [
                ...newMessages,
                { role: "system", content: "You are a financial advisor. Please assist with personal finance queries." },
              ],
              stream: false,
            }),
          });

          const data = await response.json();
          setMessages([...newMessages, { role: "assistant", content: data.message.content }]);
          setLoading(false);
        }, 5000); // Simulate a 5-second processing time before calling Mistral
      } catch (error) {
        console.error("Error fetching chat response:", error);
      }
    }
  };

  // Function to clear the chat
  const handleClearChat = () => {
    setMessages([]);  // Clears the messages state
  };

  return (
    <div className="chat-container">
    <p className="assistant-title">💰 SmartFinance AI - Your Finance Guide</p>

      <div className="chat-box">
      
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="input-box">
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Type your message"
          className="input-field"
        />
        <div className="button-container">
          <button onClick={handleSendMessage} disabled={loading} className="send-button">
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
