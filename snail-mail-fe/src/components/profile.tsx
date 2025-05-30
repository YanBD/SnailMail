import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { setUserSession } from "./LogIn"

interface User {
    userid: string
    username: string
    email: string
    password: string
    firstname: string
    lastname: string
    role: string
}

const Profile = () => {
    const isUserLogged = sessionStorage.getItem("isLoggedIn")
    const navigate = useNavigate()
    const [isReadOnly, setIsReadOnly] = useState<boolean> (true)

    const [loggedUser, setLoggedUser] = useState<User> ({
        userid: "",
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        role: "",
        password: ""
    })

    const toggleIsReadOnly = (() => {
        setIsReadOnly(!isReadOnly)
    })
    
    
    useEffect(() => {
            
            document.title = "Profile - Snail Mail"
            
            // Redirects to home page if user is not logged in
            if (!isUserLogged) {
                navigate("/auth/login")
                return
            }

            //Set loggedUser state with values session storage
            setLoggedUser({
            userid: sessionStorage.getItem("userID") || "",
            username: sessionStorage.getItem("username") || "",
            email: sessionStorage.getItem("email") || "",
            password: sessionStorage.getItem("password") || "",
            firstname: sessionStorage.getItem("firstName") || "",
            lastname: sessionStorage.getItem("lastName") || "",
            role: sessionStorage.getItem("role") || "",
        });
    }, [isUserLogged, navigate]);

    const unlock = async(event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault()

        if (isReadOnly) {            
            setIsReadOnly(false)

        } else {
            const httpUrl = "http://localhost:8080/user/profile"
            const formData = new FormData(event.currentTarget)
            const data = Object.fromEntries(formData.entries())

            for (const key in data) {
                //checks each data field is a string and greater than 5 characters
                if (typeof data[key] === "string" && data[key].length <= 4)
                {
                    alert (`${key} must be atleast 5 characters`)
                    window.location.reload()
                    return // stop the update if any field is invalid
                }
            }
            
            data.userID = sessionStorage.getItem("userID") || "" // insert user id to data
            data.role = sessionStorage.getItem("role") || ""     // insert role in to data
            try {
                console.log(data)
                const response = await axios.patch(httpUrl, data)
                setLoggedUser(response.data)
                setUserSession(response.data)
            }
            catch (e) {
                if (axios.isAxiosError(e)) {
                    alert(e.response?.data.message)
                    window.location.reload()
                }
            }
            setIsReadOnly(!isReadOnly)
        }
    }

    return (
         <div className="d-flex">
            <div className="card position-fixed start-0 top-0" style={{height:"95vh" ,width: "78vw", marginTop: "60px", marginLeft: "11vw"}}>
                <form onSubmit={unlock}>
                    <h3 className="font-monospace">Profile</h3>
                    <br />
                    
                    <div className="row justify-content-md-center mb-3">
                        <label htmlFor="username" className="col-sm-2 col-form-label">Username:</label>
                        <div className="col-sm-4">
                            <input type="text" className="form control" readOnly={isReadOnly} value={loggedUser.username} 
                            onChange={(e) => setLoggedUser({ ...loggedUser, username: e.target.value })} id="username" name="username" required/>
                        </div>
                    </div>

                    <div className="row justify-content-md-center mb-3">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
                        <div className="col-sm-4">
                            <input type="text" className="form control" readOnly={true} value={loggedUser.email} 
                            id="email" name="email" required/>
                        </div>
                    </div>

                    <div className="row justify-content-md-center mb-3">
                        <label htmlFor="firstName" className="col-sm-2 col-form">Given Name:</label>
                        <div className="col-sm-4">
                            <input type="text" className="form control" readOnly={isReadOnly} value={loggedUser.firstname} 
                            onChange={(e) => setLoggedUser({ ...loggedUser, firstname: e.target.value })} id="firstName" name="firstName" required/>
                        </div>
                    </div>

                    <div className="row justify-content-md-center mb-3">
                        <label htmlFor="lastName" className="col-sm-2 col-form">Family Name:</label>
                        <div className="col-sm-4">
                            <input type="text" className="form control" readOnly={isReadOnly} value={loggedUser.lastname} 
                            onChange={(e) => setLoggedUser({ ...loggedUser, lastname: e.target.value })} id="lastName" name="lastName" required/>
                        </div>
                    </div>

                    {isReadOnly ? 
                    <button name="unlockUserForm" className="m-5"type="submit">Edit User</button> :
                    <>
                        <h2 className="font-monospace">Please confirm Password.</h2>
                        <div className="row justify-content-md-center mb-3">
                            <label htmlFor="password" className="col-sm-2 col-form"> Password:</label>
                            <div className="col-sm-4">
                                <input type="password" className="form control" 
                                onChange={(e) => setLoggedUser({ ...loggedUser, password: e.target.value })} id="password" name="password" required/>
                            </div>
                        </div>

                        <br />

                        <div>
                        <button name="updateUser" className="m-5" type="submit">Update User</button>
                        <button name="updateUser" className="ms-5" onClick={toggleIsReadOnly}>Cancel</button>
                        </div>
                        
                    </>

                    }
                </form>
            </div>
        </div>

    )

} 
export default Profile