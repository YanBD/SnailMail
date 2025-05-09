import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate()
    useEffect (() => {
        sessionStorage.setItem("isLoggenIn", "false")
        sessionStorage.clear()
        setTimeout(() => {
            navigate("/")
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
