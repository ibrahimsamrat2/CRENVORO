import React, { useState } from 'react';
import { X, Download, Copy, Check, Sparkles, Layers, Shield } from 'lucide-react';
import { CrenvoroLogo, CrenvoroMark, CrenvoroTile, CrenvoroCRMark } from './CrenvoroLogo';

interface BrandAssetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandAssetsModal: React.FC<BrandAssetsModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'letter-c' | 'monogram-cr'>('letter-c');

  if (!isOpen) return null;

  const handleCopyColor = (hex: string, label: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleCopySvg = async (path: string, label: string) => {
    try {
      const res = await fetch(path);
      const svgText = await res.text();
      await navigator.clipboard.writeText(svgText);
      setCopiedSection(label);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-purple-50/80 to-indigo-50/50">
          <div className="flex items-center gap-3">
            <CrenvoroTile className="w-10 h-10 shadow-md shadow-purple-600/30" />
            <div>
              <h3 className="text-xl font-black text-gray-950 tracking-tight flex items-center gap-2">
                CRENVORO <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#6C3BFF] text-white font-bold">Lettermark System</span>
              </h3>
              <p className="text-xs text-gray-500">Official Letter Icon & Brand Identity for CRENVORO</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-gray-700 flex items-center justify-center shadow-xs transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher for Letter Icon vs Monogram */}
        <div className="px-6 pt-4 flex items-center gap-2 border-b border-gray-100 bg-gray-50/60">
          <button
            onClick={() => setActiveTab('letter-c')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'letter-c'
                ? 'border-[#6C3BFF] text-[#6C3BFF] bg-white shadow-xs'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Letter "C" Icon (Primary)
          </button>
          <button
            onClick={() => setActiveTab('monogram-cr')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'monogram-cr'
                ? 'border-[#6C3BFF] text-[#6C3BFF] bg-white shadow-xs'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> "CR" Monogram (Alternative)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto max-h-[calc(85vh-160px)]">
          {activeTab === 'letter-c' ? (
            /* Primary Letter C Showcase */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Electric Purple Squircle Tile */}
              <div className="bg-gradient-to-b from-purple-50/60 to-white rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group border border-purple-100 shadow-sm">
                <div className="relative z-10 flex flex-col items-center">
                  <CrenvoroTile className="w-24 h-24 sm:w-28 sm:h-28 mb-4 shadow-xl shadow-purple-600/30 group-hover:scale-105 transition-transform duration-300" />
                  <span className="text-xs uppercase tracking-widest text-[#6C3BFF] font-bold mb-1">
                    Master App Icon (Letter "C")
                  </span>
                  <span className="text-xs text-gray-500 max-w-xs">
                    Clean, vibrant electric purple squircle with crisp white Letter "C" + Vector Diamond
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-2.5 relative z-10">
                  <a
                    href="/crenvoro-icon.svg"
                    download="crenvoro-letter-c-icon.svg"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#6C3BFF] hover:bg-[#5827EE] text-white text-xs font-semibold shadow-md transition-all"
                  >
                    <Download className="w-3.5 h-3.5" /> Download SVG
                  </a>
                  <button
                    onClick={() => handleCopySvg('/crenvoro-icon.svg', 'app-icon')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-gray-100 text-gray-800 text-xs font-semibold border border-gray-200 transition-all shadow-xs"
                  >
                    {copiedSection === 'app-icon' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy SVG
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Clean Transparent Vector Mark */}
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center relative border border-gray-200/80 group">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 mb-4 flex items-center justify-center text-[#6C3BFF] group-hover:scale-105 transition-transform duration-300">
                    <CrenvoroMark className="w-full h-full" fillColor="#6C3BFF" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-gray-600 font-bold mb-1">
                    Standalone Lettermark
                  </span>
                  <span className="text-xs text-gray-500 max-w-xs">
                    Transparent vector lettermark for light and dark backgrounds or custom themes
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-2.5 relative z-10">
                  <a
                    href="/crenvoro-mark.svg"
                    download="crenvoro-mark.svg"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-semibold shadow-md transition-all"
                  >
                    <Download className="w-3.5 h-3.5" /> Download SVG
                  </a>
                  <button
                    onClick={() => handleCopySvg('/crenvoro-mark.svg', 'mark-svg')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-gray-100 text-gray-800 text-xs font-semibold border border-gray-200 transition-all shadow-xs"
                  >
                    {copiedSection === 'mark-svg' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy SVG
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* CR Monogram Showcase */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-b from-purple-50/60 to-white rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group border border-purple-100 shadow-sm">
                <div className="relative z-10 flex flex-col items-center">
                  <CrenvoroTile monogram="cr" className="w-24 h-24 sm:w-28 sm:h-28 mb-4 shadow-xl shadow-purple-600/30 group-hover:scale-105 transition-transform duration-300" />
                  <span className="text-xs uppercase tracking-widest text-[#6C3BFF] font-bold mb-1">
                    "CR" Monogram Tile
                  </span>
                  <span className="text-xs text-gray-500 max-w-xs">
                    Dual initials (C + R) for CRENVORO on vibrant electric violet
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-2.5 relative z-10">
                  <a
                    href="/crenvoro-cr.svg"
                    download="crenvoro-cr-monogram.svg"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#6C3BFF] hover:bg-[#5827EE] text-white text-xs font-semibold shadow-md transition-all"
                  >
                    <Download className="w-3.5 h-3.5" /> Download SVG
                  </a>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center relative border border-gray-200/80 group">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 mb-4 flex items-center justify-center text-[#6C3BFF] group-hover:scale-105 transition-transform duration-300">
                    <CrenvoroCRMark className="w-full h-full" fillColor="#6C3BFF" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-gray-600 font-bold mb-1">
                    Transparent CR Mark
                  </span>
                  <span className="text-xs text-gray-500 max-w-xs">
                    Interlocking C + R monogram for editorial collaterals and stamps
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Full Horizontal Header Lockup Preview */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CrenvoroLogo variant="full" size="md" showSubtitle subtitleText="Creative Assets" />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-[#6C3BFF] font-semibold border border-purple-100">
                Official Header Lockup
              </span>
            </div>
          </div>

          {/* Design Logic: Why the Letter Icon Works */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#6C3BFF]" /> How the Icon Connects to CRENVORO
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100/80 space-y-1.5">
                <div className="font-bold text-purple-950 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#6C3BFF]" />
                  Letter "C" (Brand Name)
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Directly incorporates the letter <strong>"C"</strong> for <strong>CRENVORO</strong> with architectural 45° precision cuts on the terminals.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100/80 space-y-1.5">
                <div className="font-bold text-purple-950 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                  Creative Vector Diamond
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Preserves the beloved 45° rotated square from the original icon, nestled into the aperture to symbolize digital creative assets.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100/80 space-y-1.5">
                <div className="font-bold text-purple-950 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#551FFF]" />
                  Electric Violet Tile
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Maintains the signature, high-vibrancy purple background (<strong>#6C3BFF</strong>) with high-contrast crisp white typography.
                </p>
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#6C3BFF]" /> Brand Color Palette
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: 'Electric Violet', hex: '#6C3BFF', bg: 'bg-[#6C3BFF]', text: 'text-white' },
                { name: 'Royal Purple', hex: '#7C3AED', bg: 'bg-[#7C3AED]', text: 'text-white' },
                { name: 'Deep Indigo', hex: '#4F1EE3', bg: 'bg-[#4F1EE3]', text: 'text-white' },
                { name: 'Pure White', hex: '#FFFFFF', bg: 'bg-white border border-gray-200', text: 'text-gray-900' },
              ].map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleCopyColor(color.hex, color.name)}
                  className="flex flex-col items-start p-3 rounded-xl border border-gray-200/80 hover:border-[#6C3BFF] transition-all group text-left"
                >
                  <div className={`w-full h-12 rounded-lg mb-2 shadow-xs flex items-center justify-center ${color.bg}`}>
                    {copiedSection === color.name && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/40 ${color.text}`}>
                        Copied!
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-gray-900">{color.name}</span>
                  <span className="text-[11px] font-mono text-gray-500 uppercase">{color.hex}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Lettermark vector assets crafted for CRENVORO.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandAssetsModal;
