import { User, Listing, Reservation } from '@prisma/client'
export type SafeListing = Omit<
    Listing,
    "CreatedAt" 
> & {
    CreatedAt: string
}

export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"> & {
    createdAt: string,
    startDate: string,
    endDate: string,
    listing: SafeListing
}
export type SafeUser = Omit<
    User, 
    "createAt" | "updatedAt" | "emailVerified"
> & {
    createAt: string,
    updatedAt: string,
    emailVerified: string | null
}
