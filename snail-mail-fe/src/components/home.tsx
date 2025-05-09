import { useEffect } from "react"


export const Home = () => {
    
    // This is the home page of the email client
    useEffect(() => {
        document.title = "Home - Snail Mail"
    })


    


    return (
        <div className="d-flex">
            <div className="card position-fixed start-0 top-0" style={{height:"92vh" ,width: "78vw", marginTop: "60px", marginLeft: "11vw"}}>

                {sessionStorage.getItem("isLoggedIn") === "true" ?
                <>
                 <div className="card-title"><h2 aria-label="welcomeHeading">Welcome {sessionStorage.getItem('username')} </h2></div>
                 <div className="card-body">
                        <p className="card-text">Thank you for using SnailMail.</p>
                        <p className="card-text">Please select Inbox on the left of your screen to check Inbox.</p>
                        <p className="card-text">You can compose a new email with the icon found in the bottom right of you screen</p>
                        <p className="card-text">Select Signout when you are done for the day</p><br /><br />
                        <p className="card-text">Thank you for using SnailMail. To check your messages please select Inbox </p>                        
                    </div>
                 </>
                 : <>
                 <div className="card-title"><h2 aria-label="welcomeHeading">Welcome to SnailMail</h2></div>                 
                    <div className="card-body">
                        <p className="card-text">This is a simple email client built with React and Flask.</p>
                        <p className="card-text">You can send and receive emails, and manage your inbox.</p>
                        <p className="card-text">This is a simple email client built with React and Flask.</p>
                        <p className="card-text">You can send and receive emails, and manage your inbox.</p><br /><br />
                        <p className="card-text">Please login or register using the links on the right hand side of your screen</p>                        
                    </div>
                    </>}

            </div>

        </div>

    )

}