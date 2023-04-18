import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "../../stores/store";

import SettingsIcon from "../../assets/icons/SettingsIcon";

import './style.scss'

const UserCard = () => {
	const {avatar, username} = useSelector((state: RootState) => state.profile)
	const [url, setUrl] = useState("")

	useEffect(() => {
		if(!avatar) setUrl("https://picsum.photos/200")
		else setUrl(avatar)
	}, [avatar])
  
	return (
		<div className="userCard">
			<div className="left">
				<img src={url} alt="profile_piture" id="profilePicture" />
				<h1>{username}</h1>
			</div>

			<SettingsIcon/>

		</div>
	)
}

export default UserCard