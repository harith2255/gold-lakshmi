import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Home,
  Info,
  Briefcase,
  Mail,
  ArrowLeft,
  FileText,
  CreditCard,
  Download,
  DollarSign,
  Coins,
} from 'lucide-react';

interface CustomerPortalProps {
  onBackToERP: () => void;
}

export function CustomerPortal({ onBackToERP }: CustomerPortalProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const customerData = {
    name: 'Rajesh Kumar',
    id: 'CUST001',
    mobile: '+91 9876543210',
    email: 'rajesh.k@example.com',
  };

  const activeLoans = [
    {
      id: 'GL001',
      amount: 250000,
      disbursedDate: '15 Jan 2024',
      interestRate: 12,
      tenure: 12,
      emi: 22244,
      paid: 66732,
      balance: 183268,
      nextDueDate: '15 May 2024',
      goldWeight: 50,
    },
    {
      id: 'GL004',
      amount: 100000,
      disbursedDate: '10 Mar 2024',
      interestRate: 11.5,
      tenure: 6,
      emi: 17500,
      paid: 35000,
      balance: 70500,
      nextDueDate: '10 May 2024',
      goldWeight: 20,
    },
  ];

  const paymentHistory = [
    { id: 'PAY001', date: '15 Feb 2024', loanId: 'GL001', amount: 22244, mode: 'UPI', receipt: 'REC001' },
    { id: 'PAY002', date: '15 Mar 2024', loanId: 'GL001', amount: 22244, mode: 'Bank', receipt: 'REC002' },
    { id: 'PAY003', date: '15 Apr 2024', loanId: 'GL001', amount: 22244, mode: 'Cash', receipt: 'REC003' },
    { id: 'PAY004', date: '10 Apr 2024', loanId: 'GL004', amount: 17500, mode: 'UPI', receipt: 'REC004' },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                  <Coins className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-yellow-600 dark:text-yellow-400">Gold Lakshmi</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Finance & Gold Loans</p>
                </div>
              </div>
              <Button onClick={onBackToERP} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to ERP
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-gray-900 dark:text-white">
                Quick & Easy Gold Loans
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Get instant loans against your gold jewelry with minimal documentation and
                competitive interest rates. Trusted by thousands of customers across India.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Interest Rate</p>
                    <p className="text-green-600 dark:text-green-400">From 10% p.a.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Loan Value</p>
                    <p className="text-blue-600 dark:text-blue-400">Up to 75% LTV</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Login Card */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Customer Login</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customerId">Customer ID / Mobile Number</Label>
                  <Input id="customerId" placeholder="Enter your ID or mobile" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter password" />
                </div>
                <Button
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full bg-yellow-600 hover:bg-yellow-700"
                >
                  Login to Dashboard
                </Button>
                <div className="text-center">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-6 py-16">
          <h2 className="text-center text-gray-900 dark:text-white mb-12">
            Why Choose Gold Lakshmi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: 'Low Interest Rates',
                description: 'Competitive interest rates starting from 10% per annum',
              },
              {
                icon: FileText,
                title: 'Minimal Documentation',
                description: 'Quick approval with just basic KYC documents',
              },
              {
                icon: Coins,
                title: 'Secure Gold Storage',
                description: 'Your gold is stored in bank-grade lockers with full insurance',
              },
            ].map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="mb-4">Contact Us</h4>
                <p className="text-gray-400 text-sm">Email: info@goldlakshmi.com</p>
                <p className="text-gray-400 text-sm">Phone: 1800-123-4567</p>
              </div>
              <div>
                <h4 className="mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Services</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4">Branches</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Mumbai - Andheri</li>
                  <li>Delhi - Karol Bagh</li>
                  <li>Bangalore - Jayanagar</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              © 2024 Gold Lakshmi Finance Pvt Ltd. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-yellow-600 dark:text-yellow-400">Gold Lakshmi</h2>
                <p className="text-xs text-gray-500">Customer Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-sm">{customerData.name}</p>
                <p className="text-xs text-gray-500">{customerData.id}</p>
              </div>
              <Button onClick={onBackToERP} variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to ERP
              </Button>
              <Button onClick={() => setIsLoggedIn(false)} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-gray-900 dark:text-white mb-6">
          Welcome, {customerData.name}!
        </h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Loans</p>
              <h3 className="text-blue-600 dark:text-blue-400">{activeLoans.length}</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Borrowed</p>
              <h3 className="text-green-600 dark:text-green-400">
                ₹{activeLoans.reduce((sum, loan) => sum + loan.amount, 0).toLocaleString('en-IN')}
              </h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">Amount Paid</p>
              <h3 className="text-purple-600 dark:text-purple-400">
                ₹{activeLoans.reduce((sum, loan) => sum + loan.paid, 0).toLocaleString('en-IN')}
              </h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">Outstanding</p>
              <h3 className="text-red-600 dark:text-red-400">
                ₹{activeLoans.reduce((sum, loan) => sum + loan.balance, 0).toLocaleString('en-IN')}
              </h3>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="loans" className="space-y-6">
          <TabsList>
            <TabsTrigger value="loans">My Loans</TabsTrigger>
            <TabsTrigger value="payments">Payment History</TabsTrigger>
            <TabsTrigger value="receipts">Receipts</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="loans" className="space-y-4">
            {activeLoans.map((loan) => (
              <Card key={loan.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Loan Account - {loan.id}</CardTitle>
                    <Badge>Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Loan Amount</p>
                      <p>₹{loan.amount.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Monthly EMI</p>
                      <p>₹{loan.emi.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Paid So Far</p>
                      <p className="text-green-600">₹{loan.paid.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
                      <p className="text-red-600">₹{loan.balance.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Gold Pledged</p>
                      <p>{loan.goldWeight}g</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Interest Rate</p>
                      <p>{loan.interestRate}% p.a.</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Tenure</p>
                      <p>{loan.tenure} months</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Next Due Date</p>
                      <p>{loan.nextDueDate}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay EMI
                    </Button>
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Loan ID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Mode</TableHead>
                        <TableHead>Receipt</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistory.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.id}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.loanId}</TableCell>
                          <TableCell className="text-green-600">
                            ₹{payment.amount.toLocaleString('en-IN')}
                          </TableCell>
                          <TableCell>{payment.mode}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="ghost">
                              <Download className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="receipts">
            <Card>
              <CardHeader>
                <CardTitle>Download Receipts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  All your payment receipts and loan documents are available for download.
                </p>
                <div className="mt-4 space-y-2">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p>{payment.receipt} - Payment Receipt</p>
                        <p className="text-sm text-gray-500">{payment.date}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Customer ID</Label>
                    <Input value={customerData.id} disabled />
                  </div>
                  <div>
                    <Label>Full Name</Label>
                    <Input value={customerData.name} disabled />
                  </div>
                  <div>
                    <Label>Mobile Number</Label>
                    <Input value={customerData.mobile} disabled />
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <Input value={customerData.email} disabled />
                  </div>
                </div>
                <Button variant="outline">Edit Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
