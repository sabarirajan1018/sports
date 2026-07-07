import { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useAuth } from '../contexts/AuthContext';
import { paymentMethods, transactions } from '../data/wallet';

export function WalletPage() {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'history'>('deposit');
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);
  const [amount, setAmount] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const { user, updateUser } = useAuth();

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (depositAmount > 0) {
      updateUser({ balance: (user?.balance || 0) + depositAmount });
      setShowConfirm(true);
    }
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount > 0 && withdrawAmount <= (user?.balance || 0)) {
      updateUser({ balance: (user?.balance || 0) - withdrawAmount });
      setShowConfirm(true);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="w-4 h-4 text-emerald-400" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-4 h-4 text-red-400" />;
      case 'bet':
        return <TrendingUp className="w-4 h-4 text-blue-400" />;
      case 'win':
        return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case 'bonus':
        return <Wallet className="w-4 h-4 text-amber-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Wallet</h1>
          <p className="text-slate-400">Manage your deposits and withdrawals</p>
        </div>

        <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl px-6 py-4">
          <p className="text-emerald-100 text-sm">Available Balance</p>
          <p className="text-3xl font-bold text-white">${user?.balance.toFixed(2)}</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
        <p className="text-amber-400 text-sm">
          Demo only - no real payments. Balances are simulated for demonstration purposes.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-800/50 rounded-xl">
        <button
          onClick={() => setActiveTab('deposit')}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'deposit'
              ? 'bg-emerald-500 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ArrowDownLeft className="w-4 h-4 inline mr-2" />
          Deposit
        </button>
        <button
          onClick={() => setActiveTab('withdraw')}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'withdraw'
              ? 'bg-emerald-500 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ArrowUpRight className="w-4 h-4 inline mr-2" />
          Withdraw
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'history'
              ? 'bg-emerald-500 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4 inline mr-2" />
          History
        </button>
      </div>

      {activeTab === 'deposit' && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-white">Make a Deposit</h2>
          </CardHeader>
          <CardBody className="space-y-6">
            <div>
              <label className="block text-sm text-slate-400 mb-3">Select Payment Method</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method)}
                    className={`p-4 rounded-xl border transition-all ${
                      selectedMethod.id === method.id
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{method.icon}</span>
                    <p className="text-white text-sm font-medium">{method.name}</p>
                    <p className="text-slate-400 text-xs">{method.processingTime}</p>
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Min $${selectedMethod.minDeposit}`}
              suffix="USD"
            />

            <div className="flex gap-2">
              {[50, 100, 250, 500, 1000].map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  className="flex-1 py-2 text-sm bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
                >
                  ${quickAmount}
                </button>
              ))}
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4 text-sm">
              <div className="flex justify-between text-slate-400 mb-2">
                <span>Min Deposit</span>
                <span>${selectedMethod.minDeposit}</span>
              </div>
              <div className="flex justify-between text-slate-400 mb-2">
                <span>Max Deposit</span>
                <span>${selectedMethod.maxDeposit}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Processing Time</span>
                <span>{selectedMethod.processingTime}</span>
              </div>
            </div>

            <Button fullWidth size="lg" onClick={handleDeposit} disabled={!amount || parseFloat(amount) <= 0}>
              <ArrowDownLeft className="w-5 h-5" />
              Deposit ${amount || '0'}
            </Button>
          </CardBody>
        </Card>
      )}

      {activeTab === 'withdraw' && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-white">Request Withdrawal</h2>
          </CardHeader>
          <CardBody className="space-y-6">
            <div>
              <label className="block text-sm text-slate-400 mb-3">Select Withdrawal Method</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method)}
                    className={`p-4 rounded-xl border transition-all ${
                      selectedMethod.id === method.id
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{method.icon}</span>
                    <p className="text-white text-sm font-medium">{method.name}</p>
                    <p className="text-slate-400 text-xs">{method.processingTime}</p>
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              suffix="USD"
            />

            <div className="bg-slate-700/30 rounded-lg p-4 text-sm">
              <div className="flex justify-between text-slate-400 mb-2">
                <span>Available Balance</span>
                <span className="text-white">${user?.balance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400 mb-2">
                <span>Min Withdrawal</span>
                <span>$20</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Processing Time</span>
                <span>{selectedMethod.processingTime}</span>
              </div>
            </div>

            <Button
              fullWidth
              size="lg"
              onClick={handleWithdraw}
              disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > (user?.balance || 0)}
            >
              <ArrowUpRight className="w-5 h-5" />
              Withdraw ${amount || '0'}
            </Button>
          </CardBody>
        </Card>
      )}

      {activeTab === 'history' && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-white">Transaction History</h2>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-slate-700">
              {transactions.map((tx) => (
                <div key={tx.id} className="px-4 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                      {getTransactionIcon(tx.type)}
                    </div>
                    <div>
                      <p className="text-white text-sm">{tx.description}</p>
                      <p className="text-slate-500 text-xs">
                        {new Date(tx.date).toLocaleString()}
                        {tx.method && ` - ${tx.method}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${tx.amount >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {tx.amount >= 0 ? '+' : ''}{tx.amount < 0 ? '' : ''}${Math.abs(tx.amount).toFixed(2)}
                    </p>
                    <Badge
                      variant={tx.status === 'completed' ? 'success' : tx.status === 'pending' ? 'warning' : 'danger'}
                      size="sm"
                    >
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)} title="Transaction Complete">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Demo Transaction Processed</h3>
          <p className="text-slate-400 mb-4">
            This is a demo transaction. No real money was transferred.
          </p>
          <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
            <p className="text-slate-400 text-sm mb-1">New Balance</p>
            <p className="text-2xl font-bold text-white">${user?.balance.toFixed(2)}</p>
          </div>
          <Button fullWidth onClick={() => setShowConfirm(false)}>
            OK
          </Button>
        </div>
      </Modal>
    </div>
  );
}
