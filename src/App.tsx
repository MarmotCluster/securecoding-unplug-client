import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CounterContainer from './components/containers/CounterContainer';
import DisplayRange from './components/DisplayRange';
import Loading from './components/Loading';
import Entries from './components/pages/Entries';
import Main from './components/pages/Main';
import Settings from './components/pages/Settings';
import Popup from './components/Popup';
import Toast from './components/Toast';

const App = () => {
    return (
        <BrowserRouter>
            <Popup />
            <Loading />
            <Toast />

            <DisplayRange>
                <Routes>
                    <Route path="/" element={<Entries />} />
                    <Route path="/list" element={<Main />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </DisplayRange>
        </BrowserRouter>
    );
};

export default App;
