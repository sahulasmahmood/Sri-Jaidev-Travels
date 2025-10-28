"use client"

import { Suspense, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Clock, Users, Star, Phone, Car, Plane, Shield, Award, Heart } from "lucide-react"
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon"
import QuickBookForm from "@/components/QuickBookForm"
import PopularRoutes from "@/components/PopularRoutes"
import { useBanner } from "@/hooks/use-banner"
import { useTariff } from "@/hooks/use-tariff"
import { usePackages } from "@/hooks/use-packages"
import { useContact } from "@/hooks/use-contact"
import { Testimonials } from "./Testimonial"

export default function CompleteHome() {
  const { banner, isLoading } = useBanner("home") // dynamic hero banner for Home
  const { tariffData } = useTariff() // dynamic tariff services
  const { packagesData } = usePackages() // dynamic packages
  const { contactInfo } = useContact() // dynamic contact information
  const [testimonials, setTestimonials] = useState([])
  const [testimonialsLoading, setTestimonialsLoading] = useState(true)

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setTestimonialsLoading(true)
        const response = await fetch('/api/admin/testimonial?status=published')
        const result = await response.json()

        if (result.success) {
          setTestimonials(result.data)
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setTestimonialsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const handleBookNow = (serviceTitle?: string) => {
    // For homepage, scroll to the quick book form
    const formElement = document.getElementById("quick-book-form")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  const handleBookPackage = (packageTitle: string) => {
    const message = `Hi, I'm interested in the ${packageTitle} package. Please provide more details and availability.`;
    const whatsappNumber = contactInfo?.whatsappNumber || contactInfo?.primaryPhone || '919360290811';
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  const handleCallNow = () => {
    const phoneNumber = contactInfo?.primaryPhone || '+919360290811';
    window.open(`tel:${phoneNumber}`, "_self")
  }

  // Update service cards rendering
  const renderServices = () => {
    if (!tariffData?.length) {
      return <div className="text-center">No services available</div>
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        {tariffData.slice(0, 6).map((service, index) => (
          <motion.div
            key={service._id || `service-${index}`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
          >
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-xl bg-white hover:scale-[1.03] h-full relative overflow-hidden hover:-translate-y-2">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-400/20 blur-xl" />
              </div>

              <CardContent className="p-0 h-full flex flex-col relative z-10">
                <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden rounded-t-lg">
                  {/* Image with enhanced hover effect */}
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.vehicleName}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  {/* Enhanced multi-layer overlay for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500" />

                  {/* Enhanced glassmorphic price badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/10 text-white border border-white/30 backdrop-blur-md shadow-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 px-3 py-1.5 text-xs sm:text-sm font-semibold">
                      ₹{service.oneWayRate ? service.oneWayRate.replace(/[₹$]/g, '').replace(/per\s*km/gi, '').replace(/\/km/gi, '').trim() : 'N/A'}+
                    </Badge>
                  </div>

                  {/* Enhanced featured badge with glassmorphism */}
                  {service.featured && (
                    <motion.div
                      className="absolute top-4 left-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg backdrop-blur-sm px-3 py-1.5 text-xs sm:text-sm font-semibold hover:scale-110 transition-transform duration-300">
                        <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 inline fill-current" />
                        Featured
                      </Badge>
                    </motion.div>
                  )}
                </div>

                <div className="p-5 sm:p-6 md:p-7 lg:p-8 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-admin-gradient transition-all duration-300">
                    {service.vehicleName}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 md:mb-6 line-clamp-2 flex-grow leading-relaxed">
                    {service.description}
                  </p>

                  {/* Enhanced button layout with better spacing */}
                  <div className="flex items-center justify-between gap-3 mt-auto">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1"
                    >
                      <Button
                        onClick={() => handleBookNow(service.vehicleName)}
                        className="w-full bg-admin-gradient text-white hover:opacity-90 hover:shadow-lg hover:shadow-orange-500/30 text-sm sm:text-base py-2.5 sm:py-3 font-semibold transition-all duration-300 rounded-lg group/btn"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="h-4 w-4 ml-1.5 inline group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </motion.div>
                    <Link
                      href="/tariff"
                      className="text-admin-primary hover:text-admin-secondary transition-colors font-semibold text-xs sm:text-sm flex items-center gap-1 hover:gap-2 transition-all duration-300 whitespace-nowrap"
                    >
                      <span>Details</span>
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    )
  }

  // Update packages rendering
  const renderPackages = () => {
    if (!packagesData?.length) {
      return <div className="text-center">No packages available</div>
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        {packagesData.slice(0, 6).map((pkg, index) => (
          <motion.div
            key={pkg._id || `package-${index}`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
          >
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-xl bg-white hover:scale-[1.03] h-full relative overflow-hidden hover:-translate-y-2">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-400/20 blur-xl" />
              </div>

              <CardContent className="p-0 h-full flex flex-col relative z-10">
                <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden rounded-t-lg">
                  {/* Image with enhanced hover effect */}
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <Image
                      src={pkg.image || "/placeholder.svg"}
                      alt={pkg.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  {/* Enhanced multi-layer overlay for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500" />

                  {/* Enhanced glassmorphic duration badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/10 text-white border border-white/30 backdrop-blur-md shadow-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 px-3 py-1.5 text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                      <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      {pkg.duration}
                    </Badge>
                  </div>

                  {/* Enhanced featured badge with gradient and animation */}
                  {pkg.featured && (
                    <motion.div
                      className="absolute top-4 left-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg backdrop-blur-sm px-3 py-1.5 text-xs sm:text-sm font-semibold hover:scale-110 transition-transform duration-300 flex items-center gap-1.5">
                        <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" />
                        Bestseller
                      </Badge>
                    </motion.div>
                  )}
                </div>

                <div className="p-5 sm:p-6 md:p-7 lg:p-8 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-admin-gradient transition-all duration-300">
                    {pkg.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 md:mb-6 line-clamp-2 flex-grow leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Price and rating section with better spacing */}
                  <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-admin-primary">
                      {pkg.price}
                    </span>
                    <div className="flex items-center gap-0.5 text-yellow-500">
                      <Star className="h-4 w-4 sm:h-4.5 sm:w-4.5 fill-current drop-shadow-sm" />
                      <Star className="h-4 w-4 sm:h-4.5 sm:w-4.5 fill-current drop-shadow-sm" />
                      <Star className="h-4 w-4 sm:h-4.5 sm:w-4.5 fill-current drop-shadow-sm" />
                      <Star className="h-4 w-4 sm:h-4.5 sm:w-4.5 fill-current drop-shadow-sm" />
                      <Star className="h-4 w-4 sm:h-4.5 sm:w-4.5 fill-current drop-shadow-sm" />
                    </div>
                  </div>

                  {/* Enhanced button layout with better spacing */}
                  <div className="flex items-center justify-between gap-3 mt-auto">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1"
                    >
                      <Button
                        onClick={() => handleBookPackage(pkg.title)}
                        className="w-full bg-admin-gradient text-white hover:opacity-90 hover:shadow-lg hover:shadow-orange-500/30 text-sm sm:text-base py-2.5 sm:py-3 font-semibold transition-all duration-300 rounded-lg group/btn"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="h-4 w-4 ml-1.5 inline group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </motion.div>
                    <Link
                      href={pkg.slug ? `/packages/${pkg.slug}` : "/packages"}
                      className="text-admin-primary hover:text-admin-secondary transition-colors font-semibold text-xs sm:text-sm flex items-center gap-1 hover:gap-2 transition-all duration-300 whitespace-nowrap"
                    >
                      <span>Details</span>
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    )
  }

  // Update testimonials rendering
  const renderTestimonials = () => {
    if (testimonialsLoading) {
      return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
            <motion.div
              className="text-center mb-12 sm:mb-16 md:mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
                Client Reviews
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 px-2">
                What Our Customers
                <span className="block text-transparent bg-clip-text bg-admin-gradient">Say About Us</span>
              </h2>
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-admin-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500 text-sm sm:text-base animate-pulse">Loading testimonials...</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )
    }

    if (!testimonials?.length) {
      return null; // Don't show the section if there are no testimonials
    }

    return <Testimonials testimonials={testimonials} />
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Banner Images */}
      <section className="relative flex items-center justify-center overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-[700px]">
        {/* Background Image and Overlay Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            {/* Image Layer */}
            <div className="absolute inset-0 opacity-100 transition-opacity duration-700">
              <Image
                src={banner?.status === "active" && banner?.image ? banner.image : "/placeholder.svg"}
                alt={banner?.title || "Home banner"}
                fill
                className={`object-cover object-center ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                priority
              />
            </div>

            {/* Dark Overlay Layer */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Gradient Overlay Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-transparent" />

            {/* Admin Gradient Layer */}
            <div className="absolute inset-0 bg-admin-gradient/20" />

            {/* Subtle Animated Gradient Layer */}
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
          </div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-24 xl:px-8 relative z-10 max-w-7xl">
          <motion.div
            className="max-w-5xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Enhanced Glassmorphic Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="mb-4 sm:mb-6 md:mb-8 inline-flex items-center gap-2 sm:gap-3 bg-white/10 text-white border border-white/20 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 text-xs sm:text-sm md:text-base rounded-full shadow-2xl hover:bg-white/20 hover:scale-105 transition-all duration-300">
                <Car className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                <span className="font-medium">Welcome to Sri Jaidev Tours & Travels</span>
              </Badge>
            </motion.div>

            {/* Optional dynamic banner title */}
            {banner?.title && (
              <motion.p
                className="text-white/90 text-base sm:text-lg md:text-xl mb-2 sm:mb-3 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {banner.title}
              </motion.p>
            )}

            {/* Enhanced Typography - Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-6 sm:mb-8 md:mb-10 leading-tight tracking-tight">
                <span className="block mb-2 sm:mb-3">Travel With Us</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 drop-shadow-2xl">
                  In Comfort
                </span>
              </h1>
            </motion.div>

            {/* Description with Better Spacing */}
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-8 sm:mb-10 md:mb-12 text-white/80 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Experience professional travel services with comfort and reliability. From airport transfers to
              complete tour packages, we ensure safe, comfortable, and memorable journeys to your destinations.
            </motion.p>

            {/* Enhanced CTA Buttons with Better Layout */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.div
                className="w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => handleBookNow()}
                  size="lg"
                  className="w-full sm:w-auto bg-admin-gradient text-white border-0 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50 rounded-full group"
                >
                  <span>Book Now</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div
                className="w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleCallNow}
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white/40 text-white hover:bg-white/20 hover:border-white/60 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg font-semibold bg-white/10 backdrop-blur-md shadow-2xl hover:shadow-white/30 rounded-full transition-all duration-300 group"
                >
                  <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
                  <span>Call Now</span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Loading/No Banner Indicator - Centered */}
        {!banner && !isLoading && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-xl">
                <p className="text-white/80 text-sm font-medium">No banner available</p>
              </div>
            </motion.div>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Glassmorphic background elements */}
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
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                number: "3000+",
                label: "Happy Customers",
                icon: <Users className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                number: "100+",
                label: "Destinations",
                icon: <MapPin className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
                gradient: "from-purple-500 to-pink-500",
              },
              {
                number: "10+",
                label: "Years Experience",
                icon: <Clock className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
                gradient: "from-green-500 to-emerald-500",
              },
              {
                number: "99%",
                label: "Customer Satisfaction",
                icon: <Star className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
                gradient: "from-yellow-500 to-orange-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  initial: { opacity: 0, y: 50, scale: 0.8 },
                  animate: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                    }
                  },
                }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-xl bg-white/80 backdrop-blur-sm h-full hover:-translate-y-2 hover:scale-105">
                  <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8 text-center">
                    {/* Enhanced animated icon container */}
                    <motion.div
                      className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 md:mb-5"
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: 360,
                      }}
                      transition={{ 
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                    >
                      {/* Glassmorphic background ring */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg" />
                      
                      {/* Gradient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-full opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
                      
                      {/* Animated glow effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                      
                      {/* Icon */}
                      <div className="absolute inset-0 flex items-center justify-center text-white z-10">
                        {stat.icon}
                      </div>
                    </motion.div>

                    {/* Animated number with counter effect */}
                    <motion.div
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-admin-gradient bg-clip-text text-transparent mb-1 sm:mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.15 + 0.3,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true }}
                    >
                      {stat.number}
                    </motion.div>

                    {/* Label with better typography */}
                    <div className="text-xs sm:text-sm md:text-base text-gray-600 font-semibold leading-tight">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Book Form Section */}
      <section id="quick-book-form" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl"
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
            className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-orange-200/20 to-yellow-200/20 rounded-full blur-3xl"
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
          {/* Section Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 inline-flex items-center gap-2 bg-white/20 text-gray-900 border border-gray-200/50 backdrop-blur-md px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm shadow-lg hover:bg-white/30 hover:scale-105 transition-all duration-300">
              <Car className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="font-semibold">Book Your Ride</span>
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Start Your Journey
              <span className="block text-transparent bg-clip-text bg-admin-gradient mt-2">In Just 2 Minutes</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Fill in your travel details and get instant confirmation via WhatsApp
            </p>
          </motion.div>

          {/* Form */}
          <div className="max-w-4xl mx-auto">
            <QuickBookForm />
          </div>
        </div>
      </section>

      {/* About Section - Modern Glassmorphic Design */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
        {/* Subtle animated background gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full blur-3xl"
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
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl"
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

        <div className="container px-6 md:px-8 relative z-10">
          {/* Modern Header */}
          <motion.div
            className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 inline-flex items-center gap-2 bg-white/10 text-gray-900 border border-gray-200/50 backdrop-blur-md px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full shadow-lg hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="font-semibold">About Us</span>
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 px-2 leading-tight">
              Why Choose
              <span className="block text-transparent bg-clip-text bg-admin-gradient mt-2">
                Sri Jaidev Tours
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2 max-w-3xl mx-auto leading-relaxed">
              Your trusted travel partner for comfortable and reliable journeys across Tamil Nadu with professional service and well-maintained vehicles.
            </p>
          </motion.div>

          {/* Modern Glassmorphic Cards Grid */}
          <motion.div
            className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Shield className="h-10 w-10" />,
                title: "Our Mission",
                description:
                  "To provide safe, comfortable, and reliable travel services across Tamil Nadu, ensuring every journey is memorable and stress-free for our valued customers.",
                color: "text-orange-500",
                borderColor: "border-orange-500/30",
                hoverBorderColor: "hover:border-orange-500/60",
              },
              {
                icon: <Award className="h-10 w-10" />,
                title: "Our Vision",
                description:
                  "To be the most trusted travel partner in Tamil Nadu, recognized for our commitment to excellence, customer satisfaction, and professional service standards.",
                color: "text-yellow-500",
                borderColor: "border-yellow-500/30",
                hoverBorderColor: "hover:border-yellow-500/60",
              },
              {
                icon: <Heart className="h-10 w-10" />,
                title: "Our Values",
                description:
                  "Safety, reliability, customer satisfaction, and integrity are the core values that guide our services, ensuring exceptional travel experiences for every customer.",
                color: "text-orange-600",
                borderColor: "border-orange-600/30",
                hoverBorderColor: "hover:border-orange-600/60",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <Card
                  className={`h-full bg-white/60 backdrop-blur-sm border ${feature.borderColor} ${feature.hoverBorderColor} overflow-hidden group transition-all duration-300 hover:scale-[1.03] hover:shadow-xl`}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="p-2 rounded-xl w-fit bg-gray-100/50 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <div className={feature.color}>{feature.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-gray-900 relative">
                        {feature.title}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-admin-gradient transition-all duration-300 group-hover:w-full"></span>
                      </h3>
                    </div>
                    <p className="text-base text-gray-600 leading-relaxed transition-opacity duration-300 group-hover:text-gray-900">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-yellow-200/25 to-orange-200/25 rounded-full blur-3xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-orange-200/20 to-yellow-200/20 rounded-full blur-2xl"
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
              Our Services
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 px-2">
              Travel Services
              <span className="block text-transparent bg-clip-text bg-admin-gradient">For Every Destination</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto px-2">
              From airport transfers to complete tour packages, we provide reliable and comfortable travel solutions
            </p>
          </motion.div>

          {renderServices()}

          <div className="text-center mt-12">
            <Link href="/tariff">
              <Button className="bg-admin-gradient text-white hover:opacity-90 px-8 py-3 text-lg font-semibold">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
              Tour Packages
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 px-2">
              Popular
              <span className="block text-transparent bg-clip-text bg-admin-gradient">Travel Packages</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto px-2">
              Discover the beauty of Tamil Nadu with our carefully crafted tour packages
            </p>
          </motion.div>

          {renderPackages()}

          <div className="text-center mt-12">
            <Link href="/packages">
              <Button className="bg-admin-gradient text-white hover:opacity-90 px-8 py-3 text-lg font-semibold">
                View All Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <PopularRoutes showAll={true} />

      {/* Dynamic Testimonials Section */}
      {renderTestimonials()}

      {/* CTA Section - Redesigned with Dark Background */}
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
                <Plane className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            <Badge className="mb-4 sm:mb-6 bg-white/10 text-white border-white/20 backdrop-blur-md px-4 sm:px-6 py-2 text-xs sm:text-sm shadow-lg">
              Ready to Travel?
            </Badge>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              Start Your Journey
              <span className="block text-transparent bg-clip-text bg-admin-gradient mt-2">
                With Us Today
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the comfort and reliability of our travel services. Book your journey across Tamil Nadu and
              discover the beauty of the state with our professional team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button
                  onClick={() => {
                    const whatsappNumber = contactInfo?.whatsappNumber || contactInfo?.primaryPhone || '919360290811';
                    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi, I would like to book a trip. Please provide more details.`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  size="lg"
                  className="w-full sm:w-auto bg-admin-gradient text-white hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg"
                >
                  <WhatsAppIcon className="mr-2 h-5 w-5" />
                  Book via WhatsApp
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
    </div>
  )
}
