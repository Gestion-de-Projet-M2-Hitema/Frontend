import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from "../../../stores/authStore";
import { AppDispatch, RootState } from "../../../stores/store";

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const userInfo = useSelector((state: RootState) => state.auth)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        let res = await dispatch(postLogin({email, password}))
        if(res.type === "auth/postLogin/fulfilled") return navigate("/home");
    }
    
    return (
        <div className="auth">
            <div className="block">
                <h1>Signin to concorde</h1>

                <div className="form">

                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    {userInfo.status && userInfo.error.email && 
                        <div className="error">{userInfo.error.email}</div>
                    }

                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    {userInfo.status && userInfo.error.password && 
                        <div className="error">{userInfo.error.password}</div>
                    }
                
                    <button className="submitButton" onClick={handleLogin}>Sign in</button>
                    
                    {typeof userInfo.error == "string" && 
                        <div className="error-global">{userInfo.error}</div>
                    }

                    <br />
                    <p>New to concorde ? <NavLink to="/">Sign up !</NavLink></p>
                   
                </div>

                
            </div>
            
          
           
        </div>
    )
}

export default Signin