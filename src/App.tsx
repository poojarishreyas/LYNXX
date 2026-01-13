import {Routes,Route} from 'react-router-dom'
import './App.css'
import Home1   from './components/Home1'
import Coder from './components/Coder'

function App() {


  return (
    <>
      <div>
        <Routes>
            <Route path='/' element={<Home1/>} />
            <Route path='/Coder' element={<Coder/>} />
        </Routes>

        
      </div>
    </>
  )
}

export default App
