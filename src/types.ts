export type ServiceCategory = 'gas_geyser' | 'electric_geyser' | 'ro_purifier' | 'water_pressure' | 'general';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  description: string;
  pricing: string;
  features: string[];
}

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  alternativePhone?: string;
  area: string;
  address: string;
  serviceCategory: ServiceCategory;
  serviceType: string;
  bookingDate: string;
  timeSlot: string;
  notes?: string;
  status: 'pending' | 'assigned' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export const SURAT_AREAS = [
  'Haripura',
  'Gheekanta Road',
  'Adajan',
  'Katargam',
  'Vesu',
  'City Light',
  'Varachha',
  'Rander',
  'Jahangirpura',
  'Pal',
  'Althan',
  'Udhna',
  'Sarthana',
  'Nanpura',
  'Lal Darwaja',
  'Amroli'
];
