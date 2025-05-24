export type UserType = 'pet_owner' | 'hotel_owner'

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  user_type: UserType
  phone: string | null
  created_at: string
  updated_at: string
}

export interface PetOwnerProfile extends UserProfile {
  user_type: 'pet_owner'
  address: string | null
  emergency_contact: string | null
}

export interface HotelOwnerProfile extends UserProfile {
  user_type: 'hotel_owner'
  business_name: string | null
  business_address: string | null
  business_phone: string | null
  license_number: string | null
  verified: boolean
}

export interface Pet {
  id: string
  owner_id: string
  name: string
  type: 'dog' | 'cat' | 'bird' | 'exotic'
  breed: string | null
  age: number | null
  weight: number | null
  medical_notes: string | null
  special_requirements: string | null
  created_at: string
  updated_at: string
}

export interface Hotel {
  id: string
  owner_id: string
  name: string
  description: string | null
  address: string
  city: string
  phone: string
  email: string | null
  website: string | null
  pet_types_accepted: string[]
  amenities: string[]
  price_per_night: number
  capacity: number
  verified: boolean
  rating: number | null
  total_reviews: number
  created_at: string
  updated_at: string
} 