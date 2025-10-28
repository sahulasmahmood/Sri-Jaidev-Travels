"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Car, 
  Clock, 
  Users, 
  CheckCircle, 
  Phone,
  Star,
  MapPin,
  Shield
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { useState } from "react";
import { useContact } from "@/hooks/use-contact";
import BookingModal from "@/components/BookingModal";

interface TariffData {
  id: string;
  vehicleType: string;
  vehicleName: string;
  description: string;
  oneWayRate: string;
  roundTripRate: string;
  driverAllowance: string;
  minimumKmOneWay: string;
  minimumKmRoundTrip: string;
  image: string;
  featured: boolean;
  additionalCharges: string[];
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

interface TariffDetailClientProps {
  tariffData: TariffData;
}

export default function TariffDetailClient({ tariffData }: TariffDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { contactInfo } = useContact();

  const handleBookNow = () => {
    const message = `🚗 *Vehicle Booking Request*

*Vehicle:* ${tariffData.vehicleName}
*Type:* ${tariffData.vehicleType}
*One-way Rate:* ₹${tariffData.oneWayRate}/km
*Round Trip Rate:* ₹${tariffData.roundTripRate}/km

I'm interested in booking this vehicle. Please provide:
- Available dates
- Final pricing for my route
- Booking confirmation

Thank you!`;

    const whatsappNumber = contactInfo?.whatsappNumber || contactInfo?.primaryPhone || '919360290811';
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallNow = () => {
    const phoneNumber = contactInfo?.primaryPhone || '+919360290811';
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleModalBooking = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 sm:py-20 lg:py-28 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/tariff"
              className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm mr-2 group-hover:bg-white/20 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </div>
              <span className="font-medium">Back to Tariff</span>
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 items-center">
              <div className="lg:pr-8">
                <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-md px-5 py-2.5 text-sm shadow-lg inline-flex items-center gap-2">
                  <div className="p-1 rounded-full bg-white/20">
                    <Car className="h-4 w-4" />
                  </div>
                  {tariffData.vehicleType}
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight break-words">
                  {tariffData.vehicleName}
                  {tariffData.featured && (
                    <span className="block text-2xl sm:text-3xl mt-3 text-yellow-400 flex items-center gap-2">
                      <Star className="h-6 w-6 fill-current" />
                      Featured Vehicle
                    </span>
                  )}
                </h1>
                
                <p className="text-lg sm:text-xl text-white/80 mb-10 leading-relaxed">
                  {tariffData.description}
                </p>
                
                {/* Pricing highlights */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <motion.div 
                    className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-5 w-5 text-blue-400" />
                      <span className="text-xs text-white/70 font-medium uppercase tracking-wide">One-way</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      ₹{tariffData.oneWayRate.replace(/[₹$]/g, '').replace(/per\s*km/gi, '').replace(/\/km/gi, '').trim()}
                    </div>
                    <div className="text-sm text-white/60">per kilometer</div>
                  </motion.div>
                  
                  <motion.div 
                    className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-green-400" />
                      <span className="text-xs text-white/70 font-medium uppercase tracking-wide">Round Trip</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      ₹{tariffData.roundTripRate.replace(/[₹$]/g, '').replace(/per\s*km/gi, '').replace(/\/km/gi, '').trim()}
                    </div>
                    <div className="text-sm text-white/60">per kilometer</div>
                  </motion.div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleBookNow}
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <WhatsAppIcon className="h-5 w-5 mr-2" />
                    Book via WhatsApp
                  </Button>
                  <Button
                    onClick={handleCallNow}
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 hover:border-white px-8 py-6 text-lg font-semibold transition-all duration-300 bg-white/5 backdrop-blur-sm"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>

              <div className="relative">
                <motion.div 
                  className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Image
                    src={tariffData.image || "/toyota-innova-crysta-luxury-taxi.png"}
                    alt={tariffData.vehicleName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  {/* Floating badge */}
                  <motion.div
                    className="absolute bottom-6 left-6 right-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-admin-gradient">
                          <Star className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">Professional Service</div>
                          <div className="text-xs text-gray-600">Trusted by 2000+ travelers</div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Details */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-48 h-48 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-orange-200/20 to-pink-200/20 rounded-full blur-3xl"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Pricing Information */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-xl border-0 overflow-hidden relative group">
                  {/* Gradient accent border on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" 
                       style={{ padding: '2px' }}>
                    <div className="absolute inset-[2px] bg-white rounded-lg"></div>
                  </div>
                  
                  <CardContent className="p-6 sm:p-8 lg:p-10">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 mr-3 group-hover:from-blue-200 group-hover:to-purple-200 transition-colors duration-300">
                          <Car className="h-6 w-6 text-admin-primary" />
                        </div>
                        Pricing Details
                      </h2>
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-3 py-1 text-xs font-semibold shadow-lg">
                        Transparent Pricing
                      </Badge>
                    </div>

                    {/* Enhanced pricing cards with better gradients and hover effects */}
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                      <motion.div 
                        className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group/card overflow-hidden"
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Animated gradient overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 via-transparent to-indigo-400/20"
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg sm:text-xl font-bold text-blue-900">One-way Trip</h3>
                            <div className="p-2 rounded-lg bg-white/50 backdrop-blur-sm">
                              <MapPin className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-1">
                              ₹{tariffData.oneWayRate.replace(/[₹$]/g, '').replace(/per\s*km/gi, '').replace(/\/km/gi, '').trim()}
                            </div>
                            <div className="text-sm font-semibold text-blue-700">per kilometer</div>
                          </div>
                          <div className="flex items-center p-3 bg-white/60 backdrop-blur-sm rounded-lg">
                            <div className="p-1.5 rounded-full bg-blue-200 mr-2">
                              <CheckCircle className="h-4 w-4 text-blue-700" />
                            </div>
                            <div>
                              <div className="text-xs text-blue-600 font-medium">Minimum Distance</div>
                              <div className="text-sm font-bold text-blue-900">{tariffData.minimumKmOneWay.replace(/km/gi, '').trim()} km</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="relative bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group/card overflow-hidden"
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Animated gradient overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-tr from-green-400/20 via-transparent to-emerald-400/20"
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: 0.5,
                          }}
                        />
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg sm:text-xl font-bold text-green-900">Round Trip</h3>
                            <div className="p-2 rounded-lg bg-white/50 backdrop-blur-sm">
                              <Clock className="h-5 w-5 text-green-600" />
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700 mb-1">
                              ₹{tariffData.roundTripRate.replace(/[₹$]/g, '').replace(/per\s*km/gi, '').replace(/\/km/gi, '').trim()}
                            </div>
                            <div className="text-sm font-semibold text-green-700">per kilometer</div>
                          </div>
                          <div className="flex items-center p-3 bg-white/60 backdrop-blur-sm rounded-lg">
                            <div className="p-1.5 rounded-full bg-green-200 mr-2">
                              <CheckCircle className="h-4 w-4 text-green-700" />
                            </div>
                            <div>
                              <div className="text-xs text-green-600 font-medium">Minimum Distance</div>
                              <div className="text-sm font-bold text-green-900">{tariffData.minimumKmRoundTrip.replace(/km/gi, '').trim()} km</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Enhanced driver allowance section */}
                    <motion.div 
                      className="relative p-6 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group/allowance"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Animated gradient overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-yellow-400/10 via-transparent to-orange-400/10"
                        animate={{
                          opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                      
                      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-200 to-orange-200 mr-4 group-hover/allowance:from-yellow-300 group-hover/allowance:to-orange-300 transition-colors duration-300">
                            <Users className="h-6 w-6 text-yellow-800" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-yellow-700 mb-1">Driver Allowance</div>
                            <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 to-orange-700">
                              ₹{tariffData.driverAllowance.replace(/[₹$]/g, '').trim()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-white/70 backdrop-blur-sm rounded-lg">
                          <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                          <span className="text-sm font-semibold text-yellow-900">per day</span>
                        </div>
                      </div>
                    </motion.div>


                  </CardContent>
                </Card>
              </motion.div>

              {/* Features & Services */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-xl border-0 overflow-hidden relative group bg-white/80 backdrop-blur-sm">
                  {/* Gradient accent on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardContent className="p-8 sm:p-10 relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-200 group-hover:to-emerald-200 transition-colors duration-300">
                        <Shield className="h-7 w-7 text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What's Included</h2>
                        <p className="text-sm text-gray-600">Premium features for your comfort</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        "Professional & Experienced Driver",
                        "Clean & Well-maintained Vehicle",
                        "24/7 Customer Support",
                        "On-time Pickup & Drop",
                        "GPS Tracking for Safety",
                        "Comfortable Seating"
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center p-3 rounded-xl hover:bg-green-50 transition-colors duration-200 group/item"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="p-1.5 rounded-full bg-green-100 mr-3 flex-shrink-0 group-hover/item:bg-green-200 transition-colors">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {tariffData.additionalCharges && tariffData.additionalCharges.length > 0 && (
                      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                          <div className="p-1.5 rounded-lg bg-blue-200 mr-2">
                            <Star className="h-4 w-4 text-blue-700" />
                          </div>
                          Additional Services
                        </h3>
                        <div className="space-y-3">
                          {tariffData.additionalCharges.map((charge, index) => (
                            <motion.div 
                              key={index} 
                              className="flex items-center p-2 rounded-lg hover:bg-white/50 transition-colors"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <div className="p-1 rounded-full bg-blue-100 mr-3 flex-shrink-0">
                                <CheckCircle className="h-4 w-4 text-blue-600" />
                              </div>
                              <span className="text-gray-700 font-medium">{charge}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>


            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="sticky top-8"
              >
                <Card className="shadow-2xl border-0 overflow-hidden relative group/sidebar">
                  {/* Gradient accent on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-500 -z-10" 
                       style={{ padding: '2px' }}>
                    <div className="absolute inset-[2px] bg-white rounded-lg"></div>
                  </div>
                  
                  <CardContent className="p-6 sm:p-8">
                    {/* Enhanced pricing display with gradient backgrounds */}
                    <div className="text-center mb-8 space-y-4">
                      <motion.div 
                        className="p-6 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 rounded-2xl shadow-md"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">One-way Rate</div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-1">
                          ₹{tariffData.oneWayRate.replace(/[₹$]/g, '').replace(/per\s*km/gi, '').replace(/\/km/gi, '').trim()}
                        </div>
                        <div className="text-sm font-medium text-blue-700">per kilometer</div>
                      </motion.div>
                      
                      <motion.div 
                        className="p-6 bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 rounded-2xl shadow-md"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Round Trip Rate</div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700 mb-1">
                          ₹{tariffData.roundTripRate.replace(/[₹$]/g, '').replace(/per\s*km/gi, '').replace(/\/km/gi, '').trim()}
                        </div>
                        <div className="text-sm font-medium text-green-700">per kilometer</div>
                      </motion.div>
                    </div>

                    {/* Enhanced details list with gradient accents */}
                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between items-center py-4 px-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 group/item">
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <Car className="h-4 w-4 mr-2 text-gray-400 group-hover/item:text-admin-primary transition-colors" />
                          Vehicle Type
                        </span>
                        <span className="font-bold text-gray-900">{tariffData.vehicleType}</span>
                      </div>
                      <div className="flex justify-between items-center py-4 px-4 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 transition-all duration-300 group/item">
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <Users className="h-4 w-4 mr-2 text-yellow-500 group-hover/item:text-yellow-600 transition-colors" />
                          Driver Allowance
                        </span>
                        <span className="font-bold text-gray-900">₹{tariffData.driverAllowance.replace(/[₹$]/g, '').trim()}/day</span>
                      </div>
                      <div className="flex justify-between items-center py-4 px-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300 group/item">
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-purple-500 group-hover/item:text-purple-600 transition-colors" />
                          Min Distance
                        </span>
                        <span className="font-bold text-gray-900">{tariffData.minimumKmOneWay.replace(/km/gi, '').trim()} km</span>
                      </div>
                      <div className="flex justify-between items-center py-4 px-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group/item">
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500 group-hover/item:text-green-600 transition-colors" />
                          Availability
                        </span>
                        <span className="font-bold text-green-600 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                          Available
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button
                        onClick={handleBookNow}
                        className="w-full bg-admin-gradient text-white hover:opacity-90 py-3 text-lg font-semibold"
                      >
                        <WhatsAppIcon className="h-5 w-5 mr-2" />
                        Book via WhatsApp
                      </Button>
                      <Button
                        onClick={handleModalBooking}
                        variant="outline"
                        className="w-full border-admin-primary text-admin-primary hover:bg-admin-primary hover:text-white py-3 text-lg font-semibold"
                      >
                        Quick Booking Form
                      </Button>
                      <Button
                        onClick={handleCallNow}
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 text-lg font-semibold"
                      >
                        <Phone className="h-5 w-5 mr-2" />
                        Call for Details
                      </Button>
                    </div>

                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Our travel experts are here to help you plan your perfect trip.
                      </p>
                      <div className="text-sm">
                        <div className="flex items-center mb-1">
                          <Phone className="h-4 w-4 mr-2 text-admin-primary" />
                          <span>{contactInfo?.primaryPhone || '+91 90037 82966'}</span>
                        </div>
                        <div className="flex items-center">
                          <WhatsAppIcon className="h-4 w-4 mr-2 text-green-500" />
                          <span>WhatsApp Support</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefilledService={tariffData.vehicleName}
      />
    </div>
  );
}