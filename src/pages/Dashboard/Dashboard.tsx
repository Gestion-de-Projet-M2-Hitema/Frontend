import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { getMe } from "../../stores/profileStore"

import UserCard from "../../components/UserCard/UserCard"

import "./style.scss"

const Dashboard = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getMe())
	}, [])

	return (
		<div>
			<UserCard />
		</div>
	)
}

export default Dashboard