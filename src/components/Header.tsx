import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Layers,
  Box,
  Type,
  Gift,
  ArrowRight,
  LogOut,
  Download,
  Receipt,
  Settings,
  LayoutDashboard,
  Store,
  CheckCircle,
  Zap,
} from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useAuth } from '../context/AuthContext';
import { AssetCategory } from '../types';
import { CrenvoroTile } from './CrenvoroLogo';

interface HeaderProps {
  currentView?: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth?: (mode?: 'login' | 'register', defaultRole?: 'buyer' | 'seller') => void;
  onOpenAuthModal?: (mode?: 'login' | 'register', defaultRole?: 'buyer' | 'seller') => void;
  onStartSelling?: () => void;
  onSearch?: (query: string) => void;
  onCategorySelect?: (cat: AssetCategory) => void;
  onOpenCartDrawer?: () => void;
  onOpenBrandAssets?: () => void;
  onOpenWelcomePromo?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView = 'home',
  onNavigate,
  onOpenAuth,
  onOpenAuthModal,
  onStartSelling,
  onSearch,
  onCategorySelect,
  onOpenCartDrawer,
  onOpenBrandAssets,
  onOpenWelcomePromo,
}) => {
  const { cartItems, wishlistIds, setIsCartOpen, subscription } = useCartWishlist();
  const { currentUser, signOut, switchRole } = useAuth();
  
  const handleAuthTrigger = onOpenAuthModal || onOpenAuth || (() => {});

  const handleStartSellingClick = () => {
    if (onStartSelling) {
      onStartSelling();
      return;
    }
    if (currentUser) {
      onNavigate('seller-dashboard');
    } else if (onOpenAuthModal) {
      onOpenAuthModal('register', 'seller');
    } else if (onOpenAuth) {
      onOpenAuth('register', 'seller');
    } else {
      onNavigate('seller-dashboard');
    }
  };

  const handleSignInClick = () => {
    if (onOpenAuthModal) {
      onOpenAuthModal('login', 'buyer');
    } else if (onOpenAuth) {
      onOpenAuth('login', 'buyer');
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('shop', searchQuery.trim());
      setIsSearchFocused(false);
    }
  };

  const handleCategoryClick = (cat: AssetCategory) => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    onNavigate('category', cat);
  };

  return (
    <header
      id="global-header"
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/80 py-2.5'
          : 'bg-white border-b border-gray-100 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="brand-logo-btn"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-left group focus:outline-none"
            >
              <CrenvoroTile className="w-8 h-8 sm:w-9 sm:h-9 shadow-md shadow-purple-950/20 group-hover:scale-105 transition-transform duration-200 shrink-0" />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black tracking-[-0.03em] text-[#111827] group-hover:text-[#6C3BFF] transition-colors leading-none">
                  CRENVORO
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold text-[#6C3BFF] tracking-wider uppercase mt-0.5 hidden sm:inline-block">
                  Creative Assets
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 shrink-0">
            <button
              id="nav-home"
              onClick={() => onNavigate('home')}
              className={`px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'home'
                  ? 'text-[#6C3BFF] bg-purple-50'
                  : 'text-gray-700 hover:text-[#6C3BFF] hover:bg-gray-50'
              }`}
            >
              Home
            </button>
            <button
              id="nav-shop"
              onClick={() => onNavigate('shop')}
              className={`px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'shop'
                  ? 'text-[#6C3BFF] bg-purple-50'
                  : 'text-gray-700 hover:text-[#6C3BFF] hover:bg-gray-50'
              }`}
            >
              Shop
            </button>

            {/* Categories with Mega Menu Toggle */}
            <div ref={megaMenuRef} className="relative">
              <button
                id="nav-categories-trigger"
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={`px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${
                  isMegaMenuOpen ? 'text-[#6C3BFF] bg-purple-50' : 'text-gray-700 hover:text-[#6C3BFF] hover:bg-gray-50'
                }`}
              >
                Categories
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isMegaMenuOpen ? 'rotate-180 text-[#6C3BFF]' : 'text-gray-400'
                  }`}
                />
              </button>

              {/* Advanced Category Mega Menu */}
              {isMegaMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[720px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50 grid grid-cols-4 gap-6 animate-in fade-in duration-200">
                  <div>
                    <div className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-3 pb-2 border-b border-gray-100">
                      <Sparkles className="w-4 h-4 text-[#6C3BFF]" />
                      Graphics
                    </div>
                    <ul className="space-y-2 text-xs text-gray-600">
                      <li>
                        <button onClick={() => handleCategoryClick('Graphics')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Vector Illustrations
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Icons')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          3D & Flat Icons
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Patterns')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Seamless Patterns
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Graphics')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Textures & Backgrounds
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-3 pb-2 border-b border-gray-100">
                      <Layers className="w-4 h-4 text-[#6C3BFF]" />
                      Templates
                    </div>
                    <ul className="space-y-2 text-xs text-gray-600">
                      <li>
                        <button onClick={() => handleCategoryClick('Templates')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Social Media Packs
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Templates')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Corporate Flyers
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Templates')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Brochures & Catalogs
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Templates')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Pitch Decks
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-3 pb-2 border-b border-gray-100">
                      <Box className="w-4 h-4 text-[#6C3BFF]" />
                      Mockups
                    </div>
                    <ul className="space-y-2 text-xs text-gray-600">
                      <li>
                        <button onClick={() => handleCategoryClick('Mockups')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Packaging & Boxes
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Mockups')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Branding & Stationery
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Mockups')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Devices (iPhone/Mac)
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Mockups')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Apparel & T-Shirts
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-3 pb-2 border-b border-gray-100">
                      <Type className="w-4 h-4 text-[#6C3BFF]" />
                      Fonts & More
                    </div>
                    <ul className="space-y-2 text-xs text-gray-600 mb-3">
                      <li>
                        <button onClick={() => handleCategoryClick('Fonts')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Serif & Sans-Serif
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Branding')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Branding Guidelines
                        </button>
                      </li>
                    </ul>

                    {/* Featured Brand Assets / Freebies */}
                    {onOpenBrandAssets && (
                      <button
                        onClick={() => {
                          setIsMegaMenuOpen(false);
                          onOpenBrandAssets();
                        }}
                        className="w-full text-left bg-purple-50 hover:bg-purple-100 p-2.5 rounded-xl border border-purple-100 transition-colors block mb-2"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#6C3BFF]">
                          <Sparkles className="w-3.5 h-3.5" />
                          Brand Assets
                        </div>
                        <p className="text-[10px] text-gray-500 mt-0.5">Vector logos & identity</p>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-freebies"
              onClick={() => onNavigate('freebies')}
              className={`px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'freebies'
                  ? 'text-[#6C3BFF] bg-purple-50'
                  : 'text-gray-700 hover:text-[#6C3BFF] hover:bg-gray-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Freebies
            </button>

            <div className="flex items-center">
              <button
                id="nav-pricing"
                onClick={() => onNavigate('pricing')}
                className={`px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  currentView === 'pricing'
                    ? 'text-[#6C3BFF] bg-purple-50 font-bold'
                    : 'text-gray-700 hover:text-[#6C3BFF] hover:bg-gray-50'
                }`}
              >
                <span>Pricing</span>
              </button>
              {onOpenWelcomePromo ? (
                <button
                  id="nav-pricing-deal-btn"
                  onClick={onOpenWelcomePromo}
                  title="Claim 75% OFF Welcome Deal"
                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-black px-1.5 py-0.5 rounded-full border border-amber-300/80 cursor-pointer active:scale-95 transition-all ml-1 shadow-sm"
                >
                  $8/mo Deal
                </button>
              ) : (
                <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-1.5 py-0.5 rounded-full border border-amber-300/60 ml-1">
                  $8/mo Deal
                </span>
              )}
            </div>

            <button
              id="nav-about"
              onClick={() => onNavigate('about')}
              className={`hidden 2xl:block px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'about'
                  ? 'text-[#6C3BFF] bg-purple-50'
                  : 'text-gray-700 hover:text-[#6C3BFF] hover:bg-gray-50'
              }`}
            >
              About
            </button>
          </nav>

          {/* Right Header: Search + Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Desktop Compact Expandable Search */}
            <div
              ref={searchContainerRef}
              className="hidden md:flex relative items-center"
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative flex items-center">
                  <input
                    id="global-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Search assets..."
                    className="w-32 lg:w-40 xl:w-52 focus:w-56 xl:focus:w-68 pl-8 pr-3 py-1.5 text-xs lg:text-sm bg-gray-50 hover:bg-gray-100/80 focus:bg-white border border-gray-200 focus:border-[#6C3BFF] rounded-full transition-all duration-200 outline-none text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-purple-500/20"
                  />
                  <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>
              </form>

              {/* Search Suggestions Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="mb-3">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Popular Searches
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Flyer', 'Mockup', 'PSD', 'Social Media', '3D Icons', 'Serif Font', 'Branding Kit'].map(
                        (tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => {
                              setSearchQuery(tag);
                              onNavigate('shop', tag);
                              setIsSearchFocused(false);
                            }}
                            className="px-2 py-0.5 text-xs bg-gray-100 hover:bg-purple-50 hover:text-[#6C3BFF] text-gray-700 rounded-lg transition-colors"
                          >
                            {tag}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-2 flex items-center justify-between text-xs text-gray-500">
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('shop');
                        setIsSearchFocused(false);
                      }}
                      className="text-[#6C3BFF] font-medium hover:underline text-xs"
                    >
                      View all products →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Search Toggle Icon */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              title="Search"
              className="md:hidden p-2 text-gray-600 hover:text-[#6C3BFF] hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMobileSearchOpen ? <X className="w-5 h-5 text-gray-500" /> : <Search className="w-5 h-5" />}
            </button>

            {/* Active Subscription Credits Pill */}
            {subscription?.status === 'active' && (
              <button
                id="header-credits-badge"
                onClick={() => onNavigate('pricing')}
                title="Your Subscription Credits (DepositPhotos Rollover Active)"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-full text-xs font-black text-purple-900 transition-all cursor-pointer shrink-0"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>{subscription.totalAvailableCredits} <span className="hidden xl:inline">Credits</span></span>
              </button>
            )}

            {/* Wishlist Button (Hidden on smallest mobile to prevent crowding; accessible via bottom nav or drawer) */}
            <button
              id="header-wishlist-btn"
              onClick={() => onNavigate('wishlist')}
              title="Saved Wishlist"
              className="hidden sm:flex relative p-2 rounded-full text-gray-600 hover:text-[#6C3BFF] hover:bg-purple-50/60 transition-colors shrink-0"
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-purple-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              title="Shopping Cart"
              className="relative p-2 rounded-full text-gray-600 hover:text-[#6C3BFF] hover:bg-purple-50/60 transition-colors shrink-0"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#6C3BFF] text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Account / Auth Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 border-l pl-2 sm:pl-3 border-gray-200 shrink-0">
              {currentUser ? (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    id="header-start-selling-logged-in"
                    onClick={handleStartSellingClick}
                    className="hidden sm:flex bg-[#6C3BFF] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm hover:bg-[#5A31D6] transition-all items-center gap-1.5 active:scale-95 whitespace-nowrap shrink-0"
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>{currentUser.role === 'seller' ? 'Studio' : 'Sell'}</span>
                  </button>

                  <div ref={userMenuRef} className="relative">
                    <button
                      id="user-profile-menu-trigger"
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-1.5 p-0.5 rounded-full hover:ring-2 hover:ring-[#6C3BFF]/30 transition-all shrink-0"
                    >
                      <img
                        src={currentUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                        alt={currentUser.displayName}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-1 ring-gray-200"
                      />
                      <ChevronDown className="w-3 h-3 text-gray-400 hidden sm:block" />
                    </button>

                    {/* Profile Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in duration-150">
                        <div className="p-3 border-b border-gray-100">
                          <div className="font-bold text-gray-900 text-sm truncate">
                            {currentUser.displayName}
                          </div>
                          <div className="text-xs text-gray-500 truncate">{currentUser.email}</div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-[#6C3BFF]">
                              <CheckCircle className="w-3 h-3" />
                              {currentUser.role === 'seller' ? 'Seller Account' : 'Buyer Account'}
                            </span>
                            <button
                              onClick={() => {
                                switchRole(currentUser.role === 'seller' ? 'buyer' : 'seller');
                                setIsUserMenuOpen(false);
                              }}
                              className="text-[11px] text-gray-600 hover:text-[#6C3BFF] font-medium underline"
                            >
                              Switch to {currentUser.role === 'seller' ? 'Buyer' : 'Seller'}
                            </button>
                          </div>
                        </div>

                        <div className="py-1 text-xs text-gray-700">
                          {currentUser.role === 'seller' && (
                            <button
                              onClick={() => {
                                onNavigate('seller-dashboard');
                                setIsUserMenuOpen(false);
                              }}
                              className="w-full text-left px-3 py-2 rounded-lg hover:bg-purple-50 hover:text-[#6C3BFF] flex items-center gap-2.5 font-semibold text-[#6C3BFF]"
                            >
                              <Store className="w-4 h-4" />
                              Seller Dashboard
                            </button>
                          )}

                          <button
                            onClick={() => {
                              onNavigate('user-dashboard', 'overview');
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2.5"
                          >
                            <LayoutDashboard className="w-4 h-4 text-gray-400" />
                            My Dashboard
                          </button>

                          <button
                            onClick={() => {
                              onNavigate('user-dashboard', 'downloads');
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2.5"
                          >
                            <Download className="w-4 h-4 text-gray-400" />
                            My Downloads
                          </button>

                          <button
                            onClick={() => {
                              onNavigate('user-dashboard', 'orders');
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2.5"
                          >
                            <Receipt className="w-4 h-4 text-gray-400" />
                            My Orders
                          </button>

                          <button
                            onClick={() => {
                              onNavigate('user-dashboard', 'settings');
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2.5"
                          >
                            <Settings className="w-4 h-4 text-gray-400" />
                            Account Settings
                          </button>
                        </div>

                        <div className="border-t border-gray-100 pt-1">
                          <button
                            onClick={() => {
                              signOut();
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 flex items-center gap-2.5 text-xs font-medium"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    id="header-login-btn"
                    onClick={handleSignInClick}
                    className="text-xs sm:text-sm font-bold text-[#4B5563] hover:text-[#111827] px-2 py-1 transition-colors whitespace-nowrap"
                  >
                    Sign In
                  </button>
                  <button
                    id="header-start-selling-btn"
                    onClick={handleStartSellingClick}
                    className="hidden sm:inline-flex bg-[#6C3BFF] text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm hover:bg-[#5A31D6] transition-all items-center gap-1 active:scale-95 whitespace-nowrap shrink-0"
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Start Selling</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger (Visible on screens < 1024px) */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {isMobileSearchOpen && (
          <div className="pt-2.5 pb-1 md:hidden animate-in slide-in-from-top-2 duration-150">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                placeholder="Search vectors, templates, mockups..."
                className="w-full pl-9 pr-16 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:bg-white focus:border-[#6C3BFF] outline-none"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-1.5 top-1 px-3 py-1 bg-[#6C3BFF] text-white text-xs font-semibold rounded-full"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Prominent Mobile Seller Hero Card */}
          <div className="bg-gradient-to-br from-[#111827] via-[#1E1B4B] to-[#2E1065] p-4 rounded-2xl text-white shadow-lg relative overflow-hidden border border-purple-900/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                CRENVORO Creator Hub
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                85% Payout
              </span>
            </div>
            <h3 className="text-base font-black tracking-tight text-white mb-1">
              {currentUser?.role === 'seller' ? 'Seller Studio Active' : 'Start Selling Your Digital Assets'}
            </h3>
            <p className="text-xs text-purple-200/80 mb-3 leading-relaxed">
              {currentUser?.role === 'seller'
                ? 'Manage your live products, upload new templates, and track payouts.'
                : 'Monetize your vectors, PSD mockups, templates, and fonts with thousands of global buyers.'}
            </p>
            <button
              id="mobile-menu-start-selling-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleStartSellingClick();
              }}
              className="w-full py-2.5 px-4 bg-[#6C3BFF] hover:bg-[#5A31D6] active:scale-98 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Store className="w-4 h-4" />
              <span>{currentUser?.role === 'seller' ? 'Open Seller Studio' : 'Start Selling on CRENVORO'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          {/* If Not Logged In, Auth Action row in Mobile Drawer */}
          {!currentUser && (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleSignInClick();
                }}
                className="py-2.5 px-3 rounded-xl border border-gray-200 text-gray-800 text-xs font-bold text-center hover:bg-gray-50 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleStartSellingClick();
                }}
                className="py-2.5 px-3 rounded-xl bg-purple-100 text-[#6C3BFF] text-xs font-bold text-center hover:bg-purple-200 transition-colors"
              >
                Create Account
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => {
                onNavigate('home');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-gray-50 text-left hover:bg-purple-50 hover:text-[#6C3BFF] flex items-center gap-2 font-medium"
            >
              <span>🏠</span> Home
            </button>
            <button
              onClick={() => {
                onNavigate('shop');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-gray-50 text-left hover:bg-purple-50 hover:text-[#6C3BFF] flex items-center gap-2 font-medium"
            >
              <span>🛍️</span> All Products
            </button>
            <button
              onClick={() => {
                onNavigate('freebies');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-left flex items-center gap-2 font-bold"
            >
              <span>🎁</span> Free Resources
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleStartSellingClick();
              }}
              className="p-2.5 rounded-xl bg-purple-50 text-[#6C3BFF] text-left flex items-center gap-2 font-bold"
            >
              <span>💼</span> Seller Studio
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenWelcomePromo) {
                  onOpenWelcomePromo();
                } else {
                  onNavigate('pricing');
                }
              }}
              className="p-2.5 rounded-xl bg-amber-50 text-amber-900 text-left flex items-center justify-between font-bold col-span-2 border border-amber-200/80 active:scale-98 transition-all"
            >
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span>30 Downloads / Mo Plan ($8/mo Deal)</span>
              </div>
              <span className="text-[10px] bg-amber-200/80 px-2 py-0.5 rounded-full font-black">
                75% OFF
              </span>
            </button>
            {onOpenBrandAssets && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBrandAssets();
                }}
                className="p-2.5 rounded-xl bg-purple-50/60 text-[#6C3BFF] text-left flex items-center gap-2 font-semibold col-span-2 border border-purple-100"
              >
                <Sparkles className="w-4 h-4 text-[#6C3BFF]" />
                Brand Identity & Vector Assets
              </button>
            )}
          </div>

          <div className="border-t border-gray-100 pt-3">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Browse Categories
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Graphics', 'Templates', 'Mockups', 'Fonts', 'Illustrations', 'Patterns', 'Branding'].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      onNavigate('category', cat);
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-[#6C3BFF] hover:text-white rounded-lg transition-colors"
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
