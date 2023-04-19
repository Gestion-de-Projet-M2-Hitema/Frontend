import { useState, useEffect, Key } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { getList, postUpdateServer, postDeleteServer, resetUpdateStatus, resetDeleteStatus } from "../../stores/serverStore";
import { Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Snackbar, Alert } from "@mui/material";

import './style.scss'

const ServerParameters = () => {
	const dispatch = useDispatch<AppDispatch>();
	const {server, statusUpdate, statusDelete, error} = useSelector((state: RootState) => state.server)

	const [open, setOpen] = useState(false)
	const [name, setName] = useState("")
	const [isError, setIsError] = useState(false)
	const [errorText, setErrorText] = useState("")

	const [openDelete, setOpenDelete] = useState(false)
	const [openErrorAlert, setOpenErrorAlert] = useState(false)


	const handleOpen = () => {
		setName(server.name)
		setIsError(false)
		setErrorText("")
		setOpen(true);
	}
  const handleClose = () => setOpen(false);

	const handleUpdateServer = () => {
		setIsError(false)
		setErrorText("")
		if(name.length < 2 || name.length > 50){
			setIsError(true)
			setErrorText("The server name must be between 2 and 50 characters long.")
		}
		else {
			dispatch(postUpdateServer({id: server.id as string, name: name}))
		}
	}

	const handleDeleteServer = () => {
		dispatch(postDeleteServer(server.id as string))
	}

	const handleCloseAlert = () => setOpenErrorAlert(false)

	useEffect(() => {
		if(statusUpdate == "fulfilled"){
			setOpen(false)
			dispatch(resetUpdateStatus())
		}
		if(statusUpdate == "rejected") {
			dispatch(resetUpdateStatus())
			setIsError(true)
			setErrorText(JSON.stringify(error))
		}
	}, [statusUpdate])

	useEffect(() => {
		if(statusDelete == "fulfilled"){
			setOpenDelete(false)
			dispatch(resetDeleteStatus())
		}
		if(statusDelete == "rejected") {
			setOpenDelete(false)
			dispatch(resetDeleteStatus())
			setOpenErrorAlert(true)
			setErrorText(JSON.stringify(error))
		}
	}, [statusDelete])
    
	return (
		<div id="serverParameters">
			<h1>Paramètre serveur</h1>

			<button onClick={handleOpen}>Update server name</button>

			<label >Server name</label>
			<input readOnly type="text" value={server.name} />

			<label htmlFor="email">Number of persons</label>
			<input readOnly type="text" name="email" value={server.members.length} />

			<label htmlFor="email">Created at</label>
			<input readOnly type="text" name="email" value={server.created} />

			<label htmlFor="email">Last modified at</label>
			<input readOnly type="text" name="email" value={server.updated} />

			<br />

			<button onClick={() => setOpenDelete(true)}>Delete server</button>


			<Dialog 
				open={open} 
				onClose={handleClose} 
				id="modalUpdateServer" 
				fullWidth={true} 
				maxWidth="xs"
				>
        <DialogTitle>Update server name</DialogTitle>
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
          <Button onClick={handleUpdateServer} disabled={name == server.name}>Change server name</Button>
        </DialogActions>
      </Dialog>

			<Dialog 
				open={openDelete} 
				onClose={handleClose} 
				id="modalDeleteServer" 
				fullWidth={true} 
				maxWidth="xs"
				>
        <DialogTitle>Delete server ?</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this server ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={handleDeleteServer}>Delete</Button>
        </DialogActions>
      </Dialog>

			<Snackbar open={openErrorAlert} onClose={handleCloseAlert} autoHideDuration={3000} anchorOrigin={{ vertical : "top", horizontal: "center" }}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {errorText}
        </Alert>
      </Snackbar>

		</div>
	
	)
}

export default ServerParameters