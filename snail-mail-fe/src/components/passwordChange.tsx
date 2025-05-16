import axios from "axios"

interface Props extends React.HTMLProps<HTMLDivElement> {
    onClose: () => void
}


const PasswordChange: React.FC<Props> = ({ onClose }) => {
    const changePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const httpUrl = "http://localhost:8080/auth"
            const formData = new FormData(event.currentTarget)
            const data = Object.fromEntries(formData.entries())

            //Verify both new password fields match.
            if (data.newPassword === data.newPasswordVerify){
                try {
                delete data.newPasswordVerify //delete extra password field from data

                const response = await axios.patch(httpUrl, data)
                alert(response.data)
                
                //close component and redirect to home page
                onClose()
                window.location.href = '/'

                } catch (e){
                    if (axios.isAxiosError(e)) {
                    alert (e.response?.data.message)
                } else {
                    alert ("Attempt to change password failed")
                }
                }
            }
            
            else {
                alert("New passwords must match")
            }

            


    }


    return (
        <div className="card shadow position-absolute bottom-0 start-0 m-5" style={{width:"500px"}}>

            <h6 className="border-bottom position-absolute top-0  m-2">Change Password</h6>
            <button onClick={onClose} aria-label="close" className="btn-close position-absolute top-0 end-0 m-1"></button>

            <form onSubmit={changePassword}>

                <div className="row justify-content-md-center mb-3">
                    <label htmlFor="username" className="col-sm-5 ce col-form-label">Username:</label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" id="username" name="username" required />
                    </div>
                </div>

                <div className="row justify-content-md-center mb-3">
                    <label htmlFor="oldPassword" className="col-sm-5 col-form-label"> Current Password:</label>
                    <div className="col-sm-4">
                        <input type="password" className="form-control" id="oldPassword" name="oldPassword" required />
                    </div>
                </div>

                <div className="row justify-content-md-center mb-3">
                    <label htmlFor="newPassword" className="col-sm-5 col-form-label text-nowrap">New Password:</label>
                    <div className="col-sm-4">
                        <input type="password" className="form-control" id="newPassword" name="newPassword" required />
                    </div>
                </div>

                <div className="row justify-content-md-center mb-3">
                    <label htmlFor="newPasswordVerify" className="col-sm-5 col-form-label text-nowrap">Verify New Password:</label>
                    <div className="col-sm-4">
                        <input type="password" className="form-control" id="newPasswordVerify" name="newPasswordVerify" required />
                    </div>
                </div>

                <button name="submitLogin" type="submit">Submit</button>
            </form>

            


            

        </div>
    
        

    )
} 
export default PasswordChange