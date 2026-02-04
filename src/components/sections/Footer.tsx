import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary font-mont">
                DREAMERS WAY CONSULTANCY
              </h3>
              <p className="text-gray-300 mb-6">
                Your trusted guide for Medical Education in Nepal.
                We help students find the right college and path.
              </p>
              <p className="text-gray-300">
                Kathmandu, Nepal
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/colleges" className="hover:text-primary transition-colors">
                    Find Colleges
                  </Link>
                </li>
                <li>
                  <Link href="/notices" className="hover:text-primary transition-colors">
                    Latest Notices
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Admission Process
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Entrance Exams
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Scholarships
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Kathmandu, Nepal</li>
                <li>Email: info@godreamersway.com</li>
                <li>Call: +977 9819602000</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
            <p>
              &copy; {new Date().getFullYear()} Dreamers Way Consultancy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
