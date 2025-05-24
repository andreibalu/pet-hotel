import Image from "next/image";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-blue-50">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Cazare premium pentru animalele de companie în Timișoara
              </h1>
              <p className="text-xl text-gray-700 mb-10">
                Găsiți cele mai bune hoteluri pentru animalul dumneavoastră de companie. 
                Îngrijire de calitate, siguranță și confort pentru prietenul tău patruped.
              </p>
              
              {/* Search Box */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Găsiți un hotel pentru animale</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="location" className="block text-left text-gray-700 mb-2">Locație</label>
                    <select id="location" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="timisoara">Timișoara</option>
                      <option value="giroc">Giroc</option>
                      <option value="dumbravita">Dumbrăvița</option>
                      <option value="sanandrei">Sânandrei</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="pet-type" className="block text-left text-gray-700 mb-2">Tip animal</label>
                    <select id="pet-type" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="dog">Câine</option>
                      <option value="cat">Pisică</option>
                      <option value="bird">Pasăre</option>
                      <option value="exotic">Animal exotic</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Link href="/hoteluri" className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
                      Caută
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block absolute bottom-0 left-0 w-full h-20 bg-wave-pattern bg-repeat-x"></div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">De ce să alegeți PetHotel?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Siguranță garantată</h3>
                <p className="text-gray-600">Toate hotelurile noastre partenere sunt verificate și îndeplinesc cele mai înalte standarde de siguranță.</p>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Rezervări rapide</h3>
                <p className="text-gray-600">Proces simplu de rezervare, confirmări instant și posibilitatea de a vedea disponibilitatea în timp real.</p>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-yellow-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Recenzii verificate</h3>
                <p className="text-gray-600">Citiți recenzii reale de la alți proprietari de animale și faceți alegerea potrivită pentru animalul dumneavoastră.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Sunteți proprietarul unui hotel pentru animale?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Înregistrați-vă hotelul în platforma noastră și conectați-vă cu clienți noi din Timișoara și împrejurimi.
            </p>
            <Link href="/register" className="inline-block bg-white text-primary font-medium py-3 px-6 rounded-md hover:bg-gray-100 transition-colors">
              Înregistrează-ți afacerea
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
