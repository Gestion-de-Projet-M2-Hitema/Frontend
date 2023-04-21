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

			<Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Server</TableCell>
            <TableCell align="right">Request</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              {row.invitationSend && <TableCell align="right">
								waiting
							</TableCell> }
              {!row.invitationSend && <TableCell align="right">
								<button onClick={() => handleCreateSr(row.id)}>Request Access</button>
							</TableCell> }
            </TableRow>
          ))}
        </TableBody>
      </Table>

			<br />

		</div>
	
	)
}

export default UserServerRequest