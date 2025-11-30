import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Upload as UploadIcon, FileText, User, Loader2, ArrowLeft, Home, X, AlertCircle } from 'lucide-react';
// @ts-ignore
import { extractReceiptData, validateExtractedData, fileToBase64 } from '@/services/receiptExtraction';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function ClientUpload() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showNoReceiptWarning, setShowNoReceiptWarning] = useState(false);
  const [fileValidationError, setFileValidationError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractionError, setExtractionError] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string>('SE');

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    loadUserCountry();
  }, []);

  const loadUserCountry = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: client } = await supabase
        .from('clients')
        .select('country')
        .eq('user_id', user.id)
        .maybeSingle();

      if (client?.country) {
        setCountryCode(client.country);
      }
    } catch (error) {
      console.error('Error loading user country:', error);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

      if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
        setFileValidationError('Invalid file format. Please upload JPG, PNG, GIF, or WEBP image files only.');
        return;
      }

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setFileValidationError('File size exceeds 10MB. Please upload a smaller file.');
        return;
      }

      setFileValidationError(null);
      setExtractionError(null);
      setShowNoReceiptWarning(false);

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      await processReceiptWithAI(file);
    }
  };

  const handleScanClick = async () => {
    try {
      console.log('Requesting camera access...');

      let mediaStream;
      try {
        // Try with rear camera first
        console.log('Trying rear camera...');
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false
        });
      } catch (err) {
        console.log('Rear camera failed, trying any camera...');
        // Fall back to any available camera
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
      }

      console.log('Camera stream obtained:', mediaStream);
      console.log('Video tracks:', mediaStream.getVideoTracks());

      setStream(mediaStream);
      setIsCameraOpen(true);

      // Wait for next tick to ensure state is updated
      setTimeout(() => {
        if (videoRef.current) {
          console.log('Setting video source...');
          videoRef.current.srcObject = mediaStream;

          videoRef.current.onloadedmetadata = () => {
            console.log('Video metadata loaded, playing...');
            videoRef.current?.play().then(() => {
              console.log('Video playing successfully');
            }).catch(err => {
              console.error('Play failed:', err);
            });
          };
        }
      }, 100);

    } catch (error) {
      console.error('Camera access error:', error);
      alert(`Unable to access camera: ${error}. Please make sure you have granted camera permissions.`);
    }
  };

  const handleCapture = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');

        stopCamera();
        setShowNoReceiptWarning(false);
        setFileValidationError(null);
        setExtractionError(null);
        setSelectedImage(imageData);

        const blob = await (await fetch(imageData)).blob();
        const file = new File([blob], 'receipt.jpg', { type: 'image/jpeg' });

        await processReceiptWithAI(file);
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const handleChooseFileClick = () => {
    fileInputRef.current?.click();
  };

  const processReceiptWithAI = async (file: File) => {
    setIsProcessing(true);
    setExtractionError(null);

    try {
      const extractedData = await extractReceiptData(file, countryCode);

      const validation = validateExtractedData(extractedData);

      if (!validation.isValid) {
        console.warn('Validation warnings:', validation.errors);
      }

      const base64Image = await fileToBase64(file);

      sessionStorage.setItem('pendingReceipt', JSON.stringify({
        imageFile: base64Image,
        extractedData: extractedData,
        fileName: file.name,
        fileType: file.type
      }));

      toast.success('Receipt extracted successfully!');
      setIsProcessing(false);

    } catch (error) {
      console.error('Extraction failed:', error);
      setExtractionError((error as Error).message || 'Failed to process receipt. Please try manual entry.');
      setIsProcessing(false);
    }
  };

  const handleUsePhoto = () => {
    if (!selectedImage) {
      setShowNoReceiptWarning(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate('/client/review');
  };

  const handleManualEntry = () => {
    const defaultCurrency = countryCode === 'US' ? 'USD' :
                           countryCode === 'UK' ? 'GBP' :
                           countryCode === 'FI' ? 'EUR' : 'SEK';

    sessionStorage.setItem('pendingReceipt', JSON.stringify({
      imageFile: null,
      extractedData: {
        merchantName: '',
        date: new Date().toISOString().split('T')[0],
        totalAmount: 0,
        vatAmount: 0,
        category: 'Office Supplies',
        currency: defaultCurrency,
        confidence: 0
      },
      fileName: 'manual-entry',
      fileType: null
    }));
    navigate('/client/review');
  };

  const handleTryAgain = () => {
    setSelectedImage(null);
    setShowNoReceiptWarning(false);
    setFileValidationError(null);
    setExtractionError(null);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors -ml-2 !bg-transparent !border-0 !p-0"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-xl font-semibold text-blue-600">ReceiptFlow</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-3 sm:px-4 py-6 sm:py-8">
        <div className="mb-4">
          <button
            onClick={async () => {
              console.log('Testing Anthropic API key...');
              const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

              console.log('API Key exists:', !!apiKey);
              console.log('API Key length:', apiKey?.length);
              console.log('API Key starts with:', apiKey?.substring(0, 15));

              if (!apiKey) {
                alert('❌ No API key found! Check .env file');
                return;
              }

              try {
                const response = await fetch('https://api.anthropic.com/v1/messages', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01'
                  },
                  body: JSON.stringify({
                    model: 'claude-3-5-sonnet-20241022',
                    max_tokens: 10,
                    messages: [{ role: 'user', content: 'Test' }]
                  })
                });

                console.log('API Response status:', response.status);

                if (response.ok) {
                  alert('✅ API key works perfectly!');
                } else {
                  const errorText = await response.text();
                  console.error('API Error response:', errorText);
                  alert('❌ API key error: ' + response.status + ' - Check console for details');
                }
              } catch (e) {
                console.error('Test error:', e);
                alert('❌ Network error: ' + (e as Error).message);
              }
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg mb-4"
          >
            🔧 Test API Key Connection
          </button>
        </div>

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
                  Please scan or upload a receipt to continue
                </p>
              </div>
            </div>
          </div>
        )}

        {fileValidationError && (
          <div className="mb-6 bg-red-600 border-4 border-red-700 rounded-lg p-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-full p-3">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <div>
                <p className="text-white text-xl font-bold tracking-wide">
                  INVALID FILE!!
                </p>
                <p className="text-red-100 text-sm font-medium mt-1">
                  {fileValidationError}
                </p>
              </div>
            </div>
          </div>
        )}

        {extractionError && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-6 shadow-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-red-900 text-lg">Extraction Failed</h4>
                <p className="text-sm text-red-700 mt-1">{extractionError}</p>
                <button
                  onClick={handleManualEntry}
                  className="text-sm text-red-600 underline hover:text-red-800 mt-3 font-medium"
                >
                  Enter details manually instead
                </button>
              </div>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 text-lg">Analyzing Receipt...</h4>
                <p className="text-sm text-blue-700 mt-1">AI is extracting information from your receipt</p>
              </div>
            </div>
          </div>
        )}

        {isCameraOpen ? (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Position Receipt in Frame
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Make sure the entire receipt is visible
              </p>
            </div>

            <Card className="p-4 bg-white shadow-sm overflow-hidden">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ minHeight: '500px' }}>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full rounded-lg"
                  style={{
                    maxHeight: '70vh',
                    objectFit: 'contain',
                    backgroundColor: '#000'
                  }}
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>
            </Card>

            <div className="space-y-3">
              <Button
                onClick={handleCapture}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 sm:h-14 text-base sm:text-lg font-semibold shadow-md"
              >
                <Camera className="w-6 h-6 mr-2" />
                Capture Photo
              </Button>

              <Button
                onClick={stopCamera}
                variant="outline"
                className="w-full h-16 sm:h-14 text-base sm:text-lg font-semibold border-2"
              >
                <X className="w-6 h-6 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : !selectedImage ? (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Scan Your Receipt
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Take a photo or upload an image of your receipt
              </p>
            </div>

            <Card className="p-6 sm:p-8 bg-white shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="flex flex-col items-center gap-4 sm:gap-6">
                <div className="bg-blue-100 p-5 sm:p-6 rounded-full">
                  <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
                </div>

                <Button
                  onClick={handleScanClick}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 sm:h-14 text-base sm:text-lg font-semibold shadow-md"
                >
                  <Camera className="w-6 h-6 mr-2" />
                  Scan Receipt
                </Button>

                <div className="flex items-center gap-4 w-full">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-sm text-gray-500">or</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <Button
                  onClick={handleChooseFileClick}
                  variant="outline"
                  className="w-full h-16 sm:h-14 text-base sm:text-lg font-semibold border-2"
                >
                  <UploadIcon className="w-6 h-6 mr-2" />
                  Choose File
                </Button>

                <p className="text-xs sm:text-sm text-gray-500 text-center">
                  Supported formats: JPG, PNG, GIF, WEBP
                </p>
              </div>
            </Card>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">Having trouble with auto-extraction?</p>
              <button
                onClick={handleManualEntry}
                className="text-blue-600 hover:underline text-sm font-semibold"
              >
                Enter details manually instead
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Preview Receipt
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Review your image before submitting
              </p>
            </div>

            <Card className="p-4 bg-white shadow-sm">
              <img
                src={selectedImage}
                alt="Receipt preview"
                className="w-full rounded-lg"
              />
            </Card>

            <div className="space-y-3">
              <Button
                onClick={handleUsePhoto}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 sm:h-14 text-base sm:text-lg font-semibold shadow-md"
              >
                Use This Photo
              </Button>

              <Button
                onClick={handleTryAgain}
                variant="outline"
                className="w-full h-16 sm:h-14 text-base sm:text-lg font-semibold border-2"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </main>

      <nav className="bg-white border-t border-gray-200 sticky bottom-0">
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
    </div>
  );
}
