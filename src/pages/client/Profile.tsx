import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, User, Edit, Building2, Phone, Mail, MapPin, TrendingUp, ArrowLeft, Home, Upload, X, Globe } from 'lucide-react';
import { toast } from 'sonner';

export default function ClientProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, userRole } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [autoSaveDrafts, setAutoSaveDrafts] = useState(true);
  const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);
  const [showEditAccountDialog, setShowEditAccountDialog] = useState(false);
  const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Activity statistics state
  const [activityStats, setActivityStats] = useState({
    totalSubmitted: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    monthTotal: 0
  });

  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    profileImage: null as string | null,
  });

  const [editProfileForm, setEditProfileForm] = useState({
    name: '',
    profileImage: null as string | null,
  });

  const [accountData, setAccountData] = useState({
    companyName: 'ABC Consulting AB',
    orgNumber: '556789-1234',
    email: 'john.doe@company.com',
    phone: '+46 70 123 4567',
    address: 'Kungsgatan 12',
    city: 'Göteborg',
    postalCode: '411 19',
    companyAddress: '',
    vatNumber: '',
    country: '',
    createdAt: new Date().toISOString(),
  });

  const [editAccountForm, setEditAccountForm] = useState({
    companyName: '',
    orgNumber: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    companyAddress: '',
    vatNumber: '',
    createdAt: new Date().toISOString(),
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Function to save preferences to database
  const savePreferences = async (email: boolean, sms: boolean, autoSave: boolean) => {
    if (!userRole?.profileId) return false;

    try {
      const { error } = await supabase
        .from('client_preferences')
        .update({
          email_notifications: email,
          sms_notifications: sms,
          auto_save_drafts: autoSave,
          updated_at: new Date().toISOString()
        })
        .eq('client_id', userRole.profileId);

      if (error) {
        console.error('Error saving preferences:', error);
        toast.error('Failed to save preferences');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in savePreferences:', error);
      toast.error('Failed to save preferences');
      return false;
    }
  };

  // Fetch client profile data from database
  useEffect(() => {
    const fetchClientData = async () => {
      if (!userRole?.profileId) return;

      try {
        const { data: client, error } = await supabase
          .from('clients')
          .select('name, email, company_name, organization_number, phone, address, city, postal_code, company_address, vat_number, country, created_at')
          .eq('id', userRole.profileId)
          .maybeSingle();

        if (error) {
          console.error('Error fetching client data:', error);
          return;
        }

        if (client) {
          setProfileData({
            name: client.name,
            profileImage: null
          });
          setAccountData({
            companyName: client.company_name || '',
            orgNumber: client.organization_number || '',
            email: client.email || '',
            phone: client.phone || '',
            address: client.address || '',
            city: client.city || '',
            postalCode: client.postal_code || '',
            companyAddress: client.company_address || '',
            vatNumber: client.vat_number || '',
            country: client.country || '',
            createdAt: client.created_at || new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('Error in fetchClientData:', error);
      }
    };

    fetchClientData();

    // Fetch client preferences
    const fetchPreferences = async () => {
      if (!userRole?.profileId) return;

      try {
        const { data: prefs, error } = await supabase
          .from('client_preferences')
          .select('email_notifications, sms_notifications, auto_save_drafts')
          .eq('client_id', userRole.profileId)
          .maybeSingle();

        if (error) {
          console.error('Error fetching preferences:', error);
          return;
        }

        if (prefs) {
          setEmailNotifications(prefs.email_notifications);
          setSmsNotifications(prefs.sms_notifications);
          setAutoSaveDrafts(prefs.auto_save_drafts);
        } else {
          // Create default preferences if none exist
          const { error: insertError } = await supabase
            .from('client_preferences')
            .insert({
              client_id: userRole.profileId,
              email_notifications: true,
              sms_notifications: false,
              auto_save_drafts: true
            });

          if (insertError) {
            console.error('Error creating preferences:', insertError);
          }
        }
      } catch (error) {
        console.error('Error in fetchPreferences:', error);
      }
    };

    fetchPreferences();
  }, [userRole?.profileId]);

  // Fetch and sync activity statistics from database
  useEffect(() => {
    const fetchActivityStats = async () => {
      if (!userRole?.profileId) return;

      try {
        const { data: receipts, error } = await supabase
          .from('receipts')
          .select('status, total_amount, created_at')
          .eq('client_id', userRole.profileId);

        if (error) {
          console.error('Error fetching receipts:', error);
          return;
        }

        if (receipts) {
          const now = new Date();
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();

          const totalSubmitted = receipts.length;
          const pending = receipts.filter(r => r.status === 'pending').length;
          const rejected = receipts.filter(r => r.status === 'rejected').length;

          const approvedThisMonth = receipts.filter(r => {
            const receiptDate = new Date(r.created_at);
            return r.status === 'approved' &&
                   receiptDate.getMonth() === currentMonth &&
                   receiptDate.getFullYear() === currentYear;
          });

          const monthTotal = approvedThisMonth.reduce((sum, r) => sum + parseFloat(r.total_amount || '0'), 0);

          setActivityStats({
            totalSubmitted,
            pending,
            approved: approvedThisMonth.length,
            rejected,
            monthTotal
          });
        }
      } catch (error) {
        console.error('Error in fetchActivityStats:', error);
      }
    };

    fetchActivityStats();

    // Set up real-time subscription for receipt changes
    const subscription = supabase
      .channel('receipts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'receipts',
          filter: `client_id=eq.${userRole?.profileId}`
        },
        () => {
          // Refetch stats when any receipt changes
          fetchActivityStats();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userRole?.profileId]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
      setIsSigningOut(false);
    }
  };

  const handleEditProfile = () => {
    setEditProfileForm({
      name: profileData.name,
      profileImage: profileData.profileImage,
    });
    setErrors({});
    setShowEditProfileDialog(true);
  };

  const handleEditAccount = () => {
    setEditAccountForm({
      companyName: accountData.companyName,
      orgNumber: accountData.orgNumber,
      email: accountData.email,
      phone: accountData.phone,
      address: accountData.address,
      city: accountData.city,
      postalCode: accountData.postalCode,
      companyAddress: accountData.companyAddress,
      vatNumber: accountData.vatNumber,
      createdAt: accountData.createdAt,
    });
    setErrors({});
    setShowEditAccountDialog(true);
  };

  const handleChangePassword = () => {
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setErrors({});
    setShowChangePasswordDialog(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPG, PNG, or GIF)');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditProfileForm({ ...editProfileForm, profileImage: reader.result as string });
      setIsUploading(false);
      toast.success('Image uploaded successfully');
    };
    reader.onerror = () => {
      setIsUploading(false);
      toast.error('Failed to upload image');
    };
    reader.readAsDataURL(file);
  };

  const removeProfileImage = () => {
    setEditProfileForm({ ...editProfileForm, profileImage: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[0-9\s-]{8,}$/;
    return phoneRegex.test(phone);
  };

  const handleSaveProfile = async () => {
    const newErrors: Record<string, string> = {};

    if (!editProfileForm.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('clients')
        .update({ name: editProfileForm.name })
        .eq('id', userRole?.profileId);

      if (error) {
        console.error('Error saving profile:', error);
        toast.error('Failed to save profile changes');
        setIsSaving(false);
        return;
      }

      setProfileData({
        name: editProfileForm.name,
        profileImage: editProfileForm.profileImage,
      });
      setShowEditProfileDialog(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error in handleSaveProfile:', error);
      toast.error('Failed to save profile changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAccount = async () => {
    const newErrors: Record<string, string> = {};

    if (!editAccountForm.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!editAccountForm.orgNumber.trim()) {
      newErrors.orgNumber = 'Organization number is required';
    }

    if (!editAccountForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(editAccountForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!editAccountForm.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(editAccountForm.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!editAccountForm.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const wasEmailChanged = accountData.email !== editAccountForm.email;
    const wasPhoneChanged = accountData.phone !== editAccountForm.phone;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('clients')
        .update({
          company_name: editAccountForm.companyName,
          organization_number: editAccountForm.orgNumber,
          email: editAccountForm.email,
          phone: editAccountForm.phone,
          address: editAccountForm.address
        })
        .eq('id', userRole?.profileId);

      if (error) {
        console.error('Error saving account:', error);
        toast.error('Failed to save account information');
        setIsSaving(false);
        return;
      }

      setAccountData({
        companyName: editAccountForm.companyName,
        orgNumber: editAccountForm.orgNumber,
        email: editAccountForm.email,
        phone: editAccountForm.phone,
        address: editAccountForm.address,
        city: editAccountForm.city,
        postalCode: editAccountForm.postalCode,
        companyAddress: editAccountForm.companyAddress,
        vatNumber: editAccountForm.vatNumber,
        country: accountData.country,
        createdAt: editAccountForm.createdAt,
      });
      setShowEditAccountDialog(false);
      toast.success('Account information updated successfully');

      if (wasEmailChanged && emailNotifications) {
        toast.info(`Email notifications will now be sent to ${editAccountForm.email}`);
      }
      if (wasPhoneChanged && smsNotifications) {
        toast.info(`SMS notifications will now be sent to ${editAccountForm.phone}`);
      }
    } catch (error) {
      console.error('Error in handleSaveAccount:', error);
      toast.error('Failed to save account information');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePasswordSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordForm.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setShowChangePasswordDialog(false);
    toast.success('Password changed successfully');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
        <Card className="p-6 bg-white shadow-sm">
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="w-24 h-24 bg-blue-100">
              {profileData.profileImage ? (
                <AvatarImage src={profileData.profileImage} alt={profileData.name} />
              ) : (
                <AvatarFallback className="text-2xl font-bold text-blue-600">
                  {getInitials(profileData.name)}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Client</Badge>
            </div>

            <Button
              onClick={handleEditProfile}
              variant="outline"
              className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
            <Button
              onClick={handleEditAccount}
              variant="outline"
              size="sm"
              className="bg-transparent border-blue-600 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Company Name</p>
                <p className="text-base font-semibold text-gray-900">{accountData.companyName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Organization Number</p>
                <p className="text-base font-semibold text-gray-900">{accountData.orgNumber}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-base font-semibold text-gray-900">{accountData.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-base font-semibold text-gray-900">{accountData.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Personal Address</p>
                <p className="text-base font-semibold text-gray-900">
                  {accountData.address}
                  {accountData.city && accountData.postalCode && (
                    <><br />{accountData.city}, {accountData.postalCode}</>
                  )}
                </p>
              </div>
            </div>

            {accountData.companyAddress && (
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Company Address</p>
                  <p className="text-base font-semibold text-gray-900">{accountData.companyAddress}</p>
                </div>
              </div>
            )}

            {accountData.vatNumber && (
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">VAT Number</p>
                  <p className="text-base font-semibold text-gray-900">{accountData.vatNumber}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="text-base font-semibold text-gray-900">
                  {new Date(accountData.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-sm space-y-4 border-2 border-blue-200">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Country & Accounting System</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Country</p>
                <p className="text-base font-semibold text-gray-900">
                  {accountData.country === 'SE' && '🇸🇪 Sweden'}
                  {accountData.country === 'US' && '🇺🇸 United States'}
                  {accountData.country === 'UK' && '🇬🇧 United Kingdom'}
                  {accountData.country === 'NO' && '🇳🇴 Norway'}
                  {accountData.country === 'DK' && '🇩🇰 Denmark'}
                  {accountData.country === 'FI' && '🇫🇮 Finland'}
                  {!accountData.country && 'Not set'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Country Code</p>
                <p className="text-base font-semibold text-gray-900">{accountData.country || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Accounting System</p>
                <p className="text-base font-semibold text-gray-900">
                  {accountData.country === 'SE' && 'Swedish BAS (Bokföringsnämndens Allmänna Råd)'}
                  {accountData.country === 'US' && 'US GAAP (Generally Accepted Accounting Principles)'}
                  {accountData.country === 'UK' && 'UK GAAP'}
                  {accountData.country === 'NO' && 'Norwegian Standard'}
                  {accountData.country === 'DK' && 'Danish Standard'}
                  {accountData.country === 'FI' && 'Finnish Standard'}
                  {!accountData.country && 'Not configured'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Status</p>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Bookkeeping Agency</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Agency Name</p>
                <p className="text-base font-semibold text-gray-900">Nordic Accounting AB</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Contact Person</p>
                <p className="text-base font-semibold text-gray-900">Anna Svensson</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-base font-semibold text-gray-900">anna@nordicaccounting.se</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-base font-semibold text-gray-900">+46 31 123 4567</p>
              </div>
            </div>

          </div>
        </Card>

        <Card className="p-6 bg-white shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Your Activity</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Receipts Submitted</p>
              <p className="text-2xl font-bold text-gray-900">{activityStats.totalSubmitted}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Pending Review</p>
              <p className="text-2xl font-bold text-orange-600">{activityStats.pending}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Approved This Month</p>
              <p className="text-2xl font-bold text-green-600">{activityStats.approved}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{activityStats.rejected}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg col-span-2">
              <p className="text-sm text-blue-700 mb-1">This Month's Total</p>
              <p className="text-3xl font-bold text-blue-900">{activityStats.monthTotal.toLocaleString('sv-SE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SEK</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex-1">
                <Label htmlFor="email-notifications" className="text-base font-medium text-gray-900">
                  Email notifications
                </Label>
                <p className="text-sm text-gray-600">
                  Receive updates via email{accountData.email && ` (${accountData.email})`}
                </p>
              </div>
              <Button
                id="email-notifications"
                onClick={async () => {
                  if (!accountData.email) {
                    toast.error('Please add an email address in Account Information first');
                    return;
                  }
                  const newValue = !emailNotifications;
                  setEmailNotifications(newValue);
                  const saved = await savePreferences(newValue, smsNotifications, autoSaveDrafts);
                  if (saved) {
                    if (newValue) {
                      toast.success(`Email notifications enabled for ${accountData.email}`);
                    } else {
                      toast.info('Email notifications disabled');
                    }
                  } else {
                    setEmailNotifications(!newValue);
                  }
                }}
                variant="outline"
                className={`min-w-[80px] ${
                  emailNotifications
                    ? 'bg-green-50 border-green-600 text-green-700 hover:bg-green-100'
                    : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {emailNotifications ? 'ON' : 'OFF'}
              </Button>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex-1">
                <Label htmlFor="sms-notifications" className="text-base font-medium text-gray-900">
                  SMS notifications
                </Label>
                <p className="text-sm text-gray-600">
                  Receive updates via SMS{accountData.phone && ` (${accountData.phone})`}
                </p>
              </div>
              <Button
                id="sms-notifications"
                onClick={async () => {
                  if (!accountData.phone) {
                    toast.error('Please add a phone number in Account Information first');
                    return;
                  }
                  const newValue = !smsNotifications;
                  setSmsNotifications(newValue);
                  const saved = await savePreferences(emailNotifications, newValue, autoSaveDrafts);
                  if (saved) {
                    if (newValue) {
                      toast.success(`SMS notifications enabled for ${accountData.phone}`);
                    } else {
                      toast.info('SMS notifications disabled');
                    }
                  } else {
                    setSmsNotifications(!newValue);
                  }
                }}
                variant="outline"
                className={`min-w-[80px] ${
                  smsNotifications
                    ? 'bg-green-50 border-green-600 text-green-700 hover:bg-green-100'
                    : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {smsNotifications ? 'ON' : 'OFF'}
              </Button>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex-1">
                <Label htmlFor="auto-save" className="text-base font-medium text-gray-900">
                  Auto-save drafts
                </Label>
                <p className="text-sm text-gray-600">Automatically save your work</p>
              </div>
              <Button
                id="auto-save"
                onClick={async () => {
                  const newValue = !autoSaveDrafts;
                  setAutoSaveDrafts(newValue);
                  const saved = await savePreferences(emailNotifications, smsNotifications, newValue);
                  if (saved) {
                    if (newValue) {
                      toast.success('Auto-save drafts enabled');
                    } else {
                      toast.info('Auto-save drafts disabled');
                    }
                  } else {
                    setAutoSaveDrafts(!newValue);
                  }
                }}
                variant="outline"
                className={`min-w-[80px] ${
                  autoSaveDrafts
                    ? 'bg-green-50 border-green-600 text-green-700 hover:bg-green-100'
                    : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {autoSaveDrafts ? 'ON' : 'OFF'}
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-sm space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Security</h3>

          <Button
            onClick={handleChangePassword}
            variant="outline"
            className="w-full"
          >
            Change Password
          </Button>

          <Button
            onClick={handleSignOut}
            disabled={isSigningOut}
            variant="outline"
            className="w-full bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 hover:text-white"
          >
            {isSigningOut ? 'Signing Out...' : 'Sign Out'}
          </Button>
        </Card>
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

      <Dialog open={showEditProfileDialog} onOpenChange={setShowEditProfileDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your personal information and profile picture.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24 bg-blue-100">
                {editProfileForm.profileImage ? (
                  <AvatarImage src={editProfileForm.profileImage} alt="Profile preview" />
                ) : (
                  <AvatarFallback className="text-2xl font-bold text-blue-600">
                    {getInitials(editProfileForm.name || profileData.name)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploading ? 'Uploading...' : 'Upload Photo'}
                </Button>
                {editProfileForm.profileImage && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeProfileImage}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif"
                onChange={handleImageUpload}
                className="hidden"
              />
              <p className="text-xs text-gray-500 text-center">
                JPG, PNG or GIF. Max size 5MB.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name *</Label>
              <Input
                id="edit-name"
                value={editProfileForm.name}
                onChange={(e) => {
                  setEditProfileForm({ ...editProfileForm, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                placeholder="Enter your full name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name}</p>
              )}
            </div>

          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEditProfileDialog(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveProfile}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditAccountDialog} onOpenChange={setShowEditAccountDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Account Information</DialogTitle>
            <DialogDescription>
              Update your company and contact details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              <Label htmlFor="edit-company">Company Name *</Label>
              <Input
                id="edit-company"
                value={editAccountForm.companyName}
                onChange={(e) => {
                  setEditAccountForm({ ...editAccountForm, companyName: e.target.value });
                  if (errors.companyName) setErrors({ ...errors, companyName: '' });
                }}
                placeholder="Enter company name"
                className={errors.companyName ? 'border-red-500' : ''}
              />
              {errors.companyName && (
                <p className="text-sm text-red-600">{errors.companyName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-org">Organization Number *</Label>
              <Input
                id="edit-org"
                value={editAccountForm.orgNumber}
                onChange={(e) => {
                  setEditAccountForm({ ...editAccountForm, orgNumber: e.target.value });
                  if (errors.orgNumber) setErrors({ ...errors, orgNumber: '' });
                }}
                placeholder="Enter organization number"
                className={errors.orgNumber ? 'border-red-500' : ''}
              />
              {errors.orgNumber && (
                <p className="text-sm text-red-600">{errors.orgNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-account-email">Email Address *</Label>
              <Input
                id="edit-account-email"
                type="email"
                value={editAccountForm.email}
                onChange={(e) => {
                  setEditAccountForm({ ...editAccountForm, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="Enter your email"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
              {emailNotifications && (
                <p className="text-xs text-blue-600">
                  Email notifications will be sent to this address
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone Number *</Label>
              <Input
                id="edit-phone"
                value={editAccountForm.phone}
                onChange={(e) => {
                  setEditAccountForm({ ...editAccountForm, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                placeholder="Enter phone number"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone}</p>
              )}
              {smsNotifications && (
                <p className="text-xs text-blue-600">
                  SMS notifications will be sent to this number
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-address">Address *</Label>
              <Input
                id="edit-address"
                value={editAccountForm.address}
                onChange={(e) => {
                  setEditAccountForm({ ...editAccountForm, address: e.target.value });
                  if (errors.address) setErrors({ ...errors, address: '' });
                }}
                placeholder="Enter address"
                className={errors.address ? 'border-red-500' : ''}
              />
              {errors.address && (
                <p className="text-sm text-red-600">{errors.address}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEditAccountDialog(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveAccount}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showChangePasswordDialog} onOpenChange={setShowChangePasswordDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new one.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password *</Label>
              <Input
                id="current-password"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => {
                  setPasswordForm({ ...passwordForm, currentPassword: e.target.value });
                  if (errors.currentPassword) setErrors({ ...errors, currentPassword: '' });
                }}
                placeholder="Enter current password"
                className={errors.currentPassword ? 'border-red-500' : ''}
              />
              {errors.currentPassword && (
                <p className="text-sm text-red-600">{errors.currentPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password *</Label>
              <Input
                id="new-password"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => {
                  setPasswordForm({ ...passwordForm, newPassword: e.target.value });
                  if (errors.newPassword) setErrors({ ...errors, newPassword: '' });
                }}
                placeholder="Enter new password"
                className={errors.newPassword ? 'border-red-500' : ''}
              />
              {errors.newPassword && (
                <p className="text-sm text-red-600">{errors.newPassword}</p>
              )}
              <p className="text-xs text-gray-500">Must be at least 8 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password *</Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => {
                  setPasswordForm({ ...passwordForm, confirmPassword: e.target.value });
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                }}
                placeholder="Confirm new password"
                className={errors.confirmPassword ? 'border-red-500' : ''}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowChangePasswordDialog(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleChangePasswordSubmit}>
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
