import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from "../../../stores/authStore";
import { AppDispatch, RootState } from "../../../stores/store";
import "./style.scss"

const Auth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userInfo = useSelector((state: RootState) => state.auth)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => dispatch(postLogin({email, password}))

    return (
        <div className="Auth">
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button><br />
            {userInfo.name}
            {userInfo.username}
            {userInfo.avatar}
            {userInfo.status && (
                <div>{userInfo.error.email} {userInfo.error.password}</div>
            )}
            <img src={userInfo.avatar ?? ""} alt="" />
        </div>
    )
}

export default Auth