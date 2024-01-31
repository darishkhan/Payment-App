import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard';
import SendMoney from './pages/SendMoney';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/signup' element={<Signup />}/>
          <Route exact path='/signin' element={<Signin />}/>
          <Route exact path='/dashboard' element={<Dashboard />}/>
          <Route exact path='/send' element={<SendMoney />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
