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
import { UserPlus, Search, Filter, Edit, Trash2, Eye, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface CustomerManagementProps {
  selectedBranch: string;
}

export function CustomerManagement({ selectedBranch }: CustomerManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [kycFilter, setKycFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [panPreview, setPanPreview] = useState<string | null>(null);
  const [aadhaarPreview, setAadhaarPreview] = useState<string | null>(null);

  const customers = [
    {
      id: 'CUST001',
      name: 'Rajesh Kumar',
      mobile: '+91 9876543210',
      email: 'rajesh.k@example.com',
      kycStatus: 'verified',
      branch: 'Mumbai - Andheri',
      activeLoans: 2,
      totalLoans: 5,
      joinDate: '15 Jan 2024',
    },
    {
      id: 'CUST002',
      name: 'Priya Sharma',
      mobile: '+91 9876543211',
      email: 'priya.s@example.com',
      kycStatus: 'pending',
      branch: 'Delhi - Karol Bagh',
      activeLoans: 1,
      totalLoans: 3,
      joinDate: '20 Jan 2024',
    },
    {
      id: 'CUST003',
      name: 'Amit Patel',
      mobile: '+91 9876543212',
      email: 'amit.p@example.com',
      kycStatus: 'verified',
      branch: 'Bangalore - Jayanagar',
      activeLoans: 0,
      totalLoans: 2,
      joinDate: '25 Jan 2024',
    },
    {
      id: 'CUST004',
      name: 'Sunita Devi',
      mobile: '+91 9876543213',
      email: 'sunita.d@example.com',
      kycStatus: 'verified',
      branch: 'Chennai - T Nagar',
      activeLoans: 3,
      totalLoans: 7,
      joinDate: '10 Feb 2024',
    },
    {
      id: 'CUST005',
      name: 'Mohammed Ali',
      mobile: '+91 9876543214',
      email: 'mohammed.a@example.com',
      kycStatus: 'rejected',
      branch: 'Mumbai - Andheri',
      activeLoans: 0,
      totalLoans: 0,
      joinDate: '15 Feb 2024',
    },
  ];

  const handleAddCustomer = () => {
    toast.success('Customer added successfully!');
    setIsAddDialogOpen(false);
  };

  const handleDeleteCustomer = (name: string) => {
    toast.success(`Customer ${name} deleted successfully!`);
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


  const getKycBadge = (status: string) => {
    const variants: { [key: string]: { variant: any; label: string } } = {
      verified: { variant: 'default', label: 'Verified' },
      pending: { variant: 'secondary', label: 'Pending' },
      rejected: { variant: 'destructive', label: 'Rejected' },
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white">Customer Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage customer profiles, KYC, and loan history
          </p>
        </div>
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
      rows={3}      className="w-full mt-1 border border-gray-300 rounded-md p-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
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
      onChange={(e) =>e.target.files && console.log(e.target.files[0])}
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
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, mobile, email, or customer ID..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={kycFilter} onValueChange={setKycFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="KYC Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>KYC Status</TableHead>
                  <TableHead>Active Loans</TableHead>
                  <TableHead>Total Loans</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{customer.mobile}</div>
                        <div className="text-gray-500">{customer.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.branch}</TableCell>
                    <TableCell>{getKycBadge(customer.kycStatus)}</TableCell>
                    <TableCell>{customer.activeLoans}</TableCell>
                    <TableCell>{customer.totalLoans}</TableCell>
                    <TableCell>{customer.joinDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteCustomer(customer.name)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
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
    </div>
  );
}
