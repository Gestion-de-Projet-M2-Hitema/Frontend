import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { useNavigate, Outlet } from "react-router-dom";
import { TextField } from "@mui/material";

import "./style.scss"
import { Friend, getFriends } from "../../stores/friendStore";

const FriendNavigation = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>();
	const { friendList } = useSelector((state: RootState) => state.friend)

	useEffect(() => {
	  dispatch(getFriends())
	}, [])
  
	return (
		<div id="serverNavigation">
			<h1>Friends</h1>
			<ul>
				{friendList && friendList.map((item: Friend) => (
					<li key={item.id}>{item.username}</li>
				))}
			</ul>
		</div>
	)
}

export default FriendNavigation