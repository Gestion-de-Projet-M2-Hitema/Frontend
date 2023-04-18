import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { getList, postCreateServer, resetCreateStatus } from "../../stores/serverStore";
import { Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";


import PlusIcon from "../../assets/icons/PlusIcon";

import './style.scss'

const ServerBar = () => {
	const dispatch = useDispatch<AppDispatch>();
	const {serverList, status, statusCreate, error} = useSelector((state: RootState) => state.server)

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
		if(statusCreate == "fulfilled") setOpen(false);
		if(statusCreate == "rejected") {
			setIsError(true)
			setErrorText(JSON.stringify(error))
		}
	}, [statusCreate])

	const title = (name: String) => {
		let matches = name.match(/\b(\w)/g); // ['J','S','O','N']
		return (matches) ? matches.join('').toUpperCase() : ""; // JSON
	}


	useEffect(() => {
		dispatch(getList())
		console.log(serverList)
	}, [])
    
	return (
		<div id="serverBar">
			<Tooltip title="Add Server" placement="right">
				<div className="serverBlock" onClick={() => handleOpen()}>
					<PlusIcon />
				</div>
			</Tooltip>

			{serverList.map(s => <Tooltip title={s.name} placement="right" key={s.id}>
				<div className="serverBlock">
					<h2>{title(s.name)}</h2>
				</div>
			</Tooltip>)}

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