import { useState, useEffect, Key } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../stores/store";
import { getListSrForServer, postAcceptSr, postDeclineSr, Sr } from "../../stores/ServerRequestStore";

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


			<div className="requestTable">
				<table>
					<thead>
						<tr>
							<th align="left">User</th>
							<th align="right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{srServerList.items.map((row) => (
							<tr	key={row.id} className="tableRow">
								<td>
									{row.from}
								</td>
								<td className="containerButton" align="right">
									<div className="buttonAccept" onClick={() => handlerAcceptSr(row.id)}>Accept</div>
									<div className="buttonDecline" onClick={() => handlerDeclineSr(row.id)}>Decline</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			

			<br />

		</div>
	
	)
}

export default ServerRequest