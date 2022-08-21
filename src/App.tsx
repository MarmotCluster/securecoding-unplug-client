import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DisplayRange from './components/DisplayRange';
import Loading from './components/Loading';
import Addnew from './components/pages/Addnew';
import Details from './components/pages/Details';
import Entries from './components/pages/Entries';
import Main from './components/pages/Main';
import Settings from './components/pages/Settings';
import Popup from './components/Popup';
import Toast from './components/Toast';
import UserValidation from './components/UserValidation';

const App = () => {
    return (
        <BrowserRouter>
            <Popup />
            <Loading />
            <Toast />
            <UserValidation />

            <DisplayRange>
                <Routes>
                    <Route path="/" element={<Entries />} />
                    <Route path="/list" element={<Main />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/addnew" element={<Addnew />} />
                    <Route path="/details/:id" element={<Details />} />
                </Routes>
            </DisplayRange>
        </BrowserRouter>
    );
};

export default App;
