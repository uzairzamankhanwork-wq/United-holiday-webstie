import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Twitter } from 'lucide-react';

/**
 * Footer component for United Holidays
 * Multi-column layout with contact details and navigation
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="United Holidays Logo" className="h-10 sm:h-12 w-auto object-contain bg-white rounded p-1" />
            </div>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Your trusted UK travel agency for unforgettable journeys worldwide.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://facebook.com/unitedholidaysuk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/unitedholidayofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com/unitedholidayuk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Home
              </Link>
              <Link to="/destinations" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Destinations
              </Link>
              <Link to="/about" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+447418359679" className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Phone size={16} />
                <span>074 1835 9679</span>
              </a>
              <a href="https://wa.me/447418359679" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <MessageCircle size={16} />
                <span>WhatsApp Us</span>
              </a>
              <a href="mailto:info@unitedholidays.co.uk" className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Mail size={16} />
                <span>info@unitedholidays.co.uk</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin size={16} className="mt-0.5" />
                <span>London, United Kingdom</span>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/privacy" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Terms & Conditions
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-sm text-primary-foreground/80">
            © {currentYear} United Holidays. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
