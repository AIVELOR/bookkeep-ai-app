import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserMenu } from '@/components/UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Building2, Phone, Mail, MapPin, Edit, Plus, Users, ArrowLeft, Globe, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
// @ts-ignore
import { getAccountCodesForCountry, getAccountingSystemName } from '@/data/accountCodes';

interface AccountCodeMapping {
  id: string;
  category: string;
  debitAccount: string;
  creditAccount: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AgencySettings() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const [companyData, setCompanyData] = useState({
    name: 'BookKeep AI Agency',
    orgNumber: '559876-5432',
    address: 'Avenyn 45, 411 36 Göteborg',
    phone: '+46 31 789 1234',
    email: 'info@bookkeepai.se'
  });

  const [accountCodeMappings, setAccountCodeMappings] = useState<AccountCodeMapping[]>([
    { id: '1', category: 'Office Supplies', debitAccount: '5410', creditAccount: '2440' },
    { id: '2', category: 'Travel', debitAccount: '5610', creditAccount: '2440' },
    { id: '3', category: 'Meals', debitAccount: '5811', creditAccount: '2440' },
    { id: '4', category: 'Equipment', debitAccount: '5010', creditAccount: '2440' },
  ]);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Anna Svensson', email: 'admin@agency.se', role: 'Admin' },
    { id: '2', name: 'Erik Larsson', email: 'erik@agency.se', role: 'Bookkeeper' },
  ]);

  const [emailOnNewSubmission, setEmailOnNewSubmission] = useState(true);
  const [dailySummaryReport, setDailySummaryReport] = useState(true);
  const [weeklyAnalytics, setWeeklyAnalytics] = useState(false);

  const [showEditCompanyDialog, setShowEditCompanyDialog] = useState(false);
  const [showAddMappingDialog, setShowAddMappingDialog] = useState(false);
  const [showAddTeamMemberDialog, setShowAddTeamMemberDialog] = useState(false);
  const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false);

  const [editCompanyForm, setEditCompanyForm] = useState(companyData);
  const [mappingForm, setMappingForm] = useState({ category: '', debitAccount: '', creditAccount: '' });
  const [teamMemberForm, setTeamMemberForm] = useState({ name: '', email: '', role: 'Bookkeeper' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [agencyId, setAgencyId] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string>('SE');
  const [accountSearchQuery, setAccountSearchQuery] = useState('');

  const activeClientCountry = sessionStorage.getItem('activeClientCountry');
  const currentCountry = activeClientCountry || countryCode;
  const isViewingClient = !!activeClientCountry;

  useEffect(() => {
    loadAgencySettings();
    loadCountryInfo();
  }, []);

  function getCountryName(code: string): string {
    const countryNames: Record<string, string> = {
      'SE': 'Sweden',
      'US': 'United States',
      'UK': 'United Kingdom',
      'NO': 'Norway',
      'DK': 'Denmark',
      'FI': 'Finland'
    };
    return countryNames[code] || 'Sweden';
  }

  const loadCountryInfo = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: staffData } = await supabase
        .from('agency_staff')
        .select('agency_id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!staffData) return;

      const { data: agency } = await supabase
        .from('agencies')
        .select('country')
        .eq('id', staffData.agency_id)
        .maybeSingle();

      if (agency && agency.country) {
        setCountryCode(agency.country);
      }
    } catch (error) {
      console.error('Error loading country info:', error);
    }
  };

  const loadAgencySettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: staffData } = await supabase
        .from('agency_staff')
        .select('agency_id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!staffData) return;

      setAgencyId(staffData.agency_id);

      const { data: settings } = await supabase
        .from('agency_settings')
        .select('*')
        .eq('agency_id', staffData.agency_id)
        .maybeSingle();

      if (settings) {
        setEmailOnNewSubmission(settings.email_on_new_submission ?? true);
        setDailySummaryReport(settings.daily_summary_report ?? true);
        setWeeklyAnalytics(settings.weekly_analytics ?? false);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const savePreference = async (field: string, value: boolean) => {
    if (!agencyId) return;

    try {
      const { data: existingSettings } = await supabase
        .from('agency_settings')
        .select('id')
        .eq('agency_id', agencyId)
        .maybeSingle();

      if (existingSettings) {
        await supabase
          .from('agency_settings')
          .update({ [field]: value, updated_at: new Date().toISOString() })
          .eq('agency_id', agencyId);
      } else {
        await supabase
          .from('agency_settings')
          .insert({
            agency_id: agencyId,
            [field]: value,
          });
      }

      toast.success('Preference saved');
    } catch (error) {
      console.error('Error saving preference:', error);
      toast.error('Failed to save preference');
    }
  };

  const handleEditCompanyInfo = () => {
    setEditCompanyForm(companyData);
    setErrors({});
    setShowEditCompanyDialog(true);
  };

  const handleSaveCompanyInfo = () => {
    const newErrors: Record<string, string> = {};

    if (!editCompanyForm.name.trim()) newErrors.name = 'Company name is required';
    if (!editCompanyForm.orgNumber.trim()) newErrors.orgNumber = 'Organization number is required';
    if (!editCompanyForm.phone.trim()) newErrors.phone = 'Phone is required';
    if (!editCompanyForm.email.trim()) newErrors.email = 'Email is required';
    if (!editCompanyForm.address.trim()) newErrors.address = 'Address is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setCompanyData(editCompanyForm);
      setShowEditCompanyDialog(false);
      setIsSaving(false);
      toast.success('Company information updated successfully');
    }, 500);
  };

  const handleAddMapping = () => {
    setMappingForm({ category: '', debitAccount: '', creditAccount: '' });
    setErrors({});
    setShowAddMappingDialog(true);
  };

  const handleSaveNewMapping = () => {
    const newErrors: Record<string, string> = {};

    if (!mappingForm.category.trim()) newErrors.category = 'Category is required';
    if (!mappingForm.debitAccount.trim()) newErrors.debitAccount = 'Debit account is required';
    if (!mappingForm.creditAccount.trim()) newErrors.creditAccount = 'Credit account is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newMapping: AccountCodeMapping = {
      id: Date.now().toString(),
      category: mappingForm.category,
      debitAccount: mappingForm.debitAccount,
      creditAccount: mappingForm.creditAccount
    };

    setAccountCodeMappings([...accountCodeMappings, newMapping]);
    setShowAddMappingDialog(false);
    toast.success('Account mapping added successfully');
  };



  const handleAddTeamMember = () => {
    setTeamMemberForm({ name: '', email: '', role: 'Bookkeeper' });
    setErrors({});
    setShowAddTeamMemberDialog(true);
  };

  const handleSaveTeamMember = () => {
    const newErrors: Record<string, string> = {};

    if (!teamMemberForm.name.trim()) newErrors.name = 'Name is required';
    if (!teamMemberForm.email.trim()) newErrors.email = 'Email is required';
    if (!teamMemberForm.role.trim()) newErrors.role = 'Role is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: teamMemberForm.name,
      email: teamMemberForm.email,
      role: teamMemberForm.role
    };

    setTeamMembers([...teamMembers, newMember]);
    setShowAddTeamMemberDialog(false);
    toast.success('Team member added successfully');
  };

  const handleChangePassword = () => {
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setErrors({});
    setShowChangePasswordDialog(true);
  };

  const handleChangePasswordSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!passwordForm.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!passwordForm.newPassword) newErrors.newPassword = 'New password is required';
    if (passwordForm.newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters';
    if (passwordForm.newPassword !== passwordForm.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    toast.success('Password changed successfully');
    setShowChangePasswordDialog(false);
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
      setIsSigningOut(false);
    }
  };

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
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Agency Settings</h2>
          <p className="text-gray-600 mt-1">Manage your agency configuration and preferences</p>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Company Information</h3>
              <Button
                onClick={handleEditCompanyInfo}
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Agency Name</p>
                  <p className="text-base font-semibold text-gray-900">{companyData.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Organization Number</p>
                  <p className="text-base font-semibold text-gray-900">{companyData.orgNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="text-base font-semibold text-gray-900">{companyData.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-base font-semibold text-gray-900">{companyData.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-base font-semibold text-gray-900">{companyData.email}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-sm">
            {isViewingClient && (
              <div className="bg-blue-50 p-3 rounded-lg mb-4 border border-blue-200">
                <p className="text-sm text-blue-800 font-medium">
                  👁️ Showing account codes for active client's country
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Default Account Codes</h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Country: {getCountryName(currentCountry)} ({currentCountry})
                </p>
                <p className="text-sm text-gray-600">
                  Accounting system: {getAccountingSystemName(currentCountry)}
                </p>
              </div>
              <Button
                onClick={handleAddMapping}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Mapping
              </Button>
            </div>

            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by code, name, or category..."
                  value={accountSearchQuery}
                  onChange={(e) => setAccountSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              {(() => {
                const allCodes = getAccountCodesForCountry(currentCountry);
                const filteredCodes = accountSearchQuery
                  ? allCodes.filter((code: any) =>
                      code.code.toLowerCase().includes(accountSearchQuery.toLowerCase()) ||
                      code.name.toLowerCase().includes(accountSearchQuery.toLowerCase()) ||
                      code.category.toLowerCase().includes(accountSearchQuery.toLowerCase())
                    )
                  : [];

                if (!accountSearchQuery) {
                  return (
                    <div className="p-8 text-center text-gray-500">
                      <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm font-medium">Search to view account codes</p>
                      <p className="text-xs mt-1">Type a code, name, or category to find specific accounts</p>
                      <p className="text-xs text-gray-400 mt-2">{allCodes.length} accounts available</p>
                    </div>
                  );
                }

                if (filteredCodes.length === 0) {
                  return (
                    <div className="p-8 text-center text-gray-500">
                      <p className="text-sm font-medium">No accounts found</p>
                      <p className="text-xs mt-1">Try a different search term</p>
                    </div>
                  );
                }

                return (
                  <>
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <p className="text-sm text-gray-600">
                        Showing {filteredCodes.length} of {allCodes.length} accounts
                      </p>
                    </div>
                    <div className="max-h-[500px] overflow-y-auto">
                      <Table>
                        <TableHeader className="sticky top-0 bg-gray-50 z-10">
                          <TableRow>
                            <TableHead className="font-semibold text-gray-900">Category</TableHead>
                            <TableHead className="font-semibold text-gray-900">Code</TableHead>
                            <TableHead className="font-semibold text-gray-900">Account Name</TableHead>
                            <TableHead className="font-semibold text-gray-900">Type</TableHead>
                            <TableHead className="font-semibold text-gray-900 text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredCodes.map((code: any) => (
                            <TableRow key={code.code}>
                              <TableCell className="font-medium">{code.category}</TableCell>
                              <TableCell className="font-mono text-sm">{code.code}</TableCell>
                              <TableCell>{code.name}</TableCell>
                              <TableCell>
                                <Badge className={code.type === 'debit' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}>
                                  {code.type === 'debit' ? 'Debit' : 'Credit'}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-600 hover:text-blue-600"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </>
                );
              })()}
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Agency Staff
                </h3>
                <p className="text-sm text-gray-600 mt-1">Manage team members and their roles</p>
              </div>
              <Button
                onClick={handleAddTeamMember}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Team Member
              </Button>
            </div>

            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                      {member.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h3>

            <div className="space-y-6">
              <div className="flex items-start justify-between py-3">
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-gray-900 mb-1">
                    Email notifications
                  </h4>
                  <p className="text-sm text-gray-600">Receive updates via email (RICKY55@GMAIL.COM)</p>
                </div>
                <Button
                  onClick={() => {
                    const newValue = !emailOnNewSubmission;
                    setEmailOnNewSubmission(newValue);
                    savePreference('email_on_new_submission', newValue);
                  }}
                  variant="outline"
                  className={`min-w-[80px] font-semibold ${
                    emailOnNewSubmission
                      ? 'border-2 border-green-600 text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700'
                      : 'border-2 border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {emailOnNewSubmission ? 'ON' : 'OFF'}
                </Button>
              </div>

              <div className="flex items-start justify-between py-3">
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-gray-900 mb-1">
                    SMS notifications
                  </h4>
                  <p className="text-sm text-gray-600">Receive updates via SMS (0760958975)</p>
                </div>
                <Button
                  onClick={() => {
                    const newValue = !dailySummaryReport;
                    setDailySummaryReport(newValue);
                    savePreference('daily_summary_report', newValue);
                  }}
                  variant="outline"
                  className={`min-w-[80px] font-semibold ${
                    dailySummaryReport
                      ? 'border-2 border-green-600 text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700'
                      : 'border-2 border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {dailySummaryReport ? 'ON' : 'OFF'}
                </Button>
              </div>

              <div className="flex items-start justify-between py-3">
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-gray-900 mb-1">
                    Auto-save drafts
                  </h4>
                  <p className="text-sm text-gray-600">Automatically save your work</p>
                </div>
                <Button
                  onClick={() => {
                    const newValue = !weeklyAnalytics;
                    setWeeklyAnalytics(newValue);
                    savePreference('weekly_analytics', newValue);
                  }}
                  variant="outline"
                  className={`min-w-[80px] font-semibold ${
                    weeklyAnalytics
                      ? 'border-2 border-green-600 text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700'
                      : 'border-2 border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {weeklyAnalytics ? 'ON' : 'OFF'}
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
        </div>
      </main>

      <Dialog open={showEditCompanyDialog} onOpenChange={setShowEditCompanyDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Company Information</DialogTitle>
            <DialogDescription>
              Update your agency details. Changes will be saved immediately.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Agency Name *</Label>
              <Input
                id="edit-name"
                value={editCompanyForm.name}
                onChange={(e) => {
                  setEditCompanyForm({ ...editCompanyForm, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                placeholder="Enter agency name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-org">Organization Number *</Label>
              <Input
                id="edit-org"
                value={editCompanyForm.orgNumber}
                onChange={(e) => {
                  setEditCompanyForm({ ...editCompanyForm, orgNumber: e.target.value });
                  if (errors.orgNumber) setErrors({ ...errors, orgNumber: '' });
                }}
                placeholder="XXXXXX-XXXX"
                className={errors.orgNumber ? 'border-red-500' : ''}
              />
              {errors.orgNumber && <p className="text-sm text-red-600">{errors.orgNumber}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-address">Address *</Label>
              <Input
                id="edit-address"
                value={editCompanyForm.address}
                onChange={(e) => {
                  setEditCompanyForm({ ...editCompanyForm, address: e.target.value });
                  if (errors.address) setErrors({ ...errors, address: '' });
                }}
                placeholder="Street, Postal Code, City"
                className={errors.address ? 'border-red-500' : ''}
              />
              {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone *</Label>
              <Input
                id="edit-phone"
                type="tel"
                value={editCompanyForm.phone}
                onChange={(e) => {
                  setEditCompanyForm({ ...editCompanyForm, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                placeholder="+46 XX XXX XXXX"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                value={editCompanyForm.email}
                onChange={(e) => {
                  setEditCompanyForm({ ...editCompanyForm, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="info@agency.se"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEditCompanyDialog(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveCompanyInfo}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddMappingDialog} onOpenChange={setShowAddMappingDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Account Code Mapping</DialogTitle>
            <DialogDescription>
              Create a new default account code mapping for an expense category.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                value={mappingForm.category}
                onChange={(e) => {
                  setMappingForm({ ...mappingForm, category: e.target.value });
                  if (errors.category) setErrors({ ...errors, category: '' });
                }}
                placeholder="e.g., Office Supplies"
                className={errors.category ? 'border-red-500' : ''}
              />
              {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="debit">Debit Account *</Label>
              <Input
                id="debit"
                value={mappingForm.debitAccount}
                onChange={(e) => {
                  setMappingForm({ ...mappingForm, debitAccount: e.target.value });
                  if (errors.debitAccount) setErrors({ ...errors, debitAccount: '' });
                }}
                placeholder="e.g., 5410"
                className={errors.debitAccount ? 'border-red-500' : ''}
              />
              {errors.debitAccount && <p className="text-sm text-red-600">{errors.debitAccount}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="credit">Credit Account *</Label>
              <Input
                id="credit"
                value={mappingForm.creditAccount}
                onChange={(e) => {
                  setMappingForm({ ...mappingForm, creditAccount: e.target.value });
                  if (errors.creditAccount) setErrors({ ...errors, creditAccount: '' });
                }}
                placeholder="e.g., 2440"
                className={errors.creditAccount ? 'border-red-500' : ''}
              />
              {errors.creditAccount && <p className="text-sm text-red-600">{errors.creditAccount}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddMappingDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveNewMapping}
            >
              Add Mapping
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Dialog open={showAddTeamMemberDialog} onOpenChange={setShowAddTeamMemberDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>
              Add a new team member to your agency.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="member-name">Full Name *</Label>
              <Input
                id="member-name"
                value={teamMemberForm.name}
                onChange={(e) => {
                  setTeamMemberForm({ ...teamMemberForm, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                placeholder="e.g., Anna Svensson"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="member-email">Email *</Label>
              <Input
                id="member-email"
                type="email"
                value={teamMemberForm.email}
                onChange={(e) => {
                  setTeamMemberForm({ ...teamMemberForm, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="anna@agency.se"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="member-role">Role *</Label>
              <Input
                id="member-role"
                value={teamMemberForm.role}
                onChange={(e) => {
                  setTeamMemberForm({ ...teamMemberForm, role: e.target.value });
                  if (errors.role) setErrors({ ...errors, role: '' });
                }}
                placeholder="e.g., Bookkeeper, Admin"
                className={errors.role ? 'border-red-500' : ''}
              />
              {errors.role && <p className="text-sm text-red-600">{errors.role}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddTeamMemberDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveTeamMember}
            >
              Add Team Member
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
                placeholder="Enter new password (min. 6 characters)"
                className={errors.newPassword ? 'border-red-500' : ''}
              />
              {errors.newPassword && (
                <p className="text-sm text-red-600">{errors.newPassword}</p>
              )}
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
