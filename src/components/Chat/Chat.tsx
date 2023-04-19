import { useState, useEffect, Key } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";

const Chat = () => {
	const dispatch = useDispatch<AppDispatch>();
	const {serverList, status, statusCreate, error} = useSelector((state: RootState) => state.server)
    
	return (
		<div>
			<p>Chat</p>
		</div>
	)
}

export default Chat