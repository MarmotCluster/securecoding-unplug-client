import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';

const Toast = () => {
    const { message, attempt } = useSelector((state: RootState) => state.toast);
    const [doAnimation, setDoAnimation] = useState<boolean>(true);

    useEffect(() => {
        setDoAnimation(true);
    }, [attempt]);

    if (doAnimation && attempt > 0) {
        return ReactDOM.createPortal(
            <div
                className={`toast nodrag ${doAnimation && 'toast--animate'}`}
                onAnimationEnd={() => setDoAnimation(false)}
            >
                <p className="toast-text">{message}</p>
            </div>,
            document.getElementById('toast')!
        );
    }

    return null;
};

export default Toast;
