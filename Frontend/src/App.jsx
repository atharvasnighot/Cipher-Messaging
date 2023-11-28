import { Route, Routes } from 'react-router-dom'
import HomePage from './components/Homepage'
import './App.css'
import Status from './components/Status/Status'

function App() {
  
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/status' element={<Status/>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
