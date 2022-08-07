import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CounterContainer from './components/containers/CounterContainer';
import DisplayRange from './components/DisplayRange';
import Entries from './components/pages/Entries';
import Main from './components/pages/Main';

const App = () => {
    return (
        <BrowserRouter>
            <DisplayRange>
                <Routes>
                    <Route path="/" element={<Entries />} />
                    <Route path="/counter" element={<CounterContainer />} />
                </Routes>
            </DisplayRange>
        </BrowserRouter>
    );
};

export default App;
