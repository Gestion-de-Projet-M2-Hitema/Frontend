import { useState, useEffect, Key } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { useNavigate, Outlet } from "react-router-dom";
import { postUpdateChannel, postDeleteChannel, resetUpdateChannelStatus, resetDeleteChannelStatus, Channel } from "../../stores/channelStore";
import { Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Snackbar, Alert } from "@mui/material";

const Chat = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>();
	const {channelList, channelId, statusChannelUpdate, statusChannelDelete, channelError} = useSelector((state: RootState) => state.channel)

	const [channel, setChannel] = useState<Channel>({id: '', name: '', owner: '', server: '', avatar: '', created: '', updated: ''})

	const [open, setOpen] = useState(false)
	const [name, setName] = useState("")
	const [isError, setIsError] = useState(false)
	const [errorText, setErrorText] = useState("")

	const [openDelete, setOpenDelete] = useState(false)
	const [openErrorAlert, setOpenErrorAlert] = useState(false)

	const handleOpen = () => {
		setName(channel.name)
		setIsError(false)
		setErrorText("")
		setOpen(true);
	}
  const handleClose = () => setOpen(false);

	const handleUpdateChannel = () => {
		setIsError(false)
		setErrorText("")
		if(name.length < 2 || name.length > 50){
			setIsError(true)
			setErrorText("The channel name must be between 2 and 50 characters long.")
		}
		else {
			dispatch(postUpdateChannel({id: channelId as string, name: name}))
		}
	}

	const handleDeleteChannel = () => {
		dispatch(postDeleteChannel(channel.id as string))
	}

	const handleCloseAlert = () => setOpenErrorAlert(false)

	useEffect(() => {
		if(statusChannelUpdate == "fulfilled"){
			setOpen(false)
			dispatch(resetUpdateChannelStatus())
		}
		if(statusChannelUpdate == "rejected") {
			dispatch(resetUpdateChannelStatus())
			setIsError(true)
			setErrorText(JSON.stringify(channelError))
		}
	}, [statusChannelUpdate])

	useEffect(() => {
		if(statusChannelDelete == "fulfilled"){
			setOpenDelete(false)
			dispatch(resetDeleteChannelStatus())
		}
		if(statusChannelDelete == "rejected") {
			setOpenDelete(false)
			dispatch(resetDeleteChannelStatus())
			setOpenErrorAlert(true)
			setErrorText(JSON.stringify(channelError))
		}
	}, [statusChannelDelete])

	useEffect(() => {
		if(channelId == "") navigate("/dashboard")
		let ci = channelList.findIndex(e => e.id == channelId)
		if(ci >= 0) setChannel(channelList[ci])
	}, [channelList, channelId])
    
	return (
		<div>
			<p>{channel.name}</p>
			<button onClick={handleOpen}>Update channel name</button>
			<button onClick={() => setOpenDelete(true)}>Delete channel</button>

			<Dialog 
				open={open} 
				onClose={handleClose} 
				id="modalUpdateChannel" 
				fullWidth={true} 
				maxWidth="xs"
				>
        <DialogTitle>Update channel name</DialogTitle>
        <DialogContent>
          <TextField
						autoFocus
						error={isError}
						helperText={errorText}
            margin="dense"
            id="name"
            label="channel name"
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
          <Button onClick={handleUpdateChannel} disabled={name == channel.name}>Change channel name</Button>
        </DialogActions>
      </Dialog>

			<Dialog 
				open={openDelete} 
				onClose={() => setOpenDelete(false)} 
				id="modalDeleteServer" 
				fullWidth={true} 
				maxWidth="xs"
				>
        <DialogTitle>Delete channel ?</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this channel ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={handleDeleteChannel}>Delete</Button>
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

export default Chat