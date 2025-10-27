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
import { Badge } from './ui/badge';
import { Coins, RefreshCw, Upload, Calculator, FileText } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function GoldValuation() {
  const [goldType, setGoldType] = useState('');
  const [purity, setPurity] = useState('');
  const [weight, setWeight] = useState('');
  const [currentRate, setCurrentRate] = useState(6250);
  const [ltvRatio, setLtvRatio] = useState(75);

  const calculateValuation = () => {
    if (!weight || !purity) return 0;
    const weightNum = parseFloat(weight);
    const purityPercent = parseInt(purity) / 100;
    return weightNum * currentRate * purityPercent;
  };

  const calculateLoanAmount = () => {
    return (calculateValuation() * ltvRatio) / 100;
  };

  const handleFetchLiveRate = () => {
    // Simulate API call
    const newRate = Math.floor(Math.random() * (6500 - 6000) + 6000);
    setCurrentRate(newRate);
    toast.success(`Gold rate updated to ₹${newRate}/gram`);
  };

  const handleGenerateReceipt = () => {
    if (!goldType || !purity || !weight) {
      toast.error('Please fill all required fields');
      return;
    }
    toast.success('Pledge receipt generated successfully!');
  };

  const valuation = calculateValuation();
  const eligibleLoan = calculateLoanAmount();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 dark:text-white">Gold Valuation & Pledge Management</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Value gold items and calculate eligible loan amounts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Valuation Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Gold Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Gold Rate */}
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current Gold Rate</p>
                  <h3 className="text-yellow-600 dark:text-yellow-400">₹{currentRate}/gram</h3>
                </div>
                <Button
                  onClick={handleFetchLiveRate}
                  variant="outline"
                  size="sm"
                  className="border-yellow-300"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Update Rate
                </Button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="goldType">Gold Type *</Label>
                <Select value={goldType} onValueChange={setGoldType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jewelry">Jewelry</SelectItem>
                    <SelectItem value="coins">Coins</SelectItem>
                    <SelectItem value="bars">Bars</SelectItem>
                    <SelectItem value="biscuits">Biscuits</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purity">Purity (Karat) *</Label>
                <Select value={purity} onValueChange={setPurity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24">24K (99.9%)</SelectItem>
                    <SelectItem value="22">22K (91.6%)</SelectItem>
                    <SelectItem value="20">20K (83.3%)</SelectItem>
                    <SelectItem value="18">18K (75.0%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (grams) *</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ltv">LTV Ratio (%)</Label>
                <Input
                  id="ltv"
                  type="number"
                  placeholder="75"
                  value={ltvRatio}
                  onChange={(e) => setLtvRatio(parseInt(e.target.value) || 75)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Item Description</Label>
              <Input id="description" placeholder="e.g., Gold necklace with stones" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerSelect">Select Customer *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Search and select customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cust1">Rajesh Kumar (CUST001)</SelectItem>
                  <SelectItem value="cust2">Priya Sharma (CUST002)</SelectItem>
                  <SelectItem value="cust3">Amit Patel (CUST003)</SelectItem>
                  <SelectItem value="cust4">Sunita Devi (CUST004)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Upload Photos */}
            <div className="space-y-2">
              <Label>Upload Gold Photos</Label>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">Photo {i}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Valuation
              </Button>
              <Button onClick={handleGenerateReceipt} className="flex-1 bg-yellow-600 hover:bg-yellow-700">
                <FileText className="w-4 h-4 mr-2" />
                Generate Receipt
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Valuation Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Valuation Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Valuation</p>
                <h3 className="text-gray-900 dark:text-white">
                  ₹{valuation.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </h3>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">Eligible Loan Amount</p>
                <h3 className="text-green-600 dark:text-green-400">
                  ₹{eligibleLoan.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  At {ltvRatio}% LTV ratio
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Gold Rate</span>
                  <span>₹{currentRate}/g</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Weight</span>
                  <span>{weight || '0'} grams</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Purity</span>
                  <span>{purity ? `${purity}K` : '-'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Type</span>
                  <span className="capitalize">{goldType || '-'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Coins className="w-4 h-4 mr-2" />
                Create Loan Account
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Print Receipt
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Form
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
