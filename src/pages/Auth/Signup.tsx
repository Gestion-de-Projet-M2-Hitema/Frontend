import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { postSignup } from "../../stores/signupStore";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
		const navigate = useNavigate();
		const dispatch = useDispatch<AppDispatch>();
		const signupInfo = useSelector((state: RootState) => state.signup)
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
		const [passwordConfirm, setPasswordConfirm] = useState("")

		const handleSignup = async () => {
			let res = await dispatch(postSignup({username, name, email, password, passwordConfirm}))
			if(res.type === "auth/postSignin/fulfilled") return navigate("/signin");
		}

    return (
			<div className="auth">
				<div className="block">
					<h1>Signup to concorde</h1>

					<div className="form">

						<label htmlFor="email">Username</label>
						<input type="text" name="email" value={username} onChange={(e) => setUsername(e.target.value)} />

						{signupInfo.status && signupInfo.error.username && 
							<div className="error">{signupInfo.error.username}</div>
						}

						<label htmlFor="email">Name</label>
						<input type="text" name="email" value={name} onChange={(e) => setName(e.target.value)} />

						{signupInfo.status && signupInfo.error.name && 
							<div className="error">{signupInfo.error.name}</div>
						}

						<label htmlFor="email">Email</label>
						<input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

						{signupInfo.status && signupInfo.error.email && 
							<div className="error">{signupInfo.error.email}</div>
						}

						<label htmlFor="password">Password</label>
						<input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

						{signupInfo.status && signupInfo.error.password && 
								<div className="error">{signupInfo.error.password}</div>
						}

						<label htmlFor="passwordConfirm">Repeat password</label>
						<input type="password" name="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />

						{signupInfo.status && signupInfo.error.passwordConfirm && 
								<div className="error">{signupInfo.error.passwordConfirm}</div>
						}
				
						<button className="submitButton" onClick={handleSignup}>Sign up</button>
						
						{typeof signupInfo.error == "string" && 
							<div className="error-global">{signupInfo.error}</div>
						}
						
						
						<br/>
						<p>Already an account ? <NavLink to="/signin">Sign in !</NavLink></p>
						
					</div>
				</div>
					
					
			</div>
    )
}

export default Signup