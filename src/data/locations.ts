export interface ProjectLocation {
  id: string;
  name: string;
  category: 'Residential' | 'Commercial' | 'Hospitality' | 'Institutional' | 'Corporate';
  city: string;
  state: 'Tamil Nadu' | 'Karnataka' | 'Andhra Pradesh';
  client?: string;
  coordinates: {
    lat: number;
    lng: number;
    dms: string;
  };
  highlight?: boolean;
}

export const projectLocations: ProjectLocation[] = [
  { id: 'eswaren', name: 'Mr. Eswaren’s Residence', category: 'Residential', city: 'Thiruchangode', state: 'Tamil Nadu', coordinates: { lat: 11.369390, lng: 78.030553, dms: `11° 22' 9.8051" N, 78° 1' 49.9897" E` } },
  { id: 'sathyamoorthy', name: 'Mr. Sathyamoorthy’s Residence', category: 'Residential', city: 'Bhavani', state: 'Tamil Nadu', coordinates: { lat: 11.584252, lng: 77.718055, dms: `11° 35' 3.3072" N, 77° 43' 4.998" E` } },
  { id: 'iocl-perundhurai', name: 'IOCL - Perundhurai', category: 'Commercial', city: 'Perundhurai', client: 'IndianOil', state: 'Tamil Nadu', coordinates: { lat: 11.275, lng: 77.583, dms: `11° 16' 30.0" N, 77° 34' 58.8" E` } },
  { id: 'treasure-trove', name: 'Treasure Trove Venue', category: 'Hospitality', city: 'Tiruppur', state: 'Tamil Nadu', coordinates: { lat: 11.145816, lng: 77.387745, dms: `11° 8' 44.9376" N, 77° 23' 15.882" E` }, highlight: true },
  { id: 'deepak', name: 'Mr. Deepak’s Residence', category: 'Residential', city: 'Tiruppur', state: 'Tamil Nadu', coordinates: { lat: 11.145283, lng: 77.387943, dms: `11° 8' 43.0188" N, 77° 23' 16.5948" E` } },
  { id: 'k2-fitness', name: 'K2 Fitness', category: 'Commercial', city: 'Tiruppur', state: 'Tamil Nadu', coordinates: { lat: 11.170791, lng: 77.346006, dms: `11° 10' 14.8476" N, 77° 20' 45.6216" E` } },
  { id: 'ganeshan', name: 'Mr. Ganeshan’s Residence', category: 'Residential', city: 'Tiruppur', state: 'Tamil Nadu', coordinates: { lat: 11.197180, lng: 77.257582, dms: `11° 11' 49.848" N, 77° 15' 27.2952" E` } },
  { id: 'harigopal-res', name: 'Harigopal Associates’s Residence', category: 'Residential', city: 'Tiruppur', state: 'Tamil Nadu', coordinates: { lat: 11.114017, lng: 77.351737, dms: `11° 6' 50.4612" N, 77° 21' 6.2532" E` } },
  { id: 'chandrashekar', name: 'Mr. Chandrashekar’s Residence', category: 'Residential', city: 'Tiruppur', state: 'Tamil Nadu', coordinates: { lat: 11.095802, lng: 77.320899, dms: `11° 5' 44.8872" N, 77° 19' 15.2364" E` } },
  { id: 'sabreesh', name: 'Mr. Sabreesh’s Residence', category: 'Residential', city: 'Tiruppur', state: 'Tamil Nadu', coordinates: { lat: 11.098839, lng: 77.306229, dms: `11° 5' 55.8204" N, 77° 18' 22.4244" E` } },
  { id: 'harigopal-office', name: 'Harigopal Associates’s Office', category: 'Corporate', city: 'Somanur', state: 'Tamil Nadu', coordinates: { lat: 11.093992, lng: 77.180238, dms: `11° 5' 38.3712" N, 77° 10' 48.8568" E` } },
  { id: 'jegan', name: 'Mr. Jegan’s Residence', category: 'Residential', city: 'Coimbatore', state: 'Tamil Nadu', coordinates: { lat: 11.074198, lng: 77.060634, dms: `11° 4' 27.1128" N, 77° 3' 38.2824" E` } },
  { id: 'chakkravarthi', name: 'Mr. Chakkravarthi’s Residence', category: 'Residential', city: 'Coimbatore', state: 'Tamil Nadu', coordinates: { lat: 10.999087, lng: 77.009953, dms: `10° 59' 56.7132" N, 77° 0' 35.8308" E` } },
  { id: 'hindustan-resorts', name: 'Hindustan Resorts', category: 'Hospitality', city: 'Coimbatore', client: 'RVVP+GPW', state: 'Tamil Nadu', coordinates: { lat: 11.0168, lng: 76.9558, dms: `11° 1' 0.5" N, 76° 57' 20.9" E` }, highlight: true },
  { id: 'george', name: 'Mr. George’s Residence', category: 'Residential', city: 'Coimbatore', state: 'Tamil Nadu', coordinates: { lat: 11.170711, lng: 76.950029, dms: `11° 10' 14.5596" N, 76° 57' 0.1044" E` } },
  { id: 'hr-ce-office', name: 'Office Block, HR&CE', category: 'Corporate', city: 'Pollachi', state: 'Tamil Nadu', coordinates: { lat: 10.657371, lng: 77.008891, dms: `10° 39' 26.5356" N, 77° 0' 32.0076" E` } },
  { id: 'iocl-pollachi', name: 'IOCL RO, Pollachi', category: 'Commercial', city: 'Pollachi', client: 'IndianOil', state: 'Tamil Nadu', coordinates: { lat: 10.659, lng: 77.009, dms: `10° 39' 32.4" N, 77° 0' 32.4" E` } },
  { id: 'ramkumar-retreat', name: 'Mr. Ramkumar’s Retreat', category: 'Hospitality', city: 'Thiruvannamalai', state: 'Tamil Nadu', coordinates: { lat: 12.236161, lng: 79.029062, dms: `12° 14' 10.1796" N, 79° 1' 44.6232" E` } },
  { id: 'chennai-port', name: 'Chennai port Development', category: 'Institutional', city: 'Chennai', client: 'Chennai Port', state: 'Tamil Nadu', coordinates: { lat: 13.1, lng: 80.3, dms: `13° 6' 0.0" N, 80° 18' 0.0" E` } },
  { id: 'coastal-development', name: 'Coastal Development', category: 'Institutional', city: 'Kanyakumari', client: 'Kanniyakumari', state: 'Tamil Nadu', coordinates: { lat: 8.076111, lng: 77.548333, dms: `8° 4' 34.0" N, 77° 32' 54.0" E` } },
  { id: 'annur-temple', name: 'Temple Precinct Development', category: 'Institutional', city: 'Anuur', client: 'Shri Manneeswaraswamy Temple', state: 'Tamil Nadu', coordinates: { lat: 11.236, lng: 77.105, dms: `11° 14' 9.6" N, 77° 6' 18.0" E` } },
  { id: 'munnar-road', name: 'Road Development', category: 'Commercial', city: 'Munnar', client: 'Munnar', state: 'Tamil Nadu', coordinates: { lat: 10.08917, lng: 77.05972, dms: `10° 5' 21.0" N, 77° 3' 35.0" E` } },
  { id: 'sristi-vikas-school', name: 'Shri Sristi vikas school', category: 'Institutional', city: 'Udumalapettai', client: 'Sri sristi vikkas school', state: 'Tamil Nadu', coordinates: { lat: 10.585, lng: 77.247, dms: `10° 35' 6.0" N, 77° 14' 49.2" E` } },
  { id: 'karunya-university', name: 'Karunya University', category: 'Institutional', city: 'Coimbatore', client: 'Karunya Institute of Technology and Sciences (Deemed University)', state: 'Tamil Nadu', coordinates: { lat: 10.944, lng: 76.912, dms: `10° 56' 38.4" N, 76° 54' 43.2" E` } },
  { id: 'abraham', name: 'Mr. Abraham’s Residence', category: 'Residential', city: 'Mysore', state: 'Karnataka', coordinates: { lat: 12.374253, lng: 76.534522, dms: `12° 22' 27.3108" N, 76° 32' 4.2792" E` } },
  { id: 'iskcon-bangalore', name: 'ISKON, Bangalore', category: 'Institutional', city: 'Bangalore', client: 'ISKCON Bangalore', state: 'Karnataka', coordinates: { lat: 13.0098, lng: 77.5511, dms: `13° 0' 35.3" N, 77° 33' 4.0" E` }, highlight: true },
  { id: 'praveen', name: 'Mr. Praveen’s Residence', category: 'Residential', city: 'Bangalore', state: 'Karnataka', coordinates: { lat: 13.084149, lng: 77.550762, dms: `13° 5' 2.9364" N, 77° 33' 2.7432" E` } },
  { id: 'dollars-colony', name: 'Residences at Dollars Colony', category: 'Residential', city: 'Dollars Colony', state: 'Karnataka', coordinates: { lat: 13.0378, lng: 77.5664, dms: `13° 2' 16.1" N, 77° 33' 59.0" E` } },
  { id: 'kamalapura-rural', name: 'Rural Development', category: 'Institutional', city: 'Kamalapura', state: 'Karnataka', coordinates: { lat: 15.30447, lng: 76.47562, dms: `15° 18' 16.1" N, 76° 28' 32.2" E` } },
  { id: 'asi-hampi', name: 'Archaeological Survey of india, Hampi', category: 'Institutional', city: 'Hampi', state: 'Karnataka', coordinates: { lat: 15.334488, lng: 76.458637, dms: `15° 20' 4.2" N, 76° 27' 31.1" E` } },
  { id: 'talakad-temple', name: 'Talakad Temple Complex Development', category: 'Institutional', city: 'Talakad', state: 'Karnataka', coordinates: { lat: 12.22, lng: 77.03, dms: `12° 13' 12.0" N, 77° 1' 48.0" E` } },
  { id: 'sira-fort', name: 'Sira Fort Restoration', category: 'Institutional', city: 'Sira', state: 'Karnataka', coordinates: { lat: 13.741, lng: 76.904, dms: `13° 44' 27.6" N, 76° 54' 14.4" E` } },
  { id: 'chittoor-road', name: 'Road Development, Chittor', category: 'Commercial', city: 'Chittoor', state: 'Andhra Pradesh', coordinates: { lat: 13.217, lng: 79.1, dms: `13° 13' 1.2" N, 79° 6' 0.0" E` } },
];
