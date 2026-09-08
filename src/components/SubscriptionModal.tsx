import React, { useState } from 'react';
import {
  X,
  Check,
  Zap,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  Calendar,
  Layers,
  Award,
} from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

export const SubscriptionModal: React.FC = () => {
  const {
    isSubscriptionModalOpen,
    setIsSubscriptionModalOpen,
    subscription,
    subscribeToPlan,
  } = useCartWishlist();

  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly'>('annual');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isSubscriptionModalOpen) return null;

  const handleSubscribe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      subscribeToPlan(selectedPlan);
      setIsProcessing(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#111827] via-[#1E1B4B] to-[#2E1065] text-white p-6 sm:p-8 relative overflow-hidden">
          <button
            onClick={() => setIsSubscriptionModalOpen(false)}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3 border border-purple-400/20">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            High Value Creator Membership
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Unlock 30 Downloads / Month
          </h2>
          <p className="text-sm text-purple-200/90 mt-2 max-w-lg leading-relaxed">
            Stop paying $12+ for individual files. Get human-crafted, print-ready PSDs, vectors & mockups with DepositPhotos-style <strong className="text-white">Rollover Credits</strong>.
          </p>

          {/* Rollover Callout Pill */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs font-semibold">
            <RotateCcw className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              <strong>Rollover Guarantee:</strong> Unused downloads roll forward automatically. Never lose what you pay for!
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Plan Selector Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Annual Plan (Featured) */}
            <div
              onClick={() => setSelectedPlan('annual')}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all relative ${
                selectedPlan === 'annual'
                  ? 'border-[#6C3BFF] bg-purple-50/40 shadow-md ring-2 ring-purple-500/20'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="absolute -top-3 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                ⚡ 75% OFF Launch Deal
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-gray-500 uppercase">Annual Plan</span>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    selectedPlan === 'annual' ? 'border-[#6C3BFF] bg-[#6C3BFF]' : 'border-gray-300'
                  }`}
                >
                  {selectedPlan === 'annual' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>

              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-3xl font-black text-gray-900">$8</span>
                <span className="text-xs font-semibold text-gray-500">/ month</span>
              </div>
              <p className="text-[11px] text-purple-700 font-bold mb-3">
                $99 billed once a year <span className="line-through text-gray-400 font-normal">$399/yr</span>
              </p>

              <ul className="text-xs space-y-1.5 text-gray-600">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>30 downloads</strong> every month (360/yr)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Unused credits roll forward</strong></span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Just <strong>~$0.27</strong> per high-res asset</span>
                </li>
              </ul>
            </div>

            {/* Monthly Plan */}
            <div
              onClick={() => setSelectedPlan('monthly')}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedPlan === 'monthly'
                  ? 'border-[#6C3BFF] bg-purple-50/40 shadow-md ring-2 ring-purple-500/20'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-gray-500 uppercase">Monthly Plan</span>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    selectedPlan === 'monthly' ? 'border-[#6C3BFF] bg-[#6C3BFF]' : 'border-gray-300'
                  }`}
                >
                  {selectedPlan === 'monthly' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>

              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-3xl font-black text-gray-900">$19</span>
                <span className="text-xs font-semibold text-gray-500">/ month</span>
              </div>
              <p className="text-[11px] text-gray-500 mb-3">
                Billed monthly, cancel anytime in 1-click
              </p>

              <ul className="text-xs space-y-1.5 text-gray-600">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>30 downloads</strong> per month</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Credits roll into next month</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Commercial license on all files</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Value comparison vs Single Image purchase */}
          <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="font-extrabold text-gray-900 block">
                Single Asset vs. Pro Membership:
              </span>
              <span className="text-gray-500 block">
                Buying 2 single images on-demand costs $24. With Pro, get 30 downloads for $8–$19!
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold shrink-0 text-center">
              Save Over 90%
            </div>
          </div>

          {/* Action Button */}
          <div>
            <button
              onClick={handleSubscribe}
              disabled={isProcessing}
              className="w-full py-4 bg-[#6C3BFF] hover:bg-[#5A31D6] active:scale-98 text-white rounded-2xl font-extrabold text-base shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Activating Your Membership...</span>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-amber-300 text-amber-300" />
                  <span>
                    Activate {selectedPlan === 'annual' ? 'Annual Pro ($8/mo - $99/yr)' : 'Monthly Pro ($19/mo)'}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-gray-400 mt-2">
              🔒 Instant activation • 30 downloads added to your account • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
