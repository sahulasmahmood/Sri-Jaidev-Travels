"use client";

import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, MapPin } from "lucide-react";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter to show only published testimonials and limit to 10
  const activeTestimonials = testimonials
    .filter((testimonial) => testimonial.status === "published")
    .slice(0, 10);

  if (activeTestimonials.length === 0) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative">
          <div className="text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              No testimonials available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [
    ...activeTestimonials,
    ...activeTestimonials,
    ...activeTestimonials,
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-orange-50/30 via-yellow-50/20 to-orange-50/30 relative overflow-hidden">
      {/* Dotted pattern background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="mb-4 sm:mb-6 inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-0 px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
            Client Testimonials
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 leading-tight text-center">
            Trusted by Travelers
            <span className="block text-transparent bg-clip-text bg-admin-gradient mt-2">
              Across the Region
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2 max-w-3xl mx-auto leading-relaxed text-center">
            Real experiences from real customers who chose us for their journeys
          </p>
        </div>

      </div>

      {/* Carousel Container - Full Width Outside Container */}
      <div className="relative w-full overflow-hidden pb-8">
        {/* Side gradients for fade effect */}
        <div className="absolute left-0 top-0 w-16 sm:w-24 h-full bg-gradient-to-r from-orange-50/90 via-orange-50/50 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 w-16 sm:w-24 h-full bg-gradient-to-l from-orange-50/90 via-orange-50/50 to-transparent pointer-events-none z-10" />

        {/* Scrolling container */}
        <div
          ref={scrollRef}
          className="flex gap-6"
          style={{
            animation: `scroll ${activeTestimonials.length * 3}s linear infinite`,
            width: "fit-content",
          }}
        >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial._id}-${index}`}
                className="flex-shrink-0 w-[320px] sm:w-[380px]"
              >
                <Card className="h-full border-0 shadow-xl bg-white hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-500 group relative overflow-hidden">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-yellow-400/20 to-orange-400/20 blur-xl" />
                  </div>
                  
                  <CardContent className="p-6 sm:p-7 relative z-10">
                    {/* Quote icon */}
                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                      <Quote className="h-16 w-16 text-admin-primary" />
                    </div>

                    {/* Header with avatar and info */}
                    <div className="flex items-start gap-4 mb-5 relative z-10">
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 ring-orange-100">
                          <img
                            src={
                              testimonial.avatar ||
                              "https://ui-avatars.com/api/?name=" +
                                encodeURIComponent(testimonial.name) +
                                "&background=f97316&color=fff&size=128"
                            }
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-admin-gradient mb-1 truncate transition-all duration-300">
                          {testimonial.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 mb-2">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{testimonial.location}</span>
                        </div>
                        {/* Star rating */}
                        <div className="flex gap-0.5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Testimonial content */}
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed line-clamp-4 relative z-10 mb-5">
                      "{testimonial.content}"
                    </p>

                    {/* Service type tag */}
                    <div className="pt-4 border-t border-gray-100">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-yellow-50 text-xs font-semibold text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-admin-gradient" />
                        {testimonial.servicesType}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(calc(-${(320 + 24) * activeTestimonials.length}px));
              }
            }

            @media (min-width: 640px) {
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(calc(-${(380 + 24) * activeTestimonials.length}px));
                }
              }
            }
          `}</style>
      </div>
    </section>
  );
};
