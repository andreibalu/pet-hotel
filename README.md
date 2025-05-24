# PetHotel - Pet Accommodation Platform

A modern web application for pet owners to find and book accommodation for their pets in Timișoara, Romania. Built with Next.js 15, Supabase, and TypeScript.

## Features

- **Dual User Types**: Support for both pet owners and hotel owners
- **Authentication**: Secure user registration and login with Supabase Auth
- **User Profiles**: Separate profile management for pet owners and hotel owners
- **Pet Management**: Pet owners can manage their pets' information
- **Hotel Management**: Hotel owners can manage their accommodation listings
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Authentication**: Supabase Auth with SSR
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://egplbqlmhkloglfbvmfc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVncGxicWxtaGtsb2dsZmJ2bWZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzQxMTYsImV4cCI6MjA2MzY1MDExNn0.YwaAQQ_mG1txAKvkpLgl3MFEgd2C5p2vO2qYFaXtdVg
```

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pet-hotel
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see above)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The application uses the following database structure:

### Tables

- **profiles**: Main user profiles table
- **pet_owner_profiles**: Extended data for pet owners
- **hotel_owner_profiles**: Extended data for hotel owners  
- **pets**: Pet information managed by pet owners
- **hotels**: Hotel listings managed by hotel owners

### User Types

- **pet_owner**: Users who own pets and need accommodation
- **hotel_owner**: Users who provide pet accommodation services

### Pet Types

- **dog**: Dogs
- **cat**: Cats  
- **bird**: Birds
- **exotic**: Exotic animals

## Authentication Flow

1. Users register by selecting their account type (pet owner or hotel owner)
2. User profiles are automatically created with appropriate extended profiles
3. Authentication state is managed with Supabase Auth SSR
4. Protected routes redirect unauthenticated users to login
5. User sessions are maintained across page refreshes

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # User dashboard
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   └── page.tsx          # Home page
├── components/           # Reusable React components
│   ├── Header.tsx       # Navigation header
│   └── Footer.tsx       # Site footer
├── hooks/               # Custom React hooks
│   └── useAuth.ts       # Authentication hook
├── lib/                 # Utility libraries
│   └── supabase/        # Supabase client configuration
│       ├── client.ts    # Browser client
│       └── server.ts    # Server client
├── types/               # TypeScript type definitions
│   ├── auth.ts          # Authentication types
│   └── database.ts      # Database types
└── middleware.ts        # Next.js middleware for auth
```

## Key Features Implementation

### Authentication
- Supabase Auth with email/password
- SSR-compatible authentication
- Automatic profile creation based on user type
- Row Level Security (RLS) policies

### User Management
- Separate profiles for pet owners and hotel owners
- Extended profile data based on user type
- Profile management in dashboard

### Security
- Row Level Security on all tables
- Users can only access their own data
- Protected routes with middleware
- Secure cookie handling

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling
- Component-based architecture

## Deployment

The application is ready for deployment on Vercel:

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please contact [your-email@example.com] or create an issue in the repository.
