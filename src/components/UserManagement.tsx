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
import { Checkbox } from './ui/checkbox';
import { UserPlus, Search, Edit, Trash2, Shield, Eye } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);

  const users = [
    {
      id: 'USR001',
      name: 'Admin User',
      email: 'admin@goldlakshmi.com',
      role: 'Administrator',
      branch: 'Head Office',
      status: 'active',
      lastLogin: '2 hours ago',
    },
    {
      id: 'USR002',
      name: 'Ramesh Manager',
      email: 'ramesh.m@goldlakshmi.com',
      role: 'Manager',
      branch: 'Mumbai - Andheri',
      status: 'active',
      lastLogin: '1 day ago',
    },
    {
      id: 'USR003',
      name: 'Priya Clerk',
      email: 'priya.c@goldlakshmi.com',
      role: 'Clerk',
      branch: 'Delhi - Karol Bagh',
      status: 'active',
      lastLogin: '3 hours ago',
    },
    {
      id: 'USR004',
      name: 'Suresh Auditor',
      email: 'suresh.a@goldlakshmi.com',
      role: 'Auditor',
      branch: 'All Branches',
      status: 'active',
      lastLogin: '5 hours ago',
    },
    {
      id: 'USR005',
      name: 'Kavita Clerk',
      email: 'kavita.c@goldlakshmi.com',
      role: 'Clerk',
      branch: 'Bangalore - Jayanagar',
      status: 'inactive',
      lastLogin: '15 days ago',
    },
  ];

  const modules = [
    { id: 'customers', name: 'Customer Management' },
    { id: 'gold', name: 'Gold Valuation' },
    { id: 'loans', name: 'Loan Management' },
    { id: 'payments', name: 'Payment Management' },
    { id: 'auctions', name: 'Auction Management' },
    { id: 'reports', name: 'Reports & Analytics' },
    { id: 'users', name: 'User Management' },
    { id: 'settings', name: 'Settings' },
  ];

  const handleAddUser = () => {
    toast.success('User created successfully!');
    setIsAddUserDialogOpen(false);
  };

  const handleDeleteUser = (name: string) => {
    toast.success(`User ${name} deleted successfully!`);
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === 'active' ? 'default' : 'secondary'}>
        {status === 'active' ? 'Active' : 'Inactive'}
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const colors: { [key: string]: string } = {
      Administrator: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      Manager: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      Clerk: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      Auditor: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${colors[role] || ''}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white">User & Role Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage users, roles, and permissions
          </p>
        </div>
        <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userName">Full Name *</Label>
                  <Input id="userName" placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userEmail">Email Address *</Label>
                  <Input id="userEmail" type="email" placeholder="user@goldlakshmi.com" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userMobile">Mobile Number *</Label>
                  <Input id="userMobile" placeholder="+91 9876543210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userRole">Role *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="clerk">Clerk</SelectItem>
                      <SelectItem value="auditor">Auditor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="userBranch">Assign Branch *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="branch-1">Mumbai - Andheri</SelectItem>
                    <SelectItem value="branch-2">Delhi - Karol Bagh</SelectItem>
                    <SelectItem value="branch-3">Bangalore - Jayanagar</SelectItem>
                    <SelectItem value="branch-4">Chennai - T Nagar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userPassword">Password *</Label>
                  <Input id="userPassword" type="password" placeholder="Enter password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input id="confirmPassword" type="password" placeholder="Re-enter password" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-700">
                  Create User
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
              placeholder="Search by name, email, or user ID..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{user.branch}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <Shield className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Manage Permissions - {user.name}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                              <div className="overflow-x-auto">
                                <table className="w-full">
                                  <thead>
                                    <tr className="border-b">
                                      <th className="text-left p-3">Module</th>
                                      <th className="text-center p-3">View</th>
                                      <th className="text-center p-3">Create</th>
                                      <th className="text-center p-3">Edit</th>
                                      <th className="text-center p-3">Delete</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {modules.map((module) => (
                                      <tr key={module.id} className="border-b">
                                        <td className="p-3">{module.name}</td>
                                        <td className="text-center p-3">
                                          <Checkbox defaultChecked />
                                        </td>
                                        <td className="text-center p-3">
                                          <Checkbox />
                                        </td>
                                        <td className="text-center p-3">
                                          <Checkbox />
                                        </td>
                                        <td className="text-center p-3">
                                          <Checkbox />
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              <div className="flex justify-end gap-3 mt-6">
                                <Button variant="outline">Cancel</Button>
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                  Save Permissions
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteUser(user.name)}
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

      {/* Activity Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                user: 'Admin User',
                action: 'Created new customer (CUST005)',
                time: '10 mins ago',
              },
              {
                user: 'Ramesh Manager',
                action: 'Approved loan GL003',
                time: '1 hour ago',
              },
              {
                user: 'Priya Clerk',
                action: 'Recorded payment PAY005',
                time: '2 hours ago',
              },
              {
                user: 'Suresh Auditor',
                action: 'Generated monthly report',
                time: '3 hours ago',
              },
            ].map((log, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span>{log.user}</span> - {log.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{log.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
