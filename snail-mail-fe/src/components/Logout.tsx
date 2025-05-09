import { useEffect } from "react";

const Logout = () => {
    useEffect (() => {
        document.title = "Log Out - Snail Mail "
        sessionStorage.clear()
        setTimeout(() => {
            window.location.href = ("/")
        }, 5000) 
    })
    
    return (
        <div className="d-flex">
            <div className="card position-fixed start-0 top-0" style={{height:"92vh" ,width: "78vw", marginTop: "60px", marginLeft: "11vw"}}>
                <div>
                    <h1 className="font-monospace">Logout</h1>
                    <p className="font-monospace">You have been logged out.</p>
                
                </div>
            </div>
        </div>
    );
}

export default Logout;
