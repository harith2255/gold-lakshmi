import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Coins,
  FileText,
  AlertCircle,
  UserPlus,
  FilePlus,
  BarChart3,
} from 'lucide-react';
import { Badge } from './ui/badge';

interface DashboardProps {
  selectedBranch: string;
}

export function Dashboard({ selectedBranch }: DashboardProps) {
  const kpiData = [
    {
      title: 'Active Loans',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: FileText,
      color: 'blue',
    },
    {
      title: 'Closed Loans',
      value: '3,891',
      change: '+8.3%',
      trend: 'up',
      icon: FileText,
      color: 'green',
    },
    {
      title: 'Total Pledged Gold',
      value: '2,451 kg',
      change: '+15.2%',
      trend: 'up',
      icon: Coins,
      color: 'yellow',
    },
    {
      title: 'Interest Income',
      value: '₹45.2L',
      change: '+9.8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple',
    },
    {
      title: 'Total Customers',
      value: '4,523',
      change: '+18.1%',
      trend: 'up',
      icon: Users,
      color: 'indigo',
    },
    {
      title: 'Overdue Loans',
      value: '127',
      change: '-5.2%',
      trend: 'down',
      icon: AlertCircle,
      color: 'red',
    },
  ];

  const disbursementData = [
    { month: 'Jan', amount: 450 },
    { month: 'Feb', amount: 520 },
    { month: 'Mar', amount: 480 },
    { month: 'Apr', amount: 650 },
    { month: 'May', amount: 720 },
    { month: 'Jun', amount: 680 },
    { month: 'Jul', amount: 850 },
  ];

  const loanStatusData = [
    { name: 'Active', value: 1247, color: '#3b82f6' },
    { name: 'Closed', value: 3891, color: '#10b981' },
    { name: 'Overdue', value: 127, color: '#ef4444' },
    { name: 'In Auction', value: 45, color: '#f59e0b' },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'loan',
      message: 'New loan disbursed to Rajesh Kumar',
      amount: '₹2,50,000',
      time: '10 mins ago',
    },
    {
      id: 2,
      type: 'payment',
      message: 'Payment received from Priya Sharma',
      amount: '₹45,000',
      time: '25 mins ago',
    },
    {
      id: 3,
      type: 'customer',
      message: 'New customer registered - Amit Patel',
      amount: '',
      time: '1 hour ago',
    },
    {
      id: 4,
      type: 'valuation',
      message: 'Gold valuation completed for Sunita Devi',
      amount: '₹3,75,000',
      time: '2 hours ago',
    },
    {
      id: 5,
      type: 'alert',
      message: 'Loan overdue alert - Account #GL12345',
      amount: '',
      time: '3 hours ago',
    },
  ];

  const getIconColor = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
      green: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
      yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300',
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300',
      indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300',
      red: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
          <Button className="bg-yellow-600 hover:bg-yellow-700">
            <FilePlus className="w-4 h-4 mr-2" />
            New Loan
          </Button>
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Reports
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{kpi.title}</p>
                    <h3 className="mt-2 text-gray-900 dark:text-white">{kpi.value}</h3>
                    <div className="flex items-center gap-1 mt-2">
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      )}
                      <span
                        className={`text-xs ${
                          kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${getIconColor(kpi.color)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Loan Disbursement Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Loan Disbursement Trend (₹ Lakhs)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={disbursementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Loan Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Loan Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={loanStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {loanStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">{activity.message}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {activity.time}
                  </p>
                </div>
                {activity.amount && (
                  <Badge variant="secondary" className="ml-4">
                    {activity.amount}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
