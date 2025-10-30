"use client";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  ArrowRight,
  Clock,
  Award,
  Users,
  Car,
  Plane,
  Calendar,
  Shield,
  IndianRupee,
  Copy
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { useTheme } from "./providers/theme";
import { useContact } from "@/hooks/use-contact";
import Image from "next/image";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const { themeData } = useTheme();
  const { contactInfo } = useContact();
  const { toast } = useToast();
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const travelServices = [
    { name: 'One-way Trip', href: '/tariff' },
    { name: 'Round Trip', href: '/tariff' },
    { name: 'Airport Taxi', href: '/tariff' },
    { name: 'Day Rental', href: '/tariff' },
    { name: 'Hourly Package', href: '/tariff' },
    { name: 'Tour Package', href: '/packages' }
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Tariff', href: '/tariff' },
    { name: 'Packages', href: '/packages' },
    { name: 'Contact', href: '/contact' }
  ];

/*   const destinations = [
    'Chennai', 'Madurai', 'Coimbatore', 'Trichy', 'Salem', 'Tirunelveli'
  ] */;

  const handleWhatsAppClick = () => {
    const message = "Hi! I'm interested in your travel services. Please provide more details.";
    const whatsappNumber = contactInfo?.whatsappNumber || contactInfo?.primaryPhone || '919360290811';
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    window.open(`tel:${contactInfo?.primaryPhone || '+919360290811'}`, '_self');
  };

  return (
    <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white relative overflow-hidden">
      {/* Enhanced Background Pattern with Animated Gradients */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-600/20 to-orange-600/20 animate-pulse"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Dotted Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 lg:gap-16">
          {/* Company Info - Enhanced */}
          <div className="space-y-8 sm:col-span-2 lg:col-span-2">
            {/* Logo Section with Enhanced Styling */}
            <Link href="/" className="flex items-center space-x-4 group">
              {themeData?.logo ? (
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/30 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                  <Image 
                    src={themeData.logo} 
                    alt="Sri Jaidev Tours & Travels Logo" 
                    width={64} 
                    height={64} 
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-admin-gradient rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl sm:text-3xl">V</span>
                </div>
              )}
              <div>
                <div className="font-bold text-2xl sm:text-3xl bg-admin-gradient bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                  {themeData?.siteName?.includes('Tours') 
                    ? themeData.siteName.split('Tours')[0].trim()
                    : themeData?.siteName?.split(' ').slice(0, 2).join(' ') || "Sri Jaidev"}
                </div>
                <div className="text-base sm:text-lg font-medium text-gray-300">
                  {themeData?.siteName?.includes('Tours') 
                    ? 'Tours & Travels' 
                    : themeData?.siteName?.split(' ').slice(2).join(' ') || 'Tours & Travels'}
                </div>
              </div>
            </Link>

            {/* Company Description with Enhanced Styling */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-admin-gradient rounded-full opacity-50"></div>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-md pl-2">
                Leading provider of professional travel services across Tamil Nadu, delivering safe, comfortable, and memorable journeys with cutting-edge vehicles and expert drivers.
              </p>
            </div>

            {/* Dynamic Contact Info with Enhanced Cards */}
            <div className="space-y-4">
              {/* Primary Phone */}
              <div className="flex items-center space-x-4 group">
                <div className="w-10 h-10 rounded-xl bg-admin-gradient/10 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="h-5 w-5 text-admin-primary flex-shrink-0" />
                </div>
                <a
                  href={`tel:${contactInfo?.primaryPhone || "+919360290811"}`}
                  className="text-gray-300 hover:text-white transition-colors text-base font-medium group-hover:translate-x-1 transition-transform duration-300"
                >
                  {contactInfo?.primaryPhone || "+91 90037 82966"}
                </a>
              </div>
              
              {/* Add Secondary Phone */}
              {contactInfo?.secondaryPhone && (
                <div className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 rounded-xl bg-admin-gradient/10 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-5 w-5 text-admin-primary flex-shrink-0" />
                  </div>
                  <a
                    href={`tel:${contactInfo.secondaryPhone}`}
                    className="text-gray-300 hover:text-white transition-colors text-base font-medium group-hover:translate-x-1 transition-transform duration-300"
                  >
                    {contactInfo.secondaryPhone}
                  </a>
                </div>
              )}

              <div className="flex items-center space-x-4 group">
                <div className="w-10 h-10 rounded-xl bg-admin-gradient/10 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-5 w-5 text-admin-primary flex-shrink-0" />
                </div>
                <a
                  href={`mailto:${contactInfo?.email || "srijaidavetravelers@gmail.com"}`}
                  className="text-gray-300 hover:text-white transition-colors text-base font-medium break-all group-hover:translate-x-1 transition-transform duration-300"
                >
                  {contactInfo?.email || "srijaidavetravelers@gmail.com"}
                </a>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-xl bg-admin-gradient/10 backdrop-blur-sm border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-5 w-5 text-admin-primary" />
                </div>
                <span className="text-gray-300 text-base leading-relaxed pt-1.5">
                  {contactInfo ? (
                    `${contactInfo.address}, ${contactInfo.city}, ${contactInfo.state}-${contactInfo.pincode}, ${contactInfo.country}`
                  ) : (
                    "2A, 1st Floor, Koodalnagar, Chokkalinganagar 1st Street, Madurai – 625018, Tamil Nadu"
                  )}
                </span>
              </div>
            </div>

            {/* Social Media with Enhanced Styling */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-base flex items-center gap-2">
                <span className="w-8 h-0.5 bg-admin-gradient rounded-full"></span>
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-3">
                {contactInfo?.facebook && (
                  <a
                    href={contactInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-white/5 hover:bg-blue-600/20 rounded-xl transition-all duration-300 border border-white/10 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-110"
                    title="Follow us on Facebook"
                  >
                    <Facebook className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </a>
                )}
                {contactInfo?.instagram && (
                  <a
                    href={contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-white/5 hover:bg-pink-600/20 rounded-xl transition-all duration-300 border border-white/10 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/20 hover:scale-110"
                    title="Follow us on Instagram"
                  >
                    <Instagram className="h-5 w-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
                  </a>
                )}
                {contactInfo?.whatsapp && (
                  <button
                    onClick={handleWhatsAppClick}
                    className="group p-3 bg-white/5 hover:bg-green-600/20 rounded-xl transition-all duration-300 border border-white/10 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 hover:scale-110"
                    title="Contact us on WhatsApp"
                  >
                    <WhatsAppIcon className="h-5 w-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Services with Enhanced Styling */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-2">
              <span className="w-8 h-0.5 bg-admin-gradient rounded-full"></span>
              Our Services
            </h3>
            <ul className="space-y-4">
              {travelServices.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group text-base"
                  >
                    <ArrowRight className="h-4 w-4 mr-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-admin-primary" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links with Enhanced Styling */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-2">
              <span className="w-8 h-0.5 bg-admin-gradient rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group text-base"
                  >
                    <ArrowRight className="h-4 w-4 mr-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-admin-primary" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Options with Enhanced Styling */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-2">
              <span className="w-8 h-0.5 bg-admin-gradient rounded-full"></span>
              Payment Options
            </h3>
            
            {/* Desktop QR Code - Enhanced with Better Styling */}
            <div className="hidden md:block bg-white/95 backdrop-blur-sm p-5 rounded-2xl mb-6 w-fit shadow-2xl border border-white/20 hover:scale-105 transition-transform duration-300">
              <QRCodeSVG
                value={`upi://pay?pa=vinusree@sbi&pn=${encodeURIComponent("Sri Jaidev Tours and Travels")}`}
                size={160}
                level="H"
                className="rounded-lg"
              />
            </div>

            {/* UPI Payment Links - Enhanced for Mobile */}
            <div className="space-y-4">
              {/* Mobile UPI App Link with Enhanced Styling */}
              <a
                href="upi://pay?pa=vinusree@sbi&pn=SriJaidev%20Tours%20and%20Travels"
                className="md:hidden flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 rounded-xl transition-all duration-300 border border-green-500/30 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 group"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <IndianRupee className="h-6 w-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <div className="text-base font-semibold text-white">Pay via UPI</div>
                  <div className="text-sm text-gray-400">Tap to open UPI app</div>
                </div>
                <ArrowRight className="h-5 w-5 text-green-500 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              {/* Copyable UPI ID with Enhanced Styling */}
              <div className="flex flex-col gap-3">
                <div className="text-base font-semibold text-gray-300">UPI ID:</div>
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors group">
                  <span className="text-base font-mono text-gray-300 flex-1">abc@sbi</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 hover:bg-white/10 rounded-lg group-hover:scale-110 transition-transform duration-300"
                    onClick={() => {
                      navigator.clipboard.writeText("vinusree@sbi");
                      toast({
                        title: "UPI ID Copied",
                        description: "UPI ID has been copied to clipboard",
                      });
                    }}
                  >
                    <Copy className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                  </Button>
                </div>
              </div>

              {/* Payment Apps Links with Enhanced Styling */}
              <div className="flex flex-wrap gap-3">
                <a
                 /*  href="phonepe://pay?pa=vinusree@sbi&pn=SriJaidev%20Tours%20and%20Travels" */
                  className="flex items-center gap-2 px-5 py-3 bg-admin-gradient hover:opacity-90 hover:shadow-lg hover:shadow-orange-500/30 rounded-xl transition-all duration-300 group hover:scale-105"
                >
                  <span className="text-sm font-semibold text-white">PhonePe</span>
                  <ArrowRight className="h-4 w-4 text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
                <a
                  /* href="gpay://upi/pay?pa=vinusree@sbi&pn=SriJaidev%20Tours%20and%20Travels" */
                  className="flex items-center gap-2 px-5 py-3 bg-admin-gradient hover:opacity-90 hover:shadow-lg hover:shadow-orange-500/30 rounded-xl transition-all duration-300 group hover:scale-105"
                >
                  <span className="text-sm font-semibold text-white">Google Pay</span>
                  <ArrowRight className="h-4 w-4 text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
                <a
                  /* href="paytmmp://pay?pa=vinusree@sbi&pn=SriJaidev%20Tours%20and%20Travels" */
                  className="flex items-center gap-2 px-5 py-3 bg-admin-gradient hover:opacity-90 hover:shadow-lg hover:shadow-orange-500/30 rounded-xl transition-all duration-300 group hover:scale-105"
                >
                  <span className="text-sm font-semibold text-white">Paytm</span>
                  <ArrowRight className="h-4 w-4 text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Enhanced Bottom Bar with Better Styling */}
        <div className="border-t border-white/10 mt-12 sm:mt-16 pt-8 sm:pt-10 pb-8 sm:pb-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-admin-gradient rounded-full"></div>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed px-2 text-center">
            © 2025 Sri Jaidev Tours & Travels. All rights reserved. ❤️ 
            <span className="block sm:inline sm:ml-2 hover:text-white transition-colors">
              <a 
                href="https://mntfuture.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium bg-admin-gradient bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                Developed by MnT
              </a>
            </span>
          </p>
        </div>
    </footer>
  );
}