# PetHotel Timișoara

O platformă web pentru găsirea și rezervarea hotelurilor pentru animale de companie în Timișoara și împrejurimi.

## Descriere

PetHotel Timișoara este o aplicație web care conectează proprietarii de animale de companie cu hotelurile pentru animale din zona Timișoara. Platforma permite proprietarilor de animale să găsească și să rezerve locuri în hoteluri specializate, iar proprietarilor de hoteluri să își promoveze și să își gestioneze afacerile.

## Funcționalități principale

- Căutare și filtrare de hoteluri pentru animale după locație, tip de animal și servicii oferite
- Sistem de autentificare pentru proprietari de animale și proprietari de hoteluri
- Vizualizare detalii despre hoteluri, inclusiv preț, facilități și recenzii
- Rezervare de locuri pentru animale

## Tehnologii utilizate

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Autentificare**: JWT (planificat)
- **State Management**: React Hooks

## Cum să rulezi proiectul

### Cerințe preliminare

- Node.js (versiunea 20.0 sau mai recentă)
- npm sau yarn

### Instalare

1. Clonează repository-ul
```
git clone https://github.com/username/pet-hotel-timisoara.git
cd pet-hotel-timisoara
```

2. Instalează dependențele
```
npm install
```

3. Rulează aplicația în modul de dezvoltare
```
npm run dev
```

4. Deschide [http://localhost:3000](http://localhost:3000) în browser pentru a vedea aplicația

## Structura proiectului

```
pet-hotel/
├── public/           # Fișiere statice
├── src/
│   ├── app/          # Rutele aplicației (Next.js App Router)
│   ├── components/   # Componente React reutilizabile
│   └── styles/       # Stiluri CSS globale
├── tailwind.config.ts  # Configurare Tailwind CSS
└── package.json      # Dependențe și scripturi
```

## Task-uri viitoare

Consultați [TODO.md](TODO.md) pentru o listă completă de task-uri planificate.

## Contribuții

Contribuțiile sunt binevenite! Dacă doriți să contribuiți la acest proiect, vă rugăm să creați un pull request.
