import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { useNavigate, Outlet } from "react-router-dom";
import { TextField } from "@mui/material";

import "./style.scss"

const ServerNavigation = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>();
	const {server} = useSelector((state: RootState) => state.server)
  
	return (
		<div id="serverNavigation">
			<h1>{server.name}</h1>
			<button onClick={() => {navigate("/dashboard")}}>Params</button>
			<br/>
			<button onClick={() => {navigate("/dashboard/chat")}}>Chat</button>
		</div>
	)
}

export default ServerNavigation