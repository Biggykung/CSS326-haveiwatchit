import { Link, UNSAFE_RemixErrorBoundary, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import axios from "axios";

const Navbar = ({user, setUser}) => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        await axios.post("/api/auth/logout");
        setUser(null);
        navigate("/");
    }

    return (
    <header className="{`flex w-full z-50 transition-all duration-300`}">
        <nav className="bg-gray-800 text-white">
            <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
                <Link to="/" className="mr-4 font-bold">
                    HAVEiWATCHit?
                </Link>
                <div className="flex items-center gap-3">
                    {user? (
                        <>
                        <p> Welcome {user.username}! </p>
                        <button className="bg-red-500 px-3 py-1 rounded" onClick={ handleLogout }>
                            Logout
                        </button>
                        </>
                    ) : (
                        <>
                        <Link to="/login" className="mx-2">Login</Link>
                        <Link to="/register" className="mx-2">Register</Link>
                        </>
                    )}
                </div>
                <UserMenu user={user} setUser={setUser} />
            </div>
        </nav>
    </header>
    );
}

export default Navbar;