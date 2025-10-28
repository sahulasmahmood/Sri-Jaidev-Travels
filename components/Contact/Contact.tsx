"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Phone, Mail, MapPin, Send } from "lucide-react"
import { useBanner } from "@/hooks/use-banner"
import { useContact } from "@/hooks/use-contact"

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
interface ContactProps {
  services?: string[]
}

export const Contact = ({ services: propServices }: ContactProps) => {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  // Use dynamic contact info from API
  const { contactInfo } = useContact()

  // Get dynamic services from contact info or use prop services or fallback
  const services = contactInfo?.servicesOffered 
    ? contactInfo.servicesOffered.split(',').map(s => s.trim()).filter(s => s.length > 0)
    : propServices || [
        "One-way Trip",
        "Round Trip", 
        "Airport Taxi",
        "Day Rental",
        "Hourly Package",
        "Local Pickup/Drop",
        "Tour Package"
      ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.fullName || !formData.phone || !formData.service) {
        throw new Error("Please fill in all required fields");
      }

      // Prepare data for API
      const submissionData = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        serviceType: formData.service.trim(),
        travelDate: new Date().toISOString().split('T')[0],
        pickupLocation: "To be specified", // Required field
        dropLocation: "To be specified",
        passengers: 1,
        message: formData.message.trim(),
        status: "new", // Required field
        priority: "medium", // Required field
        source: "website", // Changed from "contact_form" to "website"
        estimatedCost: "To be determined",
        notes: `Contact form submission\nEmail: ${formData.email}\nMessage: ${formData.message}`
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      const result = await response.json();

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      })

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Contact details using dynamic data with fallbacks
  const contactDetails = [
    {
      icon: <Phone className="h-5 w-5 text-white" />,
      title: "Phone",
      details: (
        <div className="space-y-1">
          <p className="text-gray-900 font-medium text-sm sm:text-base break-words">
            {contactInfo?.primaryPhone}
          </p>
          {contactInfo?.secondaryPhone && (
            <p className="text-gray-900 font-medium text-sm sm:text-base break-words">
              {contactInfo.secondaryPhone}
            </p>
          )}
        </div>
      ),
      description: contactInfo?.businessHours || "24/7 Available",
    },
    {
      icon: <Mail className="h-5 w-5 text-white" />,
      title: "Email Address",
      details: contactInfo?.email || "srijaidavetravelers@gmail.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: <MapPin className="h-5 w-5 text-white" />,
      title: "Address",
      details: contactInfo?.address || "2A, 1st Floor, Koodalnagar, Chokkalinganagar 1st Street",
      description: `${contactInfo?.city || "South Madurai"}, ${
        contactInfo?.state || "Tamil Nadu"
      }-${contactInfo?.pincode || "625006"}`,
    },
  ]

  const { banner } = useBanner("contact")

  return (
    <>
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

        <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-3 sm:mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
              <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Get In Touch
            </Badge>

            {banner?.title && (
              <p className="text-white/90 text-base sm:text-lg md:text-xl mb-2 sm:mb-3">{banner.title}</p>
            )}

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              {contactInfo?.pageTitle || "Plan Your Perfect Journey"}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
              {contactInfo?.pageDescription ||
                "Ready to explore beautiful destinations? Contact our travel experts today and let us plan your perfect journey with comfort and safety."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section id="contact-form" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 max-w-7xl mx-auto">
            {/* Contact Form */}
            <motion.div 
              variants={fadeInUp} 
              initial="initial" 
              whileInView="animate" 
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="h-full transition-all duration-500 border-0 shadow-xl overflow-hidden group flex flex-col relative hover:shadow-2xl hover:shadow-orange-500/10">
                {/* Gradient border effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" 
                     style={{ padding: '2px' }}>
                  <div className="absolute inset-[2px] bg-white rounded-lg"></div>
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-orange-500/5 via-yellow-500/5 to-orange-600/5"></div>

                <CardContent className="p-4 sm:p-6 lg:p-8 relative">
                  {/* Header with icon */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-100 to-yellow-100 group-hover:from-orange-200 group-hover:to-yellow-200 transition-colors duration-300">
                        <Send className="h-5 w-5 sm:h-6 sm:w-6 text-admin-primary" />
                      </div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-admin-gradient transition-all duration-300">
                        Send Us a Message
                      </h2>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      Fill out the form below and we'll get back to you within 24 hours
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-2">
                        <Label 
                          htmlFor="fullName" 
                          className="text-gray-800 font-bold text-sm sm:text-base flex items-center gap-1.5"
                        >
                          <span className="w-1 h-4 bg-admin-gradient rounded-full"></span>
                          Full Name
                          <span className="text-red-500 text-base">*</span>
                        </Label>
                        <div className="relative group/input">
                          <Input
                            id="fullName"
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            placeholder="John Doe"
                            className="h-11 sm:h-12 text-sm sm:text-base border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none transition-all duration-200 bg-white hover:border-orange-300 hover:bg-orange-50/30 rounded-lg shadow-sm focus:shadow-md"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label 
                          htmlFor="email" 
                          className="text-gray-800 font-bold text-sm sm:text-base flex items-center gap-1.5"
                        >
                          <span className="w-1 h-4 bg-admin-gradient rounded-full"></span>
                          Email Address
                          <span className="text-red-500 text-base">*</span>
                        </Label>
                        <div className="relative group/input">
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="john@example.com"
                            className="h-11 sm:h-12 text-sm sm:text-base border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none transition-all duration-200 bg-white hover:border-orange-300 hover:bg-orange-50/30 rounded-lg shadow-sm focus:shadow-md"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-2">
                        <Label 
                          htmlFor="phone" 
                          className="text-gray-800 font-bold text-sm sm:text-base flex items-center gap-1.5"
                        >
                          <span className="w-1 h-4 bg-admin-gradient rounded-full"></span>
                          Phone Number
                          <span className="text-red-500 text-base">*</span>
                        </Label>
                        <div className="relative group/input">
                          <Input
                            id="phone"
                            type="tel"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            required
                            value={formData.phone}
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(/[^0-9]/g, "")
                              handleInputChange("phone", numericValue)
                            }}
                            placeholder="+91 98765 43210"
                            className="h-11 sm:h-12 text-sm sm:text-base border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none transition-all duration-200 bg-white hover:border-orange-300 hover:bg-orange-50/30 rounded-lg shadow-sm focus:shadow-md"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label 
                          htmlFor="service" 
                          className="text-gray-800 font-bold text-sm sm:text-base flex items-center gap-1.5"
                        >
                          <span className="w-1 h-4 bg-admin-gradient rounded-full"></span>
                          Service of Interest
                          <span className="text-red-500 text-base">*</span>
                        </Label>
                        <Select 
                          value={formData.service} 
                          onValueChange={(value) => handleInputChange("service", value)}
                          required
                        >
                          <SelectTrigger className="h-11 sm:h-12 text-sm sm:text-base border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none transition-all duration-200 bg-white hover:border-orange-300 hover:bg-orange-50/30 rounded-lg shadow-sm focus:shadow-md">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service} className="text-sm sm:text-base">
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label 
                        htmlFor="message" 
                        className="text-gray-800 font-bold text-sm sm:text-base flex items-center gap-1.5"
                      >
                        <span className="w-1 h-4 bg-admin-gradient rounded-full"></span>
                        Your Message
                        <span className="text-red-500 text-base">*</span>
                      </Label>
                      <div className="relative group/input">
                        <Textarea
                          id="message"
                          required
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder="Tell us about your travel requirements, preferred dates, number of passengers, and any special requests..."
                          rows={5}
                          className="text-sm sm:text-base resize-none border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none transition-all duration-200 bg-white hover:border-orange-300 hover:bg-orange-50/30 rounded-lg shadow-sm focus:shadow-md"
                        />
                      </div>
                      <div className="flex items-start gap-2 mt-2 p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200/50">
                        <div className="p-1 rounded-full bg-blue-200 flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-xs text-blue-700 leading-relaxed">
                          Please provide as much detail as possible to help us serve you better
                        </p>
                      </div>
                    </div>

                    {/* Enhanced submit button matching other pages */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-12 sm:h-14 bg-admin-gradient text-white hover:shadow-xl hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm sm:text-base lg:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                    
                    {/* Privacy notice with better styling */}
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                      <p className="text-xs text-gray-500 text-center px-2">
                        We respect your privacy and will respond within 24 hours
                      </p>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6 lg:space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
                  Contact Information
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
                  Get in touch with our team of travel experts. We're here to help you with all your travel needs and
                  provide exceptional travel experiences across Tamil Nadu.
                </p>
              </motion.div>

              {contactDetails.map((info, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 border-0 shadow-xl group overflow-hidden relative">
                    {/* Gradient border effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-yellow-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" 
                         style={{ padding: '2px' }}>
                      <div className="absolute inset-[2px] bg-white rounded-lg"></div>
                    </div>
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-orange-500/5 via-yellow-500/5 to-orange-600/5"></div>

                    <CardContent className="p-4 sm:p-5 lg:p-6 relative">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <motion.div 
                          className="w-12 h-12 sm:w-14 sm:h-14 bg-admin-gradient rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:shadow-orange-500/30 transition-all duration-300"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <div className="text-white">{info.icon}</div>
                        </motion.div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base lg:text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-admin-gradient transition-all duration-300 flex items-center gap-2">
                            <span className="w-1 h-4 bg-admin-gradient rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            {info.title}
                          </h3>
                          {typeof info.details === 'string' ? (
                            <p className="text-gray-900 font-semibold mb-2 text-sm sm:text-base break-words bg-gradient-to-br from-orange-50 to-yellow-50 p-2 rounded-lg border border-orange-100/50 group-hover:shadow-sm transition-shadow duration-300">
                              {info.details}
                            </p>
                          ) : (
                            <div className="mb-2 bg-gradient-to-br from-orange-50 to-yellow-50 p-2 rounded-lg border border-orange-100/50 group-hover:shadow-sm transition-shadow duration-300">
                              {info.details}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-green-500"></div>
                            <p className="text-xs sm:text-sm text-gray-600 font-medium">{info.description}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm shadow-lg hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Visit Our Office
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 leading-tight px-2">
              {contactInfo?.officeTitle || "Visit Our Office in Madurai, Tamil Nadu"}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
              {contactInfo?.officeDescription ||
                "Located in the heart of Madurai, our office is easily accessible and welcoming to all our clients"}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative group">
              {/* Enhanced gradient border effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-orange-400 via-yellow-500 to-orange-600 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>
              
              {/* Main container with enhanced styling */}
              <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 group-hover:border-transparent">
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-yellow-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Map content */}
                {contactInfo?.mapEmbedCode ? (
                  <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[550px] relative">
                    <div
                      className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                      dangerouslySetInnerHTML={{ __html: contactInfo.mapEmbedCode }}
                    />
                    
                    {/* Subtle overlay gradient on edges for depth */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/20 to-transparent"></div>
                      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/20 to-transparent"></div>
                      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/20 to-transparent"></div>
                      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/20 to-transparent"></div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[550px] bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex items-center justify-center relative overflow-hidden">
                    {/* Animated background pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-10"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      style={{
                        backgroundImage: "radial-gradient(circle, #f59e0b 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                    />
                    
                    <div className="text-center relative z-10">
                      <motion.div
                        className="inline-block p-6 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 mb-6 shadow-lg"
                        animate={{
                          scale: [1, 1.05, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <MapPin className="h-12 w-12 sm:h-16 sm:w-16 text-admin-primary" />
                      </motion.div>
                      <p className="text-gray-700 text-base sm:text-lg lg:text-xl font-semibold mb-2">Map will be displayed here</p>
                      <p className="text-gray-500 text-xs sm:text-sm lg:text-base px-4">Configure map embed code in admin panel</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
