"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Phone, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import BookingModal from "@/components/BookingModal";
import PopularRoutes from "@/components/PopularRoutes";
import { useBanner } from "@/hooks/use-banner";

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
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
              <Car className="h-4 w-4 mr-2" />
              Travel Tariff & Pricing
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transparent Pricing
              <span className="block text-2xl sm:text-3xl lg:text-4xl mt-2 font-normal">
                For All Your Travel Needs
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover our competitive rates for all travel services. 
              No hidden charges, just honest pricing for quality service.
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

      {/* Custom Tariff Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need a Custom Quote?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Let us create personalized pricing based on your specific travel requirements and route
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.open('tel:+919003782966', '_blank')}
              className="bg-admin-gradient text-white hover:opacity-90"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call for Custom Quote
            </Button>
            <Button
              onClick={() => window.open('https://wa.me/919003782966?text=Hi, I would like to get a custom quote for travel services. Please help me with personalized pricing for my route.', '_blank')}
              variant="outline"
              className="border-admin-primary text-admin-primary hover:bg-admin-gradient hover:text-white"
            >
              WhatsApp Us
            </Button>
          </div>
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