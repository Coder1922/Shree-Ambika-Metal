import { Phone, MessageSquare, MapPin, Award } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export default function Footer({ onOpenBooking, onOpenAdmin }: FooterProps) {
  return (
    <footer className="bg-[#0B0B0B] border-t border-white/10 text-gray-400 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="flex flex-col">
              <span className="text-lg sm:text-xl font-serif font-normal italic tracking-wider text-white">
                SHREE AMBIKA METAL
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#D4AF37] uppercase font-bold">
                Trusted Comfort • Pure Water • Since 1994
              </span>
            </a>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-sm">
              Surat's leading residential service house. We provide premium gas geyser repair, RO water purifier servicing, and booster pump setup with absolute transparency and original warrantied parts.
            </p>
            <div className="flex items-center space-x-2 bg-[#111111] border border-white/10 p-2.5 px-3 rounded-none w-fit text-[11px] text-[#D4AF37] font-mono">
              <Award className="h-4 w-4 shrink-0" />
              <span>31+ Years of Dedicated Expertise in Surat</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4 text-xs">
            <h4 className="font-mono text-white uppercase tracking-widest text-[11px] font-bold">Quick Directory</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider text-[10px]">Our Specialties</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider text-[10px]">Why Choose Us</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider text-[10px]">Customer Feedback</a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider text-[10px]">Address & Maps</a>
              </li>
              <li>
                <button 
                  onClick={onOpenAdmin} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left uppercase tracking-wider text-[10px] font-bold text-gray-500 hover:underline"
                >
                  Admin Login
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contacts */}
          <div className="md:col-span-4 space-y-4 text-xs">
            <h4 className="font-mono text-white uppercase tracking-widest text-[11px] font-bold">Direct Support Lines</h4>
            <div className="space-y-3">
              <a 
                href="tel:+919825127047" 
                className="flex items-center space-x-2.5 text-gray-300 hover:text-[#D4AF37] transition-colors"
              >
                <Phone className="h-4 w-4 text-[#D4AF37]" />
                <span className="font-mono">Primary: 98251 27047 (Sunil Kansara)</span>
              </a>

              <div className="flex items-start space-x-2.5 text-gray-500 leading-normal">
                <MapPin className="h-4 w-4 text-gray-600 shrink-0 mt-0.5" />
                <span>Haripura Main Road, near Naren Stationery, Surat, Gujarat.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright area */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-600">
          <p>© {new Date().getFullYear()} Shree Ambika Metal Surat. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">|</span>
            <button
              onClick={onOpenBooking}
              className="text-[#D4AF37] hover:underline cursor-pointer uppercase tracking-wider text-[10px] font-bold"
            >
              Instant Service Booking
            </button>
            <span className="text-gray-700">|</span>
            <button
              onClick={onOpenAdmin}
              className="text-gray-500 hover:text-[#D4AF37] hover:underline cursor-pointer uppercase tracking-wider text-[10px] font-bold"
            >
              Admin Login
            </button>
            <span className="text-gray-700">|</span>
            <span className="text-gray-700">Owner: Sunil Kansara</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
