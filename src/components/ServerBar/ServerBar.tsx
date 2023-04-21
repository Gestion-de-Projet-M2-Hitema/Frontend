import { useState, useEffect, Key } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { getList, postCreateServer, resetCreateStatus, setServerId } from "../../stores/serverStore";
import { Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import PlusIcon from "../../assets/icons/PlusIcon";
import FriendIcon from "../../assets/icons/FriendIcon";
import ExploreIcon from "../../assets/icons/ExploreIcon";

import './style.scss'

const ServerBar = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate()
	const {serverList, statusCreate, error} = useSelector((state: RootState) => state.server)

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

	const handleCreateServer = () => {
		setIsError(false)
		setErrorText("")
		if(name.length < 2 || name.length > 50){
			setIsError(true)
			setErrorText("The server name must be between 2 and 50 characters long.")
		}
		else {
			dispatch(postCreateServer(name))
		}
	}

	useEffect(() => {
		if(statusCreate == "fulfilled"){
			setOpen(false);
			dispatch(resetCreateStatus())
		}
		if(statusCreate == "rejected") {
			dispatch(resetCreateStatus())
			setIsError(true)
			setErrorText(JSON.stringify(error))
		}
	}, [statusCreate])

	const title = (name: String) => {
		let matches = name.match(/\b(\w)/g); // ['J','S','O','N']
		return (matches) ? matches.join('').toUpperCase().slice(0,4) : ""; // JSON
	}


	useEffect(() => {
		dispatch(getList())
	}, [])
    
	return (
		<div id="serverBar">
			<Tooltip title="Friends" placement="right">
				<div className="serverBlock" onClick={() => navigate("/dashboard/friends")}>
					<FriendIcon />
				</div>
			</Tooltip>

			{serverList.map(s => <Tooltip title={s.name} placement="right" key={s.id as Key}>
				<div className="serverBlock" onClick={() => {
					navigate("/dashboard")
					dispatch(setServerId(s.id as string))
				}}>
					<h2>{title(s.name)}</h2>
				</div>
			</Tooltip>)}

			<Tooltip title="Add Server" placement="right">
				<div className="serverBlock" onClick={() => handleOpen()}>
					<PlusIcon />
				</div>
			</Tooltip>

			<Tooltip title="Explore servers" placement="right">
				<div className="serverBlock" onClick={() => navigate("/dashboard/explore")}>
					<ExploreIcon />
				</div>
			</Tooltip>

			<Dialog 
				open={open} 
				onClose={handleClose} 
				id="modalCreateServer" 
				fullWidth={true} 
				maxWidth="xs"
				>
        <DialogTitle>Create Server</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
						error={isError}
						helperText={errorText}
            margin="dense"
            id="name"
            label="Server name"
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
          <Button onClick={handleCreateServer}>Create server</Button>
        </DialogActions>
      </Dialog>

		</div>
	)
}

export default ServerBar