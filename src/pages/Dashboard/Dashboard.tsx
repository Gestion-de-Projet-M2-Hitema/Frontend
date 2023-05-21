import ServerBar from "../../components/ServerBar/ServerBar"
import { useEffect } from "react";
import {  Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { getMe } from "../../stores/profileStore"
import UserCard from "../../components/UserCard/UserCard"

import ServerNavigation from "../../components/ServerNavigation/ServerNavigation";

import "./style.scss"
import FriendNavigation from "../../components/FriendNavigation/FriendNavigation";

const Dashboard = () => {
	const dispatch = useDispatch<AppDispatch>();
	const {serverList, serverId} = useSelector((state: RootState) => state.server)
	const location = useLocation()
	const isFriendsPage = location.pathname == "/dashboard/friends"
	const isExplorePage = location.pathname == "/dashboard/explore"
	const isMePage = location.pathname == "/dashboard/me"

	useEffect(() => {
		dispatch(getMe())
	}, [])

	return (
		<div id="dashboard">
			<ServerBar />

			<div className="renderView">

				<div className="innerNavigation">
					{(isFriendsPage || isExplorePage) && <FriendNavigation />}
					{(isExplorePage || isMePage) && <div> </div>}
					{(!isFriendsPage && !isExplorePage && !isMePage) && <ServerNavigation />}
					<UserCard /> 
				</div>

				<div className="renderComponent">
					{(isFriendsPage || isExplorePage || serverId != '') && <Outlet />}
				</div>

				
			</div>
			
		</div>
	)
}

export default Dashboard