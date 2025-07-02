import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Manager from './components/Manager'
import Login from './components/Login'
import Signup from './components/Signup'
import { LoginContext, SignupContext } from './context/context'

function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  const [signup, setSignup] = useState(true)

  return (
    <>
      <SignupContext.Provider value={{ signup, setSignup }}>
        <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>

          {loggedIn ? (
            <>
              <Navbar />
              <Manager />
            </>
          ) : (signup ? <Login /> : <Signup />)
          }
        </LoginContext.Provider>
      </SignupContext.Provider>

    </>
  )
}

export default App
