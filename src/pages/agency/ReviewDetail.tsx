import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { UserMenu } from '@/components/UserMenu';
import { toast } from 'sonner';
import { ArrowLeft, Download, Check, Edit, X, ZoomIn } from 'lucide-react';

export default function AgencyReviewDetail() {
  const navigate = useNavigate();
  useParams();
  const [showImageDialog, setShowImageDialog] = useState(false);

  const receiptImageUrl = "https://images.unsplash.com/photo-1554224311-beee4ece8db7?w=800&q=80";

  const handleApprove = () => {
    toast.success('Verification approved!');
    setTimeout(() => {
      navigate('/agency/dashboard');
    }, 1000);
  };

  const handleEdit = () => {
    toast.info('Edit functionality coming soon');
  };

  const handleReject = () => {
    toast.error('Verification rejected');
    setTimeout(() => {
      navigate('/agency/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/agency/dashboard')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-blue-600">ReceiptFlow Agency</h1>
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white shadow-sm space-y-4 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900">Receipt Image</h3>
              <div
                className="bg-gray-100 rounded-lg overflow-hidden relative group cursor-pointer"
                onClick={() => setShowImageDialog(true)}
              >
                <img
                  src={receiptImageUrl}
                  alt="Receipt"
                  className="w-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                  <div className="bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <ZoomIn className="w-6 h-6 text-gray-900" />
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <Card className="p-6 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Extracted Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-600">Merchant Name</label>
                  <p className="mt-1 text-base font-semibold text-gray-900">ICA Supermarket</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Date</label>
                  <p className="mt-1 text-base font-semibold text-gray-900">November 27, 2025</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Total Amount</label>
                  <p className="mt-1 text-base font-semibold text-gray-900">450.00 SEK</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">VAT Amount</label>
                  <p className="mt-1 text-base font-semibold text-gray-900">90.00 SEK</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Receipt Number</label>
                  <p className="mt-1 text-base font-semibold text-gray-900">12345</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Category</label>
                  <p className="mt-1 text-base font-semibold text-gray-900">Office Supplies</p>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-600">Description</label>
                  <p className="mt-1 text-base text-gray-900">Office snacks for team meeting</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Preview</h3>

              <div className="bg-gray-100 border border-gray-200 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="space-y-4">
                  <div className="flex justify-between pb-3 border-b border-gray-300">
                    <span className="text-gray-700">Date:</span>
                    <span className="font-semibold text-gray-900">2025-11-27</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-300">
                    <span className="text-gray-700">Voucher #:</span>
                    <span className="font-semibold text-gray-900">V-2025-1234</span>
                  </div>

                  <div className="pt-2">
                    <div className="text-gray-700 mb-2">Description:</div>
                    <div className="text-gray-900 font-medium">Office supplies from ICA Supermarket</div>
                  </div>

                  <div className="pt-2">
                    <div className="text-gray-700 font-semibold mb-3">Debit:</div>
                    <div className="space-y-2 ml-4">
                      <div className="flex justify-between">
                        <span className="text-gray-900">5410 Office Supplies</span>
                        <span className="font-semibold text-gray-900">360.00 SEK</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-900">2641 Input VAT 25%</span>
                        <span className="font-semibold text-gray-900">90.00 SEK</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-gray-700 font-semibold mb-3">Credit:</div>
                    <div className="ml-4">
                      <div className="flex justify-between">
                        <span className="text-gray-900">2440 Vendor Payables</span>
                        <span className="font-semibold text-gray-900">450.00 SEK</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 mt-4 border-t-2 border-gray-400">
                    <span className="text-gray-900 font-bold">Total:</span>
                    <span className="font-bold text-gray-900 text-lg">450.00 SEK</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Actions</h3>

              <div className="space-y-3">
                <Button
                  onClick={handleApprove}
                  className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold shadow-md"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Approve Verification
                </Button>

                <Button
                  onClick={handleEdit}
                  variant="outline"
                  className="w-full h-12 text-blue-600 border-blue-600 hover:bg-blue-50 font-semibold"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  Edit Details
                </Button>

                <Button
                  onClick={handleReject}
                  variant="outline"
                  className="w-full h-12 text-red-600 border-red-600 hover:bg-red-50 font-semibold"
                >
                  <X className="w-5 h-5 mr-2" />
                  Reject
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
          <DialogTitle className="sr-only">Receipt Image</DialogTitle>
          <img src={receiptImageUrl} alt="Receipt full size" className="w-full" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
