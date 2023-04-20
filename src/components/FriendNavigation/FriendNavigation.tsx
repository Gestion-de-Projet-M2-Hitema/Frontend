import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { useNavigate, Outlet } from "react-router-dom";
import { TextField } from "@mui/material";

import "./style.scss"
import { Friend, deleteFriends, getFriends } from "../../stores/friendStore";
import CloseIcon from "../../assets/icons/CloseIcon";

const FriendNavigation = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>();
	const { friendList } = useSelector((state: RootState) => state.friend)

	const handleFriendRemove = (id: string) => {
		dispatch(deleteFriends({id}))
	}

	useEffect(() => {
	  dispatch(getFriends())
	}, [])
  
	return (
		<div id="friend-navigation">
			<h1>Friends</h1>
			<ul>
				{friendList && friendList.map((item: Friend) => (
					<li key={item.id}>
						<span>{item.username}</span>
						<span className="remove-friend" onClick={() => handleFriendRemove(item.id)}><CloseIcon /></span>
					</li>
				))}
			</ul>
		</div>
	)
}

export default FriendNavigation