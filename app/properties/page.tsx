
import EmptyState from "../components/emptyState";
import ClientOnly from "../components/clientOnly";
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import PropertiesClient from "./propertiesClient"
import getListings from "../actions/getListing";

const PropertiesPage = async () =>{
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                    title='Unauthorized'
                    subtitle="Please Login"
                />
            </ClientOnly>

        )
    }

    const listings = await getListings({
        userId: currentUser.id
    })

    if(listings.length === 0){
        return(
            <ClientOnly>
                <EmptyState
                    title='No properties found'
                    subtitle="Looks like you havee no properties."
                />
            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <PropertiesClient
            listings={listings}
            currentUser={currentUser}
            />
        </ClientOnly>
    )
}
export default PropertiesPage