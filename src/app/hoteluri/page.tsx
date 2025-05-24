'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Mock data for hotels
const HOTELS = [
  {
    id: 1,
    name: 'PetParadise Timișoara',
    image: 'https://images.unsplash.com/photo-1576678433413-202829a1ab98?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 124,
    location: 'Calea Șagului, Timișoara',
    price: 80,
    petTypes: ['câine', 'pisică'],
    services: ['plimbare', 'îngrijire medicală', 'toaletare'],
    description: 'Hotel premium pentru animale în zona de sud a Timișoarei cu facilități moderne și îngrijire de top.'
  },
  {
    id: 2,
    name: 'Căsuța Animalelor',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewCount: 98,
    location: 'Circumvalațiunii, Timișoara',
    price: 65,
    petTypes: ['câine', 'pisică', 'rozătoare'],
    services: ['plimbare', 'hrănire specială'],
    description: 'Un spațiu prietenos pentru animalele de companie, cu personal dedicat și îngrijire personalizată.'
  },
  {
    id: 3,
    name: 'PetFriends',
    image: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewCount: 87,
    location: 'Calea Aradului, Timișoara',
    price: 70,
    petTypes: ['câine', 'pisică', 'pasăre'],
    services: ['plimbare', 'toaletare', 'training'],
    description: 'Cazare confortabilă și activități zilnice pentru animalele de companie din zona de nord a orașului.'
  },
  {
    id: 4,
    name: 'Royal Pets Timișoara',
    image: 'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 156,
    location: 'Centru, Timișoara',
    price: 95,
    petTypes: ['câine', 'pisică', 'animal exotic'],
    services: ['plimbare', 'îngrijire medicală', 'toaletare', 'spa pentru animale'],
    description: 'Cel mai luxos hotel pentru animale din Timișoara, cu servicii exclusive și condiții de 5 stele.'
  },
  {
    id: 5,
    name: 'Happy Tails',
    image: 'https://images.unsplash.com/photo-1551887373-33c5c076b840?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    reviewCount: 72,
    location: 'Dumbravița, Timișoara',
    price: 60,
    petTypes: ['câine', 'pisică'],
    services: ['plimbare', 'socializare', 'hrănire specială'],
    description: 'Hotel pentru animale în zona rezidențială Dumbravița, cu spații generoase pentru joacă și relaxare.'
  },
  {
    id: 6,
    name: 'Pet Resort & Spa',
    image: 'https://images.unsplash.com/photo-1585499193151-0f50d54878cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 103,
    location: 'Giroc, Timișoara',
    price: 85,
    petTypes: ['câine', 'pisică', 'rozătoare', 'pasăre'],
    services: ['plimbare', 'îngrijire medicală', 'toaletare', 'spa pentru animale', 'training'],
    description: 'Complex complet pentru animale de companie, cu multiple facilități și servicii în zona Giroc.'
  }
];

export default function HotelListingPage() {
  const [filters, setFilters] = useState({
    location: '',
    petType: '',
    priceRange: '',
    services: [] as string[]
  });
  
  const [sortBy, setSortBy] = useState('recommended');
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleServiceToggle = (service: string) => {
    setFilters(prev => {
      const services = [...prev.services];
      if (services.includes(service)) {
        return {
          ...prev,
          services: services.filter(s => s !== service)
        };
      } else {
        return {
          ...prev,
          services: [...services, service]
        };
      }
    });
  };
  
  // Apply filters
  const filteredHotels = HOTELS.filter(hotel => {
    if (filters.location && hotel.location.toLowerCase().indexOf(filters.location.toLowerCase()) === -1) return false;
    if (filters.petType && !hotel.petTypes.includes(filters.petType)) return false;
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (hotel.price < min || (max && hotel.price > max)) return false;
    }
    
    if (filters.services.length > 0) {
      if (!filters.services.every(service => hotel.services.includes(service))) return false;
    }
    
    return true;
  });
  
  // Sort hotels
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Default 'recommended' sort uses rating
    return b.rating - a.rating;
  });
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Hoteluri pentru animale în Timișoara</h1>
        
        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Filtre</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="location" className="block text-gray-700 mb-2">Locație</label>
              <select 
                id="location" 
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Toate locațiile</option>
                <option value="centru">Centru</option>
                <option value="aradului">Calea Aradului</option>
                <option value="sagului">Calea Șagului</option>
                <option value="circumvalațiunii">Circumvalațiunii</option>
                <option value="dumbravita">Dumbravița</option>
                <option value="giroc">Giroc</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="petType" className="block text-gray-700 mb-2">Tip animal</label>
              <select 
                id="petType" 
                name="petType"
                value={filters.petType}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Toate tipurile</option>
                <option value="câine">Câine</option>
                <option value="pisică">Pisică</option>
                <option value="pasăre">Pasăre</option>
                <option value="rozătoare">Rozătoare</option>
                <option value="animal exotic">Animal exotic</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="priceRange" className="block text-gray-700 mb-2">Preț pe zi</label>
              <select 
                id="priceRange" 
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Toate prețurile</option>
                <option value="0-60">Sub 60 RON</option>
                <option value="60-80">60 - 80 RON</option>
                <option value="80-100">80 - 100 RON</option>
                <option value="100-1000">Peste 100 RON</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="sortBy" className="block text-gray-700 mb-2">Sortează după</label>
              <select 
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="recommended">Recomandate</option>
                <option value="price-low">Preț (crescător)</option>
                <option value="price-high">Preț (descrescător)</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
          
          {/* Services Filter */}
          <div className="mt-4">
            <p className="text-gray-700 mb-2">Servicii</p>
            <div className="flex flex-wrap gap-2">
              {['plimbare', 'îngrijire medicală', 'toaletare', 'training', 'spa pentru animale', 'hrănire specială', 'socializare'].map(service => (
                <button
                  key={service}
                  onClick={() => handleServiceToggle(service)}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    filters.services.includes(service) 
                      ? 'bg-primary text-white border-primary'
                      : 'border-gray-300 text-gray-700 hover:border-primary'
                  } transition-colors`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-700">
            {sortedHotels.length} {sortedHotels.length === 1 ? 'rezultat' : 'rezultate'} găsit{sortedHotels.length === 1 ? '' : 'e'}
          </p>
        </div>
        
        {/* Hotel Listings */}
        {sortedHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedHotels.map(hotel => (
              <div key={hotel.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{hotel.name}</h3>
                    <div className="bg-blue-50 text-primary font-medium px-2 py-1 rounded-md flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span>{hotel.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {hotel.location}
                  </p>
                  <p className="mb-4 line-clamp-2 text-sm text-gray-600">{hotel.description}</p>
                  <div className="mb-4 flex flex-wrap gap-1">
                    {hotel.petTypes.map(type => (
                      <span key={type} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {type}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xl font-bold text-gray-900">{hotel.price} RON</span>
                      <span className="text-gray-500 text-sm">/zi</span>
                    </div>
                    <Link href={`/hoteluri/${hotel.id}`} className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
                      Vezi detalii
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Nu am găsit hoteluri care să corespundă criteriilor dumneavoastră</h3>
            <p className="text-gray-600 mb-4">Încercați să modificați filtrele pentru a găsi mai multe rezultate.</p>
            <button 
              onClick={() => setFilters({ location: '', petType: '', priceRange: '', services: [] })} 
              className="text-primary hover:underline font-medium"
            >
              Resetați filtrele
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
} 