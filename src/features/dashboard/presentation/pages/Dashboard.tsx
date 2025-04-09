import React from "react";
import { useNavigate } from "react-router";
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center p-10 dashboard-background"
    >
      <div className="p-12 max-w-4xl w-full bg-white shadow-2xl rounded-2xl border border-white border-opacity-10 transition-all duration-300 ease-in-out">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 relative pb-4">
          Welcome
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-green-500"></span>
        </h1>
        <nav>
          <ul className="flex justify-center gap-6 mt-10">
            <li className="transition-transform transform hover:-translate-y-1">
              <button
                onClick={() => navigate("/users")}
                className="px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl"
              >
                User Management
              </button>
            </li>
            <li className="transition-transform transform hover:-translate-y-1">
              <button
                onClick={() => navigate("/users/register")}
                className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl"
              >
                Register User
              </button>
            </li>
            <li className="transition-transform transform hover:-translate-y-1">
              <button
                onClick={() => navigate("/filmhub")}
                className="px-6 py-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 hover:shadow-xl"
              >
                Manage Films
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;