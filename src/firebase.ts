import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import { Booking, Testimonial } from './types';
import { INITIAL_TESTIMONIALS } from './data';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with the specified custom database ID from the config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// ==========================================
// 1. BOOKINGS API
// ==========================================

const bookingsCollectionRef = collection(db, 'bookings');

export async function fetchBookingsFromCloud(): Promise<Booking[]> {
  try {
    const q = query(bookingsCollectionRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const bookings: Booking[] = [];
    
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      bookings.push({
        id: docSnap.id,
        customerName: data.customerName || '',
        phone: data.phone || '',
        alternativePhone: data.alternativePhone || '',
        area: data.area || '',
        address: data.address || '',
        serviceCategory: data.serviceCategory || 'gas_geyser',
        serviceType: data.serviceType || '',
        bookingDate: data.bookingDate || '',
        timeSlot: data.timeSlot || '',
        notes: data.notes || '',
        status: data.status || 'pending',
        createdAt: data.createdAt || new Date().toISOString()
      });
    });
    
    return bookings;
  } catch (err) {
    console.error("Error fetching bookings from Firestore: ", err);
    throw err;
  }
}

export async function addBookingToCloud(booking: Booking): Promise<void> {
  try {
    // We use setDoc to specify our custom Booking ID (e.g., SAM-XXXXXX)
    const docRef = doc(bookingsCollectionRef, booking.id);
    await setDoc(docRef, {
      ...booking,
      serverSyncedAt: serverTimestamp()
    });
  } catch (err) {
    console.error("Error writing booking to Firestore: ", err);
    throw err;
  }
}

export async function updateBookingStatusInCloud(id: string, status: Booking['status']): Promise<void> {
  try {
    const docRef = doc(bookingsCollectionRef, id);
    await updateDoc(docRef, { status });
  } catch (err) {
    console.error("Error updating status in Firestore: ", err);
    throw err;
  }
}

export async function deleteBookingFromCloud(id: string): Promise<void> {
  try {
    const docRef = doc(bookingsCollectionRef, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.error("Error deleting booking from Firestore: ", err);
    throw err;
  }
}

export async function clearAllBookingsFromCloud(bookings: Booking[]): Promise<void> {
  try {
    for (const b of bookings) {
      const docRef = doc(bookingsCollectionRef, b.id);
      await deleteDoc(docRef);
    }
  } catch (err) {
    console.error("Error clearing bookings from Firestore: ", err);
    throw err;
  }
}

// ==========================================
// 2. TESTIMONIALS (REVIEWS) API
// ==========================================

const reviewsCollectionRef = collection(db, 'reviews');

export async function fetchReviewsFromCloud(): Promise<Testimonial[]> {
  try {
    const querySnapshot = await getDocs(reviewsCollectionRef);
    
    // If the collection is empty, let's pre-populate it with INITIAL_TESTIMONIALS
    if (querySnapshot.empty) {
      const testimonials: Testimonial[] = [];
      for (const t of INITIAL_TESTIMONIALS) {
        const docRef = doc(reviewsCollectionRef, t.id);
        await setDoc(docRef, t);
        testimonials.push(t);
      }
      // Sort testimonials by date descending
      return testimonials.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    const reviews: Testimonial[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      reviews.push({
        id: docSnap.id,
        name: data.name || '',
        location: data.location || '',
        rating: data.rating || 5,
        text: data.text || '',
        date: data.date || '',
        verified: data.verified !== undefined ? data.verified : true
      });
    });

    // Sort descending by date
    return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (err) {
    console.error("Error fetching reviews from Firestore: ", err);
    throw err;
  }
}

export async function addReviewToCloud(review: Testimonial): Promise<void> {
  try {
    const docRef = doc(reviewsCollectionRef, review.id);
    await setDoc(docRef, review);
  } catch (err) {
    console.error("Error adding review to Firestore: ", err);
    throw err;
  }
}
