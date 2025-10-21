import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <div>
 <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-sky-400">Metrosquare Realty</h3>
              <p className="text-gray-300 mb-6">
                Your trusted partner for buying, selling, and investing in Bangalore’s residential properties.
              </p>
              <p className="text-gray-300">
                Serving Karnataka since 2022<br />
                Bangalore, India
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="#" className="hover:text-sky-400 transition-colors">Buy Residential Properties</Link></li>
                <li><Link href="#" className="hover:text-sky-400 transition-colors">Resale Properties</Link></li>
                <li><Link href="#" className="hover:text-sky-400 transition-colors">Investment Opportunities</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="#" className="hover:text-sky-400 transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-sky-400 transition-colors">Our Team</Link></li>
                <li><Link href="#" className="hover:text-sky-400 transition-colors">Projects</Link></li>
                <li><Link href="#" className="hover:text-sky-400 transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Bangalore, India</li>
                <li>Whatsapp: +91 6364 421 053</li>
                <li>Email: office@metrosquare.co.in</li>
                <li>Call: +91 6364 421 053</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Metrosquare Realty. All rights reserved. Discover the difference with Metrosquare Realty — where your next move begins.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Footer