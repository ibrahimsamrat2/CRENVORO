import React from 'react';
import { Mail, Phone, ShieldCheck, Heart, ExternalLink, Sparkles } from 'lucide-react';
import { CrenvoroTile } from './CrenvoroLogo';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenBrandAssets?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBrandAssets }) => {
  return (
    <footer id="global-footer" className="bg-[#111827] text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800/80">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <CrenvoroTile className="w-10 h-10 shadow-xl shadow-purple-950/40" />
              <div className="flex flex-col">
                <span className="font-black text-xl text-white tracking-[-0.03em]">
                  CRENVORO
                </span>
                <span className="text-xs text-purple-400 font-semibold tracking-wide">
                  Premium Creative Asset Marketplace
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Discover high-quality vectors, editable PSD templates, photorealistic mockups, fonts, and professional design resources curated for creative professionals, agencies, and modern studios worldwide.
            </p>

            <div className="pt-2 space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8B5CF6]" />
                <a href="mailto:coo.masconsultancy@gmail.com" className="hover:text-white transition-colors">
                  coo.masconsultancy@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8B5CF6]" />
                <a href="tel:+8801722604376" className="hover:text-white transition-colors">
                  +8801722604376
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              {[
                { name: 'Behance', url: 'https://www.behance.net/ibrahimsamrat1', icon: 'Be' },
                { name: 'Dribbble', url: 'https://dribbble.com', icon: 'Dr' },
                { name: 'Instagram', url: 'https://instagram.com', icon: 'Ig' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ibrahim-samrat-35706b408?utm_source=share_via&utm_content=profile&utm_medium=member_ios', icon: 'In' },
                { name: 'Facebook', url: 'https://facebook.com', icon: 'Fb' },
              ].map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  title={soc.name}
                  className="w-8 h-8 rounded-lg bg-gray-800/80 hover:bg-[#6C3BFF] hover:text-white text-gray-400 flex items-center justify-center text-xs font-bold transition-all"
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Marketplace */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Browse All Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('category', 'Graphics')} className="hover:text-white transition-colors">
                  Vector Graphics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('category', 'Templates')} className="hover:text-white transition-colors">
                  Editable Templates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('category', 'Mockups')} className="hover:text-white transition-colors">
                  Photorealistic Mockups
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('category', 'Fonts')} className="hover:text-white transition-colors">
                  Typography & Fonts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('freebies')} className="hover:text-emerald-400 text-emerald-400 font-semibold transition-colors flex items-center gap-1">
                  🎁 Free Resources
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="text-amber-300 hover:text-white font-bold transition-colors flex items-center gap-1">
                  ⚡ Pricing & Rollover ($8/mo Deal)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Seller Hub */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Creator & Seller
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button onClick={() => onNavigate('seller-dashboard')} className="hover:text-white transition-colors">
                  Seller Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('seller-dashboard', 'upload')} className="hover:text-white transition-colors">
                  Submit New Product
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('seller-dashboard', 'earnings')} className="hover:text-white transition-colors">
                  Earnings & Payouts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('seller-dashboard', 'profile')} className="hover:text-white transition-colors">
                  Creator Profile
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  Submission Guidelines
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">
                  40% Creator Pool Economics
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Legal */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Help & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About CRENVORO
                </button>
              </li>
              {onOpenBrandAssets && (
                <li>
                  <button
                    onClick={onOpenBrandAssets}
                    className="text-[#A78BFA] hover:text-white transition-colors flex items-center gap-1.5 font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" /> Brand Assets & Logo
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('license')} className="hover:text-white transition-colors">
                  License Terms & Usage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span>&copy; 2026 IBRAHIM SAMRAT &bull; PREMIUM ASSETS MARKETPLACE</span>
            <span className="hidden md:inline text-purple-400">&bull; WWW.IBRAHIMSAMRAT.COM</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => onNavigate('license')} className="hover:text-white transition-colors">
              License
            </button>
            <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">
              Terms
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
              Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
