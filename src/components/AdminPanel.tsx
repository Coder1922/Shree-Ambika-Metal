import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Booking, ServiceCategory } from '../types';
import { SERVICES_DATA } from '../data';
import { X, Lock, Eye, Check, AlertCircle, Phone, MessageSquare, Search, Trash2, CheckCircle2, ListFilter, Activity, RefreshCw } from 'lucide-react';
import { 
  fetchBookingsFromCloud, 
  updateBookingStatusInCloud, 
  deleteBookingFromCloud, 
  clearAllBookingsFromCloud 
} from '../firebase';

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Load bookings from Cloud Firestore with localStorage fallback
  const loadBookings = async () => {
    setIsLoading(true);
    try {
      const cloudBookings = await fetchBookingsFromCloud();
      setBookings(cloudBookings);
      localStorage.setItem('shree_ambika_bookings', JSON.stringify(cloudBookings));
    } catch (err) {
      console.warn("Could not load bookings from Firebase. Using local backup.", err);
      const stored = localStorage.getItem('shree_ambika_bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      } else {
        setBookings([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadBookings();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (passcode === 'sk1911') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid passcode.');
    }
  };

  // Update Booking Status
  const handleUpdateStatus = async (id: string, newStatus: Booking['status']) => {
    const updated = bookings.map((b) => {
      if (b.id === id) {
        return { ...b, status: newStatus };
      }
      return b;
    });

    // Optimistic local update
    localStorage.setItem('shree_ambika_bookings', JSON.stringify(updated));
    setBookings(updated);

    try {
      await updateBookingStatusInCloud(id, newStatus);
    } catch (err) {
      console.error("Failed to update status in Cloud: ", err);
    }
  };

  // Delete/Archive individual booking
  const handleDeleteBooking = (id: string) => {
    setConfirmDeleteId(id);
  };

  const executeDeleteBooking = async (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    
    // Optimistic local update
    localStorage.setItem('shree_ambika_bookings', JSON.stringify(updated));
    setBookings(updated);
    setConfirmDeleteId(null);

    try {
      await deleteBookingFromCloud(id);
    } catch (err) {
      console.error("Failed to delete booking in Cloud: ", err);
    }
  };

  // Reset demo bookings back to empty or seed with mock data
  const handleResetData = () => {
    setConfirmReset(true);
  };

  const executeResetData = async () => {
    const bookingsToClear = [...bookings];
    
    localStorage.removeItem('shree_ambika_bookings');
    setBookings([]);
    setConfirmReset(false);

    try {
      await clearAllBookingsFromCloud(bookingsToClear);
    } catch (err) {
      console.error("Failed to clear bookings in Cloud: ", err);
    }
  };

  // Filter logic
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      b.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' ? true : b.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' ? true : b.serviceCategory === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Calculate quick stats
  const totalInquiries = bookings.length;
  const pendingInquiries = bookings.filter((b) => b.status === 'pending').length;
  const assignedInquiries = bookings.filter((b) => b.status === 'assigned').length;
  const completedInquiries = bookings.filter((b) => b.status === 'completed').length;

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'assigned':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400 border border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#121212] border border-white/10 rounded-none shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#161616]">
          <div className="flex items-center space-x-2.5">
            <div className="bg-[#111111] p-2 rounded-none text-[#D4AF37] border border-white/10">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-normal italic text-[#D4AF37]">
                Partner Portal Console
              </h3>
              <p className="text-xs text-gray-400 font-sans mt-0.5">
                Shree Ambika Metal • Live Inbound Inquiries Tracker
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-none bg-black/40 hover:bg-red-500/10 hover:text-red-400 text-gray-400 border border-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* LOGIN SCREEN */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center space-y-6 text-center max-w-md mx-auto my-12">
            <div className="p-3 bg-[#D4AF37]/10 rounded-none text-[#D4AF37] border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
              <Lock className="h-8 w-8" />
            </div>
            <div>
              <h4 className="text-lg font-serif font-normal italic text-white">Enter Security Passcode</h4>
              <p className="text-xs text-gray-400 mt-1 font-sans">
                Please verify credentials to manage customer bookings, call customers, and resolve tickets.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-3">
              <div>
                <input
                  type="password"
                  placeholder="Enter Passcode"
                  maxLength={6}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-none py-3 px-4 text-center text-lg tracking-[0.4em] font-mono font-bold text-[#D4AF37] focus:outline-none focus:border-[#D4AF37]"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-xs text-red-400 font-sans flex items-center justify-center space-x-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>{error}</span>
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-[#D4AF37] text-black font-sans font-bold py-3.5 rounded-none uppercase tracking-widest text-xs hover:bg-[#c49e2e] transition-colors duration-300 cursor-pointer"
              >
                Authenticate & Open Panel
              </button>
            </form>
          </div>
        ) : (
          /* DASHBOARD SCREEN */
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-none">
                <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest font-bold">Total Tickets</p>
                <p className="text-2xl font-serif font-normal italic text-white mt-1">{totalInquiries}</p>
              </div>
              <div className="bg-[#1A1A1A] border-l-4 border-amber-500 p-4 rounded-none">
                <p className="text-[9px] font-mono text-amber-500/60 uppercase tracking-widest font-bold">Pending</p>
                <p className="text-2xl font-serif font-normal italic text-amber-400 mt-1">{pendingInquiries}</p>
              </div>
              <div className="bg-[#1A1A1A] border-l-4 border-blue-500 p-4 rounded-none">
                <p className="text-[9px] font-mono text-blue-500/60 uppercase tracking-widest font-bold">Assigned</p>
                <p className="text-2xl font-serif font-normal italic text-blue-400 mt-1">{assignedInquiries}</p>
              </div>
              <div className="bg-[#1A1A1A] border-l-4 border-emerald-500 p-4 rounded-none">
                <p className="text-[9px] font-mono text-emerald-500/60 uppercase tracking-widest font-bold">Completed</p>
                <p className="text-2xl font-serif font-normal italic text-emerald-400 mt-1">{completedInquiries}</p>
              </div>
            </div>

            {/* Filter controls row */}
            <div className="bg-[#1A1A1A] border border-white/10 p-4 rounded-none flex flex-col md:flex-row gap-3 items-center justify-between">
              
              {/* Search input */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search Name, Phone, Area..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0B0B0B] border border-white/10 rounded-none py-2 pl-9 pr-3 text-xs text-gray-300 font-sans focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Status & category drop downs */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                {/* Category dropdown */}
                <div className="flex items-center space-x-1.5 bg-[#0B0B0B] border border-white/10 px-2 rounded-none text-xs">
                  <ListFilter className="h-3.5 w-3.5 text-gray-500" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-transparent border-0 text-gray-300 py-2 focus:outline-none"
                  >
                    <option value="all">All Specialties</option>
                    <option value="gas_geyser">Gas Geyser</option>
                    <option value="ro_purifier">RO Purifier</option>
                    <option value="electric_geyser">Electric Geyser</option>
                    <option value="water_pressure">Pressure System</option>
                    <option value="waterproofing">Waterproofing</option>
                  </select>
                </div>

                {/* Status dropdown */}
                <div className="flex items-center space-x-1.5 bg-[#0B0B0B] border border-white/10 px-2 rounded-none text-xs">
                  <ListFilter className="h-3.5 w-3.5 text-gray-500" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-transparent border-0 text-gray-300 py-2 focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="assigned">Assigned</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Reload button */}
                <button
                  onClick={loadBookings}
                  disabled={isLoading}
                  className="p-2 border border-white/10 bg-black/40 hover:border-[#D4AF37] text-gray-400 hover:text-[#D4AF37] rounded-none transition-colors cursor-pointer disabled:opacity-50"
                  title="Reload Bookings"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>

            </div>

            {/* Bookings Tracker List */}
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12 bg-[#1A1A1A] border border-white/10 border-dashed rounded-none space-y-3">
                <AlertCircle className="h-8 w-8 text-gray-600 mx-auto" />
                <div>
                  <h5 className="text-sm font-sans font-semibold text-white">No service request tickets found</h5>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                    Try adjusting your filters, or check again later. Bookings created from the client form are saved here instantly.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-[#1A1A1A] border border-white/5 rounded-none p-5 hover:border-[#D4AF37]/30 transition-all duration-300"
                  >
                    {/* Header info inside card */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 pb-4 border-b border-white/5">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs text-[#D4AF37] font-bold">
                            {b.id}
                          </span>
                          <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-none font-bold ${getStatusBadge(b.status)}`}>
                            {b.status}
                          </span>
                        </div>
                        <h4 className="text-base font-sans font-bold text-white mt-1.5 flex items-center">
                          {b.customerName}
                          <span className="text-xs font-mono text-gray-500 ml-2 font-normal">
                            ({b.area})
                          </span>
                        </h4>
                      </div>

                      {/* Date & Slot info */}
                      <div className="text-left sm:text-right text-xs font-sans">
                        <p className="text-gray-400">Scheduled Date:</p>
                        <p className="text-[#D4AF37] font-bold mt-0.5">{b.bookingDate}</p>
                        <p className="text-gray-400 mt-1">{b.timeSlot}</p>
                      </div>
                    </div>

                    {/* Content specs */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 text-xs font-sans">
                      <div className="md:col-span-5 space-y-1.5">
                        <p className="text-gray-400 uppercase font-mono text-[9px] tracking-wider">Service Type</p>
                        <p className="text-white font-semibold">{b.serviceType}</p>
                        {b.notes && (
                          <div className="mt-2.5 bg-black/40 border border-white/5 p-2.5 rounded-none">
                            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1">Issue symptoms:</p>
                            <p className="text-gray-300 italic">"{b.notes}"</p>
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-4 space-y-1.5">
                        <p className="text-gray-400 uppercase font-mono text-[9px] tracking-wider">Exact Address</p>
                        <p className="text-gray-300 leading-relaxed font-sans">{b.address}</p>
                      </div>

                      {/* Immediate actions */}
                      <div className="md:col-span-3 flex flex-col justify-center space-y-2.5 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-4">
                        <p className="text-gray-400 uppercase font-mono text-[9px] tracking-wider text-center md:text-left">Contact Actions</p>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {/* Dial client phone */}
                          <a
                            href={`tel:${b.phone}`}
                            className="flex items-center justify-center space-x-1.5 bg-black hover:border-[#D4AF37] hover:text-[#D4AF37] border border-white/10 py-2.5 px-3 rounded-none text-[11px] font-bold transition-colors uppercase tracking-wider font-sans"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            <span>Call</span>
                          </a>

                          {/* Message client on WhatsApp */}
                          <a
                            href={`https://wa.me/91${b.phone}?text=Hello%20${b.customerName}%2C%20this%20is%20Shree%20Ambika%20Metal%20team.%20We%20received%20your%20booking%20for%20${b.serviceType}.%20Our%20technician%20will%20arrive%20shortly.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-1.5 bg-black hover:border-emerald-500 hover:text-emerald-400 border border-white/10 py-2.5 px-3 rounded-none text-[11px] font-bold transition-colors uppercase tracking-wider font-sans"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Status updater bottom drawer inside card */}
                    <div className="flex flex-wrap items-center justify-between border-t border-white/5 pt-4 gap-4">
                      {/* Action to delete */}
                      <button
                        onClick={() => handleDeleteBooking(b.id)}
                        className="text-xs text-red-400/70 hover:text-red-400 flex items-center space-x-1.5 cursor-pointer py-1 px-2.5 rounded-none hover:bg-red-500/5 transition-all uppercase tracking-wider text-[10px]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Remove record</span>
                      </button>

                      {/* Status select buttons */}
                      <div className="flex flex-wrap gap-1.5 items-center">
                        <span className="text-[10px] font-mono text-gray-500 mr-1.5 uppercase font-bold">Change Status:</span>
                        {[
                          { label: 'Pending', status: 'pending' },
                          { label: 'Assigned', status: 'assigned' },
                          { label: 'Completed', status: 'completed' },
                          { label: 'Cancelled', status: 'cancelled' }
                        ].map((btn) => (
                          <button
                            key={btn.status}
                            onClick={() => handleUpdateStatus(b.id, btn.status as Booking['status'])}
                            className={`px-2.5 py-1 text-[10px] font-sans font-bold uppercase tracking-wider rounded-none border cursor-pointer transition-colors ${
                              b.status === btn.status
                                ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                                : 'bg-black text-gray-400 border-white/10 hover:text-white'
                            }`}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* Admin Footer action center */}
            <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs text-gray-500 font-sans">
              <span>*Data stored entirely in your local browser sandbox secure database.</span>
              <button
                onClick={handleResetData}
                className="text-red-400 hover:text-red-500 uppercase tracking-wider text-[10px] font-bold cursor-pointer hover:underline"
              >
                Clear All Database
              </button>
            </div>

          </div>
        )}

        {/* Custom Confirmation Modals to avoid window.confirm */}
        {confirmDeleteId && (
          <div className="absolute inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <div className="bg-[#121212] border border-white/10 p-6 max-w-sm w-full text-center space-y-5">
              <div className="p-3 bg-red-500/10 text-red-400 w-fit mx-auto rounded-none border border-red-500/20">
                <Trash2 className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif font-normal italic text-lg text-white">Delete Booking Record</h4>
                <p className="text-xs text-gray-400 font-sans">Are you sure you want to remove this booking request from the records? This cannot be undone.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="bg-[#1C1C1C] hover:bg-[#2A2A2A] text-gray-300 font-sans font-bold py-2.5 text-xs uppercase tracking-wider transition-colors border border-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => executeDeleteBooking(confirmDeleteId)}
                  className="bg-red-600 hover:bg-red-700 text-white font-sans font-bold py-2.5 text-xs uppercase tracking-wider transition-colors border border-red-500/30 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {confirmReset && (
          <div className="absolute inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <div className="bg-[#121212] border border-white/10 p-6 max-w-sm w-full text-center space-y-5">
              <div className="p-3 bg-red-500/10 text-red-400 w-fit mx-auto rounded-none border border-red-500/20">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif font-normal italic text-lg text-white">Clear All Database</h4>
                <p className="text-xs text-gray-400 font-sans">Are you sure you want to clear all bookings from your local database? All current records will be permanently lost.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setConfirmReset(false)}
                  className="bg-[#1C1C1C] hover:bg-[#2A2A2A] text-gray-300 font-sans font-bold py-2.5 text-xs uppercase tracking-wider transition-colors border border-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={executeResetData}
                  className="bg-red-600 hover:bg-red-700 text-white font-sans font-bold py-2.5 text-xs uppercase tracking-wider transition-colors border border-red-500/30 cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
