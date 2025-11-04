"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Car } from "lucide-react";
import Link from "next/link";
import { useContact } from "@/hooks/use-contact";

interface PopularRoute {
  _id: string;
  name: string;
  isActive: boolean;
  isPopularRoute: boolean;
  order: number;
}

interface PopularRoutesProps {
  showAll?: boolean;
  limit?: number;
}

export default function PopularRoutes({ showAll = false, limit = 12 }: PopularRoutesProps) {
  const { contactInfo } = useContact();
  const [popularRoutes, setPopularRoutes] = useState<PopularRoute[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback routes if API fails
  const fallbackRoutes = [
    'Chennai',
    'Madurai', 
    'Coimbatore',
    'Kodaikanal',
    'Ooty',
    'Bangalore',
    'Kerala',
    'Salem',
    'Trichy',
    'Thanjavur',
    'Rameswaram',
    'Kanyakumari'
  ];

  // Fetch popular routes from API
  useEffect(() => {
    const fetchPopularRoutes = async () => {
      try {
        const response = await fetch('/api/admin/locations');
        const result = await response.json();
        
        if (result.success) {
          // Filter only popular routes and sort by order
          const routes = result.data
            .filter((location: PopularRoute) => location.isActive && location.isPopularRoute)
            .map((location: PopularRoute) => ({
              ...location,
              name: location.name.replace(/\s*drop\s*taxi/gi, '').trim()
            }))
            .sort((a: PopularRoute, b: PopularRoute) => a.order - b.order);
          setPopularRoutes(routes);
        }
      } catch (error) {
        console.error('Error fetching popular routes:', error);
        // Use fallback routes
        const fallbackData = fallbackRoutes.map((route, index) => ({
          _id: `fallback-${index}`,
          name: route,
          isActive: true,
          isPopularRoute: true,
          order: index
        }));
        setPopularRoutes(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularRoutes();
  }, []);

  // Use fallback if no routes found
  const routesToDisplay = popularRoutes.length > 0 
    ? popularRoutes 
    : fallbackRoutes.map((route, index) => ({
        _id: `fallback-${index}`,
        name: route,
        isActive: true,
        isPopularRoute: true,
        order: index
      }));

  const displayRoutes = showAll ? routesToDisplay : routesToDisplay.slice(0, limit);

  const handleBookRoute = (routeName: string) => {
    const message = `Hi, I'd like to book ${routeName}. Please provide availability and confirm the fare.`;
    const whatsappNumber = contactInfo?.whatsappNumber || contactInfo?.primaryPhone || '919360290811';
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 sm:mb-6 inline-flex items-center gap-2 bg-white/20 text-gray-900 border border-gray-200/50 backdrop-blur-md px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm shadow-lg hover:bg-white/30 hover:scale-105 transition-all duration-300">
            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="font-semibold">Popular Routes</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Most Traveled
            <span className="block text-transparent bg-clip-text bg-admin-gradient mt-2">Destinations</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Book taxi services to popular destinations with professional drivers
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-admin-primary border-t-transparent"></div>
              <p className="text-gray-500 text-sm animate-pulse">Loading routes...</p>
            </div>
          </div>
        ) : (
          <div className={`grid gap-4 sm:gap-5 md:gap-6 justify-center ${
            displayRoutes.length <= 2 
              ? 'grid-cols-2 max-w-2xl mx-auto' 
              : displayRoutes.length <= 4
              ? 'grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto'
              : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          }`}>
            {displayRoutes.map((route, index) => (
              <motion.div
                key={route._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => handleBookRoute(route.name)}
                  className="w-full h-full min-h-[80px] p-3 sm:p-4 bg-white border border-gray-100 hover:border-transparent shadow-md hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden group relative"
                >
                  {/* Animated gradient border on hover */}
                  <div className="absolute inset-0 bg-admin-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <div className="absolute inset-[2px] bg-white rounded-2xl"></div>
                  
                  {/* Content - Vertical on mobile, horizontal on larger screens */}
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-2 w-full h-full">
                    {/* Icon with animated background */}
                    <motion.div 
                      className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-admin-primary group-hover:to-admin-secondary rounded-xl flex items-center justify-center transition-all duration-500 shadow-sm group-hover:shadow-lg relative overflow-hidden"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/50 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-admin-primary group-hover:text-white transition-colors duration-500 relative z-10" />
                    </motion.div>
                    
                    {/* Text content */}
                    <div className="flex-1 text-center md:text-left min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-admin-gradient transition-all duration-500 line-clamp-2 leading-tight">
                        {route.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300 mt-0.5">
                        Drop Taxi
                      </p>
                    </div>
                    
                    {/* Arrow icon - hidden on mobile, visible on larger screens */}
                    <ArrowRight className="hidden md:block flex-shrink-0 h-4 w-4 text-gray-400 group-hover:text-admin-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-admin-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"></div>
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {!showAll && routesToDisplay.length > limit && (
          <motion.div
            className="text-center mt-10 sm:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link href="/tariff">
              <Button className="bg-admin-gradient text-white hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105 transition-all duration-300 px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold rounded-lg group">
                View All Routes
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}