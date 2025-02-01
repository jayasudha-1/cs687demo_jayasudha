// In Dashboard.jsx
import React from "react";
import TransactionChart from "../Transactions/TransactionChart";
import TransactionList from "../Transactions/TransactionList";
import Chatbot from "../Chatbot"; 

const Dashboard = () => {
  return (
    <>
      <TransactionChart />
      <TransactionList />
      <div className="chatbot-section mt-8">
        <Chatbot />
      </div>
    </>
  );
};

export default Dashboard;
