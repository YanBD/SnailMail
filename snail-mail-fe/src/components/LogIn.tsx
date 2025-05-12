import axios from "axios"
import { useEffect } from "react"

interface User {
    userID: string
    username: string
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
}


const LogIn = () => {
    
    useEffect(() => {
        document.title = 'User Authentication - Snail Mail'
    })

    // This component is used to log in the user
    const setUserSession = (user :User) => {
        sessionStorage.setItem("isLoggedIn", "true")
        sessionStorage.setItem("userID", user.userID)
        sessionStorage.setItem("username", user.username)
        sessionStorage.setItem("email", user.email)
        sessionStorage.setItem("firstName", user.firstName)
        sessionStorage.setItem("lastName", user.lastName)
        sessionStorage.setItem("role", user.role)
        sessionStorage.setItem("user", JSON.stringify(user))
    }

    const login = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const httpUrl = "http://localhost:8080/auth/login"
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        try{
            const response = await axios.post(httpUrl, data)
            console.log(response.data)
            setUserSession(response.data)
            // Redirect to the home page
            window.location.href = "/"
        } catch (e) {
            if (axios.isAxiosError(e)) {
                alert(e.response?.data.message)
            } else {
                alert("There was an unexpected issue logging in")
            }
        }
    }

    

  return (
    <div className="d-flex">
        <div className="card position-fixed start-0 top-0" style={{height:"95vh" ,width: "78vw", marginTop: "60px", marginLeft: "11vw"}}>
            <form onSubmit={login}>
                <h3 className="font-monospace">Log In</h3>
                <div className="row justify-content-md-center mb-3">
                    <label htmlFor="username" className="col-sm-2 ce col-form-label">Username:</label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" id="username" name="username" required />
                    </div>
                </div>
                <div className="row justify-content-md-center mb-3">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password:</label>
                    <div className="col-sm-4">
                        <input type="password" className="form-control" id="password" name="password" required />
                    </div>
                </div>
                <button name="submitLogin" type="submit">Log In</button>
            </form>
        </div>
    </div>
  );
}
    
    
    export default LogIn;