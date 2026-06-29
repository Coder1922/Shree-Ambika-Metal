import { motion } from 'motion/react';
import { Award, Users, Shield, Clock, HardHat, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const stats = [
    {
      id: 'stat-1',
      icon: <Award className="h-7 w-7 text-[#D4AF37]" />,
      value: '31+',
      title: 'Years of Experience',
      desc: 'Serving families across Surat since 1994 with pure honesty.',
    },
    {
      id: 'stat-2',
      icon: <Users className="h-7 w-7 text-blue-400" />,
      value: '15,000+',
      title: 'Happy Households',
      desc: 'Trusted local partner for premium water and warmth setups.',
    },
    {
      id: 'stat-3',
      icon: <Clock className="h-7 w-7 text-emerald-400" />,
      value: 'Same-Day',
      title: 'Rapid Dispatch',
      desc: 'Technicians on the go to resolve issues on your schedule.',
    },
    {
      id: 'stat-4',
      icon: <Shield className="h-7 w-7 text-[#D4AF37]" />,
      value: '100% Genuine',
      title: 'Certified Parts Only',
      desc: 'Every spare part we install is fully original and warrantied.',
    }
  ];

  const valueProps = [
    {
      title: 'Deep Roots in Surat',
      desc: 'Based in Haripura, Gheekanta Road, we have been a cornerstone of local home solutions for over three decades. We understand Surat\'s water quality challenges and geyser safety requisites intimately.',
    },
    {
      title: 'Owner-Verified Service Quality',
      desc: 'Sunil-bhai Kansara oversees operations directly. We don\'t outsource to unverified third-party contractors. Our technicians are factory-trained, polite, clean, and highly professional.',
    },
    {
      title: 'Upfront & Fair Pricing',
      desc: 'No surprise charges or hidden diagnostic fees. You get a transparent cost estimate right after inspection, before any repair work starts. Real work, real rates.',
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-[#0B0B0B] text-white relative overflow-hidden">
      {/* Decorative Light Glow */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-[#D4AF37]/5 filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Core Description & Values */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4 text-center lg:text-left">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-3 py-1 rounded-none">
                The Heritage of Ambika
              </span>
              <p></p>
              <p></p>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal italic tracking-tight text-[#F8F8F8]">
                Surat's Trusted Home Service Brand Since 1994
              </h2>
              <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed">
                Shree Ambika Metal was founded with a single mission: to deliver safe, transparent, and premium water and heating solutions to households in Surat. Today, after 31 years, our commitment to quality craftsmanship and honest pricing remains unchanged.
              </p>
            </div>

            {/* Custom Value Propositions */}
            <div className="space-y-6">
              {valueProps.map((prop, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex space-x-4 border-l-2 border-[#D4AF37] pl-4 py-1"
                >
                  <div>
                    <h4 className="text-base font-sans font-bold text-[#D4AF37] uppercase tracking-wider text-xs">{prop.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">{prop.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Statistics Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15, delay: idx * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="bg-[#1A1A1A] border-l-4 border-[#D4AF37] p-6 rounded-none flex flex-col justify-between transition-all duration-300"
                >
                  <div className="bg-[#111111] p-3 border border-white/5 w-fit mb-6">
                    {stat.icon}
                  </div>
                  <div>
                    <span className="text-3xl sm:text-4xl font-serif font-normal italic text-white block tracking-tight mb-2">
                      {stat.value}
                    </span>
                    <h3 className="text-xs uppercase tracking-widest font-sans font-bold text-[#D4AF37] mb-1.5">
                      {stat.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-sans leading-relaxed">
                      {stat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Verification Seal */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 bg-[#1A1A1A] border border-white/10 rounded-none p-4 flex items-center space-x-3.5 text-xs text-gray-400"
            >
              <div className="p-2 bg-emerald-500/10 rounded-none text-emerald-400">
                <Sparkles className="h-4 w-4" />
              </div>
              <p className="font-sans leading-relaxed">
                <span className="text-white font-bold uppercase tracking-wider text-[10px] mr-1.5">Quality Guarantee:</span> We conduct post-service quality checks and TDS verification on every single RO service.
              </p>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
