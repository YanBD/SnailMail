import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import SideBar from './components/sidebar'

//Welcome to App.tsx! This is the main component of our React App
//Any other components we create will rendered here before they are visible
function App() {
  


  {/* the return() of a component is just the view. what the component looks like */}
  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* Simple Top Navbar */}
      <nav className='fixed-top border-bottom mb-5'>
        <h2 className='font-monospace'>🐌 SnailMail 🐌</h2>
      </nav>

      
      <div>
        <SideBar/>      
      </div>

      
    </div>
  )
}

export default App
