import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import bread from '../apis/bread';
import { RootState } from '../modules';
import { setForceLogout, setLoginStatus } from '../modules/defaults';

const UserValidation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isSignedIn, isForceLoggedOut } = useSelector((state: RootState) => state.defaults);

    useEffect(() => {
        const auth: object | null = JSON.parse(window.localStorage.getItem('auth') as string);

        if (location.pathname === '/') {
            if (isSignedIn || Object(auth).accessToken) {
                Object(bread.defaults.headers).Authorization = Object(auth).accessToken;
                dispatch(setLoginStatus(true));
                navigate('/list');
            }
        } else {
            // console.log(location);
            if (Object(auth).accessToken) {
                Object(bread.defaults.headers).Authorization = Object(auth).accessToken;
                dispatch(setLoginStatus(true));
            } else {
                dispatch(setLoginStatus(false));
                navigate('/');
            }
        }

        if (isForceLoggedOut) {
            window.localStorage.removeItem('auth');
            Object(bread.defaults.headers).Authorization = '';
            dispatch(setForceLogout(false));
            navigate('/');
        }
    }, [location, isForceLoggedOut]);

    return null;
};

export default UserValidation;
