import { Link, useNavigate } from "react-router-dom";
import { Search as SearchIcon, User as UserIcon } from "lucide-react";
import axios from "axios";
import { useRef, useState, useEffect } from "react"

const UserAvatar = ( {username, iconClass, textClass} ) => 
    username ? (
        <span className={`font-semibold leading-none ${textClass} pb-1`}>
            {username.trim().charAt(0).toLowerCase()}
        </span>
    ) : (
        <UserIcon className={iconClass}/>
    );

const UserMenu = ( {user, setUser }) => {

    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);
     const navigate = useNavigate();

    const handleLogout = async () => {
        await axios.post("/api/auth/logout");
        setUser(null);
        navigate("/");
    }

    return (
        <div className="relative inline-block">
            <button 
                type="button" 
                onClick={() => setOpen((open) => !open)} 
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="userMenu"
                className="flex h-10 w-10 items-center justify-center rounded-full
                   border border-white/10 bg-[#1b1b20] text-white transition
                   hover:bg-[#25252c]">
                <UserAvatar username={user?.username} iconClass="h-5 w-5" textClass="text-3xl"/>
            </button>

            <div
                role="menu"
                className={`absolute right-0 z-50 mt-3 w-64 origin-top-right rounded-md border border-gray-500/20 bg-gray-900 p-4 shadow-2xl transition duration-100 ease-out${open ? "visible scale-y-100 opacity-100" : "invisible scale-y-110 opacity-0"}`}
            >
                <div className="flex flex-col items-center gap-0 pb-3 pt-3 text-white">
                    <UserAvatar username={user?.username} iconClass="h-10 w-10" textClass="text-4xl"/>
                    <span className="font-semibold mt-2"> {user? (user.username): ("Guests")} </span>
                    <span className="font-light mt-1">{user? (user.role) : "Not logged in"}</span>
                </div>
                <hr className="my-2 border-t-2 border-white/80"/>
                {user? (
                    <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                            handleLogout();
                            setOpen(false);
                        }}
                        className="w-full rounded-md bg-[#303969] mt-2 py-2 text-sm text-white transition font-semibold hover:bg-[#8D8AB5]"
                    > Sign Out </button>
                ) : (
                    <>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                            navigate("/login")
                            setOpen(false);
                        }}
                        className="w-full rounded-md bg-[#303969] mt-2 py-2 text-sm text-white transition font-semibold hover:bg-[#8D8AB5]/50"
                    > Sign In </button>
                    <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                            navigate("/register");
                            setOpen(false);
                        }}
                        className="w-full rounded-md bg-gray-900 mt-2 py-2 border-3 border-[#303969] text-sm text-white transition font-semibold hover:bg-[#8D8AB5]/50"
                    > Register </button>
                    </>
                    
                )}
            </div>
        </div>
    );
}

const Navbar = ({user, setUser}) => {

    const navigate = useNavigate();

    return (
        <header className="flex w-full z-50 transition-all duration-300">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    <a href="/" className="flex items-center">a
                    <span className="text-[#9596D6] font-bold text-3xl">
                        HAVE<span className="text-[#EFAC61]">i</span>WATCH<span className="text-[#EFAC61]">it?</span>
                    </span>
                    </a>
                    </div>  
                    {/* Desktop */}
                    <nav className="hidden md:flex space-x-8">
                        <a href="#" className="text-white hover:text-[#9596D6] hover:underline decoration-[#EFAC61] decoration-4 transition-all font-medium">
                            Home
                        </a>
                         <a href="#watchlist" className="text-white hover:text-[#9596D6] hover:underline decoration-[#EFAC61] decoration-4 transition-all font-medium">
                            Watchlist
                        </a>
                         <a href="#collections" className="text-white hover:text-[#9596D6] hover:underline decoration-[#EFAC61] decoration-4 transition-all font-medium">
                            Collections
                        </a>
                    </nav>
                    {/* Desktop Search */}
                    <div className="flex item-center gap-3">
                        <div className="hidden md:block relative search-container">
                            <div className="relative">
                                <input type="text" placeholder="Search movies......."
                                className="bg-neutral-800/80 text-white px-4 py-2 rounded-2xl h-10 text-sm w-48 focus:w-98 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D2C9E3]"></input>
                                {/* Conditional */}
                                <div className="absolute right-3 top-1.5"> <SearchIcon color="#828282"/></div>
                            </div>
                        </div>
                        
                        <UserMenu user={user} setUser={setUser}/>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;