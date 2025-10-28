"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Phone, Compass } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import PopularRoutes from "@/components/PopularRoutes";
import { useBanner } from "@/hooks/use-banner";
import { useContact } from "@/hooks/use-contact";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

interface PackageItem {
  id: number;
  title: string;
  description: string;
  image?: string;
  gallery?: string[];
  duration: string;
  price: string;
  featured?: boolean;
  highlights: string[];
  inclusions: string[];
  category: string;
}

interface PackagesPageClientProps {
  packagesData: PackageItem[];
}

export default function PackagesPageClient({ packagesData }: PackagesPageClientProps) {
  const { banner } = useBanner("packages");
  const { contactInfo } = useContact();
  
  const handleBookPackage = (packageTitle: string) => {
    const message = `Hi, I'm interested in the ${packageTitle} package. Please provide more details and availability.`;
    const whatsappNumber = contactInfo?.whatsappNumber || contactInfo?.primaryPhone || '919360290811';
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallNow = () => {
    const phoneNumber = contactInfo?.primaryPhone || '+919360290811';
    window.open(`tel:${phoneNumber}`, "_self")
  }

  const handleWhatsAppCustom = () => {
    const whatsappNumber = contactInfo?.whatsappNumber || contactInfo?.primaryPhone || '919360290811';
    const message = 'Hi, I would like to plan a personalized trip. Please help me create a custom travel package.';
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
                alt={banner?.title || "Tour Packages"}
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
              <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
              Tour Packages
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-relaxed">
              Curated Travel Experiences
              <span className="block text-2xl sm:text-3xl lg:text-4xl mt-2 sm:mt-3 font-normal">
                For Every Explorer
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover handpicked destinations with expertly crafted tour packages. 
              From cultural treasures to scenic wonders, we make every journey memorable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-yellow-50/30 to-orange-50/30">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 px-2">
              Explore Our
              <span className="block text-transparent bg-clip-text bg-admin-gradient">
                Travel Packages
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xs sm:max-w-xl md:max-w-2xl mx-auto px-2">
              Choose from our handpicked destinations and unforgettable experiences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {packagesData.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`h-full hover:shadow-2xl transition-all duration-500 group overflow-hidden border-0 shadow-xl flex flex-col relative ${
                  pkg.featured ? 'ring-2 ring-green-500/50' : ''
                }`}>
                  {/* Gradient border for featured items */}
                  {pkg.featured && (
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg -z-10" 
                         style={{ padding: '2px' }}>
                      <div className="absolute inset-[2px] bg-white rounded-lg"></div>
                    </div>
                  )}
                  
                  <div className="aspect-[3/2] overflow-hidden relative flex-shrink-0">
                    {/* Enhanced image with better overlay */}
                    <img
                      src={pkg.image || `/kodaikanal-hill-station.png`}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Multi-layer overlay for better contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500"></div>
                    
                    {/* Redesigned badge with glassmorphism */}
                    <div className="absolute top-4 left-4">
                      <Badge className={`${
                        pkg.featured 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg shadow-green-500/30' 
                          : 'bg-white/20 text-white border-white/30'
                      } backdrop-blur-md px-3 py-1.5 font-semibold text-xs sm:text-sm`}>
                        {pkg.featured ? '⭐ Bestseller' : pkg.category}
                      </Badge>
                    </div>
                    
                    {/* Duration badge - glassmorphic design */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-md px-3 py-1.5 font-medium text-xs sm:text-sm">
                        <Clock className="h-3 w-3 mr-1.5" />
                        {pkg.duration}
                      </Badge>
                    </div>
                    
                    {/* Category badge at bottom */}
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-md px-3 py-1.5 font-medium text-xs sm:text-sm">
                        <MapPin className="h-3 w-3 mr-1.5" />
                        {pkg.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow bg-white group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-orange-50/30 transition-all duration-500">
                    <div className="mb-4">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-admin-gradient transition-all duration-300 line-clamp-2">
                        {pkg.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Enhanced Price Display */}
                    <div className="mb-5 p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-100/50 group-hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-admin-gradient">
                            {pkg.price}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500 font-medium">per person</div>
                        </div>
                        {pkg.featured && (
                          <div className="flex items-center gap-1 text-green-600">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-xs font-semibold">Popular</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Highlights with improved badges */}
                    <div className="mb-5">
                      <h4 className="font-bold text-gray-900 mb-3 text-sm sm:text-base flex items-center">
                        <span className="w-1 h-4 bg-admin-gradient rounded-full mr-2"></span>
                        Top Highlights
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-orange-200 text-gray-700 hover:bg-orange-50 transition-colors duration-200">
                            {highlight}
                          </Badge>
                        ))}
                        {pkg.highlights.length > 3 && (
                          <Badge variant="outline" className="text-xs border-orange-300 bg-orange-50 text-orange-700 font-semibold">
                            +{pkg.highlights.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Inclusions with better styling */}
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 mb-3 text-sm sm:text-base flex items-center">
                        <span className="w-1 h-4 bg-admin-gradient rounded-full mr-2"></span>
                        Package Includes
                      </h4>
                      <div className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {pkg.inclusions.join(' • ')}
                      </div>
                    </div>

                    {/* Enhanced CTA Buttons */}
                    <div className="mt-auto space-y-3">
                      <Button
                        onClick={() => handleBookPackage(pkg.title)}
                        className="w-full bg-admin-gradient text-white hover:shadow-xl hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm sm:text-base h-11 sm:h-12 font-semibold"
                      >
                        <span className="hidden sm:inline">Book This Package</span>
                        <span className="sm:hidden">Book Now</span>
                      </Button>
                      <Link
                        href={`/packages/${pkg.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`}
                        className="block text-center text-admin-primary hover:text-white bg-white hover:bg-admin-gradient border-2 border-orange-200 hover:border-transparent rounded-md transition-all duration-300 font-semibold text-sm sm:text-base py-2.5 sm:py-3 group/link"
                      >
                        <span className="hidden sm:inline">View Full Details</span>
                        <span className="sm:hidden">Details</span>
                        <span className="inline-block ml-1 group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <PopularRoutes showAll={true} />

      {/* Custom Package CTA Section - Redesigned with Dark Background */}
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
                <Compass className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            <Badge className="mb-4 sm:mb-6 bg-white/10 text-white border-white/20 backdrop-blur-md px-4 sm:px-6 py-2 text-xs sm:text-sm shadow-lg">
              Want a Personalized Trip?
            </Badge>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              Create Your Dream Journey
              <span className="block text-transparent bg-clip-text bg-admin-gradient mt-2">
                Tailored Just For You
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Let us create a custom travel experience tailored to your interests, budget, and schedule. 
              Your perfect adventure awaits!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button
                  onClick={handleWhatsAppCustom}
                  size="lg"
                  className="w-full sm:w-auto bg-admin-gradient text-white hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg"
                >
                  <WhatsAppIcon className="mr-2 h-5 w-5" />
                  Plan via WhatsApp
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
    </>
  );
}