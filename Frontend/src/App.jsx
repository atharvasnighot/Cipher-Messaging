import { Route, Routes } from 'react-router-dom'
import HomePage from './components/Homepage'
import './App.css'

function App() {
  
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<HomePage/>}>

          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
