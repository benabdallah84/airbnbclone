import {Nunito} from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/navbar'
import ClientOnly from './components/clientOnly'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import RentModal from './components/modals/RentModel'
import SearchModal from './components/modals/SearchModal'
import ToasterProviver from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

const font = Nunito({
  subsets: ["latin"]
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProviver/>
          <LoginModal/>
         <RegisterModal/>
         <SearchModal/>
         <RentModal/>
         <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
        </body>
    </html>
  )
}
