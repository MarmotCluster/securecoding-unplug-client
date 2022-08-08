import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';

const Loading = () => {
    const [renderThis, setRenderThis] = useState(false);
    const { status, attempt } = useSelector((state: RootState) => state.defaults.loading);

    useEffect(() => {
        if (attempt > 0) {
            if (status) {
                setRenderThis(true);
            }
        }
    }, [attempt]);

    if (attempt > 0 && renderThis) {
        return ReactDOM.createPortal(
            <div
                className={`loading nodrag ${status ? 'loading--show' : 'loading--hide'}`}
                onAnimationEnd={() => {
                    if (!status) setRenderThis(false);
                }}
            >
                Loading...
            </div>,
            document.getElementById('modal')!
        );
    }

    return null;
};

export default Loading;
