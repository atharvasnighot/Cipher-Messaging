import { Route, Routes } from 'react-router-dom'
import HomePage from './components/Homepage/HomePage'
import './App.css'
import Status from './components/Status/Status'
import StatusViewer from './components/Status/StatusViewer'
import Signin from './components/Register/Signin'
import SignUp from './components/Register/SignUp'

function App() {
  
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/status' element={<Status/>}></Route>
          <Route path='/status/:userId' element={<StatusViewer/>}></Route>
          <Route path='/signin' element={<Signin/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
