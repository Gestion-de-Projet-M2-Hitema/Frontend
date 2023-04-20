import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { Server } from "../../stores/serverStore";
import { getListChannel, postCreateChannel, resetCreateChannelStatus, setChannelId } from "../../stores/channelStore";
import { useNavigate, Outlet } from "react-router-dom";
import { Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";

import "./style.scss"

const ServerNavigation = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>();
	const {serverList, serverId} = useSelector((state: RootState) => state.server)
	const {channelList, statusChannelCreate, channelError} = useSelector((state: RootState) => state.channel)

	const [server, setServer] = useState<Server>({id: '', name: '', members: [], created: '', updated: ''})
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("")
	const [isError, setIsError] = useState(false)
	const [errorText, setErrorText] = useState("")

  const handleOpen = () => {
		setIsError(false)
		setName("")
		setErrorText("")
		setOpen(true);
	}
  const handleClose = () => setOpen(false);

	const handleCreateChannel = () => {
		setIsError(false)
		setErrorText("")
		if(name.length < 2 || name.length > 50){
			setIsError(true)
			setErrorText("The channel name must be between 2 and 50 characters long.")
		}
		else {
			dispatch(postCreateChannel({id: serverId, name: name}))
		}
	}

	const handleChannelSelection = (id: string) => {
		dispatch(setChannelId(id))
		navigate("/dashboard/chat")
	}

	useEffect(() => {
		if(statusChannelCreate == "fulfilled"){
			setOpen(false);
			dispatch(resetCreateChannelStatus())
		}
		if(statusChannelCreate == "rejected") {
			dispatch(resetCreateChannelStatus())
			setIsError(true)
			setErrorText(JSON.stringify(channelError))
		}
	}, [statusChannelCreate])

	useEffect(() => {
		let si = serverList.findIndex(e => e.id == serverId)
		if(si >= 0) setServer(serverList[si])
		if(serverId.length) dispatch(getListChannel(serverId))
	}, [serverList, serverId])
  
	return (
		<div id="serverNavigation">
			{serverId && <>
				<h1>{server.name}</h1>
				<button onClick={() => {navigate("/dashboard")}}>Params</button>
				<br/>
				<button onClick={handleOpen}>Create channel</button>

				<ul>
					{channelList.map(e => <li key={e.id}>
						<button onClick={() => handleChannelSelection(e.id as string)}>{e.name}</button>
					</li>)}
				</ul>

				<Dialog 
					open={open} 
					onClose={handleClose} 
					id="modalCreateChannel" 
					fullWidth={true} 
					maxWidth="xs"
					>
					<DialogTitle>Create channel</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							error={isError}
							helperText={errorText}
							margin="dense"
							id="name"
							label="Channel name"
							type="text"
							fullWidth
							variant="outlined"
							value={name}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								setName(event.target.value);
							}}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={handleCreateChannel}>Create channel</Button>
					</DialogActions>
				</Dialog>

			</>}
			
		</div>
	)
}

export default ServerNavigation