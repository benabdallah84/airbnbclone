'use client'
import Container from '../container';
import {SafeUser} from "../../types"
import Logo from './logo'
import Search from './search'
import UserMenu from './userMenu'
import Categories from './categories'
interface NavbarProps{
    currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({currentUser})  =>{
    
    return(
        <div className="fixied w-full bg-white z-10 shadow-sm ">
            <div className="
                py-4
                border-b-[1px]
              ">
                <Container>
                   <div className="
                    flex
                    flex-row
                    items-center
                    justify-between
                    gap-3
                    md:gap-0
                   ">
                    <Logo/>
                    <Search/>
                    <UserMenu currentUser = {currentUser}/>
                    </div> 
                </Container>
            </div>
            <Categories/>
        </div>
    )
}
export default Navbar