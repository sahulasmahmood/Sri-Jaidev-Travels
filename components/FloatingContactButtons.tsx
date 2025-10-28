"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useContact } from "@/hooks/use-contact";

export default function FloatingContactButtons() {
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);
  const [showCallTooltip, setShowCallTooltip] = useState(false);
  const { contactInfo } = useContact();

  const handleWhatsAppClick = () => {
    const message = "Hi! I'm interested in your travel services. Please provide more details.";
    const whatsappNumber = contactInfo?.whatsappNumber || "919003782966";
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    const phoneNumber = contactInfo?.primaryPhone || "+919003782966";
    window.open(`tel:${phoneNumber}`, '_self');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 sm:bottom-8 sm:right-8">
      {/* WhatsApp Button with Modern Design */}
      <div className="relative group">
        {/* Animated pulse rings */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 opacity-75 group-hover:opacity-100 blur-md group-hover:blur-lg transition-all duration-500 animate-pulse"></div>
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
        
        <Button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setShowWhatsAppTooltip(true)}
          onMouseLeave={() => setShowWhatsAppTooltip(false)}
          className="relative bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 hover:from-green-400 hover:via-green-500 hover:to-emerald-600 text-white rounded-2xl w-14 h-14 sm:w-16 sm:h-16 shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-white/20 hover:border-white/40 group-hover:shadow-green-500/50"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
          <svg className="h-7 w-7 sm:h-8 sm:w-8 relative z-10 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
          </svg>
          
          {/* Decorative corner accent */}
          <div className="absolute top-1 right-1 w-2 h-2 bg-white/40 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
        </Button>
        
        {/* Modern Tooltip */}
        {showWhatsAppTooltip && (
          <div className="hidden sm:block absolute right-full mr-4 top-1/2 -translate-y-1/2 animate-in fade-in slide-in-from-right-3 duration-300">
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-sm">Chat on WhatsApp</div>
                  <div className="text-green-400 text-xs font-medium mt-0.5">{contactInfo?.whatsappNumber || "+91 90037 82966"}</div>
                </div>
              </div>
              {/* Arrow */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-px">
                <div className="w-3 h-3 rotate-45 bg-gradient-to-br from-gray-900 to-gray-800 border-r border-t border-white/10"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Call Button with Modern Design */}
      <div className="relative group">
        {/* Animated pulse rings */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 opacity-75 group-hover:opacity-100 blur-md group-hover:blur-lg transition-all duration-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
        
        <Button
          onClick={handleCallClick}
          onMouseEnter={() => setShowCallTooltip(true)}
          onMouseLeave={() => setShowCallTooltip(false)}
          className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 hover:from-blue-400 hover:via-blue-500 hover:to-indigo-600 text-white rounded-2xl w-14 h-14 sm:w-16 sm:h-16 shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-white/20 hover:border-white/40 group-hover:shadow-blue-500/50"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
          <Phone className="h-6 w-6 sm:h-7 sm:w-7 relative z-10 drop-shadow-lg" strokeWidth={2.5} />
          
          {/* Decorative corner accent */}
          <div className="absolute top-1 right-1 w-2 h-2 bg-white/40 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
        </Button>
        
        {/* Modern Tooltip */}
        {showCallTooltip && (
          <div className="hidden sm:block absolute right-full mr-4 top-1/2 -translate-y-1/2 animate-in fade-in slide-in-from-right-3 duration-300">
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Phone className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="font-semibold text-sm">Call Us Now</div>
                  <div className="text-blue-400 text-xs font-medium mt-0.5">{contactInfo?.primaryPhone || "+91 90037 82966"}</div>
                </div>
              </div>
              {/* Arrow */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-px">
                <div className="w-3 h-3 rotate-45 bg-gradient-to-br from-gray-900 to-gray-800 border-r border-t border-white/10"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}