import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import RecipePage from './pages/RecipePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RecipeBuilder from './pages/RecipeBuilder';
// import Cookies from 'universal-cookie';
// import jwt from 'jwt-decode';

function App(){

    return(
        <div className='flex'> 
        <Sidebar/>
        <Routes>
            <Route path ='/' element={<HomePage/>}/>
            <Route path ='/profile' element={<ProfilePage/>}/>
            <Route path ='/recipe/:recipeID' element={<RecipePage/>}/>
            <Route path ='/login' element={<LoginPage/>}/>
            <Route path ='/signup' element={<SignupPage/>}/>
            <Route path="/recipe/new" element={<RecipeBuilder />} />
        </Routes>

        </div>
    );
}

export default App;