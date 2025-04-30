import { useEffect } from "react"


export const Home = () => {
    // This is the home page of the email client
    useEffect(() => {
        document.title = "Home - Snail Mail"
    })


    


    return (
        <div className="d-flex">
            <div className="card position-fixed start-0 top-0" style={{height:"92vh" ,width: "80vw", marginTop: "60px", marginLeft: "11vw"}}>
                <div className="card-title"><h2>Welcome to SnailMail</h2></div>
                    <div className="card-body">
                        <p className="card-text">This is a simple email client built with React and Flask.</p>
                        <p className="card-text">You can send and receive emails, and manage your inbox.</p>
                        <p className="card-text">This is a simple email client built with React and Flask.</p>
                        <p className="card-text">You can send and receive emails, and manage your inbox.</p>
                    </div>

            </div>

        </div>

    )

}