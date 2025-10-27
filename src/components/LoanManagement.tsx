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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FilePlus, Search, Eye, Calendar, IndianRupee } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface LoanManagementProps {
  selectedBranch: string;
}

export function LoanManagement({ selectedBranch }: LoanManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewLoanDialogOpen, setIsNewLoanDialogOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);

  const loans = [
    {
      id: 'GL001',
      customer: 'Rajesh Kumar',
      customerId: 'CUST001',
      amount: 250000,
      interestRate: 12,
      tenure: 12,
      disbursedDate: '15 Jan 2024',
      dueDate: '15 Jan 2025',
      status: 'active',
      goldWeight: 50,
      emi: 22244,
      paid: 66732,
      balance: 183268,
    },
    {
      id: 'GL002',
      customer: 'Priya Sharma',
      customerId: 'CUST002',
      amount: 150000,
      interestRate: 11,
      tenure: 6,
      disbursedDate: '20 Jan 2024',
      dueDate: '20 Jul 2024',
      status: 'overdue',
      goldWeight: 30,
      emi: 26000,
      paid: 52000,
      balance: 104500,
    },
    {
      id: 'GL003',
      customer: 'Sunita Devi',
      customerId: 'CUST004',
      amount: 500000,
      interestRate: 10.5,
      tenure: 24,
      disbursedDate: '10 Feb 2024',
      dueDate: '10 Feb 2026',
      status: 'active',
      goldWeight: 100,
      emi: 23425,
      paid: 23425,
      balance: 538775,
    },
  ];

  const transactions = [
    { id: 1, date: '15 Feb 2024', type: 'EMI Payment', amount: 22244, status: 'paid' },
    { id: 2, date: '15 Mar 2024', type: 'EMI Payment', amount: 22244, status: 'paid' },
    { id: 3, date: '15 Apr 2024', type: 'EMI Payment', amount: 22244, status: 'paid' },
    { id: 4, date: '15 May 2024', type: 'EMI Payment', amount: 22244, status: 'pending' },
    { id: 5, date: '15 Jun 2024', type: 'Late Fee', amount: 500, status: 'pending' },
  ];

  const handleCreateLoan = () => {
    toast.success('Loan account created successfully!');
    setIsNewLoanDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: { variant: any; label: string } } = {
      active: { variant: 'default', label: 'Active' },
      overdue: { variant: 'destructive', label: 'Overdue' },
      closed: { variant: 'secondary', label: 'Closed' },
      renewal: { variant: 'secondary', label: 'Renewal' },
    };
    const config = variants[status] || variants.active;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white">Loan Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Create and manage gold pledge loan accounts
          </p>
        </div>
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
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by loan ID, customer name, or mobile..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Loans Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Loans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Tenure</TableHead>
                  <TableHead>EMI</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell>{loan.id}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{loan.customer}</div>
                        <div className="text-gray-500">{loan.customerId}</div>
                      </div>
                    </TableCell>
                    <TableCell>₹{loan.amount.toLocaleString('en-IN')}</TableCell>
                    <TableCell>{loan.interestRate}% p.a.</TableCell>
                    <TableCell>{loan.tenure} months</TableCell>
                    <TableCell>₹{loan.emi.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-green-600">
                      ₹{loan.paid.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell className="text-red-600">
                      ₹{loan.balance.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell>{getStatusBadge(loan.status)}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Loan Details - {loan.id}</DialogTitle>
                          </DialogHeader>
                          <Tabs defaultValue="details" className="mt-4">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="details">Loan Details</TabsTrigger>
                              <TabsTrigger value="schedule">EMI Schedule</TabsTrigger>
                              <TabsTrigger value="transactions">Transactions</TabsTrigger>
                            </TabsList>
                            <TabsContent value="details" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Customer
                                  </p>
                                  <p>{loan.customer}</p>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Loan Amount
                                  </p>
                                  <p>₹{loan.amount.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Gold Weight
                                  </p>
                                  <p>{loan.goldWeight} grams</p>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Interest Rate
                                  </p>
                                  <p>{loan.interestRate}% p.a.</p>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="schedule">
                              <div className="space-y-2">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Monthly EMI: ₹{loan.emi.toLocaleString('en-IN')}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Total Payable: ₹{(loan.emi * loan.tenure).toLocaleString('en-IN')}
                                </p>
                              </div>
                            </TabsContent>
                            <TabsContent value="transactions">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {transactions.map((txn) => (
                                    <TableRow key={txn.id}>
                                      <TableCell>{txn.date}</TableCell>
                                      <TableCell>{txn.type}</TableCell>
                                      <TableCell>
                                        ₹{txn.amount.toLocaleString('en-IN')}
                                      </TableCell>
                                      <TableCell>
                                        <Badge
                                          variant={
                                            txn.status === 'paid' ? 'default' : 'secondary'
                                          }
                                        >
                                          {txn.status}
                                        </Badge>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
