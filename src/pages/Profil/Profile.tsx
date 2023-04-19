import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../stores/store"
import "./style.scss"
import { ChangeEvent, useEffect, useState } from "react"
import { getMe, postAvatar, postPasswordUpdate, postUpdate } from "../../stores/profileStore"

const Profile = () => {
    const {avatar, name, username, email, friends, created, status} = useSelector((state: RootState) => state.profile)
    const dispatch = useDispatch<AppDispatch>();
    const [isEditMode, setIsEditMode] = useState(false)
    const [user, setUser] = useState<{name: string, username: string, email: string}>({name, username, email})
    const [password, setPassword] = useState<{oldPassword: string, password: string, passwordConfirm: string}>({oldPassword: "", password: "", passwordConfirm: ""})
    const [hasPwdChange, setHasPwdChange] = useState(false)
    const [newAvatar, setNewAvatar] = useState("")

    const handleEditMode = () => {
        setIsEditMode(prev => !prev)
        if (isEditMode && !hasPwdChange) dispatch(postUpdate(user))
        if (isEditMode && hasPwdChange) dispatch(postPasswordUpdate(password))
    }

    const handleInfoChange = (e: any) => {
        setUser((userinfo) => ({...userinfo, [e.target.name]: e.target.value}))
    }

    const handlePasswordChange = (e: any) => {
        setHasPwdChange(true)
        setPassword((password) => ({...password, [e.target.name]: e.target.value}))
    }

    const handleChangeAvatar = (e: any) => {
        console.log(e.target.files[0])
        setNewAvatar(URL.createObjectURL(e.target.files[0]))
        dispatch(postAvatar({avatar: URL.createObjectURL(e.target.files[0])}))
    }

    useEffect(() => {
        dispatch(getMe())
    }, [])

    useEffect(() => {
        setUser({name, username, email})
    }, [name, username, email])

    return (
        <div className="Profile">
            <div className="profile-block">
                {avatar && <div className="profile-block-avatar">
                    <img src={avatar} alt={`${name}'s avatar`} />
                </div>}
                <div className="profile-block-content">
                    <div className="profile-block-content-header">Profile</div>
                    <div>
                        Change avatar :{" "}
                        <input type="file" className="profile-block-button" onChange={handleChangeAvatar} accept="image/png, image/jpeg, image/jpg" style={{width: "15rem"}} />
                    </div>
                    <div className="profile-block-content-created">Account created the {created && new Date(created).toLocaleDateString()}</div>
                    <div className="profile-block-content-list">
                        <div className="profile-block-content-list-element">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" defaultValue={name} onChange={handleInfoChange} minLength={2} maxLength={50} disabled={!isEditMode} />
                        </div>
                        <div className="profile-block-content-list-element">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" defaultValue={username} onChange={handleInfoChange} minLength={2} maxLength={50} disabled={!isEditMode} />
                        </div>
                        <div className="profile-block-content-list-element">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" defaultValue={email} onChange={handleInfoChange} minLength={2} maxLength={255} disabled={!isEditMode} />
                        </div>
                        <div className="profile-block-content-list-friends">
                            {friends && friends.map((friend: any) => (
                                <div className="profile-block-content-list-friend-name">{friend.name}</div>
                            ))}
                        </div>
                        <div className="separator"></div>
                        <div className="profile-block-content-list-element">
                            <label htmlFor="oldPassword">Old password</label>
                            <input type="password" name="oldPassword" onChange={handlePasswordChange} minLength={6} maxLength={72} disabled={!isEditMode} />
                        </div>
                        <div className="profile-block-content-list-element">
                            <label htmlFor="password">New password</label>
                            <input type="password" name="password" onChange={handlePasswordChange} minLength={6} maxLength={72} disabled={!isEditMode} />
                        </div>
                        <div className="profile-block-content-list-element">
                            <label htmlFor="passwordConfirm">Password confirm</label>
                            <input type="password" name="passwordConfirm" onChange={handlePasswordChange} minLength={6} maxLength={72} disabled={!isEditMode} />
                        </div>
                    </div>
                </div>
                <div className="profile-block-footer">
                    <div className="profile-block-button" style={{backgroundColor: isEditMode ? "green" : undefined}} onClick={() => handleEditMode()}>{!isEditMode ? "Edit" : "Save"}</div>
                </div>
            </div>
        </div>
    )
}

export default Profile