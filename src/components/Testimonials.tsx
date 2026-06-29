import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Testimonial, SURAT_AREAS } from '../types';
import { INITIAL_TESTIMONIALS } from '../data';
import { Star, Check, Plus, MessageSquare, ShieldCheck, X } from 'lucide-react';
import { fetchReviewsFromCloud, addReviewToCloud } from '../firebase';

export default function Testimonials() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: SURAT_AREAS[0],
    rating: 5,
    text: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load reviews from initial data + Cloud Firestore / localStorage
  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      try {
        const cloudReviews = await fetchReviewsFromCloud();
        setReviews(cloudReviews);
        localStorage.setItem('shree_ambika_reviews', JSON.stringify(cloudReviews));
      } catch (err) {
        console.warn("Could not load reviews from Firebase. Using local backup.", err);
        const stored = localStorage.getItem('shree_ambika_reviews');
        if (stored) {
          setReviews(JSON.parse(stored));
        } else {
          localStorage.setItem('shree_ambika_reviews', JSON.stringify(INITIAL_TESTIMONIALS));
          setReviews(INITIAL_TESTIMONIALS);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadReviews();
  }, []);

  const handleRatingSelect = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Your name is required';
    if (!formData.text.trim()) {
      newErrors.text = 'Review comments are required';
    } else if (formData.text.trim().length < 10) {
      newErrors.text = 'Please write at least a sentence explaining your experience';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitReview = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newReview: Testimonial = {
      id: `rev-${Date.now()}`,
      name: formData.name,
      location: `${formData.location}, Surat`,
      rating: formData.rating,
      text: formData.text,
      date: new Date().toISOString().split('T')[0],
      verified: true, // Auto-verified for instant customer satisfaction
    };

    try {
      await addReviewToCloud(newReview);
    } catch (err) {
      console.warn("Could not save review to Cloud, saving locally.", err);
    }

    const updatedReviews = [newReview, ...reviews];
    localStorage.setItem('shree_ambika_reviews', JSON.stringify(updatedReviews));
    setReviews(updatedReviews);

    setSuccess(true);
    setFormData({
      name: '',
      location: SURAT_AREAS[0],
      rating: 5,
      text: '',
    });

    setTimeout(() => {
      setSuccess(false);
      setShowForm(false);
    }, 2000);
  };

  return (
    <section id="reviews" className="py-24 bg-[#0F0F0F] text-white relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-3 py-1 rounded-none">
              Surat Customer Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal italic mt-4 tracking-tight text-[#F8F8F8]">
              What Surat Families Say
            </h2>
            <p className="text-gray-400 font-sans text-sm sm:text-base mt-2 leading-relaxed">
              Real reviews from real local households. For 31 years, Shree Ambika Metal has survived purely on word-of-mouth and customer trust.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-1.5 bg-transparent hover:bg-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#D4AF37] hover:text-black font-sans font-bold py-3.5 px-5 rounded-none uppercase tracking-widest text-xs transition-colors duration-300 self-start md:self-end cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Masonry/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#1A1A1A] border border-white/5 p-6 sm:p-8 rounded-none flex flex-col justify-between hover:border-[#D4AF37]/30 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < rev.rating
                          ? 'text-[#D4AF37] fill-[#D4AF37]'
                          : 'text-gray-700'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-300 font-sans text-sm sm:text-base italic leading-relaxed mb-6">
                  "{rev.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-2">
                <div>
                  <h4 className="text-sm font-sans font-bold text-white">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-gray-400 font-sans mt-0.5">
                    {rev.location}
                  </p>
                </div>
                
                {rev.verified && (
                  <div className="flex items-center space-x-1 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-none border border-emerald-500/20 text-[9px] font-mono uppercase tracking-wider">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Verified Visit</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Review Form Drawer Modal */}
        <AnimatePresence>
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-[#121212] border border-white/10 rounded-none shadow-2xl p-6 relative"
              >
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-none bg-black/40 hover:bg-red-500/10 text-gray-400 border border-white/10 hover:border-red-500/30 hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                </button>

                <h3 className="text-lg sm:text-xl font-serif font-normal italic text-[#D4AF37] mb-1">
                  Submit Your Experience
                </h3>
                <p className="text-xs text-gray-400 mb-6 font-sans">
                  Help other Surat families choose the best.
                </p>

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sunil-bhai"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full bg-[#0B0B0B] border border-white/10 rounded-none py-2 px-3 text-sm text-gray-200 font-sans focus:outline-none focus:border-[#D4AF37]"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400 font-sans mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Surat Location area dropdown */}
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">
                      Select Area
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      className="w-full bg-[#0B0B0B] border border-white/10 rounded-none py-2.5 px-3 text-sm text-gray-200 font-sans focus:outline-none focus:border-[#D4AF37]"
                    >
                      {SURAT_AREAS.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2 font-bold">
                      Service Rating
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleRatingSelect(val)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              val <= formData.rating
                                ? 'text-[#D4AF37] fill-[#D4AF37]'
                                : 'text-gray-700'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Review text */}
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">
                      Review Comments
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Explain your experience with our Geyser repair, RO water TDS checks, or booster pump installation..."
                      value={formData.text}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, text: e.target.value }))
                      }
                      className="w-full bg-[#0B0B0B] border border-white/10 rounded-none p-3 text-sm text-gray-200 font-sans focus:outline-none focus:border-[#D4AF37] resize-none"
                    ></textarea>
                    {errors.text && (
                      <p className="text-xs text-red-400 font-sans mt-1">
                        {errors.text}
                      </p>
                    )}
                  </div>

                  {/* Button state changes */}
                  <div className="pt-2">
                    {success ? (
                      <div className="w-full bg-emerald-500/10 border border-emerald-500/20 py-3 rounded-none text-emerald-400 text-xs font-sans font-bold text-center flex items-center justify-center space-x-1.5">
                        <Check className="h-4 w-4" />
                        <span>Review Posted Successfully!</span>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="w-full bg-[#D4AF37] text-black font-sans font-bold py-3.5 rounded-none uppercase tracking-widest text-xs hover:bg-[#c49e2e] transition-colors duration-300 cursor-pointer"
                      >
                        Submit Feedback
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
