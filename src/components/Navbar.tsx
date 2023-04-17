import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../stores/store";
import { logout } from "../stores/authStore";
import Cookies from 'js-cookie'



const Navbar = () => {
	const navigate = useNavigate();
	const {username} = useSelector((state: RootState) => state.auth)
	const dispatch = useDispatch<AppDispatch>();
	const themes = useContext(ThemeContext);

	const handleLogout = () => {
		dispatch(logout())
		Cookies.remove("jwt")
		navigate("/home")
	}

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

				{username == '' && 
					<>
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
					</>
				}
				{username != '' &&
					<button onClick={() => handleLogout()}>Logout</button>
				}

				
			</div>
		</div>
  )
}

export default Navbar