import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/theme.context";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { getList, postCreateServer, resetCreateStatus, setServerId } from "../../stores/serverStore";
import { Modal, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import PlusIcon from "../../assets/icons/PlusIcon";
import FriendIcon from "../../assets/icons/FriendIcon";
import ExploreIcon from "../../assets/icons/ExploreIcon";

import ServerIcon from "../../assets/icons/ServerIcon";

import './style.scss'

const ServerBar = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate()
	const {serverList, statusCreate, error} = useSelector((state: RootState) => state.server)

	const [open, setOpen] = useState(false);
	const [name, setName] = useState("")
	const [isError, setIsError] = useState(false)
	const [errorText, setErrorText] = useState("")
	const [selected, setSelected] = useState("friends")

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

	useEffect(() => {
		dispatch(getList())
		navigate("/dashboard/friends")
	}, [])
    
	return (
		<div id="serverBar">

			<div className={`item ${selected == 'friends' && 'active'}`} onClick={() => {
				setSelected("friends")
				navigate("/dashboard/friends")
			}}>
				<FriendIcon />
				<h2>Friends</h2>
			</div>

			{serverList.map(s => {
				return (
					<div key={'server-' + s.id} className={`item ${selected == s.id && 'active'}`} onClick={() => {
						setSelected(s.id)
						navigate("/dashboard")
						dispatch(setServerId(s.id as string))
					}}>
						<ServerIcon />
						<h2>{s.name}</h2>
					</div>
				)
			})}

			<div className={`item ${selected == 'newServer' && 'active'}`} onClick={() => {
				setSelected("newServer")
				handleOpen()
			}}>
				<PlusIcon />
				<h2>New server</h2>
			</div>

			<div className={`item ${selected == 'exploreServers' && 'active'}`} onClick={() => {
				setSelected("exploreServers")
				navigate("/dashboard/explore")
			}}>
			<ExploreIcon />
				<h2>Explore servers</h2>
			</div>

			<Modal
				open={open}
				onClose={() => handleClose()}
			>
				<div className="modal" style={{ backgroundColor: mainBgColor, borderColor: mainBgColor, color: mainTextColor }}>
					<h1>Create Server</h1>

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
							<div className="modalButton buttonSubmit" style={{ backgroundColor: mainBgColor }} onClick={handleCreateServer}>Create server</div>
						</div>
					</div>
				</div>
			</Modal>


		</div>
	)
}

export default ServerBar