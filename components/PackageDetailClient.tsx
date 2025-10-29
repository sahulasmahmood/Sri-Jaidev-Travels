"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle, 
  X, 
  Calendar,
  Phone,
  Star,
  Camera,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { useState } from "react";
import { useContact } from "@/hooks/use-contact";
import BookingModal from "@/components/BookingModal";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface PackageData {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  gallery?: string[];
  duration: string;
  price: string;
  featured?: boolean;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: Array<{
    time: string;
    activity: string;
  }>;
  category: string;
}

interface PackageDetailClientProps {
  packageData: PackageData;
}

export default function PackageDetailClient({ packageData }: PackageDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { contactInfo } = useContact();

  const handleModalBooking = () => {
    setIsModalOpen(true);
  };

  const handleBookPackage = () => {
    const message = `🏖️ *Package Booking Request*

*Package:* ${packageData.title}
*Duration:* ${packageData.duration}
*Price:* ${packageData.price}

I'm interested in booking this package. Please provide:
- Available dates
- Final pricing
- Booking process

Thank you!`;

    const whatsappNumber = contactInfo?.whatsappNumber || contactInfo?.primaryPhone || '919360290811';
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallNow = () => {
    const phoneNumber = contactInfo?.primaryPhone || '+919360290811';
    window.open(`tel:${phoneNumber}`, '_self');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 sm:py-20 lg:py-28 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
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
            className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
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
              href="/packages"
              className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm mr-2 group-hover:bg-white/20 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </div>
              <span className="font-medium">Back to Packages</span>
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 items-center">
              <div className="lg:pr-8">
                <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-md px-5 py-2.5 text-sm shadow-lg inline-flex items-center gap-2">
                  <div className="p-1 rounded-full bg-white/20">
                    <MapPin className="h-4 w-4" />
                  </div>
                  {packageData.category} Package
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight break-words">
                  {packageData.title}
                  {packageData.featured && (
                    <span className="block text-2xl sm:text-3xl mt-3 text-yellow-400 flex items-center gap-2">
                      <Star className="h-6 w-6 fill-current" />
                      Featured Package
                    </span>
                  )}
                </h1>
                
                <p className="text-lg sm:text-xl text-white/80 mb-10 leading-relaxed">
                  {packageData.description}
                </p>
                
                {/* Info badges */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <motion.div 
                    className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-blue-400" />
                      <span className="text-xs text-white/70 font-medium uppercase tracking-wide">Duration</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      {packageData.duration}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="text-xs text-white/70 font-medium uppercase tracking-wide">Rating</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      4.8/5
                    </div>
                  </motion.div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleBookPackage}
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
                    src={packageData.image || "/kodaikanal-hill-station.png"}
                    alt={packageData.title}
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
                          <div className="text-sm font-semibold text-gray-900">Premium Experience</div>
                          <div className="text-xs text-gray-600">Trusted by 5000+ travelers</div>
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

      {/* Gallery Section */}
      {packageData.gallery && packageData.gallery.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-16 h-16 bg-admin-gradient rounded-2xl mb-6 shadow-lg"
              >
                <Camera className="h-8 w-8 text-white" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Package Gallery
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore the beautiful destinations and experiences included in this package
              </p>
            </motion.div>
            
            <motion.div 
              className={`grid gap-6 ${
                packageData.gallery.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
                packageData.gallery.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto' :
                packageData.gallery.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto' :
                'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              }`}
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              {packageData.gallery.filter(image => image && image.trim() !== '').map((image, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer"
                  whileHover={{ y: -8 }}
                >
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-2xl transition-all duration-300"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Package Details */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-48 h-48 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
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
            className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"
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
              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-xl border-0 overflow-hidden relative group">
                  {/* Gradient accent border on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" 
                       style={{ padding: '2px' }}>
                    <div className="absolute inset-[2px] bg-white rounded-lg"></div>
                  </div>
                  
                  <CardContent className="p-6 sm:p-8 lg:p-10">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 mr-3 group-hover:from-purple-200 group-hover:to-pink-200 transition-colors duration-300">
                          <Star className="h-6 w-6 text-admin-primary" />
                        </div>
                        Package Highlights
                      </h2>
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-3 py-1 text-xs font-semibold shadow-lg">
                        Premium Features
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {packageData.highlights.map((highlight, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center p-3 rounded-xl hover:bg-purple-50 transition-colors duration-200 group/item"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="p-1.5 rounded-full bg-purple-100 mr-3 flex-shrink-0 group-hover/item:bg-purple-200 transition-colors">
                            <CheckCircle className="h-5 w-5 text-purple-600" />
                          </div>
                          <span className="text-gray-700 font-medium">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Itinerary */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-xl border-0 overflow-hidden relative group bg-white/80 backdrop-blur-sm">
                  {/* Gradient accent on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardContent className="p-8 sm:p-10 relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 group-hover:from-blue-200 group-hover:to-cyan-200 transition-colors duration-300">
                        <Calendar className="h-7 w-7 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Travel Places</h2>
                        <p className="text-sm text-gray-600">Explore amazing destinations</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {packageData.itinerary.map((item, index) => (
                        <motion.div
                          key={index}
                          className="relative bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group/item"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.01, x: 4 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white font-bold text-lg shadow-lg group-hover/item:scale-110 transition-transform duration-300 flex-shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-bold text-blue-900 mb-2 text-lg">
                                {item.time}
                              </div>
                              <div className="text-gray-700 leading-relaxed">{item.activity}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Inclusions & Exclusions */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Inclusions */}
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
                      }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg sm:text-xl font-bold text-green-900">What's Included</h3>
                        <div className="p-2 rounded-lg bg-white/50 backdrop-blur-sm">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        {packageData.inclusions.map((inclusion, index) => (
                          <motion.div 
                            key={index} 
                            className="flex items-center p-2 rounded-lg hover:bg-white/50 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <div className="p-1 rounded-full bg-green-200 mr-3 flex-shrink-0">
                              <CheckCircle className="h-4 w-4 text-green-700" />
                            </div>
                            <span className="text-gray-700 font-medium">{inclusion}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Exclusions */}
                  <motion.div 
                    className="relative bg-gradient-to-br from-red-50 via-red-100 to-rose-100 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group/card overflow-hidden"
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-red-400/20 via-transparent to-rose-400/20"
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
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg sm:text-xl font-bold text-red-900">Not Included</h3>
                        <div className="p-2 rounded-lg bg-white/50 backdrop-blur-sm">
                          <X className="h-5 w-5 text-red-600" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        {packageData.exclusions.map((exclusion, index) => (
                          <motion.div 
                            key={index} 
                            className="flex items-center p-2 rounded-lg hover:bg-white/50 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <div className="p-1 rounded-full bg-red-200 mr-3 flex-shrink-0">
                              <X className="h-4 w-4 text-red-700" />
                            </div>
                            <span className="text-gray-700 font-medium">{exclusion}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
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
                  <div className="absolute inset-0 bg-admin-gradient opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-500 -z-10" 
                       style={{ padding: '2px' }}>
                    <div className="absolute inset-[2px] bg-white rounded-lg"></div>
                  </div>
                  
                  <CardContent className="p-6 sm:p-8">
                    {/* Enhanced pricing display with gradient backgrounds */}
                    <div className="text-center mb-8">
                      <motion.div 
                        className="p-6 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 rounded-2xl shadow-md"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-xs font-semibold text-admin-primary uppercase tracking-wide mb-2">Package Price</div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-admin-gradient mb-1">
                          {packageData.price}
                        </div>
                        <div className="text-sm font-medium text-admin-primary">per person</div>
                      </motion.div>
                    </div>

                    {/* Enhanced details list with gradient accents */}
                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between items-center py-4 px-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 group/item">
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-400 group-hover/item:text-admin-primary transition-colors" />
                          Duration
                        </span>
                        <span className="font-bold text-gray-900">{packageData.duration}</span>
                      </div>
                      <div className="flex justify-between items-center py-4 px-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 group/item">
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400 group-hover/item:text-admin-primary transition-colors" />
                          Category
                        </span>
                        <span className="font-bold text-gray-900">{packageData.category}</span>
                      </div>
                      <div className="flex justify-between items-center py-4 px-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 group/item">
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-400 group-hover/item:text-admin-primary transition-colors" />
                          Group Size
                        </span>
                        <span className="font-bold text-gray-900">Any Size</span>
                      </div>
                      <div className="flex justify-between items-center py-4 px-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group/item">
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Booking
                        </span>
                        <span className="font-bold text-green-600 flex items-center">
                          <span className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
                          Available
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button
                        onClick={handleBookPackage}
                        className="w-full bg-admin-gradient text-white hover:opacity-90 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <WhatsAppIcon className="h-5 w-5 mr-2" />
                        Book via WhatsApp
                      </Button>
                      <Button
                        onClick={handleModalBooking}
                        variant="outline"
                        className="w-full border-2 border-admin-primary text-admin-primary hover:bg-admin-primary hover:text-white py-6 text-lg font-semibold transition-all duration-300"
                      >
                        Quick Booking Form
                      </Button>
                      <Button
                        onClick={handleCallNow}
                        variant="outline"
                        className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-6 text-lg font-semibold transition-all duration-300"
                      >
                        <Phone className="h-5 w-5 mr-2" />
                        Call for Details
                      </Button>
                    </div>

                    <motion.div 
                      className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-admin-gradient rounded-lg flex items-center justify-center mr-3">
                          <Phone className="h-4 w-4 text-white" />
                        </div>
                        <h4 className="font-bold text-gray-900">Need Help?</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        Our travel experts are here to help you plan your perfect trip.
                      </p>
                      <div className="space-y-2.5">
                        <div className="flex items-center text-sm bg-white p-3 rounded-lg shadow-sm">
                          <Phone className="h-4 w-4 mr-2.5 text-admin-primary flex-shrink-0" />
                          <span className="font-medium text-gray-900">{contactInfo?.primaryPhone || '+91 98765 43210'}</span>
                        </div>
                        <div className="flex items-center text-sm bg-white p-3 rounded-lg shadow-sm">
                          <WhatsAppIcon className="h-4 w-4 mr-2.5 text-green-500 flex-shrink-0" />
                          <span className="font-medium text-gray-900">WhatsApp Support</span>
                        </div>
                      </div>
                    </motion.div>
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
        prefilledService={packageData.title}
      />
    </div>
  );
}