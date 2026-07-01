import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceCategory, Booking, SURAT_AREAS } from '../types';
import { SERVICES_DATA } from '../data';
import { X, Calendar, User, Phone, MapPin, ClipboardList, Send, CheckCircle, MessageSquare, Clock } from 'lucide-react';
import { addBookingToCloud } from '../firebase';

interface BookingFormProps {
  selectedCategory: ServiceCategory;
  onClose: () => void;
  onBookingSuccess: () => void;
}

export default function BookingForm({ selectedCategory, onClose, onBookingSuccess }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    alternativePhone: '',
    area: SURAT_AREAS[0],
    customArea: '',
    address: '',
    serviceCategory: selectedCategory,
    serviceType: '',
    bookingDate: '',
    timeSlot: '10:00 AM - 01:00 PM',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // Sync prop changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      serviceCategory: selectedCategory,
      serviceType: getDefaultServiceType(selectedCategory)
    }));
  }, [selectedCategory]);

  const getDefaultServiceType = (category: ServiceCategory) => {
    switch (category) {
      case 'gas_geyser': return 'Gas Geyser Repair & Servicing';
      case 'electric_geyser': return 'Electric Geyser Repair';
      case 'ro_purifier': return 'RO Filters & Membrane Service';
      case 'water_pressure': return 'Booster Pump Installation / Repair';
      case 'waterproofing': return 'Elastomeric Waterproofing (Terrace/Wall)';
      default: return 'General Maintenance';
    }
  };

  // Get service subtypes based on category
  const getServiceTypes = (category: ServiceCategory) => {
    switch (category) {
      case 'gas_geyser':
        return [
          'Gas Geyser Repair & Servicing',
          'New Gas Geyser Installation',
          'Gas Leakage Fixing',
          'No Heating/Burner Maintenance'
        ];
      case 'ro_purifier':
        return [
          'RO Filters & Membrane Service',
          'TDS Check & Water Quality analysis',
          'Complete RO System Installation',
          'RO Repair & Pump Maintenance'
        ];
      case 'electric_geyser':
        return [
          'Electric Geyser Repair',
          'Heating Element Replacement',
          'Thermostat / Auto-cut Faults',
          'New Electric Geyser Installation'
        ];
      case 'water_pressure':
        return [
          'Booster Pump Installation / Repair',
          'Pressure Switch / Automatic Control Check',
          'Whole House Water Pressure System Service'
        ];
      case 'waterproofing':
        return [
          'Elastomeric Waterproofing (Terrace/Wall)',
          'Heat Proofing Treatment (Roof/Terrace)',
          'Damp Proofing & Seepage Repair',
          'Bathroom & Water Tank Waterproofing',
          'Industrial Terrace Waterproofing'
        ];
      default:
        return ['General Repair', 'Inspection / Diagnostic Visit'];
    }
  };

  // Set initial service type on load or category change
  useEffect(() => {
    const types = getServiceTypes(formData.serviceCategory);
    setFormData((prev) => ({ ...prev, serviceType: types[0] }));
  }, [formData.serviceCategory]);

  // Set today as minimum booking date
  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month: string | number = today.getMonth() + 1;
    let day: string | number = today.getDate();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    return `${year}-${month}-${day}`;
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim().replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.address.trim()) newErrors.address = 'Detailed address is required';
    if (formData.area === 'Other' && !formData.customArea.trim()) {
      newErrors.customArea = 'Please enter your area name';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.bookingDate) newErrors.bookingDate = 'Please select a service date';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);

    // Create final booking object
    const bookingId = `SAM-${Date.now().toString().slice(-6)}`;
    const finalArea = formData.area === 'Other' ? formData.customArea : formData.area;

    const newBooking: Booking = {
      id: bookingId,
      customerName: formData.customerName,
      phone: formData.phone,
      alternativePhone: formData.alternativePhone,
      area: finalArea,
      address: formData.address,
      serviceCategory: formData.serviceCategory,
      serviceType: formData.serviceType,
      bookingDate: formData.bookingDate,
      timeSlot: formData.timeSlot,
      notes: formData.notes,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      // Store in Firebase Firestore cloud
      await addBookingToCloud(newBooking);
    } catch (err) {
      console.warn("Failed to save booking to Firebase, using local storage fallback", err);
    }

    // Store in localStorage as backup/offline support
    const existingBookings = localStorage.getItem('shree_ambika_bookings');
    const bookingsArray = existingBookings ? JSON.parse(existingBookings) : [];
    bookingsArray.unshift(newBooking);
    localStorage.setItem('shree_ambika_bookings', JSON.stringify(bookingsArray));

    setCreatedBooking(newBooking);
    setIsSubmitting(false);
    setStep(4); // Success screen
  };

  // Generate customized WhatsApp dispatch text
  const getWhatsAppLink = (booking: Booking) => {
    const serviceLabel = SERVICES_DATA.find((s) => s.category === booking.serviceCategory)?.title || booking.serviceCategory;
    
    const text = `*NEW SERVICE BOOKING*
*Shree Ambika Metal (Surat)*
----------------------------
*Booking ID:* ${booking.id}
*Name:* ${booking.customerName}
*Phone:* ${booking.phone}
${booking.alternativePhone ? `*Alt Phone:* ${booking.alternativePhone}\n` : ''}*Service Category:* ${serviceLabel}
*Service Requested:* ${booking.serviceType}
*Area:* ${booking.area}
*Address:* ${booking.address}
*Date:* ${booking.bookingDate}
*Time Slot:* ${booking.timeSlot}
${booking.notes ? `*Notes:* ${booking.notes}\n` : ''}----------------------------
Please dispatch a service technician. Thank you!`;

    return `https://wa.me/919825127047?text=${encodeURIComponent(text)}`;
  };

  const handleFinish = () => {
    onBookingSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-lg bg-[#121212] border border-white/10 rounded-none shadow-[0_10px_50px_rgba(0,0,0,0.95)] overflow-hidden"
      >
        {/* Header (Only show for steps 1-3) */}
        {step < 4 && (
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#161616]">
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-normal italic text-[#D4AF37]">
                Book Premium Service
              </h3>
              <p className="text-xs text-gray-400 font-sans mt-0.5">
                Surat's trusted experts • 31+ years legacy
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-none bg-black/40 hover:bg-red-500/10 hover:text-red-400 text-gray-400 border border-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Progress bar (Steps 1-3) */}
        {step < 4 && (
          <div className="w-full h-1 bg-black flex">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* STEP 1: Contact Details & Category Selection */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 text-[#D4AF37] text-sm font-bold uppercase tracking-wider border-b border-white/5 pb-2 mb-4 font-mono">
                  <User className="h-4 w-4" />
                  <span className="text-[11px]">Step 1 of 3: Select Service & Contact</span>
                </div>

                {/* Service Category selection buttons */}
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2 font-bold">
                    Service Category
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SERVICES_DATA.map((service) => (
                      <button
                        key={service.category}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            serviceCategory: service.category,
                          }))
                        }
                        className={`p-3 rounded-none border text-xs font-sans font-bold text-left uppercase tracking-wider transition-all cursor-pointer ${
                          formData.serviceCategory === service.category
                            ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.1)]'
                            : 'bg-[#0B0B0B] border-white/10 text-gray-300 hover:border-white/20'
                        }`}
                      >
                        {service.title.split(' ')[0]} Service
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Type Sub-selection */}
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2 font-bold">
                    Select Specific Issue / Request
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData((prev) => ({ ...prev, serviceType: e.target.value }))}
                    className="w-full bg-[#0B0B0B] border border-white/10 rounded-none py-2.5 px-3.5 text-sm text-gray-200 font-sans focus:outline-none focus:border-[#D4AF37]"
                  >
                    {getServiceTypes(formData.serviceCategory).map((type, idx) => (
                      <option key={idx} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name field */}
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="e.g. Sunil Kansara"
                      value={formData.customerName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, customerName: e.target.value }))}
                      className="w-full bg-[#0B0B0B] border border-white/10 rounded-none py-2.5 pl-10 pr-3.5 text-sm text-gray-200 font-sans focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  {errors.customerName && (
                    <p className="text-xs text-red-400 font-sans mt-1">{errors.customerName}</p>
                  )}
                </div>

                {/* Phone fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">
                      Phone Number (WhatsApp)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input
                        type="tel"
                        placeholder="10-digit mobile"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                        className="w-full bg-[#0B0B0B] border border-white/10 rounded-none py-2.5 pl-10 pr-3.5 text-sm text-gray-200 font-sans focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-400 font-sans mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">
                      Alt Phone (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input
                        type="tel"
                        placeholder="Secondary number"
                        maxLength={10}
                        value={formData.alternativePhone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, alternativePhone: e.target.value.replace(/\D/g, '') }))}
                        className="w-full bg-[#0B0B0B] border border-white/10 rounded-none py-2.5 pl-10 pr-3.5 text-sm text-gray-200 font-sans focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Location and Address */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 text-[#D4AF37] text-sm font-bold uppercase tracking-wider border-b border-white/5 pb-2 mb-4 font-mono">
                  <MapPin className="h-4 w-4" />
                  <span className="text-[11px]">Step 2 of 3: Service Address (Surat)</span>
                </div>

                {/* Surat Areas select */}
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">
                    Select Your Area in Surat
                  </label>
                  <select
                    value={formData.area}
                    onChange={(e) => setFormData((prev) => ({ ...prev, area: e.target.value }))}
                    className="w-full bg-[#0B0B0B] border border-white/10 rounded-none py-2.5 px-3.5 text-sm text-gray-200 font-sans focus:outline-none focus:border-[#D4AF37]"
                  >
                    {SURAT_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                    <option value="Other">Other / Not Listed</option>
                  </select>
                </div>

                {/* Custom Area Manual Input */}
                {formData.area === 'Other' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-1"
                  >
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1 font-bold">
                      Enter Area Name manually
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Piplod, Bhatar"
                      value={formData.customArea}
                      onChange={(e) => setFormData((prev) => ({ ...prev, customArea: e.target.value }))}
                      className="w-full bg-[#0B0B0B] border border-white/10 rounded-none py-2 px-3 text-sm text-gray-200 font-sans focus:outline-none focus:border-[#D4AF37]"
                    />
                    {errors.customArea && (
                      <p className="text-xs text-red-400 font-sans mt-1">{errors.customArea}</p>
                    )}
                  </motion.div>
                )}

                {/* Detailed Address */}
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">
                    Detailed Address (Flat/House No., Building, Landmark)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="e.g. Room No 12, Ambika Nagar, near Hari Temple"
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    className="w-full bg-[#0B0B0B] border border-white/10 rounded-none p-3 text-sm text-gray-200 font-sans focus:outline-none focus:border-[#D4AF37] resize-none"
                  ></textarea>
                  {errors.address && (
                    <p className="text-xs text-red-400 font-sans mt-1">{errors.address}</p>
                  )}
                  <p className="text-[10px] text-gray-500 font-sans mt-1">
                    *Our team is based near Haripura. Accurate address ensures same-day reach.
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Scheduling */}
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 text-[#D4AF37] text-sm font-bold uppercase tracking-wider border-b border-white/5 pb-2 mb-4 font-mono">
                    <Calendar className="h-4 w-4" />
                    <span className="text-[11px]">Step 3 of 3: Pick Schedule & Confirm</span>
                  </div>

                  {/* Booking Date */}
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">
                      Preferred Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                      <input
                        type="date"
                        min={getMinDate()}
                        value={formData.bookingDate}
                        onChange={(e) => setFormData((prev) => ({ ...prev, bookingDate: e.target.value }))}
                        className="w-full bg-[#0B0B0B] border border-white/10 rounded-none py-2.5 pl-10 pr-3.5 text-sm text-gray-200 font-sans focus:outline-none focus:border-[#D4AF37] text-left block"
                      />
                    </div>
                    {errors.bookingDate && (
                      <p className="text-xs text-red-400 font-sans mt-1">{errors.bookingDate}</p>
                    )}
                  </div>

                  {/* Time slot picker */}
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2 font-bold">
                      Preferred Time Slot (10 AM - 8 PM)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        '10:00 AM - 01:00 PM',
                        '01:00 PM - 05:00 PM',
                        '05:00 PM - 08:00 PM'
                      ].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, timeSlot: slot }))}
                          className={`p-2.5 rounded-none border text-xs font-sans font-bold text-center transition-all cursor-pointer ${
                            formData.timeSlot === slot
                              ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                              : 'bg-[#0B0B0B] border-white/10 text-gray-300 hover:border-white/20'
                          }`}
                        >
                          <Clock className="h-3 w-3 inline mr-1 -mt-0.5" />
                          {slot.split(' - ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes / Issue description */}
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">
                      Additional Notes / Symptoms (Optional)
                    </label>
                    <div className="relative">
                      <ClipboardList className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
                      <textarea
                        rows={3}
                        placeholder="e.g. Geyser is leaking gas or RO needs filters changed because water tastes salty"
                        value={formData.notes}
                        onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                        className="w-full bg-[#0B0B0B] border border-white/10 rounded-none py-2.5 pl-10 pr-3.5 text-sm text-gray-200 font-sans focus:outline-none focus:border-[#D4AF37] resize-none"
                      ></textarea>
                    </div>
                  </div>

                  {/* Pricing transparency disclaimer */}
                  <div className="bg-[#1A1A1A] border border-white/5 p-3 rounded-none text-[10px] text-gray-400 font-sans leading-relaxed">
                    <span className="text-[#D4AF37] font-semibold uppercase tracking-wider text-[9px] mr-1">Transparency Notice:</span> Service visit diagnostics are conducted by expert technicians. Final estimate is shared after direct visual inspection on site. No hidden charges.
                  </div>
                </motion.div>
              </form>
            )}

            {/* STEP 4: SUCCESS RECEIPT */}
            {step === 4 && createdBooking && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6"
              >
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-none mb-3.5 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <CheckCircle className="h-10 w-10 animate-bounce" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-normal italic text-white">Booking Saved!</h3>
                  <p className="text-xs text-gray-400 font-sans mt-1">
                    Your booking is securely stored. Booking ID: <span className="font-mono text-[#D4AF37] font-bold">{createdBooking.id}</span>
                  </p>
                </div>

                {/* Ticket Receipt detail card */}
                <div className="bg-[#1A1A1A] border border-white/5 rounded-none p-5 text-left text-xs font-sans space-y-3.5 max-w-sm mx-auto">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Client:</span>
                    <span className="text-white font-semibold">{createdBooking.customerName}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Contact:</span>
                    <span className="text-white font-semibold font-mono">{createdBooking.phone}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Service:</span>
                    <span className="text-white font-semibold">{createdBooking.serviceType}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Scheduled:</span>
                    <span className="text-[#D4AF37] font-semibold">{createdBooking.bookingDate} • {createdBooking.timeSlot.split(' - ')[0]}</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-gray-400">Area:</span>
                    <span className="text-white font-semibold">{createdBooking.area}</span>
                  </div>
                </div>

                <div className="space-y-3 max-w-sm mx-auto">
                  {/* WhatsApp confirmation dispatch button */}
                  <a
                    href={getWhatsAppLink(createdBooking)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-black font-sans font-bold py-4 px-6 rounded-none uppercase tracking-widest text-xs transition-colors duration-300"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Confirm Booking on WhatsApp</span>
                  </a>

                  <p className="text-[10px] text-gray-500 font-sans leading-normal">
                    *Sending details via WhatsApp alerts Sunil-bhai instantly to prioritize your ticket.
                  </p>

                  <button
                    onClick={handleFinish}
                    className="w-full border border-white/10 bg-[#0B0B0B] hover:border-[#D4AF37] text-gray-400 hover:text-white py-3 rounded-none text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Close & Return to Home
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer actions for navigation (Steps 1-3) */}
        {step < 4 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#161616]">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="text-[10px] font-sans font-bold uppercase tracking-widest text-gray-400 hover:text-white border border-white/10 hover:border-white/20 bg-black px-4 py-2.5 rounded-none transition-colors cursor-pointer"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-[#D4AF37] hover:bg-[#AA7C11] text-black text-[10px] font-sans font-bold uppercase tracking-widest px-5 py-2.5 rounded-none transition-all cursor-pointer"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-[#D4AF37] hover:bg-[#AA7C11] text-black text-[10px] font-sans font-bold uppercase tracking-widest px-6 py-2.5 rounded-none transition-all cursor-pointer flex items-center space-x-1.5"
              >
                {isSubmitting ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Create Ticket</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
