import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Receipt, Upload as UploadIcon, FileText, User, Tag, ArrowRight, Download, ArrowLeft, Chrome as Home } from 'lucide-react';

interface ReceiptData {
  id: string;
  merchant: string;
  amount: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  category: string;
  rejectionReason?: string;
  imageUrl?: string;
  fileName?: string;
}

const mockReceipts: ReceiptData[] = [
  { id: '1', merchant: 'ICA Supermarket', amount: '450.00', date: 'Nov 27, 2025', status: 'pending', category: 'Office Supplies', imageUrl: 'https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=800', fileName: 'ica-receipt-20251127.jpg' },
  { id: '2', merchant: 'Circle K', amount: '280.00', date: 'Nov 26, 2025', status: 'approved', category: 'Travel', imageUrl: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800', fileName: 'circlek-receipt-20251126.jpg' },
  { id: '3', merchant: 'Staples', amount: '1,250.00', date: 'Nov 25, 2025', status: 'pending', category: 'Office Supplies', imageUrl: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800', fileName: 'staples-receipt-20251125.jpg' },
  { id: '4', merchant: 'McDonald\'s', amount: '125.00', date: 'Nov 24, 2025', status: 'rejected', category: 'Meals', rejectionReason: 'Receipt image is unclear. Please resubmit with a clearer photo.', imageUrl: 'https://images.pexels.com/photos/5650003/pexels-photo-5650003.jpeg?auto=compress&cs=tinysrgb&w=800', fileName: 'mcdonalds-receipt-20251124.jpg' },
  { id: '5', merchant: 'Shell', amount: '340.00', date: 'Nov 23, 2025', status: 'approved', category: 'Travel', imageUrl: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800', fileName: 'shell-receipt-20251123.jpg' },
  { id: '6', merchant: 'IKEA', amount: '890.00', date: 'Nov 22, 2025', status: 'approved', category: 'Equipment', fileName: 'ikea-receipt-20251122.jpg' },
];

export default function MyReceipts() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptData | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            Pending
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Rejected
          </Badge>
        );
    }
  };

  const filteredReceipts = mockReceipts.filter(receipt => {
    if (activeTab === 'all') return true;
    return receipt.status === activeTab;
  });

  const handleViewDetails = (receipt: ReceiptData) => {
    setSelectedReceipt(receipt);
    setShowDetailDialog(true);
  };

  const handleDownloadReceipt = async () => {
    if (!selectedReceipt || !selectedReceipt.imageUrl) {
      alert('Receipt image not available');
      return;
    }

    try {
      const response = await fetch(selectedReceipt.imageUrl);
      if (!response.ok) throw new Error('Failed to fetch receipt');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = selectedReceipt.fileName || `receipt-${selectedReceipt.merchant}-${selectedReceipt.date}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download receipt. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors bg-transparent"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-xl font-semibold text-blue-600">ReceiptFlow</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">My Receipts</h2>
          <p className="text-gray-600">View all your submitted receipts</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white w-full grid grid-cols-4 gap-2 p-1">
            <TabsTrigger value="all" className="bg-gray-100 text-gray-700 border-2 border-transparent ring-0 focus-visible:ring-0 transition-all duration-200 data-[state=active]:bg-gray-200 data-[state=active]:border-gray-400 data-[state=active]:shadow-gray-300 data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:-translate-y-1">
              All
            </TabsTrigger>
            <TabsTrigger value="pending" className="bg-orange-100 text-orange-700 border-2 border-transparent ring-0 focus-visible:ring-0 transition-all duration-200 data-[state=active]:bg-orange-200 data-[state=active]:border-orange-400 data-[state=active]:shadow-orange-300 data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:-translate-y-1">
              Pending
            </TabsTrigger>
            <TabsTrigger value="approved" className="bg-green-100 text-green-700 border-2 border-transparent ring-0 focus-visible:ring-0 transition-all duration-200 data-[state=active]:bg-green-200 data-[state=active]:border-green-400 data-[state=active]:shadow-green-300 data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:-translate-y-1">
              Approved
            </TabsTrigger>
            <TabsTrigger value="rejected" className="bg-red-100 text-red-700 border-2 border-transparent ring-0 focus-visible:ring-0 transition-all duration-200 data-[state=active]:bg-red-200 data-[state=active]:border-red-400 data-[state=active]:shadow-red-300 data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:-translate-y-1">
              Rejected
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            {filteredReceipts.length === 0 ? (
              <Card className="p-12 bg-white shadow-sm">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="bg-gray-100 p-6 rounded-full">
                    <Receipt className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">No receipts yet</h3>
                    <p className="text-gray-600">Upload your first receipt to get started</p>
                  </div>
                  <Button
                    onClick={() => navigate('/client/upload')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <UploadIcon className="w-4 h-4 mr-2" />
                    Upload Receipt
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredReceipts.map((receipt) => (
                  <Card
                    key={receipt.id}
                    className="p-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-bold text-gray-900">{receipt.merchant}</h3>
                        {getStatusBadge(receipt.status)}
                      </div>

                      <div className="flex items-baseline justify-between">
                        <span className="text-2xl font-bold text-blue-600">{receipt.amount} SEK</span>
                        <span className="text-sm text-gray-500">{receipt.date}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Tag className="w-4 h-4" />
                        <span>{receipt.category}</span>
                      </div>

                      <button
                        onClick={() => handleViewDetails(receipt)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm ring-0 focus-visible:ring-0 focus:outline-none bg-transparent px-0"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0">
        <div className="max-w-lg mx-auto px-3 sm:px-4 py-3">
          <div className="flex items-center justify-around gap-2">
            <button
              onClick={() => navigate('/client/upload')}
              className={`flex flex-col items-center gap-1.5 min-w-[72px] px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/client/upload'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Upload</span>
            </button>
            <button
              onClick={() => navigate('/client/my-receipts')}
              className={`flex flex-col items-center gap-1.5 min-w-[72px] px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/client/my-receipts'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FileText className="w-6 h-6" />
              <span className="text-xs font-medium">My Receipts</span>
            </button>
            <button
              onClick={() => navigate('/client/profile')}
              className={`flex flex-col items-center gap-1.5 min-w-[72px] px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/client/profile'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>
      </nav>

      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Receipt Details</DialogTitle>
          </DialogHeader>

          {selectedReceipt && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-center mb-4">
                {selectedReceipt.imageUrl ? (
                  <div className="w-full max-h-96 overflow-hidden rounded-lg border border-gray-200">
                    <img
                      src={selectedReceipt.imageUrl}
                      alt={`Receipt from ${selectedReceipt.merchant}`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="hidden flex-col items-center justify-center bg-gray-200 p-12 rounded-lg min-h-[200px]">
                      <p className="text-red-600 text-4xl font-black tracking-wider uppercase animate-blink-red">
                        NO RECEIPT UPLOADED!!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-200 p-12 rounded-lg flex flex-col items-center justify-center min-h-[200px]">
                    <p className="text-red-600 text-4xl font-black tracking-wider text-center uppercase animate-blink-red">
                      NO RECEIPT UPLOADED!!
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-600">Merchant</span>
                  <span className="text-base font-semibold text-gray-900">{selectedReceipt.merchant}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-600">Amount</span>
                  <span className="text-base font-semibold text-gray-900">{selectedReceipt.amount} SEK</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-600">Date</span>
                  <span className="text-base font-semibold text-gray-900">{selectedReceipt.date}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-600">Category</span>
                  <span className="text-base font-semibold text-gray-900">{selectedReceipt.category}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-600">Status</span>
                  {getStatusBadge(selectedReceipt.status)}
                </div>

                {selectedReceipt.status === 'rejected' && selectedReceipt.rejectionReason && (
                  <div className="pt-2">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm font-medium text-red-800 mb-1">Rejection Reason:</p>
                      <p className="text-sm text-red-700">{selectedReceipt.rejectionReason}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleDownloadReceipt}
                  disabled={!selectedReceipt.imageUrl}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>

                {selectedReceipt.status === 'rejected' && (
                  <Button
                    onClick={() => {
                      setShowDetailDialog(false);
                      navigate('/client/upload');
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <UploadIcon className="w-4 h-4 mr-2" />
                    Resubmit Receipt
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
