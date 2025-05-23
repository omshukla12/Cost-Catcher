import React, { useState } from "react";
import {
  Target,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ArrowLeft,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  BarChart2,
  Award,
  TrendingUp,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import clsx from "clsx";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data for goals
const goalsData = [
  {
    id: 1,
    name: "Save ₹20,000 this year",
    type: "savings",
    target: 20000,
    current: 15000,
    progress: 75,
    startDate: "Jan 1, 2023",
    endDate: "Dec 31, 2023",
    status: "in_progress",
    category: "General",
    history: [
      { month: "Jan", amount: 1200 },
      { month: "Feb", amount: 1500 },
      { month: "Mar", amount: 2000 },
      { month: "Apr", amount: 1800 },
      { month: "May", amount: 2500 },
      { month: "Jun", amount: 3000 },
      { month: "Jul", amount: 3000 },
    ],
  },
  {
    id: 2,
    name: "Track 50 products",
    type: "tracking",
    target: 50,
    current: 42,
    progress: 84,
    startDate: "Jan 1, 2023",
    endDate: "Dec 31, 2023",
    status: "in_progress",
    category: "General",
    history: [
      { month: "Jan", amount: 5 },
      { month: "Feb", amount: 12 },
      { month: "Mar", amount: 18 },
      { month: "Apr", amount: 25 },
      { month: "May", amount: 32 },
      { month: "Jun", amount: 38 },
      { month: "Jul", amount: 42 },
    ],
  },
  {
    id: 3,
    name: "Complete profile",
    type: "profile",
    target: 100,
    current: 60,
    progress: 60,
    startDate: "Jan 1, 2023",
    endDate: "Dec 31, 2023",
    status: "in_progress",
    category: "Account",
    history: [
      { month: "Jan", amount: 20 },
      { month: "Feb", amount: 30 },
      { month: "Mar", amount: 40 },
      { month: "Apr", amount: 50 },
      { month: "May", amount: 55 },
      { month: "Jun", amount: 60 },
      { month: "Jul", amount: 60 },
    ],
  },
  {
    id: 4,
    name: "Save ₹5,000 on Electronics",
    type: "savings",
    target: 5000,
    current: 3500,
    progress: 70,
    startDate: "Jan 1, 2023",
    endDate: "Dec 31, 2023",
    status: "in_progress",
    category: "Electronics",
    history: [
      { month: "Jan", amount: 0 },
      { month: "Feb", amount: 500 },
      { month: "Mar", amount: 1200 },
      { month: "Apr", amount: 1800 },
      { month: "May", amount: 2500 },
      { month: "Jun", amount: 3000 },
      { month: "Jul", amount: 3500 },
    ],
  },
  {
    id: 5,
    name: "Save ₹10,000 on Home Appliances",
    type: "savings",
    target: 10000,
    current: 2500,
    progress: 25,
    startDate: "Jan 1, 2023",
    endDate: "Dec 31, 2023",
    status: "in_progress",
    category: "Home Appliances",
    history: [
      { month: "Jan", amount: 0 },
      { month: "Feb", amount: 0 },
      { month: "Mar", amount: 500 },
      { month: "Apr", amount: 1000 },
      { month: "May", amount: 1500 },
      { month: "Jun", amount: 2000 },
      { month: "Jul", amount: 2500 },
    ],
  },
  {
    id: 6,
    name: "Save ₹2,000 on Fashion",
    type: "savings",
    target: 2000,
    current: 2000,
    progress: 100,
    startDate: "Jan 1, 2023",
    endDate: "Jun 30, 2023",
    status: "completed",
    category: "Fashion",
    history: [
      { month: "Jan", amount: 300 },
      { month: "Feb", amount: 600 },
      { month: "Mar", amount: 1000 },
      { month: "Apr", amount: 1400 },
      { month: "May", amount: 1800 },
      { month: "Jun", amount: 2000 },
      { month: "Jul", amount: 2000 },
    ],
  },
];

// Sample data for achievements
const achievements = [
  {
    id: 1,
    name: "First Savings",
    description: "Save your first ₹1,000",
    completed: true,
    icon: DollarSign,
  },
  {
    id: 2,
    name: "Tracking Pro",
    description: "Track 25 products",
    completed: true,
    icon: Target,
  },
  {
    id: 3,
    name: "Savings Master",
    description: "Save ₹10,000 total",
    completed: true,
    icon: Award,
  },
  {
    id: 4,
    name: "Category Expert",
    description: "Complete a category-specific goal",
    completed: true,
    icon: CheckCircle,
  },
  {
    id: 5,
    name: "Goal Setter",
    description: "Create 5 goals",
    completed: true,
    icon: Target,
  },
  {
    id: 6,
    name: "Super Saver",
    description: "Save ₹25,000 total",
    completed: false,
    icon: DollarSign,
  },
  {
    id: 7,
    name: "Tracking Champion",
    description: "Track 100 products",
    completed: false,
    icon: Target,
  },
  {
    id: 8,
    name: "Goal Master",
    description: "Complete 10 goals",
    completed: false,
    icon: CheckCircle,
  },
];

// Sample data for goal suggestions
const goalSuggestions = [
  {
    id: 1,
    name: "Save ₹5,000 on Electronics",
    description: "Based on your tracking habits",
    type: "savings",
  },
  {
    id: 2,
    name: "Track 10 more products",
    description: "Expand your tracking portfolio",
    type: "tracking",
  },
  {
    id: 3,
    name: "Save ₹3,000 on Home Appliances",
    description: "Good deals expected soon",
    type: "savings",
  },
];

export default function Goals() {
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalType, setNewGoalType] = useState("savings");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [newGoalCategory, setNewGoalCategory] = useState("General");
  const [newGoalEndDate, setNewGoalEndDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedGoal, setSelectedGoal] = useState(goalsData[0]);

  const filteredGoals = goalsData.filter(
    (goal) =>
      (filterCategory === "All" || goal.category === filterCategory) &&
      (filterStatus === "All" || goal.status === filterStatus)
  );

  const categories = [
    "All",
    "General",
    "Electronics",
    "Home Appliances",
    "Fashion",
    "Account",
  ];
  const statuses = ["All", "in_progress", "completed"];

  const handleNewGoalSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would add the new goal to the state or call an API
    console.log("New goal submitted:", {
      newGoalName,
      newGoalType,
      newGoalTarget,
      newGoalCategory,
      newGoalEndDate,
    });
    setShowNewGoalForm(false);
    // Reset form
    setNewGoalName("");
    setNewGoalType("savings");
    setNewGoalTarget("");
    setNewGoalCategory("General");
    setNewGoalEndDate("");
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "in_progress":
        return "text-blue-500";
      case "completed":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return "bg-green-500";
    if (progress >= 75) return "bg-blue-500";
    if (progress >= 50) return "bg-yellow-500";
    if (progress >= 25) return "bg-orange-500";
    return "bg-red-500";
  };

  const formatValue = (goal) => {
    if (goal.type === "savings") {
      return `₹${goal.current.toLocaleString()} / ₹${goal.target.toLocaleString()}`;
    }
    return `${goal.current} / ${goal.target}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/dashboard" className="mr-4">
                <ArrowLeft className="h-5 w-5 text-gray-200 hover:text-orange-500 focus:outline-none" />
              </Link>
              <h1 className="text-2xl font-bold">Goals & Achievements</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar name="User" size="32" round={true} color="#FF6B6B" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Your Savings Goals</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Track your progress and set new goals
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "All" ? "All Statuses" : getStatusLabel(status)}
                </option>
              ))}
            </select>

            <button
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-[#FF5252] flex items-center"
              onClick={() => setShowNewGoalForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Goals List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">
                  Your Goals ({filteredGoals.length})
                </h3>
              </div>

              {filteredGoals.length === 0 ? (
                <div className="p-8 text-center">
                  <Target className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    No goals found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Try adjusting your filters or create a new goal
                  </p>
                  <button
                    className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-[#FF5252]"
                    onClick={() => setShowNewGoalForm(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Goal
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredGoals.map((goal) => (
                    <div
                      key={goal.id}
                      className={clsx(
                        "p-4 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer",
                        {
                          "bg-gray-100 dark:bg-gray-900":
                            selectedGoal?.id === goal.id,
                        }
                      )}
                      onClick={() => setSelectedGoal(goal)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h4 className="font-medium">{goal.name}</h4>
                            <span
                              className={clsx(
                                "ml-2 text-xs px-2 py-0.5 rounded-full",
                                getStatusColor(goal.status)
                              )}
                            >
                              {getStatusLabel(goal.status)}
                            </span>
                          </div>

                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <span>{goal.category}</span>
                            <span className="mx-2">•</span>
                            <span>Ends: {goal.endDate}</span>
                          </div>

                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>{formatValue(goal)}</span>
                              <span>{goal.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className={clsx(
                                  "h-2 rounded-full",
                                  getProgressColor(goal.progress)
                                )}
                                style={{ width: `${goal.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-orange-500">
                            <Edit className="h-5 w-5" />
                          </button>
                          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-red-500">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Goal Details */}
            {selectedGoal && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold">Goal Details</h3>
                </div>
                <div className="p-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <h4 className="font-medium text-lg mb-2">
                        {selectedGoal.name}
                      </h4>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Category
                          </p>
                          <p className="font-medium">{selectedGoal.category}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Status
                          </p>
                          <p
                            className={clsx(
                              "font-medium",
                              getStatusColor(selectedGoal.status)
                            )}
                          >
                            {getStatusLabel(selectedGoal.status)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Start Date
                          </p>
                          <p className="font-medium">
                            {selectedGoal.startDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            End Date
                          </p>
                          <p className="font-medium">{selectedGoal.endDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Target
                          </p>
                          <p className="font-medium">
                            {selectedGoal.type === "savings"
                              ? `₹${selectedGoal.target.toLocaleString()}`
                              : selectedGoal.target}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Current
                          </p>
                          <p className="font-medium text-orange-500">
                            {selectedGoal.type === "savings"
                              ? `₹${selectedGoal.current.toLocaleString()}`
                              : selectedGoal.current}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{selectedGoal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div
                            className={clsx(
                              "h-3 rounded-full",
                              getProgressColor(selectedGoal.progress)
                            )}
                            style={{ width: `${selectedGoal.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-64 h-48">
                      <p className="text-sm font-medium mb-2">
                        Progress Over Time
                      </p>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={selectedGoal.history}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [
                              selectedGoal.type === "savings"
                                ? `₹${value}`
                                : value,
                              "Amount",
                            ]}
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.9)",
                              border: "none",
                              borderRadius: "4px",
                              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                            }}
                          />
                          <Bar dataKey="amount" fill="#FF6B6B" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Overall Progress */}
            <div className="bg-gradient-to-r from-orange-500 to-[#FFB4B4] rounded-lg shadow text-white">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-6 w-6 mr-2" />
                  <h3 className="text-lg font-semibold">Overall Progress</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Total Savings</span>
                      <span>₹15,000 / ₹20,000</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Goals Completed</span>
                      <span>1 / 6</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full"
                        style={{ width: "17%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Achievements Unlocked</span>
                      <span>5 / 8</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full"
                        style={{ width: "63%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">Your Achievements</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={clsx("p-3 rounded-lg border", {
                        "border-green-200 dark:border-green-900/30 bg-green-50 dark:bg-green-900/10":
                          achievement.completed,
                        "border-gray-200 dark:border-gray-700":
                          !achievement.completed,
                      })}
                    >
                      <div className="flex items-center">
                        <div
                          className={clsx("p-2 rounded-full mr-3", {
                            "bg-green-100 dark:bg-green-900/20 text-green-600":
                              achievement.completed,
                            "bg-gray-100 dark:bg-gray-700 text-gray-500":
                              !achievement.completed,
                          })}
                        >
                          <achievement.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{achievement.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.completed && (
                          <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Goal Suggestions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">Suggested Goals</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {goalSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-orange-500 hover:shadow-sm transition-all duration-200"
                    >
                      <h4 className="font-medium">{suggestion.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {suggestion.description}
                      </p>
                      <button
                        className="mt-2 text-sm text-orange-500 hover:underline flex items-center"
                        onClick={() => {
                          setNewGoalName(suggestion.name);
                          setNewGoalType(suggestion.type);
                          setShowNewGoalForm(true);
                        }}
                      >
                        Add This Goal
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* New Goal Modal */}
      {showNewGoalForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Create New Goal</h3>
              <button
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => setShowNewGoalForm(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleNewGoalSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="goalName"
                    className="block text-sm font-medium mb-1"
                  >
                    Goal Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="goalName"
                    type="text"
                    placeholder="e.g. Save ₹10,000 this year"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={newGoalName}
                    onChange={(e) => setNewGoalName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="goalType"
                    className="block text-sm font-medium mb-1"
                  >
                    Goal Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="goalType"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={newGoalType}
                    onChange={(e) => setNewGoalType(e.target.value)}
                    required
                  >
                    <option value="savings">Savings Goal</option>
                    <option value="tracking">Tracking Goal</option>
                    <option value="profile">Profile Completion</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="goalTarget"
                    className="block text-sm font-medium mb-1"
                  >
                    Target Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    {newGoalType === "savings" && (
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    )}
                    <input
                      id="goalTarget"
                      type="number"
                      placeholder={
                        newGoalType === "savings" ? "e.g. 10000" : "e.g. 50"
                      }
                      className={clsx(
                        "w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500",
                        {
                          "pl-10 pr-4 py-2": newGoalType === "savings",
                          "px-4 py-2": newGoalType !== "savings",
                        }
                      )}
                      value={newGoalTarget}
                      onChange={(e) => setNewGoalTarget(e.target.value)}
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="goalCategory"
                    className="block text-sm font-medium mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="goalCategory"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={newGoalCategory}
                    onChange={(e) => setNewGoalCategory(e.target.value)}
                  >
                    {categories
                      .filter((c) => c !== "All")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="goalEndDate"
                    className="block text-sm font-medium mb-1"
                  >
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="goalEndDate"
                      type="date"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={newGoalEndDate}
                      onChange={(e) => setNewGoalEndDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-650 focus:outline-none"
                  onClick={() => setShowNewGoalForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-[#FF5252] focus:outline-none"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
