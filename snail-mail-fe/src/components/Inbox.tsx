import axios from "axios";
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

interface InboxProps {
    sendReply: (mail: any) => void;
}

interface Mail {
    sender: string
    recipient: string
    subject: string
    body: string
}

export const Inbox:React.FC<InboxProps> = ({sendReply}) => {
    const navigate = useNavigate()    

    const [inbox, setInbox] = useState<Mail[]>([]) 
    const isUserLogged = sessionStorage.getItem("isLoggedIn")

    useEffect(() => {
        getInbox()
        document.title = "Inbox - Snail Mail"


        if (!isUserLogged) {
            navigate("/auth/login")
            return
        }
    }, [])

    const getInbox = async () => {
        const httpUrl = "http://localhost:8080/mail"
        try {
            const response = await axios.get(httpUrl)
            const result = await response.data

            const loggedUserEmail = sessionStorage.getItem("email")

            const filteredResult = result.filter((mail: Mail) => mail.recipient === loggedUserEmail)
            setInbox(filteredResult)
        }
        catch {
            alert("Please try again later")
        }
    }
  

    return(
        <div className="d-flex">
            <div className="card position-fixed start-0 top-0" style={{height:"95vh" ,width: "78vw", marginTop: "60px", marginLeft: "11vw"}}>
                <h3 className="font-monospace">Inbox</h3>

                {inbox.length === 0 && (isUserLogged === "true") ? (<div className="alert alert-primary"> <p data-name="noMail" >No Mail! You're all caught up!</p></div>)
                :( 
                    <Table hover bordered data-name="inboxTable">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Sender</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inbox.map((mail)=>(
                                <tr>
                                    <td className="p-3">{mail.subject}</td>
                                    <td><button className="btn bg-transparent p-2" onClick={() => sendReply(mail)}>{mail.sender}</button></td>
                                    <td className="p-3">{mail.body}</td>
                                </tr>
                            ))}
                        </tbody>
                </Table>  
                )}       

            </div>

        </div>

    )
}