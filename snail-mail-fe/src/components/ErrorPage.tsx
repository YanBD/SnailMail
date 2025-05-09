import { useEffect } from "react";

const ErrorPage = () => {
    useEffect(() => {
        document.title = "404 - Page Not Found";
        setTimeout(() =>{
            window.location.href = ("/")
        }, 5000)
    })

    return (
        <div className="d-flex">
            <div className="card position-fixed start-0 top-0" style={{ height: "92vh", width: "80vw", marginTop: "60px", marginLeft: "11vw" }}>
                <div className="card-body text-center">
                <h1 className="font-bold text-red-600">404 - Page Not Found</h1>
                <p className="mt-4 text-lg text-gray-700">
                    Sorry, the page you are looking for does not exist.
                </p> <br />

                <p>You will be redirected back to the homepage in 5 seconds</p>
                
                
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;