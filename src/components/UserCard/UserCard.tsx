// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from "../../stores/store";
// import { postLogin, resetSigninStatus } from "../../stores/authStore";

import SettingsIcon from "../../assets/icons/SettingsIcon";

import './style.scss'

const UserCard = () => {
	// const navigate = useNavigate();
	const {username} = useSelector((state: RootState) => state.auth)
    
	return (
		<div className="userCard">
			<div className="left">
				<img src="https://picsum.photos/200" alt="profile_piture" id="profilePicture" />
				<h1>{username}</h1>
			</div>

			<SettingsIcon/>

		</div>
	)
}

export default UserCard