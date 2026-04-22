"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "MBBS Student",
    college: "Kathmandu Medical College",
    quote:
      "Dreamers Way Consultancy made my admission process incredibly smooth. Their guidance helped me choose the right college and navigate all the paperwork effortlessly.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "BDS Student",
    college: "B.P. Koirala Institute",
    quote:
      "The team was extremely supportive throughout my entire journey. From college selection to final admission, they were always there to help. Highly recommended!",
    rating: 5,
  },
  {
    name: "Amit Kumar",
    role: "Nursing Student",
    college: "Tribhuvan University",
    quote:
      "I was confused about which college to choose, but the counselors at Dreamers Way provided clear, honest advice that helped me make the best decision for my career.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-black dark:via-gray-900/40 dark:to-black relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-bold mb-6">
            <Star className="w-4 h-4" />
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 font-mont">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Hear from students who achieved their dreams with our guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-primary/20 hover:shadow-xl transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-8 w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                <Quote className="w-4 h-4 text-primary-foreground" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{testimonial.college}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
