import ServerBar from "../../components/ServerBar/ServerBar"
import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { getMe } from "../../stores/profileStore"
import UserCard from "../../components/UserCard/UserCard"

import ServerNavigation from "../../components/ServerNavigatiob/ServerNavigation";

import "./style.scss"
import FriendNavigation from "../../components/FriendNavigation/FriendNavigation";

const Dashboard = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>();
	const {server} = useSelector((state: RootState) => state.server)
	const location = useLocation()
	const isFriendsPage = location.pathname == "/dashboard/friends"

	useEffect(() => {
		dispatch(getMe())
	}, [])

	return (
		<div id="dashboard">
			<div id="servers">
				<ServerBar />
			</div>
			<div id="infos">
				{isFriendsPage
				? <FriendNavigation />
				: <ServerNavigation />
				}
				<UserCard />
			</div>

			{server.id != '' && <Outlet />}
			
			{server.id == '' &&
				<div>
					<p>pas de server sélectionné</p>
				</div>
			}
		</div>
	)
}

export default Dashboard