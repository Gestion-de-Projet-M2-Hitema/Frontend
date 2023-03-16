import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import { NavLink } from "react-router-dom";


const Navbar = () => {
    const themes = useContext(ThemeContext);

    return (
        <div className="navbar">
            <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
                >
                Home
            </NavLink>
            <div>

                <button onClick={themes.changeTheme}>{themes.theme}</button>

                <NavLink
                    to="/signup"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                    >
                    Signup
                </NavLink>
                <NavLink
                    to="/signin"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                    >
                    Signin
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar