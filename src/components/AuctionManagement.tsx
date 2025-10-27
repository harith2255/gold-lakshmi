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
import { Badge } from './ui/badge';
import { Gavel, Search, AlertTriangle, FileText } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AuctionManagementProps {
  selectedBranch: string;
}

export function AuctionManagement({ selectedBranch }: AuctionManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuctionDialogOpen, setIsAuctionDialogOpen] = useState(false);

  const auctions = [
    {
      id: 'AUC001',
      loanId: 'GL025',
      customer: 'Ramesh Singh',
      goldWeight: 45,
      loanAmount: 225000,
      outstandingAmount: 258750,
      basePrice: 280000,
      auctionDate: '25 Mar 2024',
      status: 'scheduled',
      defaultDays: 120,
    },
    {
      id: 'AUC002',
      loanId: 'GL018',
      customer: 'Kavita Reddy',
      goldWeight: 30,
      loanAmount: 150000,
      outstandingAmount: 172500,
      basePrice: 187500,
      finalPrice: 195000,
      buyer: 'Gold Mart Pvt Ltd',
      auctionDate: '15 Mar 2024',
      settlementDate: '18 Mar 2024',
      status: 'completed',
      defaultDays: 90,
      refundAmount: 22500,
    },
    {
      id: 'AUC003',
      loanId: 'GL042',
      customer: 'Deepak Kumar',
      goldWeight: 60,
      loanAmount: 300000,
      outstandingAmount: 345000,
      basePrice: 375000,
      auctionDate: '30 Mar 2024',
      status: 'pending',
      defaultDays: 150,
    },
  ];

  const overdueLoans = [
    {
      id: 'GL056',
      customer: 'Anjali Verma',
      goldWeight: 25,
      loanAmount: 125000,
      outstanding: 143750,
      overdueDays: 95,
    },
    {
      id: 'GL062',
      customer: 'Suresh Patel',
      goldWeight: 40,
      loanAmount: 200000,
      outstanding: 230000,
      overdueDays: 110,
    },
  ];

  const handleInitiateAuction = () => {
    toast.success('Auction initiated successfully!');
    setIsAuctionDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: { variant: any; label: string } } = {
      pending: { variant: 'secondary', label: 'Pending' },
      scheduled: { variant: 'default', label: 'Scheduled' },
      completed: { variant: 'outline', label: 'Completed' },
      cancelled: { variant: 'destructive', label: 'Cancelled' },
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white">Auction Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage auctions for defaulted and overdue gold pledges
          </p>
        </div>
        <Dialog open={isAuctionDialogOpen} onOpenChange={setIsAuctionDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Gavel className="w-4 h-4 mr-2" />
              Initiate Auction
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Initiate Gold Auction</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Ensure all legal notices have been sent and mandatory waiting period has elapsed before initiating auction.
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanSelect">Select Overdue Loan *</Label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select loan account</option>
                  {overdueLoans.map((loan) => (
                    <option key={loan.id} value={loan.id}>
                      {loan.id} - {loan.customer} (₹{loan.outstanding.toLocaleString('en-IN')} outstanding)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="basePrice">Base Price (₹) *</Label>
                  <Input id="basePrice" type="number" placeholder="Enter base price" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="auctionDate">Auction Date *</Label>
                  <Input id="auctionDate" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auctionVenue">Auction Venue *</Label>
                <Input id="auctionVenue" placeholder="Enter auction venue address" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="auctionNotes">Additional Notes</Label>
                <textarea
                  id="auctionNotes"
                  className="w-full p-2 border rounded-md min-h-[80px]"
                  placeholder="Any special instructions or notes..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsAuctionDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleInitiateAuction} className="bg-orange-600 hover:bg-orange-700">
                  Initiate Auction
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
            <p className="text-sm text-gray-500 dark:text-gray-400">Pending Auctions</p>
            <h3 className="text-yellow-600 dark:text-yellow-400">3</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Scheduled Auctions</p>
            <h3 className="text-blue-600 dark:text-blue-400">1</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Completed This Month</p>
            <h3 className="text-green-600 dark:text-green-400">5</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Refunds</p>
            <h3 className="text-purple-600 dark:text-purple-400">₹1,25,000</h3>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by auction ID, loan ID, customer name..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Auctions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Auction List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Auction ID</TableHead>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Gold Weight</TableHead>
                  <TableHead>Outstanding</TableHead>
                  <TableHead>Base Price</TableHead>
                  <TableHead>Final Price</TableHead>
                  <TableHead>Auction Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auctions.map((auction) => (
                  <TableRow key={auction.id}>
                    <TableCell>{auction.id}</TableCell>
                    <TableCell>{auction.loanId}</TableCell>
                    <TableCell>{auction.customer}</TableCell>
                    <TableCell>{auction.goldWeight}g</TableCell>
                    <TableCell className="text-red-600">
                      ₹{auction.outstandingAmount.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell>₹{auction.basePrice.toLocaleString('en-IN')}</TableCell>
                    <TableCell>
                      {auction.finalPrice
                        ? `₹${auction.finalPrice.toLocaleString('en-IN')}`
                        : '-'}
                    </TableCell>
                    <TableCell>{auction.auctionDate}</TableCell>
                    <TableCell>{getStatusBadge(auction.status)}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <FileText className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Auction Details - {auction.id}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Customer</p>
                                <p>{auction.customer}</p>
                              </div>
                              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Loan ID</p>
                                <p>{auction.loanId}</p>
                              </div>
                              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Gold Weight</p>
                                <p>{auction.goldWeight} grams</p>
                              </div>
                              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Outstanding Amount
                                </p>
                                <p className="text-red-600">
                                  ₹{auction.outstandingAmount.toLocaleString('en-IN')}
                                </p>
                              </div>
                              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Base Price</p>
                                <p>₹{auction.basePrice.toLocaleString('en-IN')}</p>
                              </div>
                              {auction.finalPrice && (
                                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Final Price
                                  </p>
                                  <p className="text-green-600">
                                    ₹{auction.finalPrice.toLocaleString('en-IN')}
                                  </p>
                                </div>
                              )}
                              {auction.buyer && (
                                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg col-span-2">
                                  <p className="text-sm text-gray-600 dark:text-gray-400">Buyer</p>
                                  <p>{auction.buyer}</p>
                                </div>
                              )}
                              {auction.refundAmount && (
                                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 col-span-2">
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Refund to Customer
                                  </p>
                                  <p className="text-green-600">
                                    ₹{auction.refundAmount.toLocaleString('en-IN')}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
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

      {/* Overdue Loans Eligible for Auction */}
      <Card>
        <CardHeader>
          <CardTitle>Overdue Loans - Eligible for Auction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Gold Weight</TableHead>
                  <TableHead>Loan Amount</TableHead>
                  <TableHead>Outstanding</TableHead>
                  <TableHead>Overdue Days</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overdueLoans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell>{loan.id}</TableCell>
                    <TableCell>{loan.customer}</TableCell>
                    <TableCell>{loan.goldWeight}g</TableCell>
                    <TableCell>₹{loan.loanAmount.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-red-600">
                      ₹{loan.outstanding.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive">{loan.overdueDays} days</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Gavel className="w-4 h-4 mr-2" />
                        Initiate Auction
                      </Button>
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
