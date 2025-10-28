"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Phone,
  X,
  Mail,
  MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useTheme } from "./providers/theme";
import { useContact } from "@/hooks/use-contact";
import Image from "next/image";



// Separate client component for pathname functionality
function NavbarContent() {
  const { themeData } = useTheme();
  const { contactInfo, isLoading: contactLoading } = useContact();
  const pathname = usePathname();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  // Add timeout for fallback data
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (contactLoading) {
        setShowFallback(true);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(fallbackTimer);
  }, [contactLoading]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Tariff", href: "/tariff" },
    { name: "Packages", href: "/packages" },
    { name: "Contact", href: "/contact" },
  ];

  const handleBookNow = () => {
    // Navigate to the booking form on homepage
    if (pathname === '/') {
      // If on homepage, scroll to the form
      const formElement = document.getElementById('quick-book-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      // If on other pages, navigate to homepage with form section
      window.location.href = '/#quick-book-form';
    }
    setIsOpen(false);
  };



  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Update contact info section with loading states
  const renderContactInfo = () => {
    if (!contactInfo && !showFallback) {
      return null; // Don't show anything while loading
    }

    return (
      <div className="flex flex-wrap items-center justify-center sm:justify-center lg:justify-start gap-2 sm:gap-4 lg:gap-6">
        {/* Primary Phone */}
        {(contactInfo?.primaryPhone || showFallback) && (
          <div className="flex items-center gap-1 sm:gap-2">
            <Phone className="h-3 w-3 sm:h-3 sm:w-3 lg:h-4 lg:w-4" />
            <a
              href={`tel:${contactInfo?.primaryPhone}`}
              className="font-medium text-xs sm:text-xs lg:text-sm hover:text-white/80 transition-colors"
            >
              {contactInfo?.primaryPhone}
            </a>
          </div>
        )}
        
        {/* Secondary Phone - only show if exists */}
        {contactInfo?.secondaryPhone && (
          <div className="flex items-center gap-1 sm:gap-2">
            <Phone className="h-3 w-3 sm:h-3 sm:w-3 lg:h-4 lg:w-4" />
            <a
              href={`tel:${contactInfo.secondaryPhone}`}
              className="font-medium text-xs sm:text-xs lg:text-sm hover:text-white/80 transition-colors"
            >
              {contactInfo.secondaryPhone}
            </a>
          </div>
        )}

        {/* Email */}
        {(contactInfo?.email || showFallback) && (
          <div className="flex items-center gap-1 sm:gap-2">
            <Mail className="h-3 w-3 sm:h-3 sm:w-3 lg:h-4 lg:w-4" />
            <a
              href={`mailto:${contactInfo?.email}`}
              className="font-medium text-xs sm:text-xs lg:text-sm hover:text-white/80 transition-colors truncate max-w-[200px] sm:max-w-none"
            >
              {contactInfo?.email}
            </a>
          </div>
        )}
      </div>
    );
  };

  // Update address section
  const renderAddress = () => {
    if (!contactInfo && !showFallback) {
      return null;
    }

    if (contactInfo) {
      return (
        <div className="hidden lg:flex xl:flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span className="font-medium text-sm">
            {`${contactInfo.address}, ${contactInfo.city}, ${contactInfo.state}-${contactInfo.pincode}`}
          </span>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {/* Top Bar with Dynamic Contact Info - Compact design */}
      <div className="relative overflow-hidden bg-admin-gradient text-white py-1.5 sm:py-2 px-3 sm:px-4 text-xs">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)] opacity-50"></div>
        <div className="container mx-auto flex flex-col sm:flex-row lg:flex-row justify-between items-center gap-1.5 sm:gap-2 relative z-10">
          {renderContactInfo()}
          {renderAddress()}
        </div>
      </div>

      {/* Main Navigation - Compact floating design */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-1.5 sm:py-2"
            : "py-2 sm:py-2.5"
        }`}
      >
        <div className="container mx-auto px-2 sm:px-4">
          <div className={`flex justify-between items-center transition-all duration-500 rounded-2xl lg:rounded-full ${
            isScrolled
              ? "bg-white/80 backdrop-blur-3xl shadow-2xl shadow-gray-900/10 border border-gray-200/60 px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3"
              : "bg-white/70 backdrop-blur-2xl shadow-xl shadow-gray-900/5 border border-gray-100/50 px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-3.5"
          }`}>
            {/* Logo - Prominent design with better sizing */}
            <Link
              href="/"
              className="flex items-center space-x-2 sm:space-x-2.5 lg:space-x-3 group relative"
            >
              <div className="relative">
                {/* Glow effect behind logo */}
                <div className="absolute inset-0 bg-admin-primary/40 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 lg:w-14 lg:h-14 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 shadow-md group-hover:shadow-lg transition-all duration-500 group-hover:scale-105 ring-2 ring-gray-200/50 group-hover:ring-admin-primary/30 group-hover:ring-3">
                  {themeData?.logo && (
                    <Image
                      src={themeData.logo}
                      alt={`${themeData?.siteName || ''} Logo`}
                      width={56}
                      height={56}
                      className="w-full h-full object-contain p-1 group-hover:rotate-6 transition-transform duration-500"
                    />
                  )}
                </div>
              </div>
              {themeData?.siteName && (
                <div className="transition-all duration-300">
                  <div className="font-extrabold text-base sm:text-lg lg:text-xl xl:text-2xl bg-admin-gradient bg-clip-text text-transparent transition-all duration-300">
                    {themeData.siteName.includes('Tours') 
                      ? themeData.siteName.split('Tours')[0].trim()
                      : themeData.siteName.split(' ').slice(0, 2).join(' ')}
                  </div>
                  <div className="text-[11px] sm:text-xs lg:text-sm text-gray-700 font-bold tracking-wide group-hover:text-admin-primary transition-colors duration-300">
                    {themeData.siteName.includes('Tours') 
                      ? 'Tours & Travels' 
                      : themeData.siteName.split(' ').slice(2).join(' ')}
                  </div>
                </div>
              )}
            </Link>

            {/* Desktop Navigation - Compact pill design */}
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              {/* Navigation pills container */}
              <div className="flex items-center gap-0.5 bg-gradient-to-r from-gray-50 to-gray-100/80 rounded-full px-1.5 py-1.5 shadow-inner">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-3.5 xl:px-4 py-1.5 xl:py-2 rounded-full font-bold text-xs xl:text-sm transition-all duration-300 ${
                      isActive(item.href)
                        ? "text-white shadow-md"
                        : "text-gray-700 hover:text-gray-900 hover:bg-white/60"
                    }`}
                  >
                    {/* Active background with gradient */}
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="navbar-pill"
                        className="absolute inset-0 bg-admin-gradient rounded-full shadow-md"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Action buttons - Compact */}
              <div className="flex items-center gap-1.5 xl:gap-2 ml-1.5">
                {/* WhatsApp Button - Icon only */}
                <Button
                  onClick={() => {
                    if (contactInfo?.whatsappNumber || contactInfo?.primaryPhone) {
                      const number = (contactInfo.whatsappNumber || contactInfo.primaryPhone).replace(/[^0-9]/g, '');
                      window.open(`https://wa.me/${number}?text=Hi, I'm interested in your travel services`, '_blank');
                    }
                  }}
                  variant="outline"
                  className="relative overflow-hidden border-2 border-green-500 text-green-600 hover:text-white px-2.5 xl:px-3 py-1.5 xl:py-2 font-bold text-xs xl:text-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 rounded-full group"
                  disabled={!contactInfo}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <Phone className="h-3.5 w-3.5 relative z-10" />
                </Button>

                {/* Book Now Button - Compact */}
                <Button
                  onClick={handleBookNow}
                  className="relative overflow-hidden bg-admin-gradient hover:opacity-90 text-white border-0 px-5 xl:px-6 py-1.5 xl:py-2 font-bold text-xs xl:text-sm transition-all duration-300 hover:shadow-xl hover:shadow-admin-primary/40 hover:scale-105 rounded-full group"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Book Now
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button - Compact circular design */}
            <button
              className="lg:hidden relative p-2 sm:p-2.5 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 border-2 border-gray-200/50 hover:border-admin-primary/50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative z-10">
                {isOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6 text-admin-primary" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-admin-primary" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Modern card-based design */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="lg:hidden mt-3"
            >
              <div className="container mx-auto px-2 sm:px-4">
                <div className="bg-white/90 backdrop-blur-3xl rounded-3xl shadow-2xl border border-gray-200/60 overflow-hidden">
                  <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-2">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -40, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ 
                          delay: index * 0.07,
                          duration: 0.5,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                      >
                        <Link
                          href={item.href}
                          className={`relative block overflow-hidden transition-all duration-300 font-bold text-lg sm:text-xl py-4 sm:py-5 px-5 rounded-2xl group ${
                            isActive(item.href)
                              ? "text-white shadow-lg"
                              : "text-gray-700 hover:text-gray-900"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {/* Active/Hover background */}
                          <div className={`absolute inset-0 transition-all duration-300 ${
                            isActive(item.href)
                              ? "bg-admin-gradient"
                              : "bg-gradient-to-r from-gray-50 to-gray-100 translate-x-[-100%] group-hover:translate-x-0"
                          }`}></div>
                          
                          {/* Content */}
                          <span className="relative z-10 flex items-center justify-between">
                            {item.name}
                            <svg className={`w-5 h-5 transition-transform duration-300 ${isActive(item.href) ? 'translate-x-0' : 'translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </Link>
                      </motion.div>
                    ))}

                    {/* Action buttons section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: navItems.length * 0.07,
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      className="pt-4 space-y-3"
                    >
                      {/* Book Now Button */}
                      <Button
                        onClick={handleBookNow}
                        className="w-full relative overflow-hidden bg-admin-gradient hover:opacity-90 text-white border-0 py-5 sm:py-6 font-bold text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-admin-primary/40 rounded-2xl group"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Book Now
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </Button>

                      {/* WhatsApp Button */}
                      <Button
                        onClick={() => {
                          const whatsappNumber = contactInfo?.whatsappNumber || contactInfo?.primaryPhone || '919003782966';
                          window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in your travel services`, '_blank');
                          setIsOpen(false);
                        }}
                        variant="outline"
                        className="w-full relative overflow-hidden border-2 border-green-500 text-green-600 hover:text-white py-5 sm:py-6 font-bold text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/30 rounded-2xl group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <Phone className="h-5 w-5" />
                          WhatsApp
                        </span>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>


    </>
  );
}

// Main Navbar component wrapper
export default function Navbar() {
  return <NavbarContent />;
}