import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { setPopupOff } from '../modules/defaults';
import PopupIcon from './PopupIcon';

const Popup = () => {
    const [renderThis, setRenderThis] = useState(false);
    const { status, attempt, type, desc, renderDual, confirmText, cancelText, onClickConfirm, onClickCancel } =
        useSelector((state: RootState) => state.defaults.popup);
    const dispatch = useDispatch();

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
                className={`popup nodrag ${status ? 'popup--show' : 'popup--hide'}`}
                onAnimationEnd={() => {
                    if (!status) setRenderThis(false);
                }}
                onClick={() => !renderDual && dispatch(setPopupOff())}
            >
                <div className="popup-area">
                    <div
                        className={`popup-area-container ${
                            status ? 'popup--show__container' : 'popup--hide__container'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="popup-area-container__icon">
                            <PopupIcon type={type} style={{ width: '100%', height: '100%' }} />
                        </div>
                        <p className="popup-area-container__desc en-ter wei-900">{desc}</p>
                        <button
                            className={`en-ter wei-900 popup-area-container__button popup-area-container__button-${type}`}
                            onClick={() => {
                                onClickConfirm && onClickConfirm();
                                !renderDual && dispatch(setPopupOff());
                            }}
                        >
                            {confirmText}
                        </button>
                        {renderDual && (
                            <button
                                className="en-ter wei-900 popup-area-container__button"
                                onClick={(e) => dispatch(setPopupOff())}
                            >
                                {cancelText}
                            </button>
                        )}
                    </div>
                </div>
            </div>,
            document.getElementById('popup')!
        );
    }

    return null;
};

export default Popup;
