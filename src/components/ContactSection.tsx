import { MapPin, Phone, Mail, Clock, ShieldAlert, Sparkles } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="location" className="py-24 bg-[#0B0B0B] text-white relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Coordinates / Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-3 py-1 rounded-none">
                Visit Our Service Center
              </span>
              <p></p>
              <p></p>
              
              <h2 className="text-3xl sm:text-4xl font-serif font-normal italic tracking-tight text-[#F8F8F8]">
                Shree Ambika Metal Surat
              </h2>
              <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed">
                Our main workshop and service hub is situated at Haripura in the heart of Surat. Drop by for in-store consultation, instant geyser checkout, or filtration discussions.
              </p>
            </div>

            {/* Information Cards */}
            <div className="space-y-4">
              {/* Address card */}
              <div className="bg-[#1A1A1A] border border-white/5 p-5 rounded-none flex items-start space-x-4">
                <div className="bg-[#111111] border border-white/5 p-2.5 rounded-none text-[#D4AF37] shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-bold text-white tracking-wide uppercase text-xs text-[#D4AF37]">Main Workshop Address</h4>
                  <p className="text-xs sm:text-sm text-gray-400 font-sans mt-1.5 leading-relaxed">
                    5/1200, Haripura Gheekanta Road,<br />
                    Nr. Naren Stationery, Haripura Main Road,<br />
                    Surat - 395003, Gujarat, India.
                  </p>
                </div>
              </div>

              {/* Timing Card */}
              <div className="bg-[#1A1A1A] border border-white/5 p-5 rounded-none flex items-start space-x-4">
                <div className="bg-[#111111] border border-white/5 p-2.5 rounded-none text-[#D4AF37] shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-bold text-white tracking-wide uppercase text-xs text-[#D4AF37]">Operational Hours</h4>
                  <p className="text-xs sm:text-sm text-gray-400 font-sans mt-1.5">
                    09:00 AM to 09:00 PM <span className="text-[#D4AF37]">•</span> Monday — Saturday
                  </p>
                  <p className="text-[10px] text-gray-500 font-sans mt-1.5 leading-normal">
                    *Closed on Sundays and major public holidays. Same-day booking requests must be submitted before 06:00 PM.
                  </p>
                </div>
              </div>

              {/* Direct Communications */}
              <div className="bg-[#1A1A1A] border border-white/5 p-5 rounded-none flex items-start space-x-4">
                <div className="bg-[#111111] border border-white/5 p-2.5 rounded-none text-[#D4AF37] shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-bold text-white tracking-wide uppercase text-xs text-[#D4AF37]">Digital Communication</h4>
                  <p className="text-xs sm:text-sm text-gray-400 font-mono mt-1.5 select-all">
                    sunilrealhot@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Quick trust reassurance */}
            <div className="bg-[#1A1A1A] border border-white/10 p-4 rounded-none text-xs text-gray-400 flex items-center space-x-3 leading-normal">
              <ShieldAlert className="h-5 w-5 text-[#D4AF37] shrink-0" />
              <span>We strictly comply with safety codes for water heater LPG installations, ensuring proper venting and secure leak checks on every service call.</span>
            </div>
          </div>

          {/* Right Column: Google Maps Iframe */}
          <div className="lg:col-span-7 h-full min-h-[380px] sm:min-h-[450px] relative rounded-none overflow-hidden border border-white/10 group shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
            <div className="absolute top-4 left-4 z-10 bg-black/90 border border-white/10 rounded-none px-4 py-2.5 shadow-lg text-xs font-sans">
              <p className="text-white font-bold flex items-center space-x-1 uppercase tracking-wider text-[10px]">
                <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Haripura Main Service Zone</span>
              </p>
              <p className="text-gray-400 text-[10px] mt-0.5">Prompt reach across Surat city limits</p>
            </div>
            
            <iframe
              title="Shree Ambika Metal Google Location Map"
              src="https://maps.google.com/maps?q=5/1200,%20Haripura%20Gheekanta%20Road,%20Near%20Naren%20Stationery,%20Surat,%20Gujarat%20395003&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale contrast-125 opacity-85 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            ></iframe>
            
            {/* Ambient gold border overlay glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-none filter blur-sm opacity-10 pointer-events-none group-hover:opacity-25 transition-opacity"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
