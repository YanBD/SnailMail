const Logout = () => {
    const handleLogout = () => {
        // Perform logout logic here
        console.log("User logged out");
        sessionStorage.clear(); // Clear session storage
        setTimeout(() => {
            window.location.href = "/auth/login"; // Redirect to login page after 2 seconds
        }, 10000); // 10 seconds delay
    };
    
    return (
        <div>
            <h1 className="font-monospace">Logout</h1>
            <p className="font-monospace">You have been logged out.</p>
            <button className="btn btn-primary" onLoad={handleLogout}>Log Out</button>
        
        </div>
    );
}

export default Logout;
