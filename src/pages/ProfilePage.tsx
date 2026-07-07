import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Shield, Lock, AlertTriangle, Check, Settings } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useAuth } from '../contexts/AuthContext';

export function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLimitsModal, setShowLimitsModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    country: user?.country || '',
  });

  const handleSave = () => {
    updateUser(formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Profile</h1>
          <p className="text-slate-400">Manage your account settings</p>
        </div>
      </div>

      {/* Profile Header */}
      <Card>
        <CardBody className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center border-2 border-slate-800">
              {user?.kycStatus === 'verified' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              )}
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-slate-400">@{user?.username}</p>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
              <Badge variant={user?.kycStatus === 'verified' ? 'success' : 'warning'}>
                <Shield className="w-3 h-3 mr-1" />
                KYC: {user?.kycStatus}
              </Badge>
              <Badge variant="info">Member since {user?.createdAt}</Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowLimitsModal(true)}>
              <Settings className="w-4 h-4" />
              Limits
            </Button>
            <Button onClick={() => setShowPasswordModal(true)}>
              <Lock className="w-4 h-4" />
              Change Password
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Personal Details */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-white">Personal Details</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              icon={<User className="w-4" />}
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              icon={<User className="w-4" />}
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              icon={<Mail className="w-4" />}
            />
            <Input
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              icon={<Phone className="w-4" />}
            />
            <Input
              label="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              icon={<MapPin className="w-4" />}
            />
            <Input
              label="Date of Birth"
              type="date"
              value={user?.dateOfBirth}
              disabled
              icon={<Calendar className="w-4" />}
            />
          </div>

          <div className="mt-6">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardBody>
      </Card>

      {/* KYC Status */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-white">KYC Verification</h2>
        </CardHeader>
        <CardBody>
          <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              user?.kycStatus === 'verified' ? 'bg-emerald-500/20' : 'bg-amber-500/20'
            }`}>
              {user?.kycStatus === 'verified' ? (
                <Check className="w-6 h-6 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">
                {user?.kycStatus === 'verified' ? 'Account Verified' : 'Verification Pending'}
              </p>
              <p className="text-slate-400 text-sm">
                {user?.kycStatus === 'verified'
                  ? 'Your identity has been verified. All features are available.'
                  : 'Please complete verification to unlock all features and increase limits.'}
              </p>
            </div>
            {user?.kycStatus !== 'verified' && (
              <Button size="sm">Start Verification</Button>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Responsible Gaming */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            Responsible Gaming
          </h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-slate-400 text-sm">Deposit Limit</p>
              <p className="text-white font-bold text-xl">$1,000 / day</p>
              <Button variant="ghost" size="sm" className="mt-2">Edit</Button>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-slate-400 text-sm">Loss Limit</p>
              <p className="text-white font-bold text-xl">$500 / day</p>
              <Button variant="ghost" size="sm" className="mt-2">Edit</Button>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-slate-400 text-sm">Session Timeout</p>
              <p className="text-white font-bold text-xl">2 hours</p>
              <Button variant="ghost" size="sm" className="mt-2">Edit</Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">Self-Exclusion</Button>
            <Button variant="outline" size="sm">Cooling Off Period</Button>
            <Button variant="outline" size="sm">Reality Check</Button>
            <Button variant="danger" size="sm">Close Account</Button>
          </div>
        </CardBody>
      </Card>

      {/* Password Change Modal */}
      <Modal isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} title="Change Password">
        <div className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="Enter current password"
          />
          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
          />
          <Button fullWidth onClick={() => setShowPasswordModal(false)}>Update Password</Button>
        </div>
      </Modal>

      {/* Limits Modal */}
      <Modal isOpen={showLimitsModal} onClose={() => setShowLimitsModal(false)} title="Set Limits">
        <div className="space-y-6">
          <div>
            <Input
              label="Daily Deposit Limit"
              type="number"
              placeholder="Enter limit"
              suffix="USD"
            />
          </div>
          <div>
            <Input
              label="Daily Loss Limit"
              type="number"
              placeholder="Enter limit"
              suffix="USD"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Session Timeout</label>
            <select className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
              <option>4 hours</option>
              <option>Unlimited</option>
            </select>
          </div>
          <Button fullWidth onClick={() => setShowLimitsModal(false)}>Save Limits</Button>
        </div>
      </Modal>
    </div>
  );
}
