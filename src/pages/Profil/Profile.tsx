import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../stores/store"
import "./style.scss"
import { useEffect, useState } from "react"
import { getMe } from "../../stores/profileStore"

const Profile = () => {
    const {avatar, name, username, email, friends, created, status} = useSelector((state: RootState) => state.profile)
    const dispatch = useDispatch<AppDispatch>();
    const [isEditMode, setIsEditMode] = useState(false)

    useEffect(() => {
        dispatch(getMe())
    }, [])
    

    return (
        <div className="Profile">
            {/* {avatar}, {name}, {username}, {email}, {created}, {status} */}
            <div className="profile-block">
                {avatar && <div className="profile-block-avatar">
                    <img src={avatar} alt={`${name}'s avatar`} />
                </div>}
                <div className="profile-block-content">
                    <div className="profile-block-content-header">Profile</div>
                    <div className="profile-block-content-created">Account created the {created && new Date(created).toLocaleDateString()}</div>
                    <div className="profile-block-content-list">
                        <div className="profile-block-content-list-element">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" defaultValue={name} disabled={!isEditMode} />
                        </div>
                        <div className="profile-block-content-list-element">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" defaultValue={username} disabled={!isEditMode} />
                        </div>
                        <div className="profile-block-content-list-element">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" defaultValue={email} disabled={!isEditMode} />
                        </div>
                        <div className="profile-block-content-list-friends">
                            {friends && friends.map((friend: any) => (
                                <div className="profile-block-content-list-friend-name">{friend.name}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile