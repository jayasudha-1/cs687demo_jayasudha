import React from "react";
import {
  FaWallet,
  FaSearchPlus,
  FaChartBar,
} from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-teal-400 to-indigo-600 text-white py-24 px-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          {/* Heading */}
          <h1 className="text-5xl font-extrabold text-center tracking-wide">
            Simplify Your Financial Journey
          </h1>

          {/* Feature Icons */}
          <div className="flex space-x-16 mt-12">
            <div className="flex flex-col items-center">
              <div className="bg-white text-teal-500 p-5 rounded-full shadow-lg mb-4">
                <FaWallet className="text-4xl" />
              </div>
              <p className="text-xl font-semibold">Easy Expense Tracking</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white text-indigo-600 p-5 rounded-full shadow-lg mb-4">
                <FaSearchPlus className="text-4xl" />
              </div>
              <p className="text-xl font-semibold">Smart Search & Filters</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white text-yellow-500 p-5 rounded-full shadow-lg mb-4">
                <IoIosStats className="text-4xl" />
              </div>
              <p className="text-xl font-semibold">Data-Driven Insights</p>
            </div>
          </div>

          {/* Call to Action Button */}
          <Link to="/register">
            <button className="mt-10 px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
              Start Your Journey
            </button>
          </Link>
        </div>
      </div>

      {/* How it works */}
      <div className="py-24 px-8 bg-gray-50">
        <h2 className="text-4xl font-extrabold text-center text-gray-800">
          How It Works
        </h2>
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-teal-500 text-white p-6 rounded-full shadow-lg mb-6">
              <FaWallet className="text-3xl" />
            </div>
            <h3 className="mb-3 text-2xl font-semibold">Sign Up in Minutes</h3>
            <p className="text-lg">
              Quickly create an account and personalize your financial journey.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-indigo-500 text-white p-6 rounded-full shadow-lg mb-6">
              <FaSearchPlus className="text-3xl" />
            </div>
            <h3 className="mb-3 text-2xl font-semibold">Log Your Transactions</h3>
            <p className="text-lg">
              Effortlessly track your income and expenses with intuitive logging features.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-yellow-500 text-white p-6 rounded-full shadow-lg mb-6">
              <IoIosStats className="text-3xl" />
            </div>
            <h3 className="mb-3 text-2xl font-semibold">Get AI Advice</h3>
            <p className="text-lg">
              Chat with my bot and get financial advice
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
