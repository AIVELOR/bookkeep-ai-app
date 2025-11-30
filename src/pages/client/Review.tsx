import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserMenu } from '@/components/UserMenu';
import { toast } from 'sonner';
import { FileText, User, ZoomIn, ArrowLeft, Home, AlertCircle, Sparkles } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function ClientReview() {
  const navigate = useNavigate();
  const location = useLocation();

  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [formData, setFormData] = useState({
    merchantName: '',
    date: new Date().toISOString().split('T')[0],
    totalAmount: '',
    vatAmount: '',
    receiptNumber: '',
    category: 'Office Supplies',
    description: '',
    currency: 'SEK'
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
  const [showNoReceiptWarning, setShowNoReceiptWarning] = useState(false);

  useEffect(() => {
    const pendingReceipt = sessionStorage.getItem('pendingReceipt');

    if (pendingReceipt) {
      const data = JSON.parse(pendingReceipt);
      setReceiptImage(data.imageFile);
      setExtractedData(data.extractedData);

      if (data.extractedData) {
        setFormData({
          merchantName: data.extractedData.merchantName || '',
          date: data.extractedData.date || new Date().toISOString().split('T')[0],
          totalAmount: data.extractedData.totalAmount?.toString() || '',
          vatAmount: data.extractedData.vatAmount?.toString() || '',
          receiptNumber: data.extractedData.receiptNumber || '',
          category: data.extractedData.category || 'Office Supplies',
          description: '',
          currency: data.extractedData.currency || 'SEK'
        });
      }
    } else {
      setShowNoReceiptWarning(true);
      setTimeout(() => navigate('/client/upload'), 2000);
    }
  }, [navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field] && value) {
      setErrors(prev => ({ ...prev, [field]: false }));
      setErrorMessages(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    const newErrorMessages: Record<string, string> = {};

    if (!formData.merchantName) {
      newErrors.merchantName = true;
      newErrorMessages.merchantName = 'Merchant name is required';
    }

    if (!formData.date) {
      newErrors.date = true;
      newErrorMessages.date = 'Date is required';
    }

    if (!formData.totalAmount) {
      newErrors.totalAmount = true;
      newErrorMessages.totalAmount = 'Total amount is required';
    } else if (parseFloat(formData.totalAmount) <= 0) {
      newErrors.totalAmount = true;
      newErrorMessages.totalAmount = 'Total amount must be greater than 0';
    }

    if (!formData.vatAmount) {
      newErrors.vatAmount = true;
      newErrorMessages.vatAmount = 'VAT amount is required';
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!receiptImage) {
      setShowNoReceiptWarning(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.error('No receipt image found. Please upload a receipt first.');
      return;
    }

    if (validateForm()) {
      sessionStorage.removeItem('pendingReceipt');
      toast.success('Receipt submitted successfully!');
      navigate('/client/upload');
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully!');
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-xl font-semibold text-blue-600">ReceiptFlow</h1>
          <UserMenu />
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {showNoReceiptWarning && (
          <div className="mb-6 bg-red-600 border-4 border-red-700 rounded-lg p-6 shadow-2xl animate-pulse">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-full p-3">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <div>
                <p className="text-white text-2xl font-bold tracking-wide">
                  NO RECEIPT UPLOADED!!
                </p>
                <p className="text-red-100 text-sm font-medium mt-1">
                  Redirecting to upload page...
                </p>
              </div>
            </div>
          </div>
        )}

        {receiptImage && (
          <Card className="p-4 bg-white shadow-sm">
            <div className="relative group cursor-pointer" onClick={() => setShowImageDialog(true)}>
              <img
                src={receiptImage}
                alt="Receipt"
                className="w-full max-h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </Card>
        )}

        {extractedData && extractedData.confidence !== undefined && extractedData.confidence > 0 && (
          <Card className="p-4 bg-blue-50 border border-blue-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900">AI Extraction Confidence</h3>
                  <p className="text-sm text-blue-700">Data extracted automatically from receipt</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">{extractedData.confidence}%</div>
                {extractedData.confidence < 80 && (
                  <p className="text-xs text-blue-600 mt-1">Please review carefully</p>
                )}
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6 bg-white shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Receipt Information</h2>

          <div className="space-y-2">
            <Label htmlFor="merchantName" className="text-sm font-medium">
              Merchant Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="merchantName"
              value={formData.merchantName}
              onChange={(e) => handleInputChange('merchantName', e.target.value)}
              className={errors.merchantName ? 'border-red-500' : ''}
              placeholder="Enter merchant name"
            />
            {errors.merchantName && (
              <p className="text-sm text-red-500">{errorMessages.merchantName}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">
                Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className={errors.date ? 'border-red-500' : ''}
              />
              {errors.date && (
                <p className="text-sm text-red-500">{errorMessages.date}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="receiptNumber" className="text-sm font-medium">
                Receipt Number
              </Label>
              <Input
                id="receiptNumber"
                value={formData.receiptNumber}
                onChange={(e) => handleInputChange('receiptNumber', e.target.value)}
                placeholder="Enter receipt number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalAmount" className="text-sm font-medium">
                Total Amount <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="totalAmount"
                  type="number"
                  step="0.01"
                  value={formData.totalAmount}
                  onChange={(e) => handleInputChange('totalAmount', e.target.value)}
                  className={`pr-16 ${errors.totalAmount ? 'border-red-500' : ''}`}
                  placeholder="0.00"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  SEK
                </span>
              </div>
              {errors.totalAmount && (
                <p className="text-sm text-red-500">{errorMessages.totalAmount}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="vatAmount" className="text-sm font-medium">
                VAT Amount <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="vatAmount"
                  type="number"
                  step="0.01"
                  value={formData.vatAmount}
                  onChange={(e) => handleInputChange('vatAmount', e.target.value)}
                  className={`pr-16 ${errors.vatAmount ? 'border-red-500' : ''}`}
                  placeholder="0.00"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  SEK
                </span>
              </div>
              {errors.vatAmount && (
                <p className="text-sm text-red-500">{errorMessages.vatAmount}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              Category
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="Meals">Meals</SelectItem>
                <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                <SelectItem value="Equipment">Equipment</SelectItem>
                <SelectItem value="Services">Services</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Add details..."
              rows={3}
            />
          </div>
        </Card>

        <div className="space-y-3 pb-4">
          <Button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 sm:h-12 text-base font-semibold shadow-md"
          >
            Submit for Review
          </Button>

          <Button
            onClick={handleSaveDraft}
            variant="outline"
            className="w-full h-14 sm:h-12 text-base font-semibold border-2"
          >
            Save Draft
          </Button>
        </div>
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

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-4xl">
          {receiptImage && <img src={receiptImage} alt="Receipt full size" className="w-full" />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
