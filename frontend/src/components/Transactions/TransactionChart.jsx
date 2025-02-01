import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { listTransactionsAPI } from "../../services/transactions/transactionService";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const TransactionChart = () => {
  const { data: transactions, isError, isLoading } = useQuery({
    queryFn: listTransactionsAPI,
    queryKey: ["list-transactions"],
  });

  // Calculate total income and expense
  const totals = transactions?.reduce(
    (acc, transaction) => {
      if (transaction?.type === "income") {
        acc.income += transaction?.amount;
      } else {
        acc.expense += transaction?.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  ) || { income: 0, expense: 0 };

  // Calculate percentage of expenses relative to income
  const expensePercentage = totals.income
    ? ((totals.expense / totals.income) * 100).toFixed(2)
    : 0;

  // Provide financial advice based on expense percentage
  let advice = "";
  if (expensePercentage > 50) {
    advice = "Warning: Your expenses exceed 50% of your income. Consider cutting back on non-essential spending.";
  } else if (expensePercentage > 30) {
    advice = "You are spending over 30% of your income on expenses. Review your spending habits and see where you can save.";
  } else {
    advice = "Good job! Your expenses are under control, keep up the good work.";
  }

  // Organize transactions by month
  const monthlyData = transactions?.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    acc[month][transaction.type] += transaction.amount;
    return acc;
  }, {}) || {};

  const months = Object.keys(monthlyData);
  const incomeValues = months.map(month => monthlyData[month].income);
  const expenseValues = months.map(month => monthlyData[month].expense);

  // Data structure for the Pie Chart
  const pieData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [totals.income, totals.expense],
        backgroundColor: ["#4CAF50", "#FF0000"],
        borderColor: ["#4CAF50", "#FF0000"],
        borderWidth: 2,
      },
    ],
  };

  // Data structure for the Bar Chart
  const barData = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: incomeValues,
        backgroundColor: "#4CAF50",
      },
      {
        label: "Expense",
        data: expenseValues,
        backgroundColor: "#FF0000",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">Transaction Overview</h1>
      <div className="flex flex-col md:flex-row justify-around items-center">
        {/* Pie Chart */}
        <div style={{ width: "45%", height: "350px" }}>
          <Doughnut data={pieData} options={options} />
        </div>
        {/* Bar Chart */}
        <div style={{ width: "45%", height: "350px" }}>
          <Bar data={barData} options={options} />
        </div>
      </div>
      {/* Display Advice */}
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-gray-700">{advice}</p>
      </div>
    </div>
  );
};

export default TransactionChart;
