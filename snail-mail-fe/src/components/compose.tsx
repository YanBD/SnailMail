import axios from "axios"
import { useState, useEffect } from "react"


interface Props extends React.HTMLProps<HTMLDivElement> {
    onClose: () => void
    sender?: string
    recipient?: string
    subject?: string
    body?: string

}

interface Mail {
    sender: string
    recipient: string
    subject: string
    body: string
}

export const Compose:React.FC<Props> = ({onClose, sender, recipient, subject, body,  ...testID}) => {
    

    const[mailToSend, setMailToSend] = useState<Mail>({
        sender: "",
        recipient: "",
        subject: "",
        body: ""
    })
    const userEmail = sessionStorage.getItem("email")
    if (typeof(userEmail) === "string") {
        mailToSend.sender = userEmail
    }

    useEffect(() => {
        setMailToSend({
            sender: sender || "",
            recipient: recipient || "",
            subject: subject || "",
            body: body || ""
        })
    }, [sender, recipient, subject, body])

    const isRecipientReadOnly = recipient?.trim() === "" || recipient === undefined ? false : true
    const isSubjectReadOnly = subject?.trim() === "" || subject === undefined ? false : true

    const handleInput = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const name = event.target.name
        const value = event.target.value

        setMailToSend((mailToSend) => ({...mailToSend, [name]:value}))
    }

    const sendEmail = async () => {
      
        //Error handling
        /* commented out error handling in the frontend to handle it in the backend
        if (mailToSend.recipient.trim() === "" || mailToSend.subject.trim() === "" || mailToSend.body.trim() === "") {
            alert("Please fill in all fields")
            return
        }
        if (mailToSend.recipient === mailToSend.sender) {
            alert("You cannot send an email to yourself")
            return
        }
        if (mailToSend.recipient.includes("@") === false || mailToSend.recipient.includes(".com") === false) {
            alert("Please enter a valid email address")
            return
        }
        if (mailToSend.subject.length > 20) {
            alert("Subject is too long")
            return
        }*/
        try{
        const response = await axios.post("http://localhost:8080/mail", mailToSend)
        console.log(response.data)
        alert(`Sent mail to ${mailToSend.recipient}`)
     
        onClose()
        } catch (e){
            if (axios.isAxiosError(e) && e.response) {
                alert(e.response.data.message);
            } else {
                alert("There was an unexpected issue sending your Message");
            }
        }

    }



    return(
        <div className="card shadow position-absolute bottom-0 end-0 m-5" style={{width:"500px"}} {...testID}>

            <h6 className="border-bottom position-absolute top-0 start-0 m-2">Compose Email</h6>
            <button onClick={onClose} aria-label="close" className="btn-close position-absolute top-0 end-0 m-1"></button>
            
            <div className="row mb-3">
                <label htmlFor="senderForm" className="col-sm-2 col-form-label text-nowrap">From:</label>
                <div className="col-sm-10">
                <input className="form-control border-bottom border-0 shadow-none" readOnly={true} id="senderForm"
                value={mailToSend.sender} name="sender"/>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="recipientForm" className="col-sm-2 col-form-label">To:</label>
                <div className="col-sm-10">
                    {isRecipientReadOnly ?<input id="recipitentForm" className="form-control border-bottom border-0 shadow-none" readOnly={true}
                    placeholder="recipient" value={mailToSend.recipient} name="recipient"/> :  
                    <input id="recipitentForm" className="form-control border-bottom border-0 shadow-none "
                    placeholder="recipient" value={mailToSend.recipient} name="recipient" onChange={handleInput}/> }
                    
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="subjectForm" className="col-sm-2 col-form-label text-nowrap">Subject:</label>
                <div className="col-sm-10">
                    {isSubjectReadOnly ? 
                    <input id="subjectForm" className="form-control border-bottom border-0 shadow-none" readOnly={true}
                    placeholder="subject" value={mailToSend.subject} name="subject" /> : 
                    <input id="subjectForm" className="form-control border-bottom border-0 shadow-none"
                    placeholder="subject" value={mailToSend.subject} name="subject" onChange={handleInput}/> }
                </div>
            </div>

            <div className="card-body">
                <textarea name="body" aria-label="body" className="form-control border-0 shadow-none" 
                value={mailToSend.body} rows={6} onChange={handleInput}></textarea>
            </div>

            <button className="btn btn-sm btn-outline-primary d-block mx-auto" onClick={sendEmail}>Send</button>

        </div>
    )

}