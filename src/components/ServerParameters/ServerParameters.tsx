import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/theme.context";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { postUpdateServer, postDeleteServer, resetUpdateStatus, resetDeleteStatus, Server } from "../../stores/serverStore";
import { Modal, TextField, Snackbar, Alert } from "@mui/material";

import './style.scss'


const ServerParameters = () => {
	const dispatch = useDispatch<AppDispatch>();
	const {serverList, serverId, statusUpdate, statusDelete, error} = useSelector((state: RootState) => state.server)
	const themes = useContext(ThemeContext);

	const [mainBgColor, setmainBgColor] = useState('')
	const [mainTextColor, setmainTextColor] = useState('')

	useEffect(() => {
		let c = getComputedStyle(document.getElementById(themes.theme)).getPropertyValue('--main_bg_color')
		let ct = getComputedStyle(document.getElementById(themes.theme)).getPropertyValue('--main_text_color')
		setmainBgColor(c)
		setmainTextColor(ct)
	}, [themes.theme])
	
	const [server, setServer] = useState<Server>({id: '', name: '', members: [], created: '', updated: ''})

	const [open, setOpen] = useState(false)
	const [name, setName] = useState("")
	const [isError, setIsError] = useState(false)
	const [errorText, setErrorText] = useState("")

	const [openDelete, setOpenDelete] = useState(false)
	const [openErrorAlert, setOpenErrorAlert] = useState(false)

	const formatDate = (date: string | number | Date) => {
		let d = new Date(date)
		return `${('0' + d.getDate()).slice(-2)}/${('0' + d.getMonth()).slice(-2)}/${d.getFullYear()}`
	}


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

	useEffect(() => {
		let si = serverList.findIndex(e => e.id == serverId)
		if(si >= 0){
			setServer(serverList[si])
			setName(serverList[si].name)
		} 	
	}, [serverList, serverId])
    
	return (
		<div id="serverParameters">
			<h1>Paramètre serveur</h1>

			<div className="container">
				<div className="form">
					<label >Server name</label>
					<div className="formInput">
						<input disabled type="text" value={server.name}/>
						<div className="buttonUpdate" onClick={handleOpen}>Update server name</div>
					</div>
				</div>

				<label htmlFor="email">Number of persons</label>
				<input disabled type="text" name="email" value={server.members.length} />

				<label htmlFor="email">Created at</label>
				<input disabled type="text" name="email" value={formatDate(server.created)} />

				<label htmlFor="email">Last modified at</label>
				<input disabled type="text" name="email" value={formatDate(server.updated)} />

				<div className="buttonDelete" onClick={() => setOpenDelete(true)}>Delete server</div>

			</div>

			<Modal
				open={openDelete}
				onClose={() => setOpenDelete(false)}
			>
				<div className="modal" style={{ backgroundColor: mainBgColor, borderColor: mainBgColor, color: mainTextColor }}> 
					<h1>Delete server ?</h1>

					<div className="modalBody">
						<div className="modalContent">
							<p>Are you sure you want to delete this server ?</p>
						</div>

						<div className="modalAction">
							<div className="modalButton buttonCancel" style={{ backgroundColor: mainBgColor }} onClick={() => setOpenDelete(false)}>Cancel</div>
							<div className="modalButton buttonSubmit" style={{ backgroundColor: mainBgColor }} onClick={handleDeleteServer}>Delete</div>
						</div>
					</div>
				</div>
			</Modal>

			<Modal
				open={open}
				onClose={() => handleClose()}
			>
				<div className="modal" style={{ backgroundColor: mainBgColor, borderColor: mainBgColor, color: mainTextColor }}>
					<h1>Update server name</h1>

					<div className="modalBody">
						<div className="modalContent">
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
						</div>

						<div className="modalAction">
							<div className="modalButton buttonCancel" style={{ backgroundColor: mainBgColor }} onClick={handleClose}>Cancel</div>
							<div className="modalButton buttonSubmit" style={{ backgroundColor: mainBgColor }} onClick={handleUpdateServer}>Change server name</div>
						</div>
					</div>
				</div>
			</Modal>


			<Snackbar open={openErrorAlert} onClose={handleCloseAlert} autoHideDuration={3000} anchorOrigin={{ vertical : "top", horizontal: "center" }}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {errorText}
        </Alert>
      </Snackbar>

		</div>
	
	)
}

export default ServerParameters