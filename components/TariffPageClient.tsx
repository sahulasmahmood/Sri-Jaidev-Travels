"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Phone, CheckCircle, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import BookingModal from "@/components/BookingModal";
import PopularRoutes from "@/components/PopularRoutes";
import { useBanner } from "@/hooks/use-banner";
import { useContact } from "@/hooks/use-contact";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

interface TariffItem {
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

interface TariffPageClientProps {
  tariffData: TariffItem[];
}

export default function TariffPageClient({ tariffData }: TariffPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const handleBookNow = (vehicleName: string) => {
    setSelectedService(vehicleName);
    setIsModalOpen(true);
  };

  // Utility functions to clean display values
  const formatCurrency = (value: string) => {
    if (!value) return "0";
    // Remove existing currency symbols and "per km" text
    const cleaned = value.replace(/[₹$]/g, '').replace(/per\s*km/gi, '').replace(/\/km/gi, '').trim();
    return cleaned;
  };

  const formatDistance = (value: string) => {
    if (!value) return "0";
    // Remove existing "km" text
    const cleaned = value.replace(/km/gi, '').trim();
    return cleaned;
  };

  const formatDriverAllowance = (value: string) => {
    if (!value) return "0";
    // Remove existing currency symbols
    const cleaned = value.replace(/[₹$]/g, '').trim();
    return cleaned;
  };

  const { banner } = useBanner("tariff")
  const { contactInfo } = useContact()

  const handleCallNow = () => {
    const phoneNumber = contactInfo?.primaryPhone || '+919360290811';
    window.open(`tel:${phoneNumber}`, "_self")
  }

  const handleWhatsApp = () => {
    const whatsappNumber = contactInfo?.whatsappNumber || contactInfo?.primaryPhone || '919360290811';
    const message = 'Hi, I would like to get a custom quote for travel services. Please help me with personalized pricing for my route.';
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  return (
    <>
      {/* Hero Section with Dynamic Banner */}
  <section className="relative bg-admin-gradient text-white py-16 sm:py-20 lg:py-24 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            {/* Image Layer */}
            <div className="absolute inset-0 opacity-100 transition-opacity duration-700">
              <img
                src={banner?.status === "active" && banner?.image ? banner.image : '/placeholder.jpg'}
                alt={banner?.title || "Luxury Taxi Service"}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Dark Overlay Layer */}
            <div className="absolute inset-0 bg-black/50" />
            
            {/* Gradient Overlay Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-transparent" />
            
            {/* Admin Gradient Layer */}
            <div className="absolute inset-0 bg-admin-gradient/20" />
            
            {/* Animated Gradient Layers */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-yellow-600/20 via-transparent to-orange-600/20"
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute inset-0 bg-gradient-to-bl from-orange-500/20 via-transparent to-yellow-500/20"
              animate={{
                opacity: [0.7, 0.3, 0.7],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-0 px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <Car className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
              Travel Tariff & Pricing
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-relaxed">
              Affordable Rates
              <span className="block text-2xl sm:text-3xl lg:text-4xl mt-2 sm:mt-3 font-normal">
                For Every Destination
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Explore our competitive pricing for premium travel services. 
              Clear rates, no surprises, just quality service you can trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tariff Grid */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-yellow-50/30 to-orange-50/30">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 px-2">
              Our Service
              <span className="block text-transparent bg-clip-text bg-admin-gradient">
                Tariff
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xs sm:max-w-xl md:max-w-2xl mx-auto px-2">
              Choose from our range of travel services with transparent pricing
            </p>
          </div>

          {tariffData.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No tariff services available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {tariffData.map((tariff, index) => (
                <motion.div
                  key={tariff.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.25, 0.4, 0.25, 1]
                  }}
                  className="h-full"
                >
                  <Card className={`h-full transition-all duration-500 border-0 shadow-xl overflow-hidden group flex flex-col relative ${
                    tariff.featured 
                      ? 'hover:shadow-2xl hover:shadow-yellow-500/20' 
                      : 'hover:shadow-2xl hover:shadow-orange-500/10'
                  }`}>
                    {/* Gradient border for featured items */}
                    {tariff.featured && (
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" 
                           style={{ padding: '2px' }}>
                        <div className="absolute inset-[2px] bg-white rounded-lg"></div>
                      </div>
                    )}
                    
                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                      tariff.featured 
                        ? 'bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-yellow-600/5' 
                        : 'bg-gradient-to-br from-orange-500/5 via-yellow-500/5 to-orange-600/5'
                    }`}></div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex flex-col"
                    >
                      <div className="relative h-48 sm:h-52 overflow-hidden flex-shrink-0">
                        <motion.img
                          src={tariff.image || '/toyota-innova-crysta-luxury-taxi.png'}
                          alt={tariff.vehicleName}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                        
                        {/* Enhanced multi-layer overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        
                        {/* Badges with enhanced glassmorphism */}
                        <div className="absolute top-3 left-3">
                          <Badge className={`${
                            tariff.featured 
                              ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 shadow-lg shadow-yellow-500/50' 
                              : 'bg-admin-gradient text-white shadow-lg'
                          } backdrop-blur-md border-white/20 px-2.5 py-1 text-xs font-semibold`}>
                            {tariff.featured ? '⭐ Featured' : tariff.vehicleType}
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white/30 text-white border-white/40 backdrop-blur-md shadow-lg px-2.5 py-1 text-xs font-semibold">
                            ₹{formatCurrency(tariff.oneWayRate)}/km
                          </Badge>
                        </div>

                        {/* Bottom gradient overlay for better text contrast */}
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent"></div>
                      </div>
                      
                      <CardContent className="p-5 flex flex-col flex-grow relative">
                        <div className="text-center mb-5">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="p-1.5 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 group-hover:from-orange-200 group-hover:to-yellow-200 transition-colors duration-300">
                              <Car className="h-4 w-4 text-admin-primary flex-shrink-0" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-admin-gradient transition-all duration-300 line-clamp-1">
                              {tariff.vehicleName}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                            {tariff.description}
                          </p>
                        </div>

                        {/* Enhanced pricing display with gradient backgrounds */}
                        <div className="grid grid-cols-2 gap-3 mb-5">
                          <div className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300 shadow-sm">
                            <div className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                              ₹{formatCurrency(tariff.oneWayRate)}
                            </div>
                            <div className="text-xs font-semibold text-blue-700">per km</div>
                            <div className="text-xs text-blue-600 mt-0.5">One Way</div>
                            <div className="text-xs text-blue-500">Min: {formatDistance(tariff.minimumKmOneWay)} km</div>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-gradient-to-br from-green-50 to-green-100 group-hover:from-green-100 group-hover:to-green-200 transition-all duration-300 shadow-sm">
                            <div className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">
                              ₹{formatCurrency(tariff.roundTripRate)}
                            </div>
                            <div className="text-xs font-semibold text-green-700">per km</div>
                            <div className="text-xs text-green-600 mt-0.5">Round Trip</div>
                            <div className="text-xs text-green-500">Min: {formatDistance(tariff.minimumKmRoundTrip)} km</div>
                          </div>
                        </div>

                        {/* Enhanced features list */}
                        <div className="space-y-2 mb-5">
                          <div className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <div className="p-1 rounded-full bg-green-100">
                              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            </div>
                            <span className="text-sm text-gray-700 font-medium">Driver: ₹{formatDriverAllowance(tariff.driverAllowance)}</span>
                          </div>
                          <div className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <div className="p-1 rounded-full bg-green-100">
                              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            </div>
                            <span className="text-sm text-gray-700 font-medium">Professional Driver</span>
                          </div>
                          <div className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <div className="p-1 rounded-full bg-green-100">
                              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            </div>
                            <span className="text-sm text-gray-700 font-medium">Clean & Comfortable</span>
                          </div>
                          {tariff.additionalCharges && tariff.additionalCharges.length > 0 && (
                            <div className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                              <div className="p-1 rounded-full bg-green-100">
                                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                              </div>
                              <span className="text-sm text-gray-700 font-medium line-clamp-1">{tariff.additionalCharges[0]}</span>
                            </div>
                          )}
                        </div>

                        {/* Enhanced CTA buttons matching packages style */}
                        <div className="mt-auto space-y-3">
                          <Button
                            onClick={() => handleBookNow(tariff.vehicleName)}
                            className="w-full bg-admin-gradient text-white hover:shadow-xl hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm sm:text-base h-11 sm:h-12 font-semibold"
                          >
                            Book Now
                          </Button>
                          <Link
                            href={`/tariff/${tariff.slug}`}
                            className="block text-center text-admin-primary hover:text-white bg-white hover:bg-admin-gradient border-2 border-orange-200 hover:border-transparent rounded-md transition-all duration-300 font-semibold text-sm sm:text-base py-2.5 sm:py-3 group/link"
                          >
                            <span>View Full Details</span>
                            <span className="inline-block ml-1 group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                          </Link>
                        </div>
                      </CardContent>
                    </motion.div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Popular Routes Section */}
      <PopularRoutes showAll={true} />

      {/* Custom Quote CTA Section - Redesigned with Dark Background */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-admin-gradient rounded-2xl mb-4 shadow-2xl">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            <Badge className="mb-4 sm:mb-6 bg-white/10 text-white border-white/20 backdrop-blur-md px-4 sm:px-6 py-2 text-xs sm:text-sm shadow-lg">
              Need a Custom Quote?
            </Badge>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              Get Personalized Pricing
              <span className="block text-transparent bg-clip-text bg-admin-gradient mt-2">
                For Your Journey
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Let us create personalized pricing based on your specific travel requirements and route. 
              Contact us today for a custom quote tailored to your needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button
                  onClick={handleWhatsApp}
                  size="lg"
                  className="w-full sm:w-auto bg-admin-gradient text-white hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg"
                >
                  <WhatsAppIcon className="mr-2 h-5 w-5" />
                  WhatsApp for Quote
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button
                  onClick={handleCallNow}
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-white/5 backdrop-blur-md transition-all duration-300 rounded-lg"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefilledService={selectedService}
      />
    </>
  );
}