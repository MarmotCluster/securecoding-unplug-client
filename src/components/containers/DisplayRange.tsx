import React from 'react';

const DisplayRange = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ margin: '0 auto', border: '1px solid #ccc', maxWidth: '45rem', minHeight: '100vh' }}>
            {children}
        </div>
    );
};

export default DisplayRange;
