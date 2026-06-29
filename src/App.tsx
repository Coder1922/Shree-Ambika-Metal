import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';
import AdminPanel from './components/AdminPanel';
import { ServiceCategory } from './types';
import { Phone, MessageSquare, ShieldAlert, Check } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('shree_ambika_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('gas_geyser');
  const [notification, setNotification] = useState<string | null>(null);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('shree_ambika_theme', nextTheme);
  };

  const handleOpenBooking = (category: ServiceCategory = 'gas_geyser') => {
    setSelectedCategory(category);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = () => {
    setNotification('Your booking was successfully registered. Click the WhatsApp button to alert our team instantly!');
    setTimeout(() => {
      setNotification(null);
    }, 6000);
  };

  return (
    <div className={theme}>
      <div className="min-h-screen bg-[#0B0B0B] text-white font-sans selection:bg-[#D4AF37] selection:text-black antialiased relative transition-colors duration-300">
        
        {/* Premium Ambient Radial Glow */}
        <div className="fixed top-0 inset-x-0 h-[600px] bg-gradient-to-b from-[#D4AF37]/5 to-transparent pointer-events-none -z-10"></div>

        {/* Floating Action Elements (Calls/WhatsApp) */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3.5 items-end">
          
          {/* Dynamic Service Notification Toast */}
          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.9 }}
                className="mr-2 mb-2 bg-[#121212] border border-emerald-500/30 p-4 rounded-xl shadow-2xl max-w-sm flex items-start space-x-3 text-left"
              >
                <div className="bg-emerald-500/10 p-1.5 rounded-full text-emerald-400 shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-sans font-bold text-white">Ticket Created Successfully</p>
                  <p className="text-[11px] text-gray-400 font-sans mt-0.5 leading-normal">{notification}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Dial Dialpad Trigger */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="tel:+919825127047"
            className="flex items-center space-x-2 bg-gradient-to-r from-gray-900 to-black border border-gray-800 hover:border-[#D4AF37]/50 p-3 sm:px-4 rounded-full text-[#D4AF37] hover:text-white shadow-2xl transition-all group"
            title="Call Sunil Kansara"
          >
            <Phone className="h-5 w-5 animate-pulse" />
            <span className="text-xs font-semibold font-mono hidden sm:inline group-hover:text-[#D4AF37]">
              Call: 9825127047
            </span>
          </motion.a>

          {/* Floating WhatsApp Action Anchor */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/919825127047?text=Hello%20Shree%20Ambika%20Metal%20team%2C%20I%20have%20an%20inquiry%20regarding%20water%20heater%20/%20purifier%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-black p-3.5 rounded-full shadow-2xl transition-all cursor-pointer"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="h-5 w-5 fill-black" />
            <span className="text-xs font-bold hidden sm:inline">
              WhatsApp Inquiry
            </span>
          </motion.a>
        </div>

        {/* 1. Header Navigation */}
        <Navbar
          onOpenBooking={() => handleOpenBooking('gas_geyser')}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

      {/* 2. Above-the-fold Hero */}
      <Hero onOpenBooking={() => handleOpenBooking('gas_geyser')} />

      {/* 3. Services Grid */}
      <Services onSelectService={(category) => handleOpenBooking(category)} />

      {/* 4. Heritage Metrics */}
      <WhyChooseUs />

      {/* 5. Customer Testimonials */}
      <Testimonials />

      {/* 6. Physical Maps & Coordinates */}
      <ContactSection />

      {/* 7. Footer Credits */}
      <Footer
        onOpenBooking={() => handleOpenBooking('gas_geyser')}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Overlays / Modals */}
      <AnimatePresence>
        {isBookingOpen && (
          <BookingForm
            selectedCategory={selectedCategory}
            onClose={() => setIsBookingOpen(false)}
            onBookingSuccess={handleBookingSuccess}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAdminOpen && (
          <AdminPanel onClose={() => setIsAdminOpen(false)} />
        )}
      </AnimatePresence>

    </div>
  </div>
  );
}
