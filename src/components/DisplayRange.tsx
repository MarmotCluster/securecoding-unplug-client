import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DisplayRange = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const [backgroundColor, setBackgroundColor] = useState<string | undefined>();
    useEffect(() => {
        const { pathname } = location;

        if (pathname.indexOf('/details') > -1) {
            setBackgroundColor('#0F193B');
            document.getElementById('root')!.style.backgroundColor = '#0F193B';
        } else {
            setBackgroundColor(undefined);
            document.getElementById('root')!.style.backgroundColor = '';
        }
    }, [location]);

    return (
        <div className="stage" style={{ backgroundColor }}>
            {children}
        </div>
    );
};

export default DisplayRange;
