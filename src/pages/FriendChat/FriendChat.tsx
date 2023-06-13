import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../stores/store"
import "./style.scss"
import { useEffect } from "react"
import { FriendRequest, acceptFriendRequest, declineFriendRequest, getFriendRequest } from "../../stores/friendStore"

export const FriendChat = () => {
	const { friendRequests } = useSelector((state: RootState) => state.friend)
    const dispatch = useDispatch<AppDispatch>()

    const handlerAccept = (idRequest: string, id: string) => {
        dispatch(acceptFriendRequest({idRequest, id}))
    }

    const handlerDecline = (idRequest: string, id: string) => {
        dispatch(declineFriendRequest({idRequest, id}))
    }

    useEffect(() => {
        dispatch(getFriendRequest())
    }, [])
    

    return (
        <div className="FriendChat">
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
						{friendRequests.map((fr: FriendRequest) => (
							<tr	key={fr.id} className="tableRow">
								<td>
									{fr.username}
								</td>
								<td className="containerButton" align="right">
									<div className="buttonAccept" onClick={() => handlerAccept(fr.idRequest, fr.id)}>Accept</div>
									<div className="buttonDecline" onClick={() => handlerDecline(fr.idRequest, fr.id)}>Decline</div>
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