"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  Award,
  Users,
  CheckCircle,
  Shield,
  Clock,
  Sparkles,
  Star,
  Building,
  MapPin,
  Car,
  Heart,
  Compass,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingContactButtons from "@/components/FloatingContactButtons"
import { AboutPageSeo } from "@/components/About/AboutSeo"
import { useBanner } from "@/hooks/use-banner"
import { AnimatedCounter } from "@/components/ui/animated-counter"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6 },
}

export default function AboutPage() {
  const { banner } = useBanner("about")

  const whySriJaidev = [
    {
      icon: <Award className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
      title: "Trusted Experience",
      description:
        "Years of experience providing reliable travel services across Tamil Nadu with thousands of satisfied customers.",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: <Heart className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
      title: "Customer First",
      description:
        "Your comfort and satisfaction are our top priorities. We go the extra mile to ensure memorable travel experiences.",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: <Shield className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
      title: "Safe & Secure",
      description: "Well-maintained vehicles, experienced drivers, and comprehensive insurance for your peace of mind.",
      gradient: "from-green-500 to-teal-600",
    },
    {
      icon: <Clock className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
      title: "Punctual Service",
      description: "Always on time, every time. We value your schedule and ensure timely pickups and drop-offs.",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: <Car className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
      title: "Modern Fleet",
      description: "Clean, comfortable, and well-maintained vehicles equipped with modern amenities for your journey.",
      gradient: "from-indigo-500 to-blue-600",
    },
    {
      icon: <MapPin className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
      title: "Local Expertise",
      description:
        "Deep knowledge of destinations, routes, and hidden gems for the best travel experience.",
      gradient: "from-teal-500 to-green-600",
    },
  ]

  const values = [
    {
      title: "Customer Satisfaction",
      description:
        "We prioritize your comfort and happiness, ensuring every journey exceeds your expectations and creates lasting memories.",
      icon: <Heart className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      title: "Trust & Reliability",
      description:
        "Honest pricing, transparent communication, and dependable service form the foundation of our customer relationships.",
      icon: <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      title: "Safety First",
      description:
        "Your safety is our top priority with well-maintained vehicles, experienced drivers, and comprehensive safety measures.",
      icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      title: "Travel Excellence",
      description:
        "We strive to provide exceptional travel experiences that showcase the beauty and culture of Tamil Nadu.",
      icon: <Compass className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
  ]

  const stats = [
    { 
      number: 2000, 
      suffix: "+",
      label: "Happy Travelers", 
      icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />,
      gradient: "from-blue-500 via-blue-600 to-purple-600"
    },
    { 
      number: 1500, 
      suffix: "+",
      label: "Trips Completed", 
      icon: <Car className="h-5 w-5 sm:h-6 sm:w-6" />,
      gradient: "from-green-500 via-teal-600 to-cyan-600"
    },
    { 
      number: 100, 
      suffix: "+",
      label: "Destinations Covered", 
      icon: <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />,
      gradient: "from-orange-500 via-red-600 to-pink-600"
    },
    { 
      number: 99, 
      suffix: "%",
      label: "Customer Satisfaction", 
      icon: <Heart className="h-5 w-5 sm:h-6 sm:w-6" />,
      gradient: "from-purple-500 via-pink-600 to-rose-600"
    },
  ]

  return (
    <div className="min-h-screen">
      <AboutPageSeo />
      <Navbar />

      {/* Hero Section */}
  <section className="relative bg-admin-gradient text-white py-16 sm:py-20 lg:py-24 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            {/* Image Layer */}
            <div className="absolute inset-0 opacity-100 transition-opacity duration-700">
              <img
                src={banner?.status === "active" && banner?.image ? banner.image : "/placeholder.jpg"}
                alt={banner?.title || "Tamil Nadu Tourism"}
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

        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 max-w-7xl">
          <motion.div
            className="max-w-4xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-3 sm:mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-0 px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
              About Sri Jaidev Tours & Travels
            </Badge>

            {/* Optional dynamic banner title (keeps existing main heading) */}
            {banner?.title && (
              <p className="text-white/90 text-base sm:text-lg md:text-xl mb-2 sm:mb-3">{banner.title}</p>
            )}

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-relaxed">
              Your Trusted Partner
              <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl mt-2 sm:mt-3 font-normal">
                For Every Journey
              </span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Experience premium travel services that blend comfort, safety, and reliability. 
              We're committed to making every journey memorable with personalized care and professional service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
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
            className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-orange-400/10 to-pink-400/10 rounded-full blur-3xl"
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

        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm h-full group overflow-hidden relative">
                  {/* Glassmorphic overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardContent className="p-4 sm:p-5 md:p-6 lg:p-8 text-center relative z-10">
                    {/* Gradient icon container with animation */}
                    <motion.div 
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 md:mb-5 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-white">{stat.icon}</div>
                    </motion.div>
                    
                    {/* Animated counter */}
                    <AnimatedCounter
                      end={stat.number}
                      suffix={stat.suffix}
                      duration={2500}
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 mb-2 sm:mb-3"
                    />
                    
                    <div className="text-gray-600 font-semibold text-xs sm:text-sm md:text-base leading-tight">
                      {stat.label}
                    </div>
                  </CardContent>
                  
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Story - Timeline Journey Style */}
      <section id="story" className="py-20 sm:py-24 md:py-28 lg:py-32 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-yellow-300/10 to-orange-300/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-br from-orange-300/10 to-pink-300/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative max-w-7xl">
          {/* Header */}
          <motion.div
            className="text-center mb-16 sm:mb-20 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-5 sm:mb-6 inline-flex items-center gap-2 bg-white/20 text-gray-900 border border-gray-200/50 backdrop-blur-md px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm shadow-lg hover:bg-white/30 hover:scale-105 transition-all duration-300">
              <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="font-semibold">Our Journey</span>
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              The Story Behind
              <span className="block text-transparent bg-clip-text bg-admin-gradient mt-2">Sri Jaidev Tours</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From humble beginnings to becoming a trusted travel partner for thousands
            </p>
          </motion.div>

          {/* Timeline Journey */}
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 via-orange-400 to-orange-500 transform -translate-x-1/2"></div>

            {/* Timeline Items */}
            <div className="space-y-12 sm:space-y-16 md:space-y-20">
              {/* Item 1 - Foundation */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="md:text-right mb-8 md:mb-0">
                    <Card className="inline-block bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border-0 group">
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-4 md:justify-end">
                          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Sparkles className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">The Beginning</h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          Founded with a vision to make travel comfortable, safe, and memorable. Started with a commitment to providing reliable transportation services connecting people to destinations.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 top-0 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full transform -translate-x-1/2 shadow-lg ring-4 ring-white"></div>
                  
                  <div className="hidden md:block"></div>
                </div>
              </motion.div>

              {/* Item 2 - Growth */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="hidden md:block"></div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 top-0 w-4 h-4 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full transform -translate-x-1/2 shadow-lg ring-4 ring-white"></div>
                  
                  <div className="mb-8 md:mb-0">
                    <Card className="inline-block bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border-0 group">
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Car className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Expanding Services</h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          Grew to offer comprehensive services including one-way trips, round trips, airport taxi, day rentals, hourly packages, and customized tour packages across Tamil Nadu.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>

              {/* Item 3 - Today */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="md:text-right mb-8 md:mb-0">
                    <Card className="inline-block bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 shadow-xl hover:shadow-2xl transition-all duration-500 border-0 group">
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-4 md:justify-end">
                          <div className="w-12 h-12 bg-admin-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Award className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Today & Beyond</h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                          A trusted travel partner with thousands of satisfied customers. Our commitment to excellence continues to drive us forward.
                        </p>
                        <div className="flex gap-4 md:justify-end">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-transparent bg-clip-text bg-admin-gradient">2000+</div>
                            <div className="text-xs text-gray-600">Travelers</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-transparent bg-clip-text bg-admin-gradient">100+</div>
                            <div className="text-xs text-gray-600">Destinations</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-transparent bg-clip-text bg-admin-gradient">99%</div>
                            <div className="text-xs text-gray-600">Satisfaction</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot - larger for current */}
                  <div className="absolute left-8 md:left-1/2 top-0 w-6 h-6 bg-admin-gradient rounded-full transform -translate-x-1/2 shadow-xl ring-4 ring-white animate-pulse"></div>
                  
                  <div className="hidden md:block"></div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom CTA Card */}
          <motion.div
            className="mt-16 sm:mt-20 md:mt-24 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-admin-gradient text-white border-0 shadow-2xl overflow-hidden relative group">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '32px 32px',
                }}></div>
              </div>
              
              <CardContent className="p-8 sm:p-10 md:p-12 text-center relative z-10">
                <Building className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-6 opacity-90" />
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Sri Jaidev Tours & Travels</h3>
                <p className="text-base sm:text-lg text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
                  Your trusted travel partner for comfortable and reliable journeys. Experience the difference with professional service and well-maintained vehicles.
                </p>
                <div className="flex items-center justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300 fill-current" />
                  ))}
                  <span className="ml-2 text-lg font-bold">5.0 Rating</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-14 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-48 h-48 bg-gradient-to-r from-yellow-200/25 to-orange-200/25 rounded-full blur-3xl"
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
            className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-orange-200/20 to-yellow-200/20 rounded-full blur-2xl"
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

        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-14 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-5 md:mb-6 inline-flex items-center gap-2 bg-white/10 text-gray-900 border border-gray-200/50 backdrop-blur-md px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full shadow-lg hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <Target className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="font-semibold">Our Foundation</span>
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              The Principles That
              <span className="block text-transparent bg-clip-text bg-admin-gradient mt-2">Guide Our Work</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2 sm:px-0 leading-relaxed">
              The core values and vision that define our commitment to excellence and innovation
            </p>
          </motion.div>

          <motion.div
            className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12 sm:mb-16 md:mb-20"
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
                icon: <Target className="h-10 w-10" />,
                title: "Our Mission",
                description:
                  "To provide safe, comfortable, and reliable travel services that connect people to rich heritage, natural beauty, and cultural treasures with exceptional customer care.",
                color: "text-orange-500",
                borderColor: "border-orange-500/30",
                hoverBorderColor: "hover:border-orange-500/60",
              },
              {
                icon: <Award className="h-10 w-10" />,
                title: "Our Vision",
                description:
                  "To be the most trusted travel partner, recognized for our commitment to safety, customer satisfaction, and creating unforgettable travel experiences.",
                color: "text-yellow-500",
                borderColor: "border-yellow-500/30",
                hoverBorderColor: "hover:border-yellow-500/60",
              },
              {
                icon: <Heart className="h-10 w-10" />,
                title: "Our Values",
                description:
                  "Safety, reliability, customer satisfaction, and integrity are the core values that guide everything we do, ensuring memorable travel experiences for every customer.",
                color: "text-orange-600",
                borderColor: "border-orange-600/30",
                hoverBorderColor: "hover:border-orange-600/60",
              },
            ].map((item, index) => (
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
                  className={`h-full bg-white/60 backdrop-blur-sm border ${item.borderColor} ${item.hoverBorderColor} overflow-hidden group transition-all duration-300 hover:scale-[1.03] hover:shadow-xl`}
                >
                  <CardContent className="p-6 sm:p-7 md:p-8 space-y-4">
                    <div className="p-2 rounded-xl w-fit bg-gray-100/50 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <div className={item.color}>{item.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 relative">
                        {item.title}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-admin-gradient transition-all duration-300 group-hover:w-full"></span>
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed transition-opacity duration-300 group-hover:text-gray-900">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Values Grid */}
          <motion.div
            className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
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
            {values.map((value, index) => (
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
                <Card className="h-full bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:border-orange-500/40 overflow-hidden group transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
                  <CardContent className="p-5 sm:p-6 text-center space-y-3 sm:space-y-4">
                    <div className="p-2 rounded-xl w-fit mx-auto bg-gray-100/50 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <div className="text-orange-500">{value.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 relative">
                        {value.title}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-admin-gradient transition-all duration-300 group-hover:w-full"></span>
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed transition-opacity duration-300 group-hover:text-gray-900">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Sri Jaidev Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Subtle animated background elements */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-orange-400/5 to-yellow-400/5 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"
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
        
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative max-w-7xl z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-0 px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
              Why Choose Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              Why Choose
              <span className="block text-transparent bg-clip-text bg-admin-gradient mt-2">Sri Jaidev Tours?</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0 leading-relaxed">
              Six compelling reasons why thousands of travelers trust us for their journeys
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {whySriJaidev.map((item, index) => (
              <motion.div 
                key={index} 
                variants={scaleIn}
                whileHover={{ 
                  x: 8,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="h-full group relative bg-white border-0 shadow-lg hover:shadow-2xl hover:shadow-admin-primary/20 transition-all duration-300 overflow-hidden">
                  {/* Gradient left border accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-admin-gradient transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
                  
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-admin-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  
                  <CardContent className="p-6 sm:p-8 relative z-10">
                    {/* Horizontal layout: Icon on left, content on right */}
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* Icon container with number badge */}
                      <div className="flex-shrink-0 relative">
                        <motion.div
                          className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-admin-gradient rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-admin-primary/30 transition-all duration-300 relative overflow-hidden"
                          whileHover={{ 
                            rotate: [0, -5, 5, -5, 0],
                            scale: 1.05,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {/* Shine effect on hover */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          <div className="text-white relative z-10">{item.icon}</div>
                        </motion.div>
                        
                        {/* Number badge - positioned at top-right of icon */}
                        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-admin-gradient flex items-center justify-center text-white text-xs font-bold shadow-md ring-2 ring-white">
                          {index + 1}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  
                  {/* Decorative corner element */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-admin-gradient opacity-0 group-hover:opacity-10 rounded-tl-full transition-opacity duration-500"></div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section - Unique Horizontal Card Design */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Animated gradient orbs - matching site theme */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gradient-to-br from-orange-300/20 to-pink-300/20 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
          {/* Header with side-aligned badge */}
          <motion.div
            className="mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
              <div className="flex-1">
                <Badge className="mb-4 sm:mb-5 inline-flex items-center gap-2 bg-white/20 text-gray-900 border border-gray-200/50 backdrop-blur-md px-4 sm:px-5 py-2 text-xs sm:text-sm shadow-lg hover:bg-white/30 hover:scale-105 transition-all duration-300">
                  <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="font-semibold">Our Team</span>
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Meet The People
                  <span className="block text-transparent bg-clip-text bg-admin-gradient mt-2">
                    Making Travel Happen
                  </span>
                </h2>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">
                Dedicated professionals working together to deliver exceptional travel experiences
              </p>
            </div>
          </motion.div>

          {/* Main Content - Horizontal Layout */}
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
            {/* Team Roles Cards */}
            {[
              {
                icon: <Car className="h-8 w-8 sm:h-10 sm:w-10" />,
                title: "Expert Drivers",
                count: "20+",
                description: "Licensed professionals with years of experience",
                gradient: "from-yellow-500 to-orange-500",
                bgGradient: "from-yellow-50 to-orange-50",
              },
              {
                icon: <Users className="h-8 w-8 sm:h-10 sm:w-10" />,
                title: "Support Team",
                count: "10+",
                description: "Customer service and coordination specialists",
                gradient: "from-orange-500 to-pink-500",
                bgGradient: "from-orange-50 to-pink-50",
              },
              {
                icon: <Shield className="h-8 w-8 sm:h-10 sm:w-10" />,
                title: "Safety Officers",
                count: "5+",
                description: "Ensuring your journey is secure and comfortable",
                gradient: "from-pink-500 to-rose-500",
                bgGradient: "from-pink-50 to-rose-50",
              },
            ].map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 sm:p-8">
                    {/* Icon with unique styling */}
                    <motion.div
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 mb-5 sm:mb-6`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                      <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity`}></div>
                      <div className={`relative w-full h-full bg-gradient-to-br ${role.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                        {role.icon}
                      </div>
                    </motion.div>

                    {/* Count Badge */}
                    <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${role.bgGradient} mb-4`}>
                      <span className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${role.gradient} bg-clip-text text-transparent`}>
                        {role.count}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      {role.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {role.description}
                    </p>

                    {/* Decorative bottom accent */}
                    <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${role.gradient} rounded-full transition-all duration-500`}></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Team Qualities - Horizontal Pills Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              What Makes Our Team Special
            </h3>
            
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {[
                { icon: <Award className="h-4 w-4" />, text: "Licensed & Certified", color: "from-yellow-500 to-orange-500" },
                { icon: <MapPin className="h-4 w-4" />, text: "Local Expertise", color: "from-orange-500 to-red-500" },
                { icon: <Clock className="h-4 w-4" />, text: "24/7 Available", color: "from-pink-500 to-rose-500" },
                { icon: <Shield className="h-4 w-4" />, text: "Safety Focused", color: "from-orange-500 to-pink-500" },
                { icon: <Heart className="h-4 w-4" />, text: "Customer First", color: "from-rose-500 to-pink-500" },
                { icon: <CheckCircle className="h-4 w-4" />, text: "Reliable Service", color: "from-yellow-500 to-orange-500" },
              ].map((quality, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="group"
                >
                  <div className="relative">
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${quality.color} rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300`}></div>
                    
                    {/* Pill */}
                    <div className="relative flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200">
                      <div className={`bg-gradient-to-r ${quality.color} p-1.5 rounded-full text-white`}>
                        {quality.icon}
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-gray-700 whitespace-nowrap">
                        {quality.text}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingContactButtons />
    </div>
  )
}
