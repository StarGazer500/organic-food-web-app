import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {CreateAdminAccount} from './account/admin/Admin'
import {CreateAdminRole} from './account/admin/Role'

import { Route, Routes } from "react-router-dom";


function App() {


  return (
    <>
      
    <Routes >
            <Route path="/create-admin-account" element={<CreateAdminAccount/>} />  
            <Route path="/create-admin-role" element={<CreateAdminRole/>} />   
                
        </Routes>
    
      
    </>
  )
}

export default App