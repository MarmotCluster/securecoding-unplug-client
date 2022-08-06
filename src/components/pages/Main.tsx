import React from 'react';
import Logo from '../Logo';

const Main = () => {
    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Logo style={{ width: 'calc(100% - 6rem)', maxWidth: '26rem', height: 'auto' }} />
        </div>
    );
};

export default Main;
