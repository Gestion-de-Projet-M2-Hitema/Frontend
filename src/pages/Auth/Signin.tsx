import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { postLogin, resetSigninStatus } from "../../stores/authStore";
import { AppDispatch, RootState } from "../../stores/store";

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {status, error} = useSelector((state: RootState) => state.auth)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        dispatch(postLogin({email, password}))
    }

    useEffect(() => {
        if (status === "fulfilled") {
            navigate("/home")
            dispatch(resetSigninStatus())
        }
    }, [status])
    
    return (
        <div className="auth">
            <div className="block">
                <h1>Signin to concorde</h1>

                <div className="form">

                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    {status && error?.email && 
                        <div className="error">{error?.email}</div>
                    }

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    {status && error?.password && 
                        <div className="error">{error?.password}</div>
                    }
                
                    <button className="submitButton" onClick={handleLogin}>Sign in</button>
                    
                    {typeof error == "string" && 
                        <div className="error-global">{error}</div>
                    }

                    <br />
                    <p>New to concorde ? <NavLink to="/">Sign up !</NavLink></p>
                   
                </div>
            </div>
        </div>
    )
}

export default Signin