import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  BarChart,
  Bar,
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
import { Download, FileText, TrendingUp, Calendar } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ReportsProps {
  selectedBranch: string;
}

export function Reports({ selectedBranch }: ReportsProps) {
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState('month');

  const disbursementData = [
    { month: 'Jan', amount: 4500 },
    { month: 'Feb', amount: 5200 },
    { month: 'Mar', amount: 4800 },
    { month: 'Apr', amount: 6500 },
    { month: 'May', amount: 7200 },
    { month: 'Jun', amount: 6800 },
  ];

  const interestIncomeData = [
    { month: 'Jan', income: 450 },
    { month: 'Feb', income: 520 },
    { month: 'Mar', income: 580 },
    { month: 'Apr', income: 650 },
    { month: 'May', income: 720 },
    { month: 'Jun', income: 680 },
  ];

  const branchPerformance = [
    { branch: 'Mumbai', loans: 320, amount: 18500 },
    { branch: 'Delhi', loans: 280, amount: 15200 },
    { branch: 'Bangalore', loans: 250, amount: 14800 },
    { branch: 'Chennai', loans: 220, amount: 12300 },
  ];

  const defaultData = [
    { name: 'Settled', value: 85, color: '#10b981' },
    { name: 'In Auction', value: 10, color: '#f59e0b' },
    { name: 'Written Off', value: 5, color: '#ef4444' },
  ];

  const handleGenerateReport = () => {
    if (!reportType) {
      toast.error('Please select a report type');
      return;
    }
    toast.success('Report generated successfully!');
  };

  const handleDownloadExcel = () => {
    toast.success('Downloading Excel report...');
  };

  const handleDownloadPDF = () => {
    toast.success('Downloading PDF report...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 dark:text-white">Reports & Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Comprehensive reports and business analytics
        </p>
      </div>

      {/* Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="disbursement">Loan Disbursement</SelectItem>
                  <SelectItem value="collection">Payment Collection</SelectItem>
                  <SelectItem value="interest">Interest Income</SelectItem>
                  <SelectItem value="overdue">Overdue Loans</SelectItem>
                  <SelectItem value="branch">Branch Performance</SelectItem>
                  <SelectItem value="customer">Customer Analysis</SelectItem>
                  <SelectItem value="auction">Auction Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fromDate">From Date</Label>
              <Input id="fromDate" type="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="toDate">To Date</Label>
              <Input id="toDate" type="date" />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button onClick={handleGenerateReport} className="bg-blue-600 hover:bg-blue-700">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button onClick={handleDownloadExcel} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Excel
            </Button>
            <Button onClick={handleDownloadPDF} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loan Disbursement Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Loan Disbursement Trend (₹ Thousands)</CardTitle>
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
                  name="Disbursement"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Interest Income */}
        <Card>
          <CardHeader>
            <CardTitle>Interest Income Trend (₹ Thousands)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={interestIncomeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#10b981" name="Interest Income" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Branch Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Branch-wise Performance (₹ Thousands)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={branchPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="branch" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="loans" fill="#3b82f6" name="No. of Loans" />
                <Bar dataKey="amount" fill="#f59e0b" name="Amount" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Default Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Default Loan Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={defaultData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {defaultData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Disbursed (MTD)</p>
                <h3 className="text-blue-600 dark:text-blue-400">₹68.5L</h3>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Collections (MTD)</p>
                <h3 className="text-green-600 dark:text-green-400">₹45.2L</h3>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Interest Income (MTD)</p>
                <h3 className="text-yellow-600 dark:text-yellow-400">₹6.8L</h3>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Default Rate</p>
                <h3 className="text-red-600 dark:text-red-400">2.4%</h3>
              </div>
              <TrendingUp className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
