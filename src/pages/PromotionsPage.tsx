import { useState } from 'react';
import { Gift, Clock, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { promotions } from '../data/promotions';

export function PromotionsPage() {
  const [selectedPromo, setSelectedPromo] = useState<typeof promotions[0] | null>(null);
  const [expandedTerms, setExpandedTerms] = useState<string[]>([]);

  const toggleTerms = (id: string) => {
    setExpandedTerms((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const getPromoIcon = (type: string) => {
    switch (type) {
      case 'welcome':
        return '🎉';
      case 'freebet':
        return '🎰';
      case 'cashback':
        return '💰';
      case 'referral':
        return '🤝';
      case 'reload':
        return '🎁';
      default:
        return '🎉';
    }
  };

  const getPromoColor = (type: string) => {
    switch (type) {
      case 'welcome':
        return 'from-emerald-600 to-cyan-600';
      case 'freebet':
        return 'from-purple-600 to-pink-600';
      case 'cashback':
        return 'from-amber-600 to-orange-600';
      case 'referral':
        return 'from-blue-600 to-indigo-600';
      case 'reload':
        return 'from-red-600 to-rose-600';
      default:
        return 'from-slate-600 to-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Promotions</h1>
          <p className="text-slate-400">Discover our latest offers and bonuses</p>
        </div>

        <div className="flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-lg border border-amber-500/30">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-amber-400 text-sm font-medium">5 Active Offers</span>
        </div>
      </div>

      {/* Featured Promotion */}
      <div className={`bg-gradient-to-r ${getPromoColor('welcome')} rounded-2xl p-6 md:p-8`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Badge variant="default" className="mb-3">Featured</Badge>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Bonus</h2>
            <p className="text-white/80 text-lg mb-4">
              Get 100% bonus on your first deposit up to $500!
            </p>
            <div className="flex items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Valid until March 31, 2025
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                10x Wagering
              </span>
            </div>
          </div>
          <Button variant="secondary" size="lg" className="bg-white text-emerald-600 hover:bg-white/90">
            Claim Now
          </Button>
        </div>
      </div>

      {/* All Promotions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promotions.map((promo) => (
          <Card key={promo.id} hover onClick={() => setSelectedPromo(promo)}>
            <div className={`h-2 bg-gradient-to-r ${getPromoColor(promo.type)} rounded-t-xl`} />
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getPromoIcon(promo.type)}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{promo.title}</h3>
                    <Badge variant="info" size="sm">{promo.type}</Badge>
                  </div>
                </div>
                <span className="text-emerald-400 font-bold text-xl">+${promo.bonusAmount}</span>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-slate-400 text-sm mb-4">{promo.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {promo.validUntil}
                </span>
                <Button size="sm">View Details</Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Terms Section */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-white">Bonus Terms & Conditions</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5" />
              <div className="text-amber-400 text-sm">
                <p className="font-medium mb-1">General Bonus Terms</p>
                <ul className="list-disc list-inside space-y-1 text-amber-300/80">
                  <li>All bonuses are subject to wagering requirements before withdrawal</li>
                  <li>Maximum bet with active bonus is $5 per spin/round</li>
                  <li>Bonus funds may not be available on all games</li>
                  <li>Only one bonus can be active at a time</li>
                </ul>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedPromo}
        onClose={() => setSelectedPromo(null)}
        title={selectedPromo?.title || ''}
        size="lg"
      >
        {selectedPromo && (
          <div className="space-y-6">
            <div className={`bg-gradient-to-r ${getPromoColor(selectedPromo.type)} rounded-xl p-6`}>
              <div className="flex items-center gap-4">
                <span className="text-5xl">{getPromoIcon(selectedPromo.type)}</span>
                <div>
                  <p className="text-white/80 text-sm">Bonus Amount</p>
                  <p className="text-4xl font-bold text-white">${selectedPromo.bonusAmount}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-slate-300">{selectedPromo.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm">Wagering Requirement</p>
                <p className="text-white font-bold text-lg">{selectedPromo.wageringRequirement}x</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm">Min Deposit</p>
                <p className="text-white font-bold text-lg">
                  {selectedPromo.minDeposit ? `$${selectedPromo.minDeposit}` : 'N/A'}
                </p>
              </div>
            </div>

            <div>
              <button
                onClick={() => toggleTerms(selectedPromo.id)}
                className="flex items-center justify-between w-full p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <span className="text-white font-medium">Terms & Conditions</span>
                {expandedTerms.includes(selectedPromo.id) ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              {expandedTerms.includes(selectedPromo.id) && (
                <ul className="mt-2 space-y-2 p-4 bg-slate-800/50 rounded-lg">
                  {selectedPromo.terms.map((term, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                      {term}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex gap-4">
              <Button fullWidth size="lg">
                <Gift className="w-5 h-5" />
                Claim Bonus
              </Button>
              <Button variant="outline" size="lg" onClick={() => setSelectedPromo(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
