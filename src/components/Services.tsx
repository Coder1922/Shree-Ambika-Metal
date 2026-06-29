import { motion } from 'motion/react';
import { SERVICES_DATA } from '../data';
import { ServiceCategory } from '../types';
import { Check, Flame, Droplet, Zap, Gauge, ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  onSelectService: (category: ServiceCategory) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  // Map icons dynamically
  const getCategoryIcon = (category: ServiceCategory) => {
    switch (category) {
      case 'gas_geyser':
        return <Flame className="h-6 w-6 text-[#D4AF37]" />;
      case 'ro_purifier':
        return <Droplet className="h-6 w-6 text-blue-400" />;
      case 'electric_geyser':
        return <Zap className="h-6 w-6 text-amber-500" />;
      case 'water_pressure':
        return <Gauge className="h-6 w-6 text-emerald-400" />;
      default:
        return <Flame className="h-6 w-6 text-[#D4AF37]" />;
    }
  };

  const getCategoryBorder = (category: ServiceCategory) => {
    switch (category) {
      case 'gas_geyser':
        return 'border-l-4 border-[#D4AF37] hover:border-r hover:border-r-[#D4AF37]';
      case 'ro_purifier':
        return 'border-l-4 border-white/20 hover:border-[#D4AF37]';
      case 'electric_geyser':
        return 'border-l-4 border-[#D4AF37]/50 hover:border-[#D4AF37]';
      case 'water_pressure':
        return 'border-l-4 border-white/10 hover:border-[#D4AF37]';
      default:
        return 'border-l-4 border-[#D4AF37]';
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="services" className="py-24 bg-[#0F0F0F] text-white relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-3 py-1 rounded-none">
              Our Professional Expertise
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal italic mt-4 tracking-tight text-[#F8F8F8]"
          >
            Premium Solutions for Your Home
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 font-sans text-base sm:text-lg mt-4"
          >
            Get expert same-day installation, rapid repair, and preventive maintenance across Surat. We use only 100% genuine parts with guaranteed reliability.
          </motion.p>
        </div>

        {/* Services Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {SERVICES_DATA.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -3 }}
              className={`bg-[#1A1A1A] border border-white/5 rounded-none p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between group ${getCategoryBorder(
                service.category
              )}`}
            >
              <div>
                {/* Header info in card */}
                <div className="flex items-start justify-between">
                  <div className="bg-[#111111] p-3 border border-white/5 group-hover:border-[#D4AF37]/20 transition-colors">
                    {getCategoryIcon(service.category)}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#D4AF37] bg-[#D4AF37]/5 px-3 py-1 border border-[#D4AF37]/20">
                    {service.pricing}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-normal italic text-[#F8F8F8] mt-6 mb-3 tracking-wide">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 font-sans text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Checklist of Features */}
                <div className="space-y-2.5 mb-8">
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2 font-bold">Service Specialties:</p>
                  {service.features.map((feat, index) => (
                    <div key={index} className="flex items-start space-x-2.5 text-sm text-gray-300">
                      <span className="text-[#D4AF37] shrink-0 font-bold">✓</span>
                      <span className="font-sans leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action trigger for service */}
              <button
                onClick={() => onSelectService(service.category)}
                className="w-full mt-auto flex items-center justify-center space-x-2 bg-transparent hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 hover:border-[#D4AF37] font-sans font-bold py-3.5 px-4 rounded-none uppercase tracking-widest text-xs transition-all duration-300 cursor-pointer"
              >
                <span>Book {service.title.split(' ')[0]} Service</span>
                <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Help Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 bg-[#1A1A1A] border border-white/10 p-6 sm:p-8 rounded-none flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-serif font-normal italic text-white">Have a custom home-service request in Surat?</h3>
            <p className="text-gray-400 font-sans text-xs sm:text-sm mt-1">We also repair water heaters, pressure booster panels, and provide custom plumbing installations.</p>
          </div>
          <a
            href="tel:+919825127047"
            className="bg-[#D4AF37] hover:bg-[#AA7C11] text-black font-sans font-bold px-6 py-4 rounded-none text-xs uppercase tracking-widest transition-all duration-300 whitespace-nowrap"
          >
            Call 9825127047
          </a>
        </motion.div>

      </div>
    </section>
  );
}
