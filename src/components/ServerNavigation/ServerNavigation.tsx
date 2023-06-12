import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/theme.context";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { Server } from "../../stores/serverStore";
import { getListChannel, postCreateChannel, resetCreateChannelStatus, setChannelId } from "../../stores/channelStore";
import { useNavigate } from "react-router-dom";
import { Modal, TextField } from "@mui/material";

import SettingsIcon from "../../assets/icons/SettingsIcon";
import RequestIcon from "../../assets/icons/RequestIcon";
import PlusIcon from "../../assets/icons/PlusIcon";
import ChannelIcon from "../../assets/icons/ChannelIcon";

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
	const [selected, setSelected] = useState("")

	const themes = useContext(ThemeContext);

	const [mainBgColor, setmainBgColor] = useState('')
	const [mainTextColor, setmainTextColor] = useState('')

	useEffect(() => {
		let c = getComputedStyle(document.getElementById(themes.theme)).getPropertyValue('--main_bg_color')
		let ct = getComputedStyle(document.getElementById(themes.theme)).getPropertyValue('--main_text_color')
		setmainBgColor(c)
		setmainTextColor(ct)
	}, [themes.theme])

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
		setSelected("")
		let si = serverList.findIndex(e => e.id == serverId)
		if(si >= 0) setServer(serverList[si])
		if(serverId.length) dispatch(getListChannel(serverId))
	}, [serverList, serverId])
  
	return (
		<div id="serverNavigation">
			{serverId && <>
				<h1>{server.name}</h1>

				<div className={`item ${selected == 'serverParameters' && 'active'}`} onClick={() => {
						setSelected('serverParameters')
						navigate("/dashboard/serverParameters")
					}}>
					<SettingsIcon />
					<h3>Parameters</h3>
				</div>

				<div className={`item ${selected == 'userRequests' && 'active'}`} onClick={() => {
						setSelected('userRequests')
						navigate("/dashboard/userRequests")
					}}>
					<RequestIcon />
					<h3>Request</h3>
				</div>

				<div className={`item ${selected == 'newChannel' && 'active'}`} onClick={() => {
						setSelected('newChannel')
						handleOpen()
					}}>
					<PlusIcon />
					<h3>New channel</h3>
				</div>

				
				<div className="channels">
					<h3>Channels</h3>
					{channelList.map(e => {
						return (
							<div key={e.id} className={`itemChannel ${selected == 'channel-' + e.id && 'channelActive'}`}  onClick={() => {
								setSelected("channel-" + e.id)
								handleChannelSelection(e.id as string)
							}}>
								<ChannelIcon />
								<h4>{e.name}</h4>
							</div>
						)
					})}
				</div>

				<Modal
					open={open}
					onClose={() => handleClose()}
					id="modalCreateChannel" 
				>
					<div className="modal" style={{ backgroundColor: mainBgColor, borderColor: mainBgColor, color: mainTextColor }}>
						<h1>Create channel</h1>

						<div className="modalBody">
							<div className="modalContent">
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
							</div>

							<div className="modalAction">
								<div className="modalButton buttonCancel" style={{ backgroundColor: mainBgColor }} onClick={handleClose}>Cancel</div>
								<div className="modalButton buttonSubmit" style={{ backgroundColor: mainBgColor }} onClick={handleCreateChannel}>Create channel</div>
							</div>
						</div>
					</div>
				</Modal>

			</>}
			
		</div>
	)
}

export default ServerNavigation