import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageSquare, Menu, X, Clock, Award, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function Navbar({ onOpenBooking, theme, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [currentTimeStr, setCurrentTimeStr] = useState('');

  // Track scroll status for glassmorphism background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live status (Open vs Closed) check (9:00 AM to 9:00 PM)
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeInMinutes = hours * 60 + minutes;

      const openTime = 9 * 60; // 9:00 AM
      const closeTime = 21 * 60; // 9:00 PM

      const isOpenTime = timeInMinutes >= openTime && timeInMinutes < closeTime;
      setIsOpenNow(isOpenTime);

      // Simple time formatting for display
      let displayHours = hours % 12;
      displayHours = displayHours ? displayHours : 12;
      const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      setCurrentTimeStr(`${displayHours}:${displayMinutes} ${ampm}`);
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { name: 'Services', href: '#services' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Customer Reviews', href: '#reviews' },
    { name: 'Our Location', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B0B] border-b border-[#D4AF37]/30 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.9)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-nowrap gap-4">
          {/* Logo / Brand Name */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-[#D4AF37] flex items-center justify-center shrink-0">
              <span className="text-[#D4AF37] font-serif font-bold text-lg sm:text-xl">A</span>
            </div>
            <div className="leading-tight">
              <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-serif font-bold tracking-tight text-[#F8F8F8] group-hover:text-[#D4AF37] transition-colors duration-300 whitespace-nowrap">
                SHREE AMBIKA METAL
              </h1>
              <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#D4AF37] font-semibold whitespace-nowrap">
                Trusted Since 1994
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 shrink-0 flex-nowrap">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 relative py-1 whitespace-nowrap"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Action Callouts */}
          <div className="hidden md:flex items-center space-x-2.5 lg:space-x-4 shrink-0 flex-nowrap">
            {/* Business Status Dot */}
            <div className="hidden lg:flex items-center space-x-2 bg-white/5 border border-[#D4AF37]/20 px-2.5 py-1.5 text-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpenNow ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isOpenNow ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              </span>
              <span className="text-gray-300 font-medium text-[10px] uppercase tracking-wider whitespace-nowrap">
                {isOpenNow ? 'Open Now' : 'Closed'}
              </span>
            </div>

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 text-[#D4AF37] border border-white/10 hover:border-[#D4AF37]/30 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Premium CTA Button */}
            <button
              onClick={onOpenBooking}
              className="bg-[#D4AF37] text-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#c49e2e] transition-colors duration-300 cursor-pointer shrink-0 whitespace-nowrap"
            >
              Book Service
            </button>
          </div>

          {/* Mobile Right Icons (Status Indicator + Hamburger) */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Mobile Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-2 rounded-full text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all duration-300 cursor-pointer"
              aria-label="Toggle Theme"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Quick mobile call button */}
            <a
              href="tel:+919825127047"
              className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-2 rounded-full text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all duration-300"
              aria-label="Call Sunil Kansara"
            >
              <Phone className="h-4 w-4" />
            </a>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-black/50 border border-gray-800 p-2 rounded-full text-gray-300 hover:text-[#D4AF37] transition-all"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-[#0F0F0F] border-b border-[#D4AF37]/20 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 shadow-2xl">
              {/* Dynamic Status for Mobile */}
              <div className="flex items-center space-x-2 bg-black/50 px-3 py-2 rounded-lg text-xs justify-center border border-gray-800">
                <span className={`relative flex h-2 w-2`}>
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpenNow ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isOpenNow ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                </span>
                <span className="text-gray-300 font-medium">
                  {isOpenNow ? 'Open Now: We are responding!' : `Closed • Opens at 09:00 AM`}
                </span>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-2">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-sans font-medium text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 py-2.5 px-4 rounded-lg transition-all"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* CTA Row */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="https://wa.me/919825127047?text=Hello%20Shree%20Ambika%20Metal%2C%20I%20need%20to%20book%20a%20service."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-all duration-300"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenBooking();
                  }}
                  className="py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black text-sm font-semibold hover:shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-all duration-300 cursor-pointer text-center"
                >
                  Book Service
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
