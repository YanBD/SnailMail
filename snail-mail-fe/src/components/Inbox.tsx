import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"

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
    

    const [inbox, setInbox] = useState<Mail[]>([])

    useEffect(() => {
        getInbox()
    }, [])

    const getInbox = async () => {
        const httpUrl = "http://localhost:8080/mail"
        try {
            const response = await fetch(httpUrl)
            const result = await response.json()
            setInbox(result)
        }
        catch {
            alert("Please try again later")
        }


    }
  

    return(
        <div className="d-flex">
            <div className="card position-fixed start-0 top-0" style={{height:"95%" ,width: "80%", marginTop: "60px", marginLeft: "11vw"}}>
                <h3 className="font-monospace">Inbox</h3>

                {inbox.length === 0 ? (<div className="alert alert-primary"> <p data-name="noMail" >No Mail! You're all caught up!</p></div>)
                :(
                    <Table hover bordered>
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