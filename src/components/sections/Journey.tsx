import React from 'react'

import { Building2, FileCheck, Clock } from "lucide-react";

function Journey() {
  return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              We Make Your Property Journey Stress-Free
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-sky-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Wide Selection</h3>
              <p className="text-gray-600 leading-relaxed">
                From apartments to villas, we offer properties across Karnataka’s most sought-after locations.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center">
                  <FileCheck className="h-8 w-8 text-sky-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparent Process</h3>
              <p className="text-gray-600 leading-relaxed">
                We simplify buying, selling, and investing with honest advice and clear communication.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center">
                  <Clock className="h-8 w-8 text-sky-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Timely Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our team is committed to prompt responses and seamless experiences at every step.
              </p>
            </div>
          </div>
        </div>
      </section>


  )
}

export default Journey