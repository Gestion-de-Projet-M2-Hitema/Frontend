import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";

import UserCard from "../../components/UserCard/UserCard"

const Dashboard = () => {

	return (
		<div>
			<UserCard />
		</div>
	)
}

export default Dashboard