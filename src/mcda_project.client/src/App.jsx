import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

function App(){
    return(
        <div className='flex'> 
        <Sidebar/>
        <Routes>
            <Route path ='/' element={<HomePage/>}/>
            <Route path ='/profile' element={<ProfilePage/>}/>
        </Routes>

        </div>
    );
}

export default App;