
import { Inbox } from "./Inbox"
import { Home } from "./home"
import { Compose } from "./compose"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import ErrorPage from "./ErrorPage"
import { useState, useEffect } from "react"
import LogIn from "./LogIn"
import Logout from "./Logout"
import Register from "./register"
import Profile from "./profile"
import PasswordChange from "./passwordChange"


const SideBar = () => {
        const [showCompose, setShowCompose] = useState<boolean>(false)
        const [replyMail, setReplyMail] = useState<any | null>(null)
        const [isUserLogged, setIsUserLogged] = useState<boolean>(false)
        const [showPasswordChage, setShowPasswordChange] = useState<boolean>(false)

    const toggleShowCompose = (() => {
      setShowCompose(!showCompose)
      setReplyMail(null)
    })

    const toggleShowChangePassword = (() => {
        setShowPasswordChange(!showPasswordChage)
    })

    useEffect(() => {
        const logged = sessionStorage.getItem("isLoggedIn") === "true"
        setIsUserLogged(logged)
    }, [])


    //Functionality to send a reply email from the inbox
    // This function is passed as a prop to the Inbox component
    // and is called when the user clicks the reply button on an email
    const sendReply = (mail: any) => { 
        setReplyMail ({ 
            sender: sessionStorage.getItem("email"),
            recipient: mail.sender,
            subject: `Re: ${mail.subject}`,
            body: `\n\n--- Original Message ---\n${mail.body}`,
        })
        setShowCompose(true)
    }

    /* commented out code for routing without react-router
        const [activeComponent, setActiveComponent] = useState('home')

    const renderComponent = () => {
        switch (activeComponent) {
            case 'inbox':
                return <Inbox sendReply={sendReply}/>
            case 'home':
                return <Home/>
        }
    }
    */

    return (
        <div className="d-flex">
            <BrowserRouter>
                <div className="position-fixed start-0 top-0 bg-t" style={{ width: '10vw', borderRight: '1px solid #ccc', marginTop: "60px" }}>
                        <div><Link to="/" aria-label="home" className="btn border-bottom">Home</Link></div>
                        <div><Link to="/inbox" aria-label="inbox" className="btn border-bottom">Inbox</Link></div>

                        {isUserLogged?                        
                        <>                        
                        <div><Link to="/user/profile" aria-label="userProfile" className="btn border-bottom">User Profile</Link></div>
                        </> :
                        <br />}

                        
                      
                        <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="inbox" element={<Inbox sendReply={sendReply}/>}></Route>
                        <Route path="auth/login" element={<LogIn/>}></Route>
                        <Route path="auth/logout" element={<Logout/>}></Route>
                        <Route path="auth/register" element={<Register/>}></Route>
                        <Route path="/user/profile" element={<Profile/>}></Route>
                        <Route path="*" element={<ErrorPage/>}></Route>
                        </Routes>

                    <div className="position-fixed end-0 top-0 bg-t" style={{ width: '10%', borderLeft: '1px solid #ccc', marginTop: '60px' }}>
                        {isUserLogged?
                            <div><Link  to="/auth/logout" aria-label="logout" className='btn border-bottom' onClick={() => setIsUserLogged(false)} >Log Out</Link></div> :
                            <>
                            <div><Link to="/auth/login" aria-label="login" className="btn border-bottom">Log In</Link></div>
                            <div><Link to="/auth/register" aria-label="register" className="btn border-bottom">Register</Link></div>
                            </>}

                    </div>


                </div>
                <div>
                    {!isUserLogged ? <br /> : <>
                    {showCompose ? <Compose data-testid="compose-component" onClose={toggleShowCompose} {...replyMail}/> 
                : <button className='position-absolute bottom-0 end-0 m-3 btn btn-lg btn-outline-primary fs-1 ' onClick={toggleShowCompose}>📧</button>})
                
                {showPasswordChage ? <PasswordChange onClose={toggleShowChangePassword}/> :
                        <button className='position-fixed bottom-0 start-0 m-3 btn border-bottom ' onClick={toggleShowChangePassword}>Change Password</button>}
                </>}
                </div>
            </BrowserRouter>
        </div>
    )
}

export default SideBar