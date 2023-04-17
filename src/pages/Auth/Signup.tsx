import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { postSignup, resetSignupStatus } from "../../stores/signupStore";
import { NavLink, useNavigate } from "react-router-dom";

import './style.scss'

const Signup = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {status, error} = useSelector((state: RootState) => state.signup)
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
	const [passwordConfirm, setPasswordConfirm] = useState("")

	const handleSignup = () => {
		dispatch(postSignup({username, name, email, password, passwordConfirm}))
	}

	useEffect(() => {
        if (status === "fulfilled") {
            navigate("/signin")
            dispatch(resetSignupStatus())
        }
    }, [status])

    return (
		<div className="auth">
			<div className="block">
				<h1>Signup to concorde</h1>

				<div className="form">

					<label htmlFor="email">Username</label>
					<input type="text" name="email" value={username} onChange={(e) => setUsername(e.target.value)} />

					{status && error.username && 
						<div className="error">{error.username}</div>
					}

					<label htmlFor="email">Name</label>
					<input type="text" name="email" value={name} onChange={(e) => setName(e.target.value)} />

					{status && error.name && 
						<div className="error">{error.name}</div>
					}

					<label htmlFor="email">Email</label>
					<input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

					{status && error.email && 
						<div className="error">{error.email}</div>
					}

					<label htmlFor="password">Password</label>
					<input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

					{status && error.password && 
							<div className="error">{error.password}</div>
					}

					<label htmlFor="passwordConfirm">Repeat password</label>
					<input type="password" name="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />

					{status && error.passwordConfirm && 
							<div className="error">{error.passwordConfirm}</div>
					}
			
					<button className="submitButton" onClick={handleSignup}>Sign up</button>
					
					{typeof error == "string" && 
						<div className="error-global">{error}</div>
					}
					
					
					<br/>
					<p>Already an account ? <NavLink to="/signin">Sign in !</NavLink></p>
					
				</div>
			</div>
		</div>
    )
}

export default Signup