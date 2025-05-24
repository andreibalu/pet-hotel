'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-10 min-h-[calc(100vh-200px)]">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Se încarcă...</div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10 min-h-[calc(100vh-200px)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {profile.user_type === 'pet_owner' ? 'Profilul meu' : 'Dashboard'}
              </h1>
              <p className="text-gray-600">
                Bun venit, {profile.full_name || profile.email}!
              </p>
              <p className="text-sm text-gray-500">
                {profile.user_type === 'pet_owner' 
                  ? 'Cont proprietar de animale' 
                  : 'Cont proprietar de hotel'}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Delogare
            </button>
          </div>

          {profile.user_type === 'pet_owner' ? (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Animalele mele</h2>
                <p className="text-gray-600">
                  Aici veți putea gestiona informațiile despre animalele dumneavoastră de companie.
                </p>
                <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Adaugă animal
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Rezervările mele</h2>
                <p className="text-gray-600">
                  Vizualizați și gestionați rezervările pentru animalele dumneavoastră.
                </p>
                <button className="mt-4 bg-secondary text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
                  Vezi rezervări
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Hotelul meu</h2>
                <p className="text-gray-600">
                  Gestionați informațiile despre hotelul dumneavoastră pentru animale.
                </p>
                <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Configurează hotel
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Rezervări primite</h2>
                <p className="text-gray-600">
                  Vizualizați și gestionați rezervările primite pentru hotelul dumneavoastră.
                </p>
                <button className="mt-4 bg-secondary text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
                  Vezi rezervări
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Statistici</h2>
                <p className="text-gray-600">
                  Urmăriți performanța hotelului dumneavoastră și recenziile clienților.
                </p>
                <button className="mt-4 bg-accent text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors">
                  Vezi statistici
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Informațiile contului</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Telefon:</strong> {profile.phone || 'Nu este specificat'}</p>
              <p><strong>Tip cont:</strong> {profile.user_type === 'pet_owner' ? 'Proprietar de animale' : 'Proprietar de hotel'}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 