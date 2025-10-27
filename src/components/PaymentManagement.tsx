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
import { CreditCard, Search, Download, IndianRupee, Printer } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PaymentManagementProps {
  selectedBranch: string;
}

export function PaymentManagement({ selectedBranch }: PaymentManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentMode, setPaymentMode] = useState('');

  const payments = [
    {
      id: 'PAY001',
      loanId: 'GL001',
      customer: 'Rajesh Kumar',
      amount: 22244,
      mode: 'UPI',
      date: '15 Feb 2024',
      type: 'EMI',
      status: 'completed',
      receiptNo: 'REC001',
    },
    {
      id: 'PAY002',
      loanId: 'GL002',
      customer: 'Priya Sharma',
      amount: 26000,
      mode: 'Cash',
      date: '20 Feb 2024',
      type: 'EMI',
      status: 'completed',
      receiptNo: 'REC002',
    },
    {
      id: 'PAY003',
      loanId: 'GL001',
      customer: 'Rajesh Kumar',
      amount: 22244,
      mode: 'Bank Transfer',
      date: '15 Mar 2024',
      type: 'EMI',
      status: 'completed',
      receiptNo: 'REC003',
    },
    {
      id: 'PAY004',
      loanId: 'GL003',
      customer: 'Sunita Devi',
      amount: 23425,
      mode: 'Cheque',
      date: '10 Mar 2024',
      type: 'EMI',
      status: 'pending',
      receiptNo: 'REC004',
    },
    {
      id: 'PAY005',
      loanId: 'GL002',
      customer: 'Priya Sharma',
      amount: 500,
      mode: 'Cash',
      date: '25 Mar 2024',
      type: 'Late Fee',
      status: 'completed',
      receiptNo: 'REC005',
    },
  ];

  const handleRecordPayment = () => {
    toast.success('Payment recorded successfully! Receipt generated.');
    setIsPaymentDialogOpen(false);
  };

  const handlePrintReceipt = (receiptNo: string) => {
    toast.success(`Printing receipt ${receiptNo}...`);
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === 'completed' ? 'default' : 'secondary'}>
        {status === 'completed' ? 'Completed' : 'Pending'}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    return (
      <Badge variant={type === 'Late Fee' ? 'destructive' : 'outline'}>{type}</Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white">Payment Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Record payments, generate receipts, and track transactions
          </p>
        </div>
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <CreditCard className="w-4 h-4 mr-2" />
              Record Payment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Record New Payment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="loanSelect">Select Loan Account *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Search loan account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="loan1">GL001 - Rajesh Kumar (Due: ₹22,244)</SelectItem>
                    <SelectItem value="loan2">GL002 - Priya Sharma (Due: ₹26,000)</SelectItem>
                    <SelectItem value="loan3">GL003 - Sunita Devi (Due: ₹23,425)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentAmount">Payment Amount (₹) *</Label>
                  <Input id="paymentAmount" type="number" placeholder="22244" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentType">Payment Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emi">EMI Payment</SelectItem>
                      <SelectItem value="partial">Partial Payment</SelectItem>
                      <SelectItem value="full">Full Settlement</SelectItem>
                      <SelectItem value="penalty">Penalty/Late Fee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMode">Payment Mode *</Label>
                <Select value={paymentMode} onValueChange={setPaymentMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paymentMode === 'upi' && (
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI Transaction ID</Label>
                  <Input id="upiId" placeholder="Enter UPI transaction ID" />
                </div>
              )}

              {paymentMode === 'bank' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankRef">Bank Reference No.</Label>
                    <Input id="bankRef" placeholder="Enter reference number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input id="bankName" placeholder="Enter bank name" />
                  </div>
                </div>
              )}

              {paymentMode === 'cheque' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="chequeNo">Cheque Number</Label>
                    <Input id="chequeNo" placeholder="Enter cheque number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chequeDate">Cheque Date</Label>
                    <Input id="chequeDate" type="date" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="paymentDate">Payment Date *</Label>
                <Input id="paymentDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Input id="remarks" placeholder="Optional payment notes" />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleRecordPayment} className="bg-green-600 hover:bg-green-700">
                  Record Payment
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Today's Collections</p>
            <h3 className="text-green-600 dark:text-green-400">₹1,24,580</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
            <h3 className="text-blue-600 dark:text-blue-400">₹45,23,120</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Pending Clearance</p>
            <h3 className="text-yellow-600 dark:text-yellow-400">₹2,34,500</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Penalties</p>
            <h3 className="text-red-600 dark:text-red-400">₹15,600</h3>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by payment ID, loan ID, customer name..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Payment History</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Receipt</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.loanId}</TableCell>
                    <TableCell>{payment.customer}</TableCell>
                    <TableCell className="text-green-600">
                      ₹{payment.amount.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell>{payment.mode}</TableCell>
                    <TableCell>{getTypeBadge(payment.type)}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>{payment.receiptNo}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handlePrintReceipt(payment.receiptNo)}
                        >
                          <Printer className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Gateway Integration Info */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Gateway Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-purple-600 dark:text-purple-400 mb-2">Razorpay</div>
              <Badge variant="default">Connected</Badge>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-blue-600 dark:text-blue-400 mb-2">PayU</div>
              <Badge variant="secondary">Not Connected</Badge>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-green-600 dark:text-green-400 mb-2">Cashfree</div>
              <Badge variant="secondary">Not Connected</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
