import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {CreateAdminAccount,AdminLogin} from './account/admin/Auth'
import {CreateAdminRole} from './account/admin/Role'
import {CreateNormalUserAccount,NormauserLogin} from './account/notadmin/Auth'
import {CreateProduct} from './product/CreateProducts'
import {GetAllProduct} from './product/GetAllProducts'

import { Route, Routes } from "react-router-dom";


function App() {


  return (
    <>
      
    <Routes >
            <Route path="/create-admin-account" element={<CreateAdminAccount/>} />  
            <Route path="/create-admin-role" element={<CreateAdminRole/>} />   
            <Route path="/admin-login" element={<AdminLogin/>} /> 
            <Route path="/create-account" element={<CreateNormalUserAccount/>} /> 
            <Route path="/login" element={<NormauserLogin/>} /> 
            <Route path="/create-product" element={<CreateProduct/>} /> 
            <Route path="/get-all-product" element={<GetAllProduct/>} /> 
            
                
        </Routes>
    
      
    </>
  )
}

export default App