import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from "../../stores/store";
import Cookies from 'js-cookie'

import './style.scss'

const Home = () => {
    const navigate = useNavigate();
	const {token} = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if(token != '') navigate("/dashboard")
    }, [token])

    return (
        <div className="home">
            <h1>Concorde</h1>
            <p>Une application de chat pour entreprise.</p>
        </div>
    )
}

export default Home