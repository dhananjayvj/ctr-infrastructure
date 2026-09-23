export interface ProjectLocation {
  id: string;
  name: string;
  category: 'Residential' | 'Commercial' | 'Hospitality' | 'Institutional' | 'Corporate';
  city: string;
  state: 'Tamil Nadu' | 'Karnataka';
  coordinates: {
    lat: number;
    lng: number;
    dms: string;
  };
  highlight?: boolean;
}

export const projectLocations: ProjectLocation[] = [
  { id: 'eswaren', name: 'Mr. Eswaren’s Residence', category: 'Residential', city: 'Thiruchangode', state: 'Tamil Nadu', coordinates: { lat: 11.36939, lng: 78.03055, dms: `11° 22' 9.8" N, 78° 1' 49.9" E` } },
  { id: 'sathyamoorthy', name: 'Mr. Sathyamoorthy’s Residence', category: 'Residential', city: 'Bhavani', state: 'Tamil Nadu', coordinates: { lat: 11.58425, lng: 77.71805, dms: `11° 35' 3.3" N, 77° 43' 5.0" E` } },
  { id: 'iocl-perundhurai', name: 'IOCL Retail Facility', category: 'Commercial', city: 'Perundhurai', state: 'Tamil Nadu', coordinates: { lat: 11.275, lng: 77.583, dms: `11° 16' 30.0" N, 77° 34' 58.8" E` } },
  { id: 'treasure-trove', name: 'Treasure Trove Venue', category: 'Hospitality', city: 'Tiruppur', state: 'Tamil Nadu', coordinates: { lat: 11.14582, lng: 77.38774, dms: `11° 8' 44.9" N, 77° 23' 15.9" E` }, highlight: true },
  { id: 'deepak', name: 'Mr. Deepak’s Residence', category: 'Residential', city: 'Tiruppur', state: 'Tamil Nadu', coordinates: { lat: 11.14528, lng: 77.38794, dms: `11° 8' 43.0" N, 77° 23' 16.6" E` } },
  { id: 'k2-fitness', name: 'K2 Fitness', category: 'Commercial', city: 'Tiruppur', state: 'Tamil Nadu', coordinates: { lat: 11.17079, lng: 77.34601, dms: `11° 10' 14.8" N, 77° 20' 45.6" E` } },
  { id: 'ganeshan', name: 'Mr. Ganeshan’s Residence', category: 'Residential', city: 'Tiruppur', state: 'Tamil Nadu', coordinates: { lat: 11.19718, lng: 77.25758, dms: `11° 11' 49.8" N, 77° 15' 27.3" E` } },
  { id: 'harigopal-res', name: 'Harigopal Associates Residence', category: 'Residential', city: 'Tiruppur', state: 'Tamil Nadu', coordinates: { lat: 11.11402, lng: 77.35174, dms: `11° 6' 50.5" N, 77° 21' 6.3" E` } },
  { id: 'chandrashekar', name: 'Mr. Chandrashekar’s Residence', category: 'Residential', city: 'Tiruppur', state: 'Tamil Nadu', coordinates: { lat: 11.0958, lng: 77.3209, dms: `11° 5' 44.9" N, 77° 19' 15.2" E` } },
  { id: 'sabreesh', name: 'Mr. Sabreesh’s Residence', category: 'Residential', city: 'Tiruppur', state: 'Tamil Nadu', coordinates: { lat: 11.09884, lng: 77.30623, dms: `11° 5' 55.8" N, 77° 18' 22.4" E` } },
  { id: 'harigopal-office', name: 'Harigopal Associates Office', category: 'Corporate', city: 'Somanur', state: 'Tamil Nadu', coordinates: { lat: 11.09399, lng: 77.18024, dms: `11° 5' 38.4" N, 77° 10' 48.9" E` } },
  { id: 'jegan', name: 'Mr. Jegan’s Residence', category: 'Residential', city: 'Coimbatore', state: 'Tamil Nadu', coordinates: { lat: 11.0742, lng: 77.06063, dms: `11° 4' 27.1" N, 77° 3' 38.3" E` } },
  { id: 'chakkravarthi', name: 'Mr. Chakkravarthi’s Residence', category: 'Residential', city: 'Coimbatore', state: 'Tamil Nadu', coordinates: { lat: 10.99909, lng: 77.00995, dms: `10° 59' 56.7" N, 77° 0' 35.8" E` } },
  { id: 'hindustan-resorts', name: 'Hindustan Resorts', category: 'Hospitality', city: 'Coimbatore', state: 'Tamil Nadu', coordinates: { lat: 11.0168, lng: 76.9558, dms: `11° 1' 0.5" N, 76° 57' 20.9" E` }, highlight: true },
  { id: 'george', name: 'Mr. George’s Residence', category: 'Residential', city: 'Coimbatore', state: 'Tamil Nadu', coordinates: { lat: 11.17071, lng: 76.95003, dms: `11° 10' 14.6" N, 76° 57' 0.1" E` } },
  { id: 'hr-ce-office', name: 'Office Block, HR&CE', category: 'Corporate', city: 'Pollachi', state: 'Tamil Nadu', coordinates: { lat: 10.65737, lng: 77.00889, dms: `10° 39' 26.5" N, 77° 0' 32.0" E` } },
  { id: 'iocl-pollachi', name: 'IOCL RO Facility', category: 'Commercial', city: 'Pollachi', state: 'Tamil Nadu', coordinates: { lat: 10.659, lng: 77.009, dms: `10° 39' 32.4" N, 77° 0' 32.4" E` } },
  { id: 'ramkumar-retreat', name: 'Mr. Ramkumar’s Retreat', category: 'Hospitality', city: 'Thiruvannamalai', state: 'Tamil Nadu', coordinates: { lat: 12.23616, lng: 79.02906, dms: `12° 14' 10.2" N, 79° 1' 44.6" E` } },
  { id: 'abraham', name: 'Mr. Abraham’s Residence', category: 'Residential', city: 'Mysore', state: 'Karnataka', coordinates: { lat: 12.37425, lng: 76.53452, dms: `12° 22' 27.3" N, 76° 32' 4.3" E` } },
  { id: 'iskcon-bangalore', name: 'ISKCON Cultural & Architectural Space', category: 'Institutional', city: 'Bangalore', state: 'Karnataka', coordinates: { lat: 13.0098, lng: 77.5511, dms: `13° 0' 35.3" N, 77° 33' 4.0" E` }, highlight: true },
];
