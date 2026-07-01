import { motion } from 'motion/react';
import { SERVICES_DATA } from '../data';
import { ServiceCategory } from '../types';
import { Check, Flame, Droplet, Zap, Gauge, ArrowUpRight, Shield } from 'lucide-react';

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
      case 'waterproofing':
        return <Shield className="h-6 w-6 text-blue-500" />;
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
      case 'waterproofing':
        return 'border-l-4 border-blue-500/50 hover:border-[#D4AF37]';
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
          {SERVICES_DATA.map((service) => {
            const isWaterproofing = service.category === 'waterproofing';
            
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -3 }}
                className={`bg-[#1A1A1A] border border-white/5 rounded-none p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between group ${
                  isWaterproofing
                    ? 'md:col-span-2 bg-gradient-to-br from-[#121212] via-[#1A1A1A] to-[#121212] border-blue-500/10'
                    : getCategoryBorder(service.category)
                }`}
              >
                {isWaterproofing ? (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full text-left">
                    {/* Left Side: Brand, Description, Warranty, CTA */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="bg-[#111111] p-3 border border-blue-500/20 text-blue-400">
                            <Shield className="h-6 w-6" />
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-blue-400 bg-blue-500/5 px-3 py-1 border border-blue-500/20">
                            {service.pricing}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl sm:text-3xl font-serif font-normal italic text-[#F8F8F8] tracking-wide mb-3">
                          {service.title}
                        </h3>
                        
                        <p className="text-gray-400 font-sans text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Clean Warranty Stamp */}
                      <div className="border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-4 flex items-center space-x-4 relative overflow-hidden">
                        <div className="absolute right-0 bottom-0 opacity-5 translate-x-4 translate-y-4">
                          <Shield className="h-20 w-20 text-[#D4AF37]" />
                        </div>
                        <div className="text-center bg-[#D4AF37] text-black font-serif font-bold text-xs px-2.5 py-1.5 shrink-0 leading-tight">
                          2 to 10
                          <span className="block text-[8px] font-mono uppercase tracking-tight">Years</span>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37]">Written Service Warranty</h4>
                          <p className="text-[11px] text-gray-400 mt-0.5 font-sans leading-normal">
                            Professional assurance on Kaycol multi-layer treatments.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectService(service.category)}
                        className="w-full flex items-center justify-center space-x-2 bg-transparent hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 hover:border-[#D4AF37] font-sans font-bold py-3.5 px-4 rounded-none uppercase tracking-widest text-xs transition-all duration-300 cursor-pointer"
                      >
                        <span>Book Waterproofing Service</span>
                        <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-all" />
                      </button>
                    </div>

                    {/* Right Side: Key Pillars & Applications */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-6 lg:pl-8 lg:border-l lg:border-white/5">
                      <div>
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4 font-bold">Premium Treatments:</p>
                        <div className="space-y-3">
                          {/* Elastomeric */}
                          <div className="bg-[#111111] p-4 border border-white/5 hover:border-blue-500/10 transition-colors">
                            <div className="flex items-center space-x-2.5 text-white font-serif font-normal italic text-base">
                              <span className="text-blue-400 font-sans text-sm">✓</span>
                              <span>Elastomeric Waterproofing</span>
                            </div>
                            <p className="text-xs text-gray-400 font-sans mt-1 ml-5">
                              Flexible • Seamless • Long Lasting protection
                            </p>
                          </div>

                          {/* Heat Proofing */}
                          <div className="bg-[#111111] p-4 border border-white/5 hover:border-amber-500/10 transition-colors">
                            <div className="flex items-center space-x-2.5 text-white font-serif font-normal italic text-base">
                              <span className="text-amber-400 font-sans text-sm">✓</span>
                              <span>Heat Proofing Treatment</span>
                            </div>
                            <p className="text-xs text-gray-400 font-sans mt-1 ml-5">
                              Reflects Heat • Keeps Surfaces Cool • Energy Efficient
                            </p>
                          </div>

                          {/* Damp Proofing */}
                          <div className="bg-[#111111] p-4 border border-white/5 hover:border-emerald-500/10 transition-colors">
                            <div className="flex items-center space-x-2.5 text-white font-serif font-normal italic text-base">
                              <span className="text-emerald-400 font-sans text-sm">✓</span>
                              <span>Damp Proofing Seepage Control</span>
                            </div>
                            <p className="text-xs text-gray-400 font-sans mt-1 ml-5">
                              Prevents Seepage • Protects Structure • Healthy Living
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Applications list */}
                      <div>
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2.5 font-bold">Areas of Application:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {['Terrace', 'Walls', 'Water Tank', 'Bathroom', 'Roof', 'Industrial Terrace'].map((area) => (
                            <span key={area} className="text-xs font-sans text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-none hover:border-[#D4AF37]/30 transition-colors">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </motion.div>
            );
          })}
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
