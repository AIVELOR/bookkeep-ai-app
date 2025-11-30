import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserMenu } from '@/components/UserMenu';
import { ArrowLeft, Plus, Globe } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  company: string;
  country: {
    code: string;
    name: string;
  };
  organizationNumber: string;
  pendingReceipts: number;
  status: 'active' | 'inactive';
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Anna Svensson",
    company: "Nordic Tech AB",
    country: { code: "SE", name: "Sweden" },
    organizationNumber: "556123-4567",
    pendingReceipts: 3,
    status: "active"
  },
  {
    id: "2",
    name: "John Smith",
    company: "US Services Inc",
    country: { code: "US", name: "United States" },
    organizationNumber: "12-3456789",
    pendingReceipts: 0,
    status: "active"
  },
  {
    id: "3",
    name: "James Wilson",
    company: "UK Consulting Ltd",
    country: { code: "UK", name: "United Kingdom" },
    organizationNumber: "12345678",
    pendingReceipts: 5,
    status: "active"
  },
  {
    id: "4",
    name: "Erik Larsson",
    company: "Oslo Trading AS",
    country: { code: "NO", name: "Norway" },
    organizationNumber: "987654321",
    pendingReceipts: 1,
    status: "active"
  },
  {
    id: "5",
    name: "Morten Jensen",
    company: "Copenhagen Exports ApS",
    country: { code: "DK", name: "Denmark" },
    organizationNumber: "12345678",
    pendingReceipts: 0,
    status: "active"
  },
  {
    id: "6",
    name: "Mika Virtanen",
    company: "Helsinki Solutions Oy",
    country: { code: "FI", name: "Finland" },
    organizationNumber: "1234567-8",
    pendingReceipts: 2,
    status: "active"
  }
];

export default function AgencyClients() {
  const navigate = useNavigate();
  const [clients] = useState<Client[]>(mockClients);

  function getCountryFlag(countryCode: string): string {
    const flags: Record<string, string> = {
      'SE': '🇸🇪',
      'US': '🇺🇸',
      'UK': '🇬🇧',
      'NO': '🇳🇴',
      'DK': '🇩🇰',
      'FI': '🇫🇮'
    };
    return flags[countryCode] || '🌍';
  }

  function handleViewClient(clientId: string, countryCode: string): void {
    sessionStorage.setItem('activeClientId', clientId);
    sessionStorage.setItem('activeClientCountry', countryCode);

    navigate('/agency/dashboard');
  }

  function handleAddClient(): void {
    // Future functionality
    console.log('Add client functionality coming soon');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/agency/dashboard')}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors bg-transparent"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back</span>
              </button>
              <h1 className="text-xl font-semibold text-blue-600">ReceiptFlow Agency</h1>
            </div>
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My Clients</h2>
            <p className="text-gray-600 mt-1">Manage clients across different countries</p>
          </div>
          <Button
            onClick={handleAddClient}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>

        <Card className="p-6 bg-white shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-gray-600">
            <Globe className="w-5 h-5" />
            <span className="text-sm font-medium">
              Managing {clients.length} clients across {new Set(clients.map(c => c.country.code)).size} countries
            </span>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-900">Client Name</TableHead>
                  <TableHead className="font-semibold text-gray-900">Company</TableHead>
                  <TableHead className="font-semibold text-gray-900">Country</TableHead>
                  <TableHead className="font-semibold text-gray-900">Org. Number</TableHead>
                  <TableHead className="font-semibold text-gray-900">Pending</TableHead>
                  <TableHead className="font-semibold text-gray-900">Status</TableHead>
                  <TableHead className="font-semibold text-gray-900 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No clients found. Add your first client to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  clients.map((client) => (
                    <TableRow key={client.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>{client.company}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getCountryFlag(client.country.code)}</span>
                          <span>{client.country.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{client.organizationNumber}</TableCell>
                      <TableCell>
                        {client.pendingReceipts > 0 ? (
                          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                            {client.pendingReceipts} pending
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            All clear
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            client.status === 'active'
                              ? 'bg-green-100 text-green-700 hover:bg-green-100'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                          }
                        >
                          {client.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          onClick={() => handleViewClient(client.id, client.country.code)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>
    </div>
  );
}
