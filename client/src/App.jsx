import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from "./pages/chat"
import Login from "./pages/login"
import Register from "./pages/register"
import NavBar from "./components/NavBar"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { ChatContextProvider } from './context/ChatContext'

function App() {
  const { user } = useContext(AuthContext)
  return (
    <ChatContextProvider user={user}>
      <NavBar />
      <Container className='text-secondary'>
        <Routes>
          <Route path="/" element={user ? <Chat /> : <Login />} />
          <Route path="/Register" element={user ? <Chat /> : <Register />} />
          <Route path="/Login" element={user ? <Chat /> : <Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
      </ChatContextProvider>
  )
}

export default App
