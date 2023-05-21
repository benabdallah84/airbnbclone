import prisma from "@/app/libs/prismadb"

interface IParams{
    listingId?: string
}

export default async function getListingById(params: IParams){
    try{
        const { listingId } = params
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }

        })
        if(!listing){
            return null
        }
        return{
            ...listing,
            CreatedAt: listing.CreatedAt.toString(),
            user:{
                ...listing.user,
                createAt: listing.user.createAt.toString(),
                updatedAt: listing.user.updatedAt.toString(),
                emailVerified: listing.user.emailVerified?.toString() || null
            }
        }
    }catch(err: any){
        throw new Error(err)
       
    }
}