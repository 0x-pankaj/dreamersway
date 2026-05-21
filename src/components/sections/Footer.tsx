import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/dwc_logo.png"
                alt={siteConfig.name}
                width={160}
                height={50}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              {siteConfig.description}
            </p>
            <div className="space-y-2 text-sm">
              <a href={`tel:${siteConfig.contact.phonePrimary.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" /> {siteConfig.contact.phonePrimary}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" /> {siteConfig.contact.email}
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> {siteConfig.contact.address}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white font-mont">Destinations</h4>
            <ul className="space-y-2 text-sm">
              {siteConfig.countries.map((c) => (
                <li key={c.code}>
                  <Link href={`/study-in/${c.code}`} className="hover:text-primary transition-colors flex items-center gap-2">
                    <span>{c.flag}</span> Study in {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white font-mont">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/universities" className="hover:text-primary transition-colors">Universities</Link></li>
              <li><Link href="/scholarships" className="hover:text-primary transition-colors">Scholarships</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Resources & Blog</Link></li>
              <li><Link href="/success-stories" className="hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link href="/notices" className="hover:text-primary transition-colors">Notices</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white font-mont">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/contact?intent=book" className="hover:text-primary transition-colors">Free Consultation</Link></li>
              <li><Link href="/faqs" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>

            <div className="flex items-center gap-3 mt-5">
              <a href={siteConfig.social.facebook} aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={siteConfig.social.instagram} aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={siteConfig.social.linkedin} aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={siteConfig.social.youtube} aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Made with care in Kathmandu — guiding students worldwide.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
