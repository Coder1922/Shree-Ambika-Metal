import { motion } from 'motion/react';
import { Phone, CheckCircle2, Star, Calendar, MessageSquare, ShieldAlert } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const features = [
    { text: 'Same-Day Service', desc: 'Fast technician dispatch across Surat' },
    { text: 'Expert Technicians', desc: '31+ years of reliable hands-on skills' },
    { text: '4.7 Rated Service', desc: 'Trusted by over 15,000+ happy families' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0B0B0B] text-white pt-24 pb-16 overflow-hidden">
      {/* Decorative premium background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#D4AF37] filter blur-[150px] opacity-25"></div>
        <div className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] rounded-full bg-[#AA7C11] filter blur-[180px] opacity-20"></div>
        
        {/* Abstract golden luxury grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left"
          >
            {/* Tagline / Establishment Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-4 py-2 rounded-none self-center lg:self-start shadow-[0_0_15px_rgba(212,175,55,0.05)]"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-[#D4AF37] uppercase font-bold">
                ESTD 1994 • SURAT'S PREMIER GEYSER & RO HOUSE
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal leading-[1.1] tracking-tight text-[#F8F8F8]"
            >
              Premium <span className="text-[#D4AF37] italic">Geyser & RO</span> <br className="hidden sm:inline" />
              Services in Surat
            </motion.h1>

            {/* Sub-description */}
            <motion.p 
              variants={itemVariants}
              className="text-gray-400 text-base sm:text-lg md:text-xl font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Expert technicians for gas geysers, water purifiers, and home comfort solutions. Trusted by families for over 31 years with certified parts and upfront honest pricing.
            </motion.p>

            {/* Quick trust metrics row */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 pb-2"
            >
              {features.map((feat, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-2.5 bg-[#161616] border border-white/10 p-4 rounded-none text-left hover:border-[#D4AF37] transition-all duration-300"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#D4AF37] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-sans font-semibold text-white tracking-wide">{feat.text}</h4>
                    <p className="text-xs text-gray-400 font-sans mt-0.5">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Large Interactive Action Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              {/* Primary Call Booking */}
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#D4AF37] text-black font-sans font-bold px-8 py-4 rounded-none uppercase tracking-widest text-xs hover:bg-[#c49e2e] transition-all duration-300 cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Service Instantly</span>
              </button>

              {/* Direct call button */}
              <a
                href="tel:+919825127047"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 border border-white/20 hover:border-[#D4AF37] text-white font-sans font-bold px-8 py-4 rounded-none uppercase tracking-widest text-xs bg-transparent transition-colors duration-300"
              >
                <Phone className="h-4 w-4" />
                <span>Call: 9825127047</span>
              </a>
            </motion.div>

            {/* Quick Contact Info */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 pt-2 text-xs font-mono text-gray-500"
            >
              <span className="flex items-center space-x-1">
                <Star className="h-3.5 w-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                <span className="text-gray-300 font-semibold">4.7 / 5.0 Rating</span>
              </span>
              <span className="hidden sm:inline text-gray-800">|</span>
              <span>Owner: Sunil Kansara</span>
              <span className="hidden sm:inline text-gray-800">|</span>
              <span>Haripura, Surat</span>
            </motion.div>
          </motion.div>

          {/* Hero Right Visual Column - Styled interactive layout representing water & heating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Glass Box - Home Comfort Highlights */}
            <div className="relative bg-[#111111] border border-white/10 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden rounded-none">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full filter blur-xl"></div>
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-gray-500">Shree Ambika Metal</span>
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold">Surat Local Expert</div>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-normal italic mb-4 text-[#D4AF37]">Service Hotlines</h3>
              
              <div className="space-y-4">
                {/* Contact Card 1 */}
                <div className="bg-[#1A1A1A] border-l-4 border-[#D4AF37] p-4 rounded-none flex items-center justify-between group">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#D4AF37]/10 p-2 text-[#D4AF37]">
                      <Phone className="h-4 w-4 animate-pulse" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Primary Call</p>
                      <p className="text-base font-mono font-bold text-[#F8F8F8] tracking-wide">98251 27047</p>
                    </div>
                  </div>
                  <a 
                    href="tel:+919825127047"
                    className="bg-white text-black text-[10px] uppercase tracking-widest font-bold px-3 py-2 rounded-none hover:bg-gray-200 transition-all"
                  >
                    Call
                  </a>
                </div>

                {/* Contact Card 3 */}
                <a 
                  href="https://wa.me/919825127047?text=Hello%20Shree%20Ambika%20Metal%20team%2C%20I%20need%20a%20technician%20for%20my%20geyser%20/%20RO%20purifier."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1A1A1A] border-l-4 border-emerald-500/50 p-4 rounded-none flex items-center justify-between transition-all duration-300 group cursor-pointer hover:border-emerald-500"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-500/10 p-2 text-emerald-400">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Fast Response</p>
                      <p className="text-xs font-sans font-bold text-[#F8F8F8]">WhatsApp Message</p>
                    </div>
                  </div>
                  <span className="text-emerald-400 text-xs font-semibold group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>

              {/* Business Details List */}
              <div className="mt-6 pt-4 border-t border-white/10 text-xs space-y-2 text-gray-400 font-sans">
                <div className="flex justify-between">
                  <span>Hours:</span>
                  <span className="text-white font-medium">9:00 AM to 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Days:</span>
                  <span className="text-white font-medium">Monday — Saturday</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="text-white font-medium text-right max-w-[180px] truncate" title="Haripura, Surat">Haripura, Surat, Gujarat</span>
                </div>
              </div>
            </div>

            {/* Glowing Ring Decor */}
            <div className="absolute -inset-1.5 border border-[#D4AF37]/30 rounded-none -z-10"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
