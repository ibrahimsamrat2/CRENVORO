import React, { useState } from 'react';
import {
  Check,
  Zap,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  TrendingUp,
  PieChart,
  DollarSign,
  Users,
  Lock,
  Layers,
  Award,
  DownloadCloud,
  FileCheck,
} from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useAuth } from '../context/AuthContext';

interface PricingPageProps {
  onNavigate: (view: string, param?: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const { subscription, subscribeToPlan, openSubscriptionModal } = useCartWishlist();
  const { currentUser } = useAuth();

  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Volume calculator state for creators
  const [estimatedDownloads, setEstimatedDownloads] = useState<number>(3500);

  const handlePlanSelect = (plan: 'monthly' | 'annual') => {
    subscribeToPlan(plan);
  };

  const faqs = [
    {
      q: 'How does the DepositPhotos-style Rollover feature work?',
      a: 'Just like DepositPhotos, your monthly download allowance never expires as long as your membership is active. If you have 30 downloads in Month 1 and only use 10, the remaining 20 roll forward into Month 2 giving you 50 downloads. If you take a 3-month break without downloading, you will have 90 download credits banked and ready when your project launches.',
    },
    {
      q: 'Why choose custom designer assets over generic AI tools?',
      a: 'While AI image generators are fun, professional graphic artists need clean vector paths (SVG/AI/EPS), organized Photoshop layers with smart objects, print-ready 300 DPI CMYK color profiles, and clear commercial licensing. Every asset on CRENVORO is crafted, vetted, and formatted for real production workflows.',
    },
    {
      q: 'What is the Launch Deal and how does it change next year?',
      a: 'To celebrate our global launch and build our subscriber base, we are offering an unprecedented 75% OFF early-adopter price: just $8/month when paid annually ($99/year). Next year, this promotional discount will be removed and standard rates will adjust to $76/month (or standard annual rate). Lock in the $99/year rate now to guarantee your price for the next 12 months!',
    },
    {
      q: 'Can I still buy single images without subscribing?',
      a: 'Yes, absolutely! Option 1 is our On-Demand Pay-Per-Asset model ($5–$18 per asset). It is ideal if you only need one specific graphic or flyer template today with zero recurring commitment.',
    },
    {
      q: 'How does the 40/20/10/10/20 platform budget protect both buyers and sellers?',
      a: 'We believe in complete financial transparency: 40% goes directly to contributing creators, 20% funds marketing to bring more buyers, 10% covers high-speed CDN infrastructure, 10% is locked into an untouched emergency reserve, and 20% represents founder profit paid only after all creators and bills are settled.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Top Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-[#6C3BFF] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>High Value • Low Monthly Fee • Rollover Credits</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight leading-tight">
            Premium Design Assets for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#6C3BFF] to-purple-800 bg-clip-text text-transparent">
              a Fraction of the Regular Cost
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            In an era where graphic artists use smart tools, high value shouldn’t cost hundreds.
            Get <strong className="text-gray-900 font-bold">30 downloads every month</strong> with DepositPhotos-style rollover credits that never expire.
          </p>

          {/* Launch Deal Announcement Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-amber-500/10 border border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-md">
                75%
              </div>
              <div>
                <span className="font-extrabold text-sm text-gray-900 block">
                  Limited-Time Early-Adopter Launch Pricing
                </span>
                <span className="text-xs text-gray-600 block">
                  Lock in <strong className="text-purple-700 font-bold">$8/month ($99/yr)</strong> before the 75% launch discount is removed next year!
                </span>
              </div>
            </div>

            <button
              onClick={() => handlePlanSelect('annual')}
              className="px-5 py-2.5 bg-gradient-to-r from-[#6C3BFF] to-[#5A31D6] text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all shrink-0 active:scale-95"
            >
              Claim $8/mo Launch Deal
            </button>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="bg-gray-100 p-1.5 rounded-2xl border border-gray-200 inline-flex items-center gap-2">
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  billingCycle === 'annual'
                    ? 'bg-white text-[#6C3BFF] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>Annual Billing</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                  75% OFF • $8/mo
                </span>
              </button>

              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-[#6C3BFF] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly ($19/mo)
              </button>
            </div>
          </div>
        </div>

        {/* Active Primary Subscription Plan based on Billing Cycle Toggle */}
        <div className="max-w-3xl mx-auto w-full">
          {billingCycle === 'annual' ? (
            /* ACTIVE ANNUAL PACKAGE (75% OFF Launch Deal) */
            <div
              id="active-annual-package"
              className="bg-gradient-to-b from-[#111827] via-[#1A1635] to-[#1E1B4B] text-white rounded-3xl shadow-2xl p-6 sm:p-10 relative ring-4 ring-[#6C3BFF]/50 animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-400 text-gray-950 font-black text-xs px-4 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5" />
                ⭐ Most Popular • 75% OFF Launch Deal
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-black text-purple-300 uppercase tracking-wider">
                      Option 2: Annual Pro Plan
                    </span>
                    <span className="text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      DepositPhotos Rollover Model
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    Annual Pro Membership
                  </h2>
                  <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl leading-relaxed">
                    Maximum savings for active creators, agencies, and businesses. 30 downloads every single month with permanent rollover credits that never expire.
                  </p>
                </div>

                <div className="text-left md:text-right shrink-0 bg-white/5 md:bg-transparent p-4 md:p-0 rounded-2xl border border-white/10 md:border-0">
                  <div className="flex items-baseline md:justify-end gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white">$8</span>
                    <span className="text-sm text-purple-200 font-semibold">/ month</span>
                    <span className="text-xs text-purple-300 line-through">$76/mo</span>
                  </div>
                  <p className="text-xs font-bold text-emerald-400 mt-1">
                    Billed $99/year upfront (Save $300+ during launch)
                  </p>
                  <p className="text-[11px] text-purple-300/70">
                    Guaranteed price locked for 12 full months
                  </p>
                </div>
              </div>

              {/* Rollover Callout Banner */}
              <div className="mt-6 p-4 rounded-2xl bg-purple-900/40 border border-purple-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-300 shrink-0">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-amber-300 block">
                      DepositPhotos Rollover Guarantee:
                    </span>
                    <span className="text-purple-200">
                      Unused credits roll forward every month automatically. You never lose what you pay for!
                    </span>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-[11px] border border-emerald-400/30 shrink-0 text-center">
                  ~$0.27 / Asset
                </div>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-purple-100 pt-6">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>30 downloads per month</strong> (360 premium assets / year)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Unused credits roll forward forever</strong> into next month</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Full Commercial License</strong> included on every download</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Original PSDs with smart objects, vector AI, EPS & SVG</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Access to all categories (Templates, Mockups, Fonts, Vectors)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>VIP Creator Support & Priority Asset Requests</span>
                </div>
              </div>

              {/* CTA Action */}
              <div className="pt-8 flex flex-col sm:flex-row items-center gap-4">
                <button
                  id="claim-annual-deal-btn"
                  onClick={() => handlePlanSelect('annual')}
                  className="w-full sm:flex-1 py-4 bg-gradient-to-r from-[#6C3BFF] via-[#7B4DFF] to-[#5A31D6] hover:brightness-110 active:scale-98 text-white rounded-2xl font-black text-sm sm:text-base shadow-xl shadow-purple-900/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-5 h-5 fill-amber-300 text-amber-300 shrink-0" />
                  <span>Claim Launch Deal ($8/mo • $99/yr)</span>
                  <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
                </button>

                <button
                  onClick={() => setBillingCycle('monthly')}
                  className="text-xs text-purple-300 hover:text-white underline transition-colors shrink-0 py-2"
                >
                  Or view Monthly Billing ($19/mo)
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE MONTHLY PACKAGE (Flexible) */
            <div
              id="active-monthly-package"
              className="bg-white rounded-3xl border-2 border-[#6C3BFF] shadow-2xl p-6 sm:p-10 relative ring-4 ring-[#6C3BFF]/20 animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-[#6C3BFF] text-white font-black text-xs px-4 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5" />
                ⚡ Flexible Month-to-Month • Cancel Anytime
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-black text-[#6C3BFF] uppercase tracking-wider">
                      Option 3: Monthly Flex Plan
                    </span>
                    <span className="text-[11px] font-bold bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full">
                      No Annual Commitment
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
                    Monthly Pro Membership
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-xl leading-relaxed">
                    Flexible month-to-month access. Ideal for short term agency sprints, freelance projects, or testing out the platform.
                  </p>
                </div>

                <div className="text-left md:text-right shrink-0 bg-gray-50 md:bg-transparent p-4 md:p-0 rounded-2xl border border-gray-200 md:border-0">
                  <div className="flex items-baseline md:justify-end gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black text-gray-950">$19</span>
                    <span className="text-sm text-gray-500 font-semibold">/ month</span>
                  </div>
                  <p className="text-xs font-medium text-gray-500 mt-1">
                    Billed monthly, pause or cancel anytime in 1 click
                  </p>
                  <button
                    onClick={() => setBillingCycle('annual')}
                    className="text-[11px] font-bold text-[#6C3BFF] hover:underline block mt-1"
                  >
                    Save 75% with Annual Plan ($8/mo) →
                  </button>
                </div>
              </div>

              {/* Rollover Callout Banner */}
              <div className="mt-6 p-4 rounded-2xl bg-purple-50/70 border border-purple-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-[#6C3BFF] shrink-0">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-gray-900 block">
                      Rollover Protection Included:
                    </span>
                    <span className="text-gray-600">
                      Unused download credits roll forward to the next month as long as your subscription stays active!
                    </span>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-xl bg-purple-100 text-purple-800 font-bold text-[11px] shrink-0 text-center">
                  ~$0.63 / Asset
                </div>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-gray-700 pt-6">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>30 downloads per month</strong> refreshed every 30 days</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Unused credits roll forward</strong> to next month</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Commercial License</strong> included on all downloads</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Print-ready CMYK vectors, PSDs, fonts & mockups</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Access to all creative categories without restriction</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Instant 1-click cancellation whenever needed</span>
                </div>
              </div>

              {/* CTA Action */}
              <div className="pt-8 flex flex-col sm:flex-row items-center gap-4">
                <button
                  id="claim-monthly-deal-btn"
                  onClick={() => handlePlanSelect('monthly')}
                  className="w-full sm:flex-1 py-4 bg-gray-900 hover:bg-black active:scale-98 text-white rounded-2xl font-black text-sm sm:text-base shadow-xl shadow-gray-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-5 h-5 text-purple-400 shrink-0" />
                  <span>Start Monthly Pro ($19/mo)</span>
                  <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
                </button>

                <button
                  onClick={() => setBillingCycle('annual')}
                  className="text-xs text-[#6C3BFF] font-bold hover:underline shrink-0 py-2"
                >
                  Switch to Annual (Save 75% • $8/mo)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ANOTHER PLANS & FLEXIBLE OPTIONS (Tar niche another plan show korbe) */}
        <div className="space-y-6 pt-4">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-[#6C3BFF]" />
              <span>Alternative & Flexible Options</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
              Another Available Plans
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
              Need individual files without a recurring subscription, or exploring team access? Check out our other available plans below:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {/* ANOTHER PLAN 1: OPTION 1 ON-DEMAND (Pay Per Asset) */}
            <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-7 flex flex-col justify-between hover:border-purple-300 hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                    Option 1: On-Demand
                  </span>
                  <span className="text-[11px] font-bold bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full">
                    No Subscription
                  </span>
                </div>

                <h4 className="text-xl font-black text-gray-900 mb-1">Pay Per Asset</h4>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  Best if you only need a single specific graphic or template today without any recurring membership.
                </p>

                <div className="flex items-baseline gap-1.5 mb-5">
                  <span className="text-3xl font-black text-gray-900">$5 – $18</span>
                  <span className="text-xs text-gray-500 font-medium">/ single asset</span>
                </div>

                <div className="space-y-2.5 text-xs text-gray-600 pt-4 border-t border-gray-100">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Instant access to individual asset archives (PSD, AI, SVG)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Commercial License included on every single purchase</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Instant download with lifetime updates for that file</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-400">
                    <Check className="w-3.5 h-3.5 text-gray-300 shrink-0 mt-0.5" />
                    <span>Does not include monthly credits or rollover pool</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onNavigate('shop')}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 active:scale-98 text-gray-900 rounded-xl font-bold text-xs transition-all text-center"
                >
                  Browse Shop & Buy Single Files
                </button>
              </div>
            </div>

            {/* ANOTHER PLAN 2: THE ALTERNATIVE SUBSCRIPTION SWITCH */}
            {billingCycle === 'annual' ? (
              /* If currently Annual, show Monthly as the alternative option */
              <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-7 flex flex-col justify-between hover:border-purple-300 hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-[#6C3BFF] uppercase tracking-wider">
                      Option 3: Monthly Flex
                    </span>
                    <span className="text-[11px] font-bold bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full">
                      Month-to-Month
                    </span>
                  </div>

                  <h4 className="text-xl font-black text-gray-900 mb-1">Monthly Flexible</h4>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    Prefer not to commit for a full year? Switch to our flexible month-to-month subscription.
                  </p>

                  <div className="flex items-baseline gap-1.5 mb-5">
                    <span className="text-3xl font-black text-gray-900">$19</span>
                    <span className="text-xs text-gray-500 font-medium">/ month</span>
                  </div>

                  <div className="space-y-2.5 text-xs text-gray-600 pt-4 border-t border-gray-100">
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>30 downloads per month</strong> refreshed monthly</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Unused credits roll forward to next month</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Cancel or pause anytime with zero penalty</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Full Commercial License included</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => {
                      setBillingCycle('monthly');
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className="w-full py-3 bg-purple-50 hover:bg-purple-100 active:scale-98 text-[#6C3BFF] border border-purple-200 rounded-xl font-bold text-xs transition-all text-center"
                  >
                    Switch to Monthly View ($19/mo)
                  </button>
                </div>
              </div>
            ) : (
              /* If currently Monthly, show Annual 75% OFF as the alternative option */
              <div className="bg-gradient-to-br from-purple-900/10 to-indigo-900/10 rounded-3xl border-2 border-dashed border-[#6C3BFF]/40 p-7 flex flex-col justify-between hover:border-[#6C3BFF] hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-[#6C3BFF] uppercase tracking-wider">
                      Option 2: Annual Pro
                    </span>
                    <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                      75% OFF Launch Deal
                    </span>
                  </div>

                  <h4 className="text-xl font-black text-gray-900 mb-1">Annual Pro (Best Value)</h4>
                  <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                    Save over $300 a year by switching to annual billing at just $8/month.
                  </p>

                  <div className="flex items-baseline gap-1.5 mb-5">
                    <span className="text-3xl font-black text-gray-950">$8</span>
                    <span className="text-xs text-gray-500 font-medium">/ month</span>
                    <span className="text-xs text-purple-700 font-bold ml-1">($99/yr)</span>
                  </div>

                  <div className="space-y-2.5 text-xs text-gray-600 pt-4 border-t border-purple-100">
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>360 total downloads per year</strong> (~$0.27/asset)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>DepositPhotos permanent rollover guarantee</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Save $300+ compared to monthly rates</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => {
                      setBillingCycle('annual');
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className="w-full py-3 bg-[#6C3BFF] hover:bg-[#5A31D6] active:scale-98 text-white rounded-xl font-bold text-xs transition-all text-center shadow-md shadow-purple-600/20"
                  >
                    Switch to Annual View ($8/mo Deal)
                  </button>
                </div>
              </div>
            )}

            {/* ANOTHER PLAN 3: TEAM & AGENCY ENTERPRISE */}
            <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-7 flex flex-col justify-between hover:border-purple-300 hover:shadow-md transition-all md:col-span-2 lg:col-span-1">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                    Custom Solutions
                  </span>
                  <span className="text-[11px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                    Multi-User Seats
                  </span>
                </div>

                <h4 className="text-xl font-black text-gray-900 mb-1">Agency & Teams</h4>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  Tailored for design studios, advertising agencies, and marketing departments with multiple designers.
                </p>

                <div className="flex items-baseline gap-1.5 mb-5">
                  <span className="text-3xl font-black text-gray-900">Custom</span>
                  <span className="text-xs text-gray-500 font-medium">/ 5+ team seats</span>
                </div>

                <div className="space-y-2.5 text-xs text-gray-600 pt-4 border-t border-gray-100">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Shared pooled credit bank for all team members</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Extended enterprise indemnification warranty</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Dedicated account manager & fast custom requests</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full py-3 bg-gray-900 hover:bg-black active:scale-98 text-white rounded-xl font-bold text-xs transition-all text-center"
                >
                  Contact for Team Licensing
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DepositPhotos Rollover Visual Demonstration */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6C3BFF] uppercase tracking-wider">
              <RotateCcw className="w-4 h-4" />
              <span>Never Lose What You Pay For</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
              How Our DepositPhotos-Style Rollover Works
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Traditional stock sites expire your unused downloads at the end of every 30 days.
              At CRENVORO, unused credits accumulate in your rollover vault so your money is never wasted.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-purple-700 uppercase">Month 1</span>
                <span className="text-xs font-bold bg-white text-gray-700 px-2 py-0.5 rounded-md shadow-xs">
                  Allowance: 30
                </span>
              </div>
              <div className="text-2xl font-black text-gray-900">10 Used • 20 Unused</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                You work on a small branding project and download 10 assets. Your remaining 20 credits are protected.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-purple-700 uppercase">Month 2</span>
                <span className="text-xs font-bold bg-white text-gray-700 px-2 py-0.5 rounded-md shadow-xs">
                  Bank: 50 Credits
                </span>
              </div>
              <div className="text-2xl font-black text-gray-900">20 Rolled + 30 New</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                The 20 unused credits roll forward. You get 30 fresh credits for Month 2, giving you 50 total downloads available!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 border border-purple-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-purple-800 uppercase">Month 3</span>
                <span className="text-xs font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-md shadow-xs">
                  Bank: 80+ Credits
                </span>
              </div>
              <div className="text-2xl font-black text-purple-950">90 Credits Banked</div>
              <p className="text-xs text-purple-900/80 leading-relaxed">
                Take a vacation or design lull? After 3 months, you have up to 90 download credits ready for your next major campaign.
              </p>
            </div>
          </div>
        </div>

        {/* Platform Budget Architecture (The 40 / 20 / 10 / 10 / 20 Financial Model) */}
        <div className="bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#111827] text-white rounded-3xl shadow-2xl p-8 sm:p-12 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-400/20">
              <PieChart className="w-3.5 h-3.5 text-purple-400" />
              <span>Transparent Platform Economics</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              The 40 / 20 / 10 / 10 / 20 Budget Architecture
            </h3>
            <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed">
              We structure every dollar of platform income transparently. By putting creators first and maintaining a strict emergency reserve, we ensure long-term stability and high-volume sales.
            </p>
          </div>

          {/* Budget Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
              <span className="text-3xl font-black text-emerald-400">40%</span>
              <h4 className="text-sm font-black text-white">Designer Royalty Pool</h4>
              <p className="text-[11px] text-purple-200/70 leading-relaxed">
                Distributed directly to contributing designers based on download volume. Multiplied across thousands of members.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
              <span className="text-3xl font-black text-blue-400">20%</span>
              <h4 className="text-sm font-black text-white">Marketing & Traffic</h4>
              <p className="text-[11px] text-purple-200/70 leading-relaxed">
                Dedicated advertising, social campaigns, and SEO to continuously bring new paying buyers to creators' assets.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
              <span className="text-3xl font-black text-amber-400">10%</span>
              <h4 className="text-sm font-black text-white">Operating Expenses</h4>
              <p className="text-[11px] text-purple-200/70 leading-relaxed">
                High-speed global CDN, gigabyte storage clusters, SSL certificates, payment processing, and customer support.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
              <span className="text-3xl font-black text-rose-400">10%</span>
              <h4 className="text-sm font-black text-white">Sacred Reserve (DO NOT TOUCH)</h4>
              <p className="text-[11px] text-purple-200/70 leading-relaxed">
                Locked business emergency savings to ensure the company never defaults and operates through all market cycles.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
              <span className="text-3xl font-black text-purple-400">20%</span>
              <h4 className="text-sm font-black text-white">Founder Dividend</h4>
              <p className="text-[11px] text-purple-200/70 leading-relaxed">
                Sustainable platform return, paid to founders strictly <em>after</em> all creators, bills, and reserves are funded first.
              </p>
            </div>
          </div>

          {/* Interactive Volume Multiplier Calculator for Graphic Designers */}
          <div className="pt-6 border-t border-purple-900/60 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-black text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  The Volume Math: Why Subscription Multiplier Beats High-Priced Sales
                </h4>
                <p className="text-xs text-purple-200/80 mt-1">
                  High price = few sales. Low price + high volume = consistent recurring passive wealth.
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-purple-900/50 border border-purple-400/30 text-xs font-bold text-purple-200">
                Estimated Monthly Downloads: <span className="text-white text-sm font-black">{estimatedDownloads.toLocaleString()}</span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <input
                type="range"
                min="500"
                max="25000"
                step="500"
                value={estimatedDownloads}
                onChange={(e) => setEstimatedDownloads(Number(e.target.value))}
                className="w-full accent-[#6C3BFF] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-purple-300/60 font-semibold">
                <span>500 downloads</span>
                <span>10,000 downloads</span>
                <span>25,000 downloads</span>
              </div>
            </div>

            {/* Comparison Math Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-extrabold text-rose-300 uppercase tracking-wider block">
                  Old High-Priced One-Off Model:
                </span>
                <div className="text-2xl font-black text-white">$90 / month</div>
                <p className="text-xs text-purple-200/70 leading-relaxed">
                  Selling 3 copies at $30. Hard to convert buyers in the AI era. Highly erratic income.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-purple-950/60 border border-emerald-500/30 space-y-2">
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider block">
                  CRENVORO Subscription Volume Model:
                </span>
                <div className="text-2xl font-black text-emerald-300">
                  ${Math.round(estimatedDownloads * 0.35).toLocaleString()} / month
                </div>
                <p className="text-xs text-emerald-200/80 leading-relaxed">
                  {estimatedDownloads.toLocaleString()} downloads multiplied across the 40% creator royalty pool. Reliable monthly recurring revenue!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-gray-600">
              Everything you need to know about our plans, licensing, and rollover policy.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-gray-900 hover:text-[#6C3BFF] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg font-black text-gray-400">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="bg-gradient-to-r from-[#6C3BFF] to-[#5A31D6] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl shadow-purple-600/20">
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
            Ready to Supercharge Your Design Workflow?
          </h3>
          <p className="text-sm sm:text-base text-purple-100 max-w-xl mx-auto leading-relaxed">
            Join thousands of designers accessing 30 high-resolution vectors, PSDs, and templates every month for just $8/mo with rollover guarantee.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handlePlanSelect('annual')}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-100 text-[#6C3BFF] font-black text-sm rounded-2xl shadow-lg transition-transform active:scale-95"
            >
              Get Started for $8/mo ($99/yr)
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-2xl transition-colors"
            >
              Explore Asset Catalog First
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
