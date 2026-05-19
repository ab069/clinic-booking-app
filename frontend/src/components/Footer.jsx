import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeartPulse } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-2xl text-secondary mb-4">
              <FaHeartPulse className="text-red-500" />
              MediCare
            </div>
            <p className="text-gray-400">
              Quality healthcare at your fingertips. Book appointments with trusted doctors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-secondary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-secondary transition">
                  Doctors
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-secondary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-secondary transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/doctors?spec=General%20Checkup" className="hover:text-secondary transition">
                  General Checkup
                </Link>
              </li>
              <li>
                <Link to="/doctors?spec=Dental%20Care" className="hover:text-secondary transition">
                  Dental Care
                </Link>
              </li>
              <li>
                <Link to="/doctors?spec=Cardiology" className="hover:text-secondary transition">
                  Cardiology
                </Link>
              </li>
              <li>
                <Link to="/doctors?spec=Neurology" className="hover:text-secondary transition">
                  Neurology
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact & Follow</h3>
            <p className="text-gray-400 mb-4">
              📞 +92 (042) 6840-5000
              <br />
              📍 BZU Multan, Pakistan
              <br />
              📧 info@medicare.com
            </p>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-secondary transition">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-secondary transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-secondary transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-secondary transition">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; 2026 MediCare. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-secondary transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-secondary transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-secondary transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
