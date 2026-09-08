import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Zap,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  Clock,
  Gift,
  Copy,
  CheckCircle,
  Tag,
  Flame,
} from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

interface WelcomePromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribed?: () => void;
}

export const WelcomePromoModal: React.FC<WelcomePromoModalProps> = ({
  isOpen,
  onClose,
  onSubscribed,
}) => {
  const { subscribeToPlan, showToast } = useCartWishlist();

  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly'>('annual');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Live 15-minute urgency countdown timer
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          clearInterval(timer);
          return { minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubscribe = () => {
    setIsProcessing(true);

    setTimeout(() => {
      subscribeToPlan(selectedPlan);
      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        if (onSubscribed) onSubscribed();
      }, 1600);
    }, 800);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('WELCOME75');
    setCopiedCode(true);
    showToast('Promo Code Copied!', 'Use WELCOME75 for 75% OFF your creative membership.', 'success');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div
      id="welcome-subscription-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="welcome-subscription-modal"
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-purple-100 relative my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner with Eye-catching Gradient */}
        <div className="bg-gradient-to-br from-[#0F0C20] via-[#1E1B4B] to-[#2E1065] text-white p-5 sm:p-7 relative overflow-hidden">
          {/* Subtle Ambient Background Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            id="close-welcome-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Pill Badges: Welcome Offer + Live Countdown */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-purple-500/30 text-amber-300 text-[11px] font-black uppercase tracking-wider border border-amber-400/30 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Special First-Time Visitor Offer
            </span>

            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 text-[11px] font-bold border border-red-400/30">
              <Clock className="w-3 h-3 text-red-400 animate-pulse" />
              <span>
                Expires in {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight text-white leading-tight">
            Unlock 30 Downloads / Month <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300">
              for Only $8 / Month
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-purple-200/90 mt-2 max-w-xl leading-relaxed">
            Stop paying $12+ for individual files. Subscribe now and get commercial-ready
            vectors, PSDs & mockups with <strong className="text-white">DepositPhotos-style Rollover Credits</strong> that never expire!
          </p>

          {/* Rollover Callout Guarantee Bar */}
          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-purple-900/40 border border-purple-500/30 text-xs text-purple-100">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Rollover Protection:</strong> Unused credits roll into the next month automatically!
              </span>
            </div>
            <button
              onClick={handleCopyCode}
              title="Click to copy coupon code"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-200 text-[10px] font-black tracking-wider transition-colors ml-auto sm:ml-0"
            >
              <Tag className="w-3 h-3" />
              <span>CODE: WELCOME75</span>
              {copiedCode ? <CheckCircle className="w-3 h-3 text-emerald-400 ml-0.5" /> : <Copy className="w-3 h-3 ml-0.5" />}
            </button>
          </div>
        </div>

        {/* Modal Body: Interactive Plan Selector */}
        <div className="p-5 sm:p-7 space-y-5">
          {isSuccess ? (
            <div className="py-8 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-2xl font-black text-gray-900">
                🎉 Welcome to CRENVORO Pro!
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Your subscription has been activated with <strong>30 instant download credits</strong>. You can now download any vector, mockup, or flyer immediately!
              </p>
            </div>
          ) : (
            <>
              {/* Plan Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Annual Plan (75% OFF - Highlighted) */}
                <div
                  id="welcome-plan-annual"
                  onClick={() => setSelectedPlan('annual')}
                  className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all relative ${
                    selectedPlan === 'annual'
                      ? 'border-[#6C3BFF] bg-purple-50/50 shadow-md ring-2 ring-[#6C3BFF]/20'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="absolute -top-3 right-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-amber-300 text-amber-300" />
                    <span>75% OFF Launch Deal</span>
                  </div>

                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black text-gray-700 uppercase tracking-wider">
                      Annual Pro (Recommended)
                    </span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedPlan === 'annual'
                          ? 'border-[#6C3BFF] bg-[#6C3BFF]'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedPlan === 'annual' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-3xl font-black text-gray-950">$8</span>
                    <span className="text-xs font-bold text-gray-500">/ month</span>
                  </div>
                  <p className="text-[11px] text-purple-800 font-bold mb-3">
                    $99 billed yearly <span className="line-through text-gray-400 font-normal">$399/yr</span>
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
                      <span>Commercial License on all assets</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Just <strong>~$0.27</strong> per high-res asset</span>
                    </li>
                  </ul>
                </div>

                {/* Monthly Plan */}
                <div
                  id="welcome-plan-monthly"
                  onClick={() => setSelectedPlan('monthly')}
                  className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all relative ${
                    selectedPlan === 'monthly'
                      ? 'border-[#6C3BFF] bg-purple-50/50 shadow-md ring-2 ring-[#6C3BFF]/20'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black text-gray-700 uppercase tracking-wider">
                      Monthly Flexible
                    </span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedPlan === 'monthly'
                          ? 'border-[#6C3BFF] bg-[#6C3BFF]'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedPlan === 'monthly' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-3xl font-black text-gray-950">$19</span>
                    <span className="text-xs font-bold text-gray-500">/ month</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mb-3">
                    Billed monthly, cancel anytime
                  </p>

                  <ul className="text-xs space-y-1.5 text-gray-600">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>30 downloads</strong> per month</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Unused credits roll into next month</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Full Commercial License included</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Cancel or upgrade anytime in 1 click</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Real Value Savings Callout */}
              <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
                <div className="space-y-0.5 text-center sm:text-left">
                  <span className="font-extrabold text-gray-900 block">
                    Why creators love this membership:
                  </span>
                  <span className="text-gray-600 block">
                    Buying just 2 single designs on-demand costs $24. With this deal, you get <strong>30 designs for $8</strong>!
                  </span>
                </div>
                <div className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs shrink-0 whitespace-nowrap">
                  Save Over 90%
                </div>
              </div>

              {/* Instant Subscribe CTA Button */}
              <div className="space-y-2.5 pt-1">
                <button
                  id="welcome-modal-subscribe-btn"
                  onClick={handleSubscribe}
                  disabled={isProcessing}
                  className="w-full py-4 px-6 bg-gradient-to-r from-[#6C3BFF] via-[#5A31D6] to-[#4C1D95] hover:brightness-110 active:scale-[0.99] text-white rounded-2xl font-black text-sm sm:text-base shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Applying Discount & Activating Credits...</span>
                    </div>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 fill-amber-300 text-amber-300 shrink-0" />
                      <span>
                        {selectedPlan === 'annual'
                          ? 'Claim 75% OFF — Get Annual Pro ($8/mo)'
                          : 'Subscribe to Monthly Pro ($19/mo)'}
                      </span>
                      <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
                    </>
                  )}
                </button>

                {/* Trust Guarantees & Dismiss Link */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-400 px-1">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-gray-600">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Instant 30 Credits Added
                    </span>
                    <span>•</span>
                    <span className="text-gray-600">Cancel Anytime</span>
                  </div>

                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-700 underline transition-colors"
                  >
                    No thanks, continue to free browsing
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
