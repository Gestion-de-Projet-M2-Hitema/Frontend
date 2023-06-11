import { useState, useEffect, Key } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { Server, getList } from "../../stores/serverStore";
import { getListAllServer, getListSrForUser, postCreateSr } from "../../stores/ServerRequestStore";
import { Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import './style.scss'

interface data {
	id: string,
  name: string,
	invitationSend: boolean,
}

const UserServerRequest = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { allServerList, srUserList, statusSr } = useSelector((state: RootState) => state.sr)
	const { serverList } = useSelector((state: RootState) => state.server)

	const [list, setList] = useState<data[]>([])

	const handleCreateSr = (id: string) => {
		dispatch(postCreateSr(id))
	}


	// useEffect(() => {
	// 	if(statusSr == "fulfilled"){
			
	// 	}
	// 	if(statusSr == "rejected") {
	// 	}
	// }, [statusSr])

	

	useEffect(() => {
		let temp = allServerList.filter(s => {
			let i = serverList.findIndex(su => su.id == s.id)
			return !(i >= 0)
		})

		let res = temp.map(e => { 
			let i = srUserList.findIndex(sr => sr.to == e.id)
			if(i >= 0) return {id: e.id, name: e.name, invitationSend : true }
			else return {id: e.id, name: e.name, invitationSend : false }
		})

		setList(res)
	}, [serverList, allServerList, srUserList])

	useEffect(() => {
		dispatch(getList())
		dispatch(getListAllServer())
		dispatch(getListSrForUser())
	}, [])
    
	return (
		<div id="userServerRequest">
			<h1>Explore all servers</h1>

			<div className="requestTable">
				<table>
					<thead>
						<tr>
							<th align="left">Server</th>
							<th align="right">Request</th>
						</tr>
					</thead>
					<tbody>
						{list.map((row) => (
							<tr	key={row.id} className="tableRow">
								<td>
									{row.name}
								</td>
									{row.invitationSend && <td className="containerButton" align="right">
										<div className="buttonDecline">Waiting</div>
									</td> }
									{!row.invitationSend && <td className="containerButton" align="right">
										<div className="buttonAccept" onClick={() => handleCreateSr(row.id)}>Request Access</div>
									</td> }
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<br />

		</div>
	
	)
}

export default UserServerRequest