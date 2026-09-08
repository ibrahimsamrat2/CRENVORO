import React, { useState, useEffect } from 'react';
import { Home, Compass, Store, Heart, ShoppingBag } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartWishlistProvider, useCartWishlist } from './context/CartWishlistContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { QuickViewModal } from './components/QuickViewModal';
import { BrandAssetsModal } from './components/BrandAssetsModal';
import { ToastContainer } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { SellerDashboardPage } from './pages/SellerDashboardPage';
import { SellerProfilePage } from './pages/SellerProfilePage';
import { FreebiesPage } from './pages/FreebiesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { LicensePage } from './pages/LicensePage';
import { LegalPage } from './pages/LegalPage';
import { PricingPage } from './pages/PricingPage';
import { SubscriptionModal } from './components/SubscriptionModal';

import { MOCK_PRODUCTS } from './data/mockProducts';
import { Product, OrderRecord, AssetCategory } from './types';

function MainMarketplaceApp() {
  const { currentUser, switchRole } = useAuth();
  const { isCartDrawerOpen, setIsCartDrawerOpen, cartItems, wishlistIds } = useCartWishlist();

  // Navigation State
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string | undefined>(undefined);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Products Catalog (with live addition/deletion by sellers)
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialMode, setAuthModalInitialMode] = useState<'login' | 'register'>('login');
  const [authModalDefaultRole, setAuthModalDefaultRole] = useState<'buyer' | 'seller'>('buyer');
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  // Checkout order
  const [lastCompletedOrder, setLastCompletedOrder] = useState<OrderRecord | null>(null);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProductId, viewParam]);

  const handleNavigate = (view: string, param?: string) => {
    setCurrentView(view);
    setViewParam(param);
    if (view !== 'product') {
      setSelectedProductId(null);
    }
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProductId(id);
    setCurrentView('product');
  };

  const handleSearch = (query: string) => {
    setCurrentView('shop');
    setViewParam(`search:${query}`);
  };

  const handleCategorySelect = (category: string) => {
    setCurrentView('shop');
    setViewParam(`cat:${category}`);
  };

  const handleOpenAuth = (
    mode: 'login' | 'register' = 'login',
    defaultRole: 'buyer' | 'seller' = 'buyer'
  ) => {
    setAuthModalInitialMode(mode);
    setAuthModalDefaultRole(defaultRole);
    setIsAuthModalOpen(true);
  };

  const handleStartSelling = () => {
    if (currentUser) {
      if (currentUser.role !== 'seller') {
        switchRole('seller');
      }
      handleNavigate('seller-dashboard');
    } else {
      handleOpenAuth('register', 'seller');
    }
  };

  // Seller actions
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleOrderCompleted = (order: OrderRecord) => {
    setLastCompletedOrder(order);
    setCurrentView('order-success');
  };

  // Selected product resolution
  const currentProduct = selectedProductId
    ? products.find((p) => p.id === selectedProductId) || products[0]
    : products[0];

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC] text-gray-900 selection:bg-purple-200 selection:text-purple-900 font-sans">
      {/* Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
        onOpenAuthModal={handleOpenAuth}
        onStartSelling={handleStartSelling}
        onOpenCartDrawer={() => setIsCartDrawerOpen(true)}
        onOpenBrandAssets={() => setIsBrandModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-16 md:pb-0">
        {currentView === 'home' && (
          <HomePage
            products={products}
            onSelectProduct={handleSelectProduct}
            onCategorySelect={handleCategorySelect}
            onNavigate={handleNavigate}
            onOpenSellerModal={handleStartSelling}
          />
        )}

        {currentView === 'shop' && (
          <ShopPage
            products={products}
            initialCategory={
              viewParam?.startsWith('cat:') ? (viewParam.replace('cat:', '') as AssetCategory) : undefined
            }
            initialQuery={
              viewParam?.startsWith('search:') ? viewParam.replace('search:', '') : undefined
            }
            onSelectProduct={handleSelectProduct}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        )}

        {currentView === 'product' && currentProduct && (
          <ProductDetailsPage
            product={currentProduct}
            allProducts={products}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
            onNavigateCheckout={() => setCurrentView('checkout')}
          />
        )}

        {currentView === 'cart' && (
          <CartPage
            onNavigate={handleNavigate}
            onNavigateCheckout={() => setCurrentView('checkout')}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            onNavigate={handleNavigate}
            onOrderCompleted={handleOrderCompleted}
          />
        )}

        {currentView === 'order-success' && lastCompletedOrder && (
          <OrderSuccessPage
            order={lastCompletedOrder}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'user-dashboard' && (
          <UserDashboardPage
            initialTab={viewParam || 'overview'}
            products={products}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'seller-dashboard' && (
          <SellerDashboardPage
            initialTab={viewParam || 'overview'}
            sellerProducts={products.filter((p) => p.creatorName === 'Ibrahim Samrat' || p.creatorId.includes('ibrahim'))}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'seller-profile' && (
          <SellerProfilePage
            products={products}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'freebies' && (
          <FreebiesPage
            products={products}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'about' && <AboutPage onNavigate={handleNavigate} />}

        {currentView === 'pricing' && <PricingPage onNavigate={handleNavigate} />}

        {currentView === 'contact' && <ContactPage />}

        {currentView === 'faq' && <FAQPage onNavigate={handleNavigate} />}

        {currentView === 'license' && <LicensePage onNavigate={handleNavigate} />}

        {currentView === 'terms' && <LegalPage type="terms" />}

        {currentView === 'privacy' && <LegalPage type="privacy" />}

        {currentView === 'refund' && <LegalPage type="refund" />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onCategorySelect={handleCategorySelect}
        onOpenBrandAssets={() => setIsBrandModalOpen(true)}
      />

      {/* Mobile Bottom Navigation Bar - Sticky, responsive, high touch target for mobile users */}
      <nav
        id="mobile-bottom-nav"
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/90 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-around"
      >
        <button
          id="mobile-bottom-nav-home"
          onClick={() => handleNavigate('home')}
          className={`flex flex-col items-center justify-center py-1 px-3 min-w-[54px] rounded-xl transition-colors active:scale-95 ${
            currentView === 'home' ? 'text-[#6C3BFF] font-bold' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        <button
          id="mobile-bottom-nav-shop"
          onClick={() => handleNavigate('shop')}
          className={`flex flex-col items-center justify-center py-1 px-3 min-w-[54px] rounded-xl transition-colors active:scale-95 ${
            currentView === 'shop' ? 'text-[#6C3BFF] font-bold' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Shop</span>
        </button>

        {/* Elevated Center "Start Selling" Button */}
        <button
          id="mobile-nav-start-selling-btn"
          onClick={handleStartSelling}
          className="flex flex-col items-center justify-center -mt-3.5 bg-gradient-to-tr from-[#6C3BFF] to-[#8B5CF6] text-white py-2 px-4 rounded-2xl shadow-lg shadow-purple-600/35 active:scale-95 transition-transform"
          aria-label="Start Selling"
        >
          <Store className="w-5 h-5" />
          <span className="text-[10px] font-black mt-0.5 tracking-tight">Sell</span>
        </button>

        <button
          id="mobile-bottom-nav-wishlist"
          onClick={() => handleNavigate('wishlist')}
          className={`relative flex flex-col items-center justify-center py-1 px-3 min-w-[54px] rounded-xl transition-colors active:scale-95 ${
            currentView === 'wishlist' ? 'text-[#6C3BFF] font-bold' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Heart className="w-5 h-5" />
          {wishlistIds.length > 0 && (
            <span className="absolute top-1 right-2.5 w-4 h-4 bg-purple-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              {wishlistIds.length}
            </span>
          )}
          <span className="text-[10px] mt-0.5">Saved</span>
        </button>

        <button
          id="mobile-bottom-nav-cart"
          onClick={() => setIsCartDrawerOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 px-3 min-w-[54px] rounded-xl text-gray-500 hover:text-gray-900 transition-colors active:scale-95"
        >
          <ShoppingBag className="w-5 h-5" />
          {totalCartCount > 0 && (
            <span className="absolute top-1 right-2.5 w-4 h-4 bg-[#6C3BFF] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
          <span className="text-[10px] mt-0.5">Cart</span>
        </button>
      </nav>

      {/* Global Modals & Slide-overs */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        onNavigate={handleNavigate}
        onNavigateCheckout={() => {
          setIsCartDrawerOpen(false);
          setCurrentView('checkout');
        }}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalInitialMode}
        defaultRole={authModalDefaultRole}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onViewFullProduct={(id) => {
          setQuickViewProduct(null);
          handleSelectProduct(id);
        }}
      />

      <BrandAssetsModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
      />

      <SubscriptionModal />

      {/* Toast Notification */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartWishlistProvider>
        <MainMarketplaceApp />
      </CartWishlistProvider>
    </AuthProvider>
  );
}
