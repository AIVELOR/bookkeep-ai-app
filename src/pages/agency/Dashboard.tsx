import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserMenu } from '@/components/UserMenu';
// @ts-ignore
import { getAccountCodesForCountry, getAccountName } from '@/data/accountCodes';

interface Receipt {
  id: string;
  clientName: string;
  merchant: string;
  date: string;
  amount: string;
  status: 'pending' | 'approved' | 'rejected';
}

const mockReceipts: Receipt[] = [
  { id: '1', clientName: 'John Doe', merchant: 'ICA Supermarket', date: 'Nov 27, 2025', amount: '450', status: 'pending' },
  { id: '2', clientName: 'Jane Smith', merchant: 'Circle K', date: 'Nov 26, 2025', amount: '280', status: 'pending' },
  { id: '3', clientName: 'Mike Johnson', merchant: 'Staples', date: 'Nov 25, 2025', amount: '1,250', status: 'pending' },
  { id: '4', clientName: 'Sarah Williams', merchant: 'Shell', date: 'Nov 24, 2025', amount: '340', status: 'approved' },
  { id: '5', clientName: 'Tom Brown', merchant: 'Mcdonald\'s', date: 'Nov 23, 2025', amount: '125', status: 'rejected' },
];

export default function AgencyDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');

  const activeClientId = sessionStorage.getItem('activeClientId');
  const activeClientCountry = sessionStorage.getItem('activeClientCountry') || 'SE';

  function getCountryFlag(code: string): string {
    const flags: Record<string, string> = {
      'SE': '🇸🇪',
      'US': '🇺🇸',
      'UK': '🇬🇧',
      'NO': '🇳🇴',
      'DK': '🇩🇰',
      'FI': '🇫🇮'
    };
    return flags[code] || '🌍';
  }

  function getAccountingSystemName(code: string): string {
    const systems: Record<string, string> = {
      'SE': 'Swedish BAS 2024',
      'US': 'US GAAP',
      'UK': 'UK GAAP',
      'NO': 'Norwegian Standard',
      'DK': 'Danish Standard',
      'FI': 'Finnish Standard'
    };
    return systems[code] || 'Standard';
  }

  function getClientName(clientId: string): string {
    const clients: Record<string, string> = {
      '1': 'Anna Svensson - Nordic Tech AB',
      '2': 'John Smith - US Services Inc',
      '3': 'James Wilson - UK Consulting Ltd',
      '4': 'Erik Larsson - Oslo Trading AS',
      '5': 'Morten Jensen - Copenhagen Exports ApS',
      '6': 'Mika Virtanen - Helsinki Solutions Oy'
    };
    return clients[clientId] || 'Client';
  }

  function handleBackToAllClients(): void {
    sessionStorage.removeItem('activeClientId');
    sessionStorage.removeItem('activeClientCountry');
    navigate('/agency/clients');
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm font-medium text-orange-700">Pending</span>
          </div>
        );
      case 'approved':
        return (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-700">Approved</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-red-700">Rejected</span>
          </div>
        );
    }
  };

  const filteredReceipts = mockReceipts.filter(receipt => {
    if (activeTab === 'all') return true;
    return receipt.status === activeTab;
  });

  const pendingCount = mockReceipts.filter(r => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-blue-600">ReceiptFlow Agency</h1>
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeClientId && (
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded-r-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{getCountryFlag(activeClientCountry)}</span>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    Working on: {getClientName(activeClientId)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Using {getAccountingSystemName(activeClientCountry)} accounting system
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleBackToAllClients}
                className="border-blue-600 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
              >
                ← Back to All Clients
              </Button>
            </div>
          </div>
        )}

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">Pending Verifications</h2>
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                {pendingCount}
              </Badge>
            </div>
            <p className="text-gray-600">Review and verify client receipt submissions</p>
          </div>
          <Button
            onClick={() => navigate('/agency/clients')}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          >
            View All Clients
          </Button>
        </div>

        <Card className="bg-white shadow-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-gray-200 px-6 pt-6">
              <TabsList className="bg-white w-full sm:w-auto inline-flex gap-2 p-1">
                <TabsTrigger
                  value="all"
                  className="bg-gray-100 text-gray-700 border-2 border-transparent ring-0 focus-visible:ring-0 transition-all duration-200 data-[state=active]:bg-gray-200 data-[state=active]:border-gray-400 data-[state=active]:shadow-gray-300 data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:-translate-y-1"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="bg-orange-100 text-orange-700 border-2 border-transparent ring-0 focus-visible:ring-0 transition-all duration-200 data-[state=active]:bg-orange-200 data-[state=active]:border-orange-400 data-[state=active]:shadow-orange-300 data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:-translate-y-1"
                >
                  Pending
                  {pendingCount > 0 && (
                    <Badge className="ml-2 bg-orange-200 text-orange-800 hover:bg-orange-200">
                      {pendingCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="approved"
                  className="bg-green-100 text-green-700 border-2 border-transparent ring-0 focus-visible:ring-0 transition-all duration-200 data-[state=active]:bg-green-200 data-[state=active]:border-green-400 data-[state=active]:shadow-green-300 data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:-translate-y-1"
                >
                  Approved
                </TabsTrigger>
                <TabsTrigger
                  value="rejected"
                  className="bg-red-100 text-red-700 border-2 border-transparent ring-0 focus-visible:ring-0 transition-all duration-200 data-[state=active]:bg-red-200 data-[state=active]:border-red-400 data-[state=active]:shadow-red-300 data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:-translate-y-1"
                >
                  Rejected
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="m-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client Name</TableHead>
                      <TableHead>Merchant</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReceipts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                          No receipts found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredReceipts.map((receipt) => (
                        <TableRow key={receipt.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{receipt.clientName}</TableCell>
                          <TableCell>{receipt.merchant}</TableCell>
                          <TableCell className="text-gray-600">{receipt.date}</TableCell>
                          <TableCell className="font-semibold">{receipt.amount} SEK</TableCell>
                          <TableCell>{getStatusBadge(receipt.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              onClick={() => navigate(`/agency/review/${receipt.id}`)}
                              variant={receipt.status === 'pending' ? 'default' : 'outline'}
                              size="sm"
                              className={receipt.status === 'pending' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                            >
                              {receipt.status === 'pending' ? 'Review' : 'View'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
}
