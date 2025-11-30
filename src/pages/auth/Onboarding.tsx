import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Loader2, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function Onboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [step1Data, setStep1Data] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const [step2Data, setStep2Data] = useState({
    companyName: '',
    organizationNumber: '',
    companyAddress: '',
    vatNumber: ''
  });

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        navigate('/auth/signin');
        return;
      }

      try {
        const { data: client, error } = await supabase
          .from('clients')
          .select('name, email, phone, address, city, postal_code, country, company_name, organization_number, company_address, vat_number, onboarding_completed')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error loading user data:', error);
          toast.error('Failed to load user data');
          return;
        }

        if (client) {
          if (client.onboarding_completed) {
            navigate('/client/upload');
            return;
          }

          setStep1Data({
            name: client.name || '',
            email: client.email || '',
            phone: client.phone || '',
            street: client.address || '',
            city: client.city || '',
            postalCode: client.postal_code || '',
            country: client.country || ''
          });

          setStep2Data({
            companyName: client.company_name || '',
            organizationNumber: client.organization_number || '',
            companyAddress: client.company_address || '',
            vatNumber: client.vat_number || ''
          });
        }
      } catch (error) {
        console.error('Error in loadUserData:', error);
        toast.error('Failed to load user data');
      } finally {
        setIsLoadingData(false);
      }
    };

    loadUserData();
  }, [user, navigate]);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!step1Data.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!step1Data.street.trim()) {
      newErrors.street = 'Street address is required';
    }
    if (!step1Data.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!step1Data.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    }
    if (!step1Data.country.trim()) {
      newErrors.country = 'Please select your country';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!step2Data.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!step2Data.organizationNumber.trim()) {
      newErrors.organizationNumber = 'Organization number is required';
    } else if (!/^\d{6}-\d{4}$/.test(step2Data.organizationNumber)) {
      newErrors.organizationNumber = 'Invalid format. Use: XXXXXX-XXXX';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      setErrors({});
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    setErrors({});
  };

  const handleCompleteSetup = async () => {
    if (!validateStep2()) {
      return;
    }

    if (!user) {
      toast.error('User not authenticated');
      return;
    }

    setIsLoading(true);

    try {
      const { data: client, error: clientError } = await supabase
        .from('clients')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (clientError || !client) {
        console.error('Error finding client:', clientError);
        toast.error('Failed to update profile');
        setIsLoading(false);
        return;
      }

      const { error: updateError } = await supabase
        .from('clients')
        .update({
          phone: step1Data.phone,
          address: step1Data.street,
          city: step1Data.city,
          postal_code: step1Data.postalCode,
          country: step1Data.country,
          company_name: step2Data.companyName,
          organization_number: step2Data.organizationNumber,
          company_address: step2Data.companyAddress || null,
          vat_number: step2Data.vatNumber || null,
          onboarding_completed: true,
          completed_at: new Date().toISOString()
        })
        .eq('id', client.id);

      if (updateError) {
        console.error('Error updating profile:', updateError);
        toast.error('Failed to complete setup');
        setIsLoading(false);
        return;
      }

      toast.success('Profile completed successfully!');
      navigate('/client/upload');
    } catch (error) {
      console.error('Error in handleCompleteSetup:', error);
      toast.error('Failed to complete setup');
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white rounded-xl shadow-2xl p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-blue-600 mb-2">ReceiptFlow</h1>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Complete Your Profile</h2>
            <p className="text-sm text-gray-600">We need a few more details to get you started</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between max-w-md mx-auto">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {currentStep > 1 ? <Check className="w-5 h-5" /> : '1'}
                </div>
                <span className={`text-xs mt-2 font-medium ${
                  currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'
                }`}>Personal Info</span>
              </div>

              <div className={`flex-1 h-1 mx-4 ${
                currentStep > 1 ? 'bg-blue-600' : 'bg-gray-300'
              }`} />

              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  2
                </div>
                <span className={`text-xs mt-2 font-medium ${
                  currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'
                }`}>Company Info</span>
              </div>
            </div>
          </div>

          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 1: Personal Information</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={step1Data.name}
                    disabled
                    className="mt-1 bg-gray-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">From your account</p>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={step1Data.email}
                    disabled
                    className="mt-1 bg-gray-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">From your account</p>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+46 70 123 4567"
                    value={step1Data.phone}
                    onChange={(e) => setStep1Data({ ...step1Data, phone: e.target.value })}
                    className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="street" className="text-sm font-medium text-gray-700">Street Address *</Label>
                  <Input
                    id="street"
                    type="text"
                    placeholder="Kungsgatan 12"
                    value={step1Data.street}
                    onChange={(e) => setStep1Data({ ...step1Data, street: e.target.value })}
                    className={`mt-1 ${errors.street ? 'border-red-500' : ''}`}
                  />
                  {errors.street && <p className="text-xs text-red-600 mt-1">{errors.street}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">City *</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Göteborg"
                      value={step1Data.city}
                      onChange={(e) => setStep1Data({ ...step1Data, city: e.target.value })}
                      className={`mt-1 ${errors.city ? 'border-red-500' : ''}`}
                    />
                    {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      type="text"
                      placeholder="411 19"
                      value={step1Data.postalCode}
                      onChange={(e) => setStep1Data({ ...step1Data, postalCode: e.target.value })}
                      className={`mt-1 ${errors.postalCode ? 'border-red-500' : ''}`}
                    />
                    {errors.postalCode && <p className="text-xs text-red-600 mt-1">{errors.postalCode}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="country" className="text-sm font-medium text-gray-700 mb-1">Country *</Label>
                  <Select value={step1Data.country} onValueChange={(value) => setStep1Data({ ...step1Data, country: value })}>
                    <SelectTrigger className={`mt-1 ${errors.country ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SE">Sweden</SelectItem>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="NO">Norway</SelectItem>
                      <SelectItem value="DK">Denmark</SelectItem>
                      <SelectItem value="FI">Finland</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">This determines your accounting system and chart of accounts</p>
                  {errors.country && <p className="text-xs text-red-600 mt-1">{errors.country}</p>}
                </div>
              </div>

              <Button
                onClick={handleContinue}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg font-semibold text-base"
              >
                Continue
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 2: Company Information</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">Company Name *</Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="ABC Consulting AB"
                    value={step2Data.companyName}
                    onChange={(e) => setStep2Data({ ...step2Data, companyName: e.target.value })}
                    className={`mt-1 ${errors.companyName ? 'border-red-500' : ''}`}
                  />
                  {errors.companyName && <p className="text-xs text-red-600 mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <Label htmlFor="organizationNumber" className="text-sm font-medium text-gray-700">Organization Number *</Label>
                  <Input
                    id="organizationNumber"
                    type="text"
                    placeholder="556789-1234"
                    value={step2Data.organizationNumber}
                    onChange={(e) => setStep2Data({ ...step2Data, organizationNumber: e.target.value })}
                    className={`mt-1 ${errors.organizationNumber ? 'border-red-500' : ''}`}
                  />
                  <p className="text-xs text-gray-500 mt-1">Swedish organization number format: XXXXXX-XXXX</p>
                  {errors.organizationNumber && <p className="text-xs text-red-600 mt-1">{errors.organizationNumber}</p>}
                </div>

                <div>
                  <Label htmlFor="companyAddress" className="text-sm font-medium text-gray-700">Company Address (Optional)</Label>
                  <Input
                    id="companyAddress"
                    type="text"
                    placeholder="Leave blank if same as personal address"
                    value={step2Data.companyAddress}
                    onChange={(e) => setStep2Data({ ...step2Data, companyAddress: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="vatNumber" className="text-sm font-medium text-gray-700">VAT Number (Optional)</Label>
                  <Input
                    id="vatNumber"
                    type="text"
                    placeholder="SE556789123401"
                    value={step2Data.vatNumber}
                    onChange={(e) => setStep2Data({ ...step2Data, vatNumber: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 py-6 rounded-lg font-semibold text-base"
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  onClick={handleCompleteSetup}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg font-semibold text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Setting up your account...
                    </>
                  ) : (
                    'Complete Setup'
                  )}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
