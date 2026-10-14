import { useState, useRef, useEffect } from "react";
import { User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserAvatar = ( {username, iconClass, textClass} ) => 
    username ? (
        <span className={`font-semibold leading-none ${textClass} pb-1`}>
            {username.trim().charAt(0).toLowerCase()}
        </span>
    ) : (
        <UserIcon className={iconClass}/>
    );

const userMenu = ( {user, setUser }) => {

    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);
     const navigate = useNavigate();

    const handleLogout = async () => {
        await axios.post("/api/auth/logout");
        setUser(null);
        navigate("/");
    }

    return (
        <div>
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
                className={`absolute right-0 z-50 mt-3 w-64 origin-top-right rounded-md border border-gray-500/20 bg-gray-900 p-4 shadow-2xl transition duration-100 ease-out${open ? "visible scale-100 opacity-100" : "invisible scale-120 opacity-0"}`}
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
                        onClick={handleLogout}
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

export default userMenu;