"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Calendar, Clock, User, Phone as PhoneIcon, Sparkles, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useContact } from "@/hooks/use-contact";

export default function QuickBookForm() {
  const { toast } = useToast();
  const { contactInfo } = useContact();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    pickupLocation: "",
    dropLocation: "",
    travelDate: "",
    travelTime: "",
    returnDate: ""
  });

  // Get dynamic services from contact info or use fallback
  const services = contactInfo?.servicesOffered
    ? contactInfo.servicesOffered.split(',').map(s => s.trim()).filter(s => s.length > 0)
    : [
      "One-way Trip",
      "Round Trip",
      "Airport Taxi",
      "Day Rental",
      "Hourly Package",
      "Local Pickup/Drop",
      "Tour Package"
    ];

  // Listen for service prefill events from homepage services
  useEffect(() => {
    const handlePrefillService = (event: CustomEvent) => {
      setFormData(prev => ({ ...prev, service: event.detail }));
    };

    window.addEventListener('prefillService', handlePrefillService as EventListener);
    return () => {
      window.removeEventListener('prefillService', handlePrefillService as EventListener);
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuickBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save lead to database
      const leadData = {
        fullName: formData.name,
        email: "", // No email provided in quick booking
        phone: formData.phone,
        serviceType: formData.service,
        travelDate: formData.travelDate,
        travelTime: formData.travelTime || "",
        returnDate: formData.returnDate || "",
        pickupLocation: formData.pickupLocation,
        dropLocation: formData.dropLocation,
        passengers: 1, // Default value
        message: `Quick booking request for ${formData.service}. Pickup: ${formData.pickupLocation}, Drop: ${formData.dropLocation}, Date: ${formData.travelDate}${formData.travelTime ? `, Time: ${formData.travelTime}` : ''}${formData.returnDate ? `, Return: ${formData.returnDate}` : ''}`,
        status: "new",
        priority: "high",
        source: "website",
        estimatedCost: "To be determined",
        notes: "Quick booking form submission"
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to save lead');
      }

      // Create WhatsApp message with form data
      const message = `🚗 *Quick Booking Request*
      
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Service:* ${formData.service}
*Pickup:* ${formData.pickupLocation}
*Drop:* ${formData.dropLocation}
*Pickup Date:* ${formData.travelDate}
*Pickup Time:* ${formData.travelTime}${formData.returnDate ? `\n*Return Date:* ${formData.returnDate}` : ''}

Please provide availability and pricing details.`;

      const whatsappNumber = contactInfo?.whatsappNumber || contactInfo?.primaryPhone || '919360290811';
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Booking Request Sent!",
        description: "We'll contact you shortly with availability and pricing details.",
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        service: "",
        pickupLocation: "",
        dropLocation: "",
        travelDate: "",
        travelTime: "",
        returnDate: ""
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Error",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      id="quick-book-form"
    >
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden relative group">
        {/* Gradient border effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
          style={{ padding: '2px' }}>
          <div className="absolute inset-[2px] bg-white rounded-lg"></div>
        </div>

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}></div>
        </div>

        {/* Header with enhanced styling */}
        <CardHeader className="text-center pb-5 pt-6 px-5 sm:px-7 relative">
          {/* Decorative top accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-admin-gradient rounded-full"></div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-3"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl mb-3 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <Sparkles className="h-7 w-7 text-admin-primary" />
            </div>
          </motion.div>

          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-admin-gradient transition-all duration-300">
            Quick Book Your Journey
          </CardTitle>
          <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
            Fill in your details and get instant quote via WhatsApp
          </p>
        </CardHeader>

        <CardContent className="px-5 sm:px-7 pb-6">
          <form onSubmit={handleQuickBook} className="space-y-4">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-gray-800 font-bold text-sm sm:text-base flex items-center gap-2"
                >
                  <div className="p-1 rounded-md bg-gradient-to-br from-blue-100 to-blue-200">
                    <User className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  Full Name
                  <span className="text-red-500">*</span>
                </Label>
                <div className="relative group/input">
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="John Doe"
                    className="h-11 sm:h-12 text-sm sm:text-base border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none transition-all duration-200 bg-white hover:border-orange-300 hover:bg-orange-50/30 rounded-lg shadow-sm focus:shadow-md pl-4"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-gray-800 font-bold text-sm sm:text-base flex items-center gap-2"
                >
                  <div className="p-1 rounded-md bg-gradient-to-br from-green-100 to-green-200">
                    <PhoneIcon className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  Phone Number
                  <span className="text-red-500">*</span>
                </Label>
                <div className="relative group/input">
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="h-11 sm:h-12 text-sm sm:text-base border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none transition-all duration-200 bg-white hover:border-orange-300 hover:bg-orange-50/30 rounded-lg shadow-sm focus:shadow-md pl-4"
                  />
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div className="space-y-2">
              <Label
                htmlFor="service"
                className="text-gray-800 font-bold text-sm sm:text-base flex items-center gap-2"
              >
                <span className="w-1 h-4 bg-admin-gradient rounded-full"></span>
                Service Type
                <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.service}
                onValueChange={(value) => handleInputChange("service", value)}
                required
              >
                <SelectTrigger className="h-11 sm:h-12 text-sm sm:text-base border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0 transition-all duration-200 bg-white hover:border-orange-300 hover:bg-orange-50/30 rounded-lg shadow-sm focus:shadow-md [&[data-state=open]]:border-orange-500 [&[data-state=open]]:ring-0">
                  <SelectValue placeholder="Select your service" />
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

            {/* Location Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-2">
                <Label
                  htmlFor="pickupLocation"
                  className="text-gray-800 font-bold text-sm sm:text-base flex items-center gap-2"
                >
                  <div className="p-1 rounded-md bg-gradient-to-br from-green-100 to-emerald-200">
                    <Navigation className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  Pickup Location
                  <span className="text-red-500">*</span>
                </Label>
                <div className="relative group/input">
                  <Input
                    id="pickupLocation"
                    type="text"
                    required
                    value={formData.pickupLocation}
                    onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                    placeholder="Enter pickup location"
                    className="h-11 sm:h-12 text-sm sm:text-base border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none transition-all duration-200 bg-white hover:border-orange-300 hover:bg-orange-50/30 rounded-lg shadow-sm focus:shadow-md pl-4"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="dropLocation"
                  className="text-gray-800 font-bold text-sm sm:text-base flex items-center gap-2"
                >
                  <div className="p-1 rounded-md bg-gradient-to-br from-red-100 to-pink-200">
                    <MapPin className="h-3.5 w-3.5 text-red-600" />
                  </div>
                  Drop Location
                  <span className="text-red-500">*</span>
                </Label>
                <div className="relative group/input">
                  <Input
                    id="dropLocation"
                    type="text"
                    required
                    value={formData.dropLocation}
                    onChange={(e) => handleInputChange("dropLocation", e.target.value)}
                    placeholder="Enter drop location"
                    className="h-11 sm:h-12 text-sm sm:text-base border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none transition-all duration-200 bg-white hover:border-orange-300 hover:bg-orange-50/30 rounded-lg shadow-sm focus:shadow-md pl-4"
                  />
                </div>
              </div>
            </div>

            {/* Travel Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-2">
                <Label
                  htmlFor="travelDate"
                  className="text-gray-800 font-bold text-sm sm:text-base flex items-center gap-2"
                >
                  <div className="p-1 rounded-md bg-gradient-to-br from-purple-100 to-purple-200">
                    <Calendar className="h-3.5 w-3.5 text-purple-600" />
                  </div>
                  Pickup Date
                  <span className="text-red-500">*</span>
                </Label>
                <div className="relative group/input">
                  <Input
                    id="travelDate"
                    type="date"
                    required
                    value={formData.travelDate}
                    onChange={(e) => handleInputChange("travelDate", e.target.value)}
                    className="h-11 sm:h-12 text-sm sm:text-base border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none transition-all duration-200 bg-white hover:border-orange-300 hover:bg-orange-50/30 rounded-lg shadow-sm focus:shadow-md pl-4"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="travelTime"
                  className="text-gray-800 font-bold text-sm sm:text-base flex items-center gap-2"
                >
                  <div className="p-1 rounded-md bg-gradient-to-br from-indigo-100 to-indigo-200">
                    <Clock className="h-3.5 w-3.5 text-indigo-600" />
                  </div>
                  Pickup Time
                  <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                </Label>
                <div className="relative group/input">
                  <Input
                    id="travelTime"
                    type="time"
                    value={formData.travelTime}
                    onChange={(e) => handleInputChange("travelTime", e.target.value)}
                    className="h-11 sm:h-12 text-sm sm:text-base border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none transition-all duration-200 bg-white hover:border-orange-300 hover:bg-orange-50/30 rounded-lg shadow-sm focus:shadow-md pl-4"
                  />
                </div>
              </div>
            </div>

            {/* Return Date (Optional) */}
            <div className="space-y-2">
              <Label
                htmlFor="returnDate"
                className="text-gray-800 font-bold text-sm sm:text-base flex items-center gap-2"
              >
                <div className="p-1 rounded-md bg-gradient-to-br from-orange-100 to-yellow-200">
                  <Calendar className="h-3.5 w-3.5 text-orange-600" />
                </div>
                Return Date
                {formData.service === "Round Trip" ? (
                  <span className="text-red-500">*</span>
                ) : (
                  <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                )}
              </Label>
              <div className="relative group/input">
                <Input
                  id="returnDate"
                  type="date"
                  required={formData.service === "Round Trip"}
                  value={formData.returnDate}
                  onChange={(e) => handleInputChange("returnDate", e.target.value)}
                  className="h-11 sm:h-12 text-sm sm:text-base border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none transition-all duration-200 bg-white hover:border-orange-300 hover:bg-orange-50/30 rounded-lg shadow-sm focus:shadow-md pl-4"
                  min={formData.travelDate || new Date().toISOString().split('T')[0]}
                  placeholder="Select return date if needed"
                />
              </div>
            </div>

            {/* Info box */}
            <div className="flex items-center gap-2 p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200/50 shadow-sm">
              <div className="p-1.5 rounded-full bg-blue-200 flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm text-blue-700 leading-snug flex-1">
                Your booking request will be sent via WhatsApp. We'll respond with availability and pricing within minutes!
              </p>
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                size="lg"
                className="w-full h-11 bg-admin-gradient text-white hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 text-sm sm:text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 rounded-lg group/btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    <span>Get Instant Quote on WhatsApp</span>
                  </>
                )}
              </Button>
            </motion.div>

            {/* Privacy notice */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <p className="text-xs text-gray-500 text-center px-2">
                🔒 Your information is secure and will only be used for booking purposes
              </p>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}