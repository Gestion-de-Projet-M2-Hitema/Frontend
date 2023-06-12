import { useState, useEffect, Key, useCallback, useRef, useContext } from "react";
import { ThemeContext } from "../../context/theme.context";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { postUpdateChannel, postDeleteChannel, resetUpdateChannelStatus, resetDeleteChannelStatus, Channel } from "../../stores/channelStore";
import { Modal, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Snackbar, Alert } from "@mui/material";
import { ChatMessage } from "../../stores/chatStore";
import { socket } from "../../socket";
import Cookies from "js-cookie";

import PencilIcon from "../../assets/icons/PencilIcon";
import TrashIcon from "../../assets/icons/TrashIcon";

import "./style.scss"


const Chat = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>();
	const {channelList, channelId, statusChannelUpdate, statusChannelDelete, channelError} = useSelector((state: RootState) => state.channel)

	const [channel, setChannel] = useState<Channel>({id: '', name: '', owner: '', server: '', avatar: '', created: '', updated: ''})

	const themes = useContext(ThemeContext);

	const [mainBgColor, setmainBgColor] = useState('')
	const [mainTextColor, setmainTextColor] = useState('')

	useEffect(() => {
		let c = getComputedStyle(document.getElementById(themes.theme)).getPropertyValue('--main_bg_color')
		let ct = getComputedStyle(document.getElementById(themes.theme)).getPropertyValue('--main_text_color')
		setmainBgColor(c)
		setmainTextColor(ct)
	}, [themes.theme])

	const [open, setOpen] = useState(false)
	const [name, setName] = useState("")
	const [isError, setIsError] = useState(false)
	const [errorText, setErrorText] = useState("")

	const [openDelete, setOpenDelete] = useState(false)
	const [openErrorAlert, setOpenErrorAlert] = useState(false)

	const inputMessage = useRef<any>(null)

	const [messageHistory, setMessageHistory] = useState<ChatMessage[]>([])

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

	const handleSendMessage = (e: any) => {
		if (e.code != "Enter") return
		socket.emit(`send-message`, {
			token: Cookies.get("jwt") || "",
			content: e.target.value,
			id: channelId
		}, (e: any) => {
			console.log(e)
		});
	}

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

	useEffect(() => {
		const onAllMessages = (data: any) => setMessageHistory([...data].reverse())
		const onNewMessage = (data: any) => setMessageHistory((prev: ChatMessage[]) => [...prev, data])

		socket.on("join-channel", onAllMessages)
		socket.on("new-message", onNewMessage)
		socket.emit("join-channel", {token: Cookies.get("jwt") || "", id: channelId})
	
		return () => {
			socket.off("join-channel", onAllMessages)
			socket.off("new-message", onNewMessage)
		};
	}, [])

	return (
		<div className="Chat">
			{/* CHANNEL INFO / ACTIONS */}
			<div className="channel-info">
				<h1>{channel.name}</h1>
				<div className="iconContainer">
					<div className="icon" onClick={handleOpen}>
						<PencilIcon />
					</div>
					<div className="icon" onClick={() => setOpenDelete(true)}>
						<TrashIcon />
					</div>
				</div>
			</div>

			<Modal
				open={open}
				onClose={() => handleClose()}
				id="modalUpdateChannel" 
			>
				<div className="modal" style={{ backgroundColor: mainBgColor, borderColor: mainBgColor, color: mainTextColor }}>
					<h1>Update channel name</h1>

					<div className="modalBody">
						<div className="modalContent">
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
						</div>

						<div className="modalAction">
							<div className="modalButton buttonCancel" style={{ backgroundColor: mainBgColor }} onClick={handleClose}>Cancel</div>
							<button className="modalButton buttonSubmit" style={{ backgroundColor: mainBgColor }} onClick={handleUpdateChannel} disabled={name == channel.name}>Change channel name</button>
						</div>
					</div>
				</div>
			</Modal>

			<Modal
				open={openDelete}
				onClose={() => setOpenDelete(false)}
				id="modalDeleteServer" 
			>
				<div className="modal" style={{ backgroundColor: mainBgColor, borderColor: mainBgColor, color: mainTextColor }}>
					<h1>Delete channel ?</h1>

					<div className="modalBody">
						<div className="modalContent">
							<p>Are you sure you want to delete this channel ?</p>
						</div>

						<div className="modalAction">
							<div className="modalButton buttonCancel" style={{ backgroundColor: mainBgColor }} onClick={() => setOpenDelete(false)}>Cancel</div>
							<button className="modalButton buttonSubmit" style={{ backgroundColor: mainBgColor }} onClick={handleDeleteChannel} disabled={name == channel.name}>Delete</button>
						</div>
					</div>
				</div>
			</Modal>

			<Snackbar open={openErrorAlert} onClose={handleCloseAlert} autoHideDuration={3000} anchorOrigin={{ vertical : "top", horizontal: "center" }}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {errorText}
        </Alert>
      </Snackbar>


	  {/* CHAT PAGE */}

	  <div className="chat-zone">
		<div className="chat-message-list">
			{messageHistory.length > 0 && messageHistory.map((message: ChatMessage) => (
				<div className="chat-message-element">
					<div className="chat-message-author"><span>{message.user.username}</span> said at {message.date}</div>
					<div className="chat-message-content">{message.content}</div>
					{message.image && (
						<img src={message.image} alt="user sent image" />
					)}
				</div>
			))}
		</div>
		<div className="chat-input">
			<TextField placeholder="Message" label="Write your message here" variant="filled" onKeyUp={handleSendMessage} fullWidth color="secondary" focused ref={inputMessage} />
		</div>
	  </div>

		</div>
	)
}

export default Chat