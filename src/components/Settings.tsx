import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';
import { Coins, Building, DollarSign, Mail, MessageSquare, Bell } from 'lucide-react';
import { toast } from 'sonner';

export function Settings() {
  const [goldRate, setGoldRate] = useState(6250);
  const [autoUpdateGoldRate, setAutoUpdateGoldRate] = useState(true);

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 dark:text-white">Settings & Master Data</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Configure system settings and manage master data
        </p>
      </div>

      <Tabs defaultValue="gold" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="gold">Gold Rates</TabsTrigger>
          <TabsTrigger value="loan">Loan Terms</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* Gold Rates */}
        <TabsContent value="gold" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-600" />
                Gold Rate Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentRate">Current Gold Rate (per gram)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="currentRate"
                      type="number"
                      value={goldRate}
                      onChange={(e) => setGoldRate(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <Button variant="outline">Update</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apiKey">Gold Rate API Key</Label>
                  <Input id="apiKey" placeholder="Enter API key for live rates" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p>Auto-update Gold Rate</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Automatically fetch and update gold rates every hour
                  </p>
                </div>
                <Switch
                  checked={autoUpdateGoldRate}
                  onCheckedChange={setAutoUpdateGoldRate}
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">24K Gold</p>
                  <p className="text-lg text-yellow-600">₹{goldRate}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">22K Gold</p>
                  <p className="text-lg text-yellow-600">₹{Math.round(goldRate * 0.916)}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">20K Gold</p>
                  <p className="text-lg text-yellow-600">₹{Math.round(goldRate * 0.833)}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">18K Gold</p>
                  <p className="text-lg text-yellow-600">₹{Math.round(goldRate * 0.75)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Loan Terms */}
        <TabsContent value="loan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                Loan Terms Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minInterest">Minimum Interest Rate (%)</Label>
                  <Input id="minInterest" type="number" defaultValue="10" step="0.1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxInterest">Maximum Interest Rate (%)</Label>
                  <Input id="maxInterest" type="number" defaultValue="15" step="0.1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultInterest">Default Interest Rate (%)</Label>
                  <Input id="defaultInterest" type="number" defaultValue="12" step="0.1" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minLtv">Minimum LTV Ratio (%)</Label>
                  <Input id="minLtv" type="number" defaultValue="60" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLtv">Maximum LTV Ratio (%)</Label>
                  <Input id="maxLtv" type="number" defaultValue="80" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultLtv">Default LTV Ratio (%)</Label>
                  <Input id="defaultLtv" type="number" defaultValue="75" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lateFee">Late Payment Fee (₹)</Label>
                  <Input id="lateFee" type="number" defaultValue="500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gracePeriod">Grace Period (days)</Label>
                  <Input id="gracePeriod" type="number" defaultValue="3" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Available Tenures</Label>
                <div className="flex flex-wrap gap-3">
                  {['3', '6', '12', '18', '24', '36'].map((tenure) => (
                    <div key={tenure} className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked id={`tenure-${tenure}`} />
                      <label htmlFor={`tenure-${tenure}`}>{tenure} months</label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branches */}
        <TabsContent value="branches" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-green-600" />
                Branch Management
              </CardTitle>
              <Button>Add Branch</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: 'Mumbai - Andheri',
                    code: 'MUM-AND',
                    address: 'Shop 12, Andheri West, Mumbai - 400053',
                  },
                  {
                    name: 'Delhi - Karol Bagh',
                    code: 'DEL-KAR',
                    address: 'Building 5, Karol Bagh, New Delhi - 110005',
                  },
                  {
                    name: 'Bangalore - Jayanagar',
                    code: 'BLR-JAY',
                    address: '3rd Block, Jayanagar, Bangalore - 560011',
                  },
                  {
                    name: 'Chennai - T Nagar',
                    code: 'CHE-TNG',
                    address: 'North Usman Road, T Nagar, Chennai - 600017',
                  },
                ].map((branch, index) => (
                  <div key={index} className="p-4 border rounded-lg flex items-start justify-between">
                    <div>
                      <h4 className="text-gray-900 dark:text-white">{branch.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Code: {branch.code}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {branch.address}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Deactivate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-purple-600" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Email Notifications', description: 'Send email alerts for important events' },
                { label: 'SMS Notifications', description: 'Send SMS for payment reminders' },
                { label: 'WhatsApp Notifications', description: 'Send WhatsApp messages for updates' },
                { label: 'Payment Reminders', description: 'Auto-send payment due reminders' },
                { label: 'Overdue Alerts', description: 'Alert for overdue loans' },
                { label: 'KYC Expiry Alerts', description: 'Notify when KYC documents expire' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <p>{item.label}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                  </div>
                  <Switch defaultChecked={index < 4} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-orange-600" />
                Message Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smsTemplate">SMS Template - Payment Reminder</Label>
                <textarea
                  id="smsTemplate"
                  className="w-full p-3 border rounded-lg min-h-[100px]"
                  defaultValue="Dear {customer_name}, your EMI of Rs.{amount} is due on {due_date}. Please pay to avoid late charges. - Gold Lakshmi ERP"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailTemplate">Email Template - Loan Approval</Label>
                <textarea
                  id="emailTemplate"
                  className="w-full p-3 border rounded-lg min-h-[150px]"
                  defaultValue={`Dear {customer_name},

Your loan application (ID: {loan_id}) has been approved!

Loan Amount: Rs.{amount}
Interest Rate: {rate}% p.a.
Tenure: {tenure} months

Please visit our branch to complete the disbursement process.

Best regards,
Gold Lakshmi ERP System`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappTemplate">WhatsApp Template - Receipt</Label>
                <textarea
                  id="whatsappTemplate"
                  className="w-full p-3 border rounded-lg min-h-[100px]"
                  defaultValue="Payment received! Receipt No: {receipt_no}, Amount: Rs.{amount}, Date: {date}. Thank you for your payment. - Gold Lakshmi"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="Gold Lakshmi Finance Pvt Ltd" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input id="gstNumber" defaultValue="27AABCU9603R1ZM" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="inr">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inr">INR (₹)</SelectItem>
                      <SelectItem value="usd">USD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="ist">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ist">IST (GMT+5:30)</SelectItem>
                      <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backupFreq">Automatic Backup Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700" size="lg">
          Save All Settings
        </Button>
      </div>
    </div>
  );
}
