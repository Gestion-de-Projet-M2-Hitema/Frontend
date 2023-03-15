import { useState } from "react"
import { useDispatch } from 'react-redux';
import { postLogin } from "../../../stores/authStore";
import { AppDispatch } from "../../../stores/store";
import "./style.scss"

const Auth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => dispatch(postLogin({email, password}))

    return (
        <div className="Auth">
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}