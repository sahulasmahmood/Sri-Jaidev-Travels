"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  location: string;
  avatar: string;
  content: string;
  rating: number;
  servicesType: string;
  status: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export const Testimonials = ({ testimonials = [] }: TestimonialsProps) => {
  // Filter to show only published testimonials
  const activeTestimonials = testimonials.filter(
    (testimonial) => testimonial.status === "published"
  );
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % activeTestimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + activeTestimonials.length) % activeTestimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  // Auto-play functionality
  useEffect(() => {
    if (activeTestimonials.length === 0) return;

    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [activeTestimonials.length]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  if (activeTestimonials.length === 0) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50/30 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50"></div>
        <div className="container mx-auto px-3 sm:px-4 md:px-6 relative">
          <div className="text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              No testimonials available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50/30 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl"
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
        {/* Enhanced section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 inline-flex items-center gap-2 bg-white/10 text-gray-900 border border-gray-200/50 backdrop-blur-md px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full shadow-lg hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">Client Reviews</span>
            </Badge>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 px-2 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            What Our Customers
            <span className="block text-transparent bg-clip-text bg-admin-gradient mt-2">
              Say About Us
            </span>
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-600 px-2 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Don't just take our word for it - hear from our satisfied clients
          </motion.p>
        </motion.div>

        {/* Modern animated testimonials layout */}
        <div className="relative grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 items-center max-w-5xl mx-auto">
          {/* Left side - Stacked avatar images with 3D effect */}
          <div className="relative h-48 sm:h-56 md:h-60 lg:h-64 w-full max-w-xs sm:max-w-sm mx-auto lg:mx-0 order-2 lg:order-1">
            <AnimatePresence>
              {activeTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : activeTestimonials.length + 2 - index,
                    y: isActive(index) ? [0, -20, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg border border-white">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                    
                    {/* Service type badge on image */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-white/50 shadow-sm text-xs">
                        <div className="w-1 h-1 rounded-full bg-admin-gradient animate-pulse" />
                        <span className="font-semibold text-transparent bg-clip-text bg-admin-gradient">
                          {testimonial.servicesType}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right side - Testimonial content with word-by-word animation */}
          <div className="flex flex-col justify-between py-2 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-3 sm:space-y-4"
              >
                {/* Star rating */}
                <motion.div 
                  className="flex gap-0.5"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {[...Array(activeTestimonials[active]?.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-400 fill-yellow-400 drop-shadow-sm"
                    />
                  ))}
                </motion.div>

                {/* Quote icon */}
                <motion.div
                  initial={{ opacity: 0, rotate: -10 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-admin-primary/30" />
                </motion.div>

                {/* Testimonial text with word-by-word reveal */}
                <motion.p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                  {activeTestimonials[active]?.content.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{
                        filter: "blur(10px)",
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.02 * index,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>

                {/* Author info */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="pt-2.5 border-t border-gray-200"
                >
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-0.5">
                    {activeTestimonials[active]?.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {activeTestimonials[active]?.location}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex gap-2 pt-4 md:pt-6">
              <motion.button
                onClick={handlePrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="group flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white border-2 border-gray-200 shadow-md hover:border-admin-primary hover:shadow-lg transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4 text-gray-700 group-hover:text-admin-primary transition-colors" />
              </motion.button>
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="group flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-admin-gradient shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4 text-white" />
              </motion.button>
            </div>

            {/* Dots indicator */}
            <div className="flex gap-1.5 pt-3">
              {activeTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive(index) 
                      ? 'w-6 bg-admin-gradient' 
                      : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
