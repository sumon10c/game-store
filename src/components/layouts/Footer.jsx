import React from "react";
import Link from "next/link";
import {
  Gamepad2,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* 1. Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase italic text-white">
                Game<span className="text-indigo-500">Store</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              The ultimate destination for gamers. Get the latest titles,
              trending releases, and exclusive deals all in one place. Level up
              your library today.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="hover:text-indigo-500 transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="hover:text-indigo-500 transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="hover:text-indigo-500 transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="#"
                className="hover:text-indigo-500 transition-colors"
              >
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  href="/"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/games"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Games Store
                </Link>
              </li>
              <li>
                <Link
                  href="/trending"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Trending Now
                </Link>
              </li>
              <li>
                <Link
                  href="/new-releases"
                  className="hover:text-indigo-400 transition-colors"
                >
                  New Releases
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Support */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6">
              Support
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-indigo-500" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-indigo-500" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-indigo-500" />
                <span>support@gamestore.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider border-slate-800 my-10"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p>© 2026 GameStore. All rights reserved.</p>
          <div className="flex gap-6 italic font-bold text-xs uppercase tracking-widest text-slate-500">
            <span>Designed by Sumon</span>
            <span>Full-Stack MERN Developer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
