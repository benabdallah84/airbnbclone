import prisma from '@/app/libs/prismadb'
export interface IListingParams{
    userId?: string
    guestCount?: number
    roomCount?: number
    bathroomCount?: number
    startDate?: string
    endDate?: string
    locationValue?: string
    category?: string

}
export default async function getListings(params: IListingParams){
    try{
        const {userId,
            guestCount,
            roomCount,
            bathroomCount,
            startDate,
            endDate,
            locationValue,
            category} = params
        let query: any = {}

        if(userId){
            query.userId = userId
        }

        if(category){
            query.category = category
        }

        if(roomCount){
            query.roomCount = {
                gte: +roomCount
            }
        }

        if(guestCount){
            query.guestCount = {
                gte: +guestCount
            }
        }

        if(bathroomCount){
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        if(locationValue){
            query.locationValue = locationValue
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                CreatedAt: 'desc'
            }
        })

        if(startDate && endDate){
            query.Not = {
                reservations:{
                    some:{
                        OR:[
                            {
                                startDate: {
                                    lte: startDate},
                                endDate: {
                                    gte: startDate}
                            },
                            {
                                startDate: {
                                    lte: endDate},
                                endDate: {
                                    gte: endDate}
                            },
                        ]
                    }

                }
            }
        }

        const SafeListings = listings.map((listing)=>({
            ...listing,
            CreatedAt: listing.CreatedAt.toISOString(),
        }))
        return SafeListings
    }catch(error: any){
        throw new Error(error)
    }
}