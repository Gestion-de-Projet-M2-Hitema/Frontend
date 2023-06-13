import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { useNavigate, Outlet } from "react-router-dom";
import { Dialog, Autocomplete, TextField } from "@mui/material";
import "./style.scss"
import { Friend, User, deleteFriends, getFriends, getUsers, addFriend } from "../../stores/friendStore";
import CloseIcon from "../../assets/icons/CloseIcon";
import PlusIcon from "../../assets/icons/PlusIcon";

const FriendNavigation = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>();
	const { friendList, users } = useSelector((state: RootState) => state.friend)
	const [addFriendModal, setAddFriendModal] = useState(false)

	const filteredUsers = useMemo(() => 
		users.filter((user: User) => !!!friendList.find((friend: Friend) => friend.id == user.id))
	, [users, friendList])

	const handleFriendRemove = (id: string) => {
		dispatch(deleteFriends({id}))
	}

	const handleFriendRequest = (e: any) => {
		if (!e) return
		dispatch(addFriend({id: e.id}))
		setAddFriendModal(false)
	}

	useEffect(() => {
	  dispatch(getFriends())
	  dispatch(getUsers({page: 1, limit: 50}))
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
			<div className="add-friend-button" onClick={() => setAddFriendModal(true)}>
				<PlusIcon />
				Add a friend
			</div>
			<Dialog open={addFriendModal} onClose={() => setAddFriendModal(false)}>
				<div className="add-friend">
					<h2>Add a friend</h2>
					<Autocomplete
						options={filteredUsers}
						renderInput={(params) => <TextField {...params} label="Users" />}
						getOptionLabel={(option: User) => option.username}
						onChange={(e, newValue) => handleFriendRequest(newValue)}
					/>
				</div>
			</Dialog>
		</div>
	)
}

export default FriendNavigation