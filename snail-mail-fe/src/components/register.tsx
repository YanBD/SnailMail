import axios from "axios"

interface User {
    userID: string
    username: string
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
}

const Register = () => {
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

    const register = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const httpUrl = "http://localhost:8080/auth/register"
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        const password1 = document.getElementById("password")?.innerText
        const password2 = document.getElementById("passwordVerify")?.innerText
        if (password1 === password2) {
            try {
                delete data.passwordVerify
                
                console.log(data)
                const response =  await axios.post(httpUrl, data)
                console.log(response.data.username)
                setUserSession(response.data)
                alert ("Thanks for registering " + response.data.firstName + " " + response.data.lastName + ".")
                window.location.href = "/"

            } catch (e) {
                if (axios.isAxiosError(e)) {
                    alert (e.response?.data.message)
                } else {
                    alert ("Registration failed")
                }

            }
        } else {
            alert ("Passwords must match")
        }
    }

    return (
        <div className="d-flex">
            <div className="card position-fixed start-0 top-0" style={{height:"95vh" ,width: "78vw", marginTop: "60px", marginLeft: "11vw"}}>
                <form onSubmit={register}>
                    <h3 className="font-monospace">Register</h3>
                    
                    <div className="row justify-content-md-center mb-3">
                        <label htmlFor="username" className="col-sm-2 col-form-label">Username:</label>
                        <div className="col-sm-4">
                            <input type="text" className="form control" id="username" name="username" required/>
                        </div>
                    </div>

                    <div className="row justify-content-md-center mb-3">
                        <label htmlFor="password" className="col-sm-2 col-form">Password:</label>
                        <div className="col-sm-4">
                            <input type="password" className="form control" id="password" name="password" required/>
                        </div>
                    </div>

                    <div className="row justify-content-md-center mb-3">
                        <label htmlFor="passwordVerify" className="col-sm-2 col-form">Verify Password:</label>
                        <div className="col-sm-4">
                            <input type="password" className="form control" id="passwordVerify" name="passwordVerify" required/>
                        </div>
                    </div>

                    <div className="row justify-content-md-center mb-3">
                        <label htmlFor="firstName" className="col-sm-2 col-form">Given Name:</label>
                        <div className="col-sm-4">
                            <input type="text" className="form control" id="firstName" name="firstName" required/>
                        </div>
                    </div>

                    <div className="row justify-content-md-center mb-3">
                        <label htmlFor="lastName" className="col-sm-2 col-form">Family Name:</label>
                        <div className="col-sm-4">
                            <input type="text" className="form control" id="lastName" name="lastName" required/>
                        </div>
                    </div>

                    <button name="submitRegister" type="submit">Register</button>
                </form>
            </div>
        </div>
    )

}
export default Register