import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from './ui/card';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';
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
  ResponsiveContainer
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
  Upload
} from 'lucide-react';
import { Badge } from './ui/badge';

interface DashboardProps {
  selectedBranch: string;
}

export function Dashboard({ selectedBranch }: DashboardProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isNewLoanDialogOpen, setIsNewLoanDialogOpen] = useState(false);

const [panPreview, setPanPreview] = useState<string | null>(null);
  const [aadhaarPreview, setAadhaarPreview] = useState<string | null>(null);

  // 👇 Dummy Add Customer Function
  const handleAddCustomer = () => {
    console.log('Customer Added!');
    setIsAddDialogOpen(false);
  };

  const handleCreateLoan = () => {
      console.log('Loan Created!');
      setIsNewLoanDialogOpen(false);
    };

 const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  type: "pan" | "aadhaar"
) => {
  const file = event.target.files?.[0];
  if (file) {
    const url = URL.createObjectURL(file);
    if (type === "pan") setPanPreview(url);
    if (type === "aadhaar") setAadhaarPreview(url);
  }
};


  const kpiData = [
    { title: 'Active Loans', value: '1,247', change: '+12.5%', trend: 'up', icon: FileText, color: 'blue' },
    { title: 'Closed Loans', value: '3,891', change: '+8.3%', trend: 'up', icon: FileText, color: 'green' },
    { title: 'Total Pledged Gold', value: '2,451 kg', change: '+15.2%', trend: 'up', icon: Coins, color: 'yellow' },
    { title: 'Interest Income', value: '₹45.2L', change: '+9.8%', trend: 'up', icon: TrendingUp, color: 'purple' },
    { title: 'Total Customers', value: '4,523', change: '+18.1%', trend: 'up', icon: Users, color: 'indigo' },
    { title: 'Overdue Loans', value: '127', change: '-5.2%', trend: 'down', icon: AlertCircle, color: 'red' },
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
    { id: 1, message: 'New loan disbursed to Rajesh Kumar', amount: '₹2,50,000', time: '10 mins ago' },
    { id: 2, message: 'Payment received from Priya Sharma', amount: '₹45,000', time: '25 mins ago' },
    { id: 3, message: 'New customer registered - Amit Patel', amount: '', time: '1 hour ago' },
    { id: 4, message: 'Gold valuation completed for Sunita Devi', amount: '₹3,75,000', time: '2 hours ago' },
    { id: 5, message: 'Loan overdue alert - Account #GL12345', amount: '', time: '3 hours ago' },
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
          <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* 🔹 Add Customer Dialog Button */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <Input id="mobile" placeholder="+91 9876543210" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input id="dob" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input id="address" placeholder="Enter complete address" />
                </div>

                <div className="space-y-2">
  <Label htmlFor="nomineeName">Nominee Details *</Label>

  {/* Nominee Full Name */}
  <Input 
    id="nomineeName" 
    placeholder="Enter nominee full name" 
    className="mb-3"
  />

  {/* Relationship with Borrower */}
  <div className="mb-3">
    <Label htmlFor="relationship">Relationship with Borrower</Label>
    <select
      id="relationship"
      className="w-full mt-1 border border-gray-300 rounded-md p-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
    >
      <option value="">Select relationship</option>
      <option value="spouse">Spouse</option>
      <option value="father">Father</option>
      <option value="mother">Mother</option>
      <option value="son">Son</option>
      <option value="daughter">Daughter</option>
      <option value="brother">Brother</option>
      <option value="sister">Sister</option>
      <option value="other">Other</option>
    </select>
  </div>

  {/* Nominee Address */}
  <div className="mb-3">
    <Label htmlFor="nomineeAddress">Nominee Address</Label>
    <textarea
      id="nomineeAddress"
      placeholder="Enter full residential address of nominee"
      rows={3}
      className="w-full mt-1 border border-gray-300 rounded-md p-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
    ></textarea>
  </div>

  {/* Relationship Proof Upload */}
  <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
    <input
      type="file"
      id="relationshipProof"
      accept="image/*,.pdf"
      className="hidden"
      onChange={(e) =>e.target.files && console.log(e.target.files[0])}
    />
    <label htmlFor="relationshipProof" className="cursor-pointer block">
      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Upload Relationship Proof (Photo/PDF)
      </p>
    </label>
  </div>

  {/* Nominee Photo Upload */}
  <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
    <input
      type="file"
      id="nomineePhoto"
      accept="image/*"
      capture="environment"
      className="hidden"
      onChange={(e) => e.target.files && console.log(e.target.files[0])}
    />
    <label htmlFor="nomineePhoto" className="cursor-pointer block">
      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Upload Nominee Photo (or Take Picture)
      </p>
    </label>
  </div>

  {/* Aadhaar Proof Upload */}
  <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
    <input
      type="file"
      id="nomineeAadhaar"
      accept="image/*,.pdf"
      className="hidden"
      onChange={(e) =>e.target.files && console.log(e.target.files[0])}
    />
    <label htmlFor="nomineeAadhaar" className="cursor-pointer block">
      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Upload Nominee Aadhaar Proof
      </p>
    </label>
  </div>
</div>



                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pan">PAN Number *</Label>
                    <Input id="pan" placeholder="ABCDE1234F" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aadhaar">Aadhaar Number *</Label>
                    <Input id="aadhaar" placeholder="1234 5678 9012" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch">Branch *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="branch-1">Mumbai - Andheri</SelectItem>
                      <SelectItem value="branch-2">Delhi - Karol Bagh</SelectItem>
                      <SelectItem value="branch-3">Bangalore - Jayanagar</SelectItem>
                      <SelectItem value="branch-4">Chennai - T Nagar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* KYC Documents Upload */}
<div className="space-y-2">
  <Label>KYC Documents</Label>
  <div className="grid grid-cols-2 gap-4">
    {/* PAN Card Upload */}
    <div
      className="relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
      onClick={() => document.getElementById("pan-upload")?.click()}
    >
      {panPreview ? (
        <>
          <img
            src={panPreview}
            alt="PAN Preview"
            className="w-full h-32 object-cover rounded-md"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPanPreview(null);
            }}
            className="absolute top-2 right-2 bg-white dark:bg-gray-700 rounded-full p-1 shadow"
          >
            ✕
          </button>
        </>
      ) : (
        <>
          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Upload PAN Card
          </p>
        </>
      )}
      <input
        id="pan-upload"
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFileChange(e, "pan")}
      />
    </div>

    {/* Aadhaar Upload */}
    <div
      className="relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
      onClick={() => document.getElementById("aadhaar-upload")?.click()}
    >
      {aadhaarPreview ? (
        <>
          <img
            src={aadhaarPreview}
            alt="Aadhaar Preview"
            className="w-full h-32 object-cover rounded-md"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setAadhaarPreview(null);
            }}
            className="absolute top-2 right-2 bg-white dark:bg-gray-700 rounded-full p-1 shadow"
          >
            ✕
          </button>
        </>
      ) : (
        <>
          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Upload Aadhaar
          </p>
        </>
      )}
      <input
        id="aadhaar-upload"
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFileChange(e, "aadhaar")}
      />
    </div>
  </div>
</div>


                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCustomer} className="bg-blue-600 hover:bg-blue-700">
                    Add Customer
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isNewLoanDialogOpen} onOpenChange={setIsNewLoanDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-yellow-600 hover:bg-yellow-700">
                        <FilePlus className="w-4 h-4 mr-2" />
                        Create Loan
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Create New Loan Account</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="loanCustomer">Select Customer *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Search customer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cust1">Rajesh Kumar (CUST001)</SelectItem>
                              <SelectItem value="cust2">Priya Sharma (CUST002)</SelectItem>
                              <SelectItem value="cust3">Sunita Devi (CUST004)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
          
                        <div className="space-y-2">
                          <Label htmlFor="valuationRef">Valuation Reference *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select valuation" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="val1">VAL001 - 50g 22K Gold (₹3,12,500)</SelectItem>
                              <SelectItem value="val2">VAL002 - 30g 24K Gold (₹1,87,500)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
          
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="loanAmount">Loan Amount (₹) *</Label>
                            <Input id="loanAmount" type="number" placeholder="250000" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="interestRate">Interest Rate (% p.a.) *</Label>
                            <Input id="interestRate" type="number" step="0.1" placeholder="12" />
                          </div>
                        </div>
          
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="tenure">Tenure (months) *</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select tenure" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="3">3 Months</SelectItem>
                                <SelectItem value="6">6 Months</SelectItem>
                                <SelectItem value="12">12 Months</SelectItem>
                                <SelectItem value="24">24 Months</SelectItem>
                                <SelectItem value="36">36 Months</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="disbursementMode">Disbursement Mode *</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select mode" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cash">Cash</SelectItem>
                                <SelectItem value="bank">Bank Transfer</SelectItem>
                                <SelectItem value="cheque">Cheque</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
          
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="disbursementDate">Disbursement Date *</Label>
                            <Input id="disbursementDate" type="date" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="purpose">Loan Purpose</Label>
                            <Input id="purpose" placeholder="e.g., Business, Medical" />
                          </div>
                        </div>
          
                        <div className="flex justify-end gap-3 pt-4">
                          <Button variant="outline" onClick={() => setIsNewLoanDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleCreateLoan} className="bg-yellow-600 hover:bg-yellow-700">
                            Create Loan
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

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
                        className={`text-xs ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
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
                <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} dot />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

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
                  outerRadius={80}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  dataKey="value"
                >
                  {loanStatusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
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
              <div key={activity.id} className="flex items-start justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div>
                  <p className="text-gray-900 dark:text-white">{activity.message}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                </div>
                {activity.amount && (
                  <Badge variant="secondary" className="ml-4">{activity.amount}</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
