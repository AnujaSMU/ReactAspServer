import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import RecipePage from './pages/RecipePage';
import LoginPage from "@/pages/LoginPage.jsx";
import Signup from "@/pages/Signup.jsx";

function App(){
    return(
        <div className='flex'> 
        <Sidebar/>
        <Routes>
            <Route path ='/' element={<HomePage/>}/>
            <Route path ='/profile' element={<ProfilePage/>}/>
            <Route path ='/login' element={<LoginPage/>}/>
            <Route path ='/signup' element={<Signup/>}/>
            <Route path ='/recipe/:recipeID' element={<RecipePage/>}/>
        </Routes>

        </div>
    );
}

export default App;