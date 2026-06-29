import { ServiceItem, Testimonial } from './types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'gas-geyser',
    category: 'gas_geyser',
    title: 'Gas Geyser Services',
    description: 'Expert diagnostics, leak repairs, and installations of all gas water heater brands with strict safety standards.',
    pricing: 'Starting from ₹299',
    features: [
      'New Gas Geyser Installation',
      'Gas Leakage Detection & Fix',
      'Burner Cleaning & Overhauling',
      'Water Flow & Coil Repair',
      'Thermostat & Safety Valve Check'
    ]
  },
  {
    id: 'ro-purifier',
    category: 'ro_purifier',
    title: 'RO Water Purifier Services',
    description: 'Ensure 100% pure drinking water. Quick filter changes, TDS balancing, membrane repairs, and full sanitization.',
    pricing: 'Starting from ₹349',
    features: [
      'Membrane & Filter Replacement',
      'Water TDS / Quality Analysis',
      'RO Motor & Adapter Repair',
      'Annual Maintenance Contract (AMC)',
      'New RO Purifier Installation'
    ]
  },
  {
    id: 'electric-geyser',
    category: 'electric_geyser',
    title: 'Electric Geyser Services',
    description: 'Specialized repairs for heating elements, thermostat failures, and pressure releases on all electric geyser models.',
    pricing: 'Starting from ₹399',
    features: [
      'Heating Element Replacement',
      'Thermostat & Auto-Cut Fix',
      'Body Leakage & Gasket Repair',
      'Wiring & Power Socket Checks',
      'Storage Tank Flush & Descaling'
    ]
  },
  {
    id: 'water-pressure',
    category: 'water_pressure',
    title: 'Water Pressure Systems',
    description: 'High-performance pressure booster pump installations and services to ensure steady water pressure across your home.',
    pricing: 'Custom Quote Available',
    features: [
      'Pressure Booster Pump Service',
      'Automatic Pressure Switch Fix',
      'New Pressure System Setup',
      'Pipeline Airflow Correction',
      'Pressure Tank Recalibration'
    ]
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Sanjay Kansara',
    location: 'Haripura, Surat',
    rating: 5,
    text: 'My gas geyser had a severe coil leakage in the morning. Sunil-bhai dispatched a technician within 2 hours. Honest pricing and highly professional work. Truly the oldest and most reliable in Surat!',
    date: '2026-06-15',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Megha Shah',
    location: 'Adajan, Surat',
    rating: 5,
    text: 'Extremely satisfied with the RO filter replacement. They measured the TDS level before and after service and cleaned the water storage tank thoroughly. Highly recommended for transparent service.',
    date: '2026-06-10',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Ketan Patel',
    location: 'Vesu, Surat',
    rating: 5,
    text: 'We have been trusting Shree Ambika Metal for over 15 years now for both our geysers and RO systems. Always reliable, very fair rates, and excellent after-sales support.',
    date: '2026-05-28',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Rajesh Gajiwala',
    location: 'Gheekanta Road, Surat',
    rating: 5,
    text: 'Perfect installation of our new automatic pressure booster system. Now we get amazing water flow in all our luxury bathroom showers. Professional expertise is visible in their advice.',
    date: '2026-05-12',
    verified: true
  }
];
