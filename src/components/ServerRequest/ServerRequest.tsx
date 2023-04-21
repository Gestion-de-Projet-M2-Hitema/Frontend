import { useState, useEffect, Key } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { getListSrForServer, postAcceptSr, postDeclineSr, Sr } from "../../stores/ServerRequestStore";
import { Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import './style.scss'

interface data {
	id: string,
  name: string,
	invitationSend: boolean,
}

const ServerRequest = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { srServerList, statusSrAccept, statusSrDecline } = useSelector((state: RootState) => state.sr)
	const { serverId } = useSelector((state: RootState) => state.server)

	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)

	const handlerAcceptSr = (idSr : string) => {
		dispatch(postAcceptSr(idSr))
		
	}

	const handlerDeclineSr = (idSr : string) => {
		dispatch(postDeclineSr(idSr))
		dispatch(getListSrForServer({id: serverId, page, limit}))
	}


	useEffect(() => {
		if(statusSrAccept == "fulfilled" || statusSrDecline == "fulfilled"){
			dispatch(getListSrForServer({id: serverId, page, limit}))
		}
		// if(statusSrAccept == "rejected" || statusSrDecline == "rejected") {
		// }
	}, [statusSrAccept, statusSrDecline])


	useEffect(() => {
		dispatch(getListSrForServer({id: serverId, page, limit}))
	}, [])
    
	return (
		<div id="serverRequest">
			<h1>User requests</h1>

			<Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {srServerList.items.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             	<TableCell component="th" scope="row">
                {row.from}
              </TableCell>
              <TableCell align="right">
								<button onClick={() => handlerAcceptSr(row.id)}>Accept</button>
								<button onClick={() => handlerDeclineSr(row.id)}>Decline</button>
							</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

			<br />

		</div>
	
	)
}

export default ServerRequest