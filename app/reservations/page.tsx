import EmptyState from "../components/emptyState";
import ClientOnly from "../components/clientOnly";
import getCurrentUser from "../actions/getCurrentUser"
import getReservetions from "../actions/getReservations"
import ReservationsClient from "./reservationsClient";

const ReaservationsPage = async () =>{
    const currentUser = await getCurrentUser()
    if(!currentUser){
        <ClientOnly>
            <EmptyState 
                title='Unauthorized'
                subtitle="Please login"
            />
        </ClientOnly>
    }
    const reservations = await getReservetions({
        userId: currentUser?.id
    })

    if(reservations.length === 0){
        return(
            <ClientOnly>
                <EmptyState
                title="No reservations"
                subtitle="Looks like you have no reservations on your property."
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
            />
        </ClientOnly>
    )
}
export default ReaservationsPage