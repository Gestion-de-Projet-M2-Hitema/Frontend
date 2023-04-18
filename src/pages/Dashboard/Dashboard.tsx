import ServerBar from "../../components/ServerBar/ServerBar"
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { getMe } from "../../stores/profileStore"
import "./style.scss"

import UserCard from "../../components/UserCard/UserCard"


const Dashboard = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getMe())
	}, [])

	return (
		<div id="dashboard">
			<div id="servers">
				<ServerBar />
			</div>
			<div id="infos">
				<div></div>
				<UserCard />
			</div>
			
		</div>
	)
}

export default Dashboard