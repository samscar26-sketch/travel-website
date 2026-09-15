export type TravelTrip = {
  id: string;
  title: string;
  location: string;
  country: string;
  price: number;
  rating: number;
  duration: string;
  description: string;
  image: string;
};

export const travelTrips: TravelTrip[] = [
  {
    id: 'bali-sunset',
    title: 'Bali Sunset Escape',
    location: 'Ubud',
    country: 'Indonesia',
    price: 499,
    rating: 4.8,
    duration: '5 days',
    description: 'A relaxing island getaway with tropical views, spa time, and sunrise hikes.',
    image: '/beach.svg',
  },
  {
    id: 'alpine-hike',
    title: 'Alpine Trail Adventure',
    location: 'Zermatt',
    country: 'Switzerland',
    price: 699,
    rating: 4.9,
    duration: '7 days',
    description: 'Explore scenic mountain paths with guided treks, cozy cabins, and glacier views.',
    image: '/mountain.svg',
  },
  {
    id: 'desert-dunes',
    title: 'Desert Dunes Journey',
    location: 'Marrakech',
    country: 'Morocco',
    price: 589,
    rating: 4.7,
    duration: '4 days',
    description: 'Enjoy breathtaking desert nights, local culture, and a memorable camel experience.',
    image: '/camp.svg',
  },
];

export function getTripById(id: string) {
  return travelTrips.find((trip) => trip.id === id) ?? null;
}
