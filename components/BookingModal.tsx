"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Navigation, Calendar, Clock, User, Phone as PhoneIcon, Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useContact } from "@/hooks/use-contact";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
  prefilledTitle?: string;
}

export default function BookingModal({ isOpen, onClose, prefilledService, prefilledTitle }: BookingModalProps) {
  const { toast } = useToast();
  const { contactInfo } = useContact();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: prefilledService || "",
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

  // Reset form when modal opens with prefilled data
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        service: prefilledService || prev.service || "",
      }));
    }
  }, [isOpen, prefilledService]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    const requiredFields = [
      { field: 'name', label: 'Full Name' },
      { field: 'phone', label: 'Phone Number' },
      { field: 'service', label: 'Service Type' },
      { field: 'pickupLocation', label: 'Pickup Location' },
      { field: 'dropLocation', label: 'Drop Location' },
      { field: 'travelDate', label: 'Travel Date' }
    ];

    const missingFields = requiredFields.filter(({ field }) => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast({
        title: "Please fill required fields",
        description: `Missing: ${missingFields.map(f => f.label).join(', ')}`,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Validate return date for round trips
    if (formData.service === "Round Trip" && !formData.returnDate) {
      toast({
        title: "Return date required",
        description: "Please select a return date for round trip service",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Save lead to database
      const leadData = {
        fullName: formData.name,
        email: "", // No email provided in modal booking
        phone: formData.phone,
        serviceType: formData.service,
        travelDate: formData.travelDate,
        travelTime: formData.travelTime || "",
        returnDate: formData.returnDate || "",
        pickupLocation: formData.pickupLocation,
        dropLocation: formData.dropLocation,
        passengers: 1, // Default value
        message: `Modal booking request for ${formData.service}. Pickup: ${formData.pickupLocation}, Drop: ${formData.dropLocation}, Date: ${formData.travelDate}${formData.travelTime ? `, Time: ${formData.travelTime}` : ''}${formData.returnDate ? `, Return: ${formData.returnDate}` : ''}`,
        status: "new",
        priority: "high",
        source: "website",
        estimatedCost: "To be determined",
        notes: "Modal booking form submission"
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
        toast({
          title: "Booking failed",
          description: result.error || "Failed to submit booking. Please try again or call us directly.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Create WhatsApp message
      const message = `🚗 *Booking Request*

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Service:* ${formData.service}
*Pickup:* ${formData.pickupLocation}
*Drop:* ${formData.dropLocation}
*Pickup Date:* ${formData.travelDate}
*Pickup Time:* ${formData.travelTime}${formData.returnDate ? `\n*Return Date:* ${formData.returnDate}` : ''}

Please confirm availability and provide final pricing.`;

      // Open WhatsApp
      const whatsappNumber = contactInfo?.whatsappNumber || contactInfo?.primaryPhone || '919360290811';
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Booking Request Sent!",
        description: "We'll contact you shortly with availability and pricing details.",
      });

      // Reset form and close modal
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
      onClose();
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Booking submission failed",
        description: "Unable to submit your booking request. Please try again or contact us directly for assistance.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3 pb-2">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl shadow-lg">
              <Sparkles className="h-6 w-6 text-admin-primary" />
            </div>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
            Book Your Travel
            {prefilledTitle && (
              <span className="block text-base font-normal text-gray-600 mt-1">
                {prefilledTitle}
              </span>
            )}
          </DialogTitle>
          <p className="text-xs text-gray-600 text-center">
            Fill in your details and get instant confirmation via WhatsApp
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-gray-800 font-semibold text-sm flex items-center gap-1.5">
                <div className="p-0.5 rounded bg-gradient-to-br from-blue-100 to-blue-200">
                  <User className="h-3 w-3 text-blue-600" />
                </div>
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="John Doe"
                className="h-10 text-sm border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200 hover:border-orange-300 rounded-lg"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-gray-800 font-semibold text-sm flex items-center gap-1.5">
                <div className="p-0.5 rounded bg-gradient-to-br from-green-100 to-green-200">
                  <PhoneIcon className="h-3 w-3 text-green-600" />
                </div>
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+91 98765 43210"
                className="h-10 text-sm border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200 hover:border-orange-300 rounded-lg"
              />
            </div>
          </div>

          {/* Service Selection */}
          <div className="space-y-1.5">
            <Label htmlFor="service" className="text-gray-800 font-semibold text-sm flex items-center gap-1.5">
              <span className="w-0.5 h-3.5 bg-admin-gradient rounded-full"></span>
              Service Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.service}
              onValueChange={(value) => handleInputChange("service", value)}
              required
            >
              <SelectTrigger className="h-10 text-sm border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0 transition-all duration-200 hover:border-orange-300 rounded-lg [&[data-state=open]]:border-orange-500 [&[data-state=open]]:ring-0">
                <SelectValue placeholder="Select your service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service} value={service} className="text-sm">
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="pickupLocation" className="text-gray-800 font-semibold text-sm flex items-center gap-1.5">
                <div className="p-0.5 rounded bg-gradient-to-br from-green-100 to-emerald-200">
                  <Navigation className="h-3 w-3 text-green-600" />
                </div>
                Pickup Location <span className="text-red-500">*</span>
              </Label>
              <Input
                id="pickupLocation"
                type="text"
                required
                value={formData.pickupLocation}
                onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                placeholder="Enter pickup location"
                className="h-10 text-sm border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200 hover:border-orange-300 rounded-lg"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dropLocation" className="text-gray-800 font-semibold text-sm flex items-center gap-1.5">
                <div className="p-0.5 rounded bg-gradient-to-br from-red-100 to-pink-200">
                  <MapPin className="h-3 w-3 text-red-600" />
                </div>
                Drop Location <span className="text-red-500">*</span>
              </Label>
              <Input
                id="dropLocation"
                type="text"
                required
                value={formData.dropLocation}
                onChange={(e) => handleInputChange("dropLocation", e.target.value)}
                placeholder="Enter drop location"
                className="h-10 text-sm border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200 hover:border-orange-300 rounded-lg"
              />
            </div>
          </div>

          {/* Travel Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="travelDate" className="text-gray-800 font-semibold text-sm flex items-center gap-1.5">
                <div className="p-0.5 rounded bg-gradient-to-br from-purple-100 to-purple-200">
                  <Calendar className="h-3 w-3 text-purple-600" />
                </div>
                Pickup Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="travelDate"
                type="date"
                required
                value={formData.travelDate}
                onChange={(e) => handleInputChange("travelDate", e.target.value)}
                className="h-10 text-sm border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200 hover:border-orange-300 rounded-lg"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="travelTime" className="text-gray-800 font-semibold text-sm flex items-center gap-1.5">
                <div className="p-0.5 rounded bg-gradient-to-br from-indigo-100 to-indigo-200">
                  <Clock className="h-3 w-3 text-indigo-600" />
                </div>
                Pickup Time <span className="text-gray-400 text-xs font-normal ml-0.5">(Optional)</span>
              </Label>
              <Input
                id="travelTime"
                type="time"
                value={formData.travelTime}
                onChange={(e) => handleInputChange("travelTime", e.target.value)}
                className="h-10 text-sm border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200 hover:border-orange-300 rounded-lg"
              />
            </div>
          </div>

          {/* Return Date (Optional) */}
          <div className="space-y-1.5">
            <Label htmlFor="returnDate" className="text-gray-800 font-semibold text-sm flex items-center gap-1.5">
              <div className="p-0.5 rounded bg-gradient-to-br from-orange-100 to-yellow-200">
                <Calendar className="h-3 w-3 text-orange-600" />
              </div>
              Return Date
              {formData.service === "Round Trip" ? (
                <span className="text-red-500 ml-0.5">*</span>
              ) : (
                <span className="text-gray-400 text-xs font-normal ml-0.5">(Optional)</span>
              )}
            </Label>
            <Input
              id="returnDate"
              type="date"
              required={formData.service === "Round Trip"}
              value={formData.returnDate}
              onChange={(e) => handleInputChange("returnDate", e.target.value)}
              className="h-10 text-sm border-2 border-gray-200 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200 hover:border-orange-300 rounded-lg"
              min={formData.travelDate || new Date().toISOString().split('T')[0]}
              placeholder="Select return date if needed"
            />
          </div>

          {/* Info box */}
          <div className="flex items-center gap-2 p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200/50">
            <div className="p-1 rounded-full bg-blue-200 flex-shrink-0">
              <svg className="w-3 h-3 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs text-blue-700 leading-snug flex-1">
              Your booking request will be sent via WhatsApp. We'll respond within minutes!
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-10 border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-10 bg-admin-gradient text-white hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  <span>Get Instant Quote</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}