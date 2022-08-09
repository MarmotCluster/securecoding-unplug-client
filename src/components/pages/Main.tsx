import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

const Main = () => {
    const [initializing, setInitializing] = useState<boolean>(true);

    return (
        <div className="container-default">
            {/* <Logo style={{ width: 'calc(100% - 6rem)', maxWidth: '26rem', height: 'auto' }} /> */}
            <header className="header">
                <div className="header-backward">
                    <Link to="/list" className="header-backward-icon header-backward-icon__logo def-a"></Link>
                </div>
                <div className="header-text">
                    <p className="header-text-menu en-pri wei-400">Welcome</p>
                    <p className="header-text-sub en-pri wei-300">MarmotCluster</p>
                </div>
                <div className="header-settings">
                    <Link to="/settings" className="header-settings-icon def-a"></Link>
                </div>
            </header>
            <main className="main">
                <div className="main-items">
                    <div className="main-items-loading"></div>
                </div>
                <div className="main-items-info">
                    <p className="main-items-info__text en-ter wei-900">status of the own region is:</p>
                    <p className="main-items-info__status en-ter wei-900">good!</p>
                </div>
            </main>
        </div>
    );
};

export default Main;
