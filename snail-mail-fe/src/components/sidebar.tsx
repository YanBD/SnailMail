import { useState } from "react"
import { Inbox } from "./Inbox"
import { Home } from "./home"
import { Compose } from "./compose"


const SideBar = () => {
        const [showCompose, setShowCompose] = useState<boolean>(false)
        const [replyMail, setReplyMail] = useState<any | null>(null) 

    const toggleShowCompose = (() => {
      setShowCompose(!showCompose)
      setReplyMail(null)
    })

    const sendReply = (mail: any) => {
        setReplyMail ({ 
            sender: mail.recipient,
            recipient: mail.sender,
            subject: `Re: ${mail.subject}`,
            body: `\n\n--- Original Message ---\n${mail.body}`,
        })
        setShowCompose(true)
    }
    
  
    const [activeComponent, setActiveComponent] = useState('home')

    const renderComponent = () => {
        switch (activeComponent) {
            case 'inbox':
                return <Inbox sendReply={sendReply}/>
            case 'home':
                return <Home/>
        }
    }

    return (
        <div className="d-flex">
            <div className="position-fixed start-0 top-0 bg-t" style={{ width: '10%', borderRight: '1px solid #ccc', marginTop: '60px' }}>
                    <div><button className="btn border-bottom" onClick={() => setActiveComponent('home')}>Home</button></div>
                    <div><button className="btn border-bottom" onClick={() => setActiveComponent('inbox')}>Inbox</button></div>


            </div>
            {renderComponent()}
            {showCompose ? <Compose data-testid="compose-component" onClose={toggleShowCompose} {...replyMail}/> 
            : <button className='position-absolute bottom-0 end-0 m-3 btn btn-lg btn-outline-primary fs-1 ' onClick={toggleShowCompose}>📧</button>}
        </div>
    )
}

export default SideBar