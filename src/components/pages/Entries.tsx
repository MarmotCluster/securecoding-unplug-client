import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validate, ValidateList, CustomFormData } from '../../utils';
import Logo from '../layouts/Logo';
import RoundyInput from '../layouts/RoundyInput';
import forms from '../../assets/json/forms.json';
import bread from '../../apis/bread';
import { useDispatch } from 'react-redux';
import { setLoading, setPopup } from '../../modules/defaults';
import { AxiosError } from 'axios';

type TypeLogin = {
    username: string;
    password: string;
};

const Entries = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login');

    const [loginValids, setLoginValids] = useState<ValidateList>({
        username: true,
        password: true,
        attempt: 0,
    });

    const [loginForm, setLoginForm] = useState<CustomFormData>({
        username: '',
        password: '',
    });

    const [registerValids, setRegisterValids] = useState<ValidateList>({
        email: true,
        username: true,
        password: true,
        cfmpassword: true,
        attempt: 0,
    });

    const [registerForm, setRegisterForm] = useState<CustomFormData>({
        email: '',
        username: '',
        password: '',
        cfmpassword: '',
    });

    const [showErrorText, setShowErrorText] = useState<{ login: boolean; register: boolean }>({
        login: false,
        register: false,
    });

    useEffect(() => {
        switch (currentPage) {
            case 'login':
                setRegisterValids((state) => ({
                    email: true,
                    username: true,
                    password: true,
                    cfmpassword: true,
                    attempt: 0,
                }));
                setRegisterForm({
                    email: '',
                    username: '',
                    password: '',
                    cfmpassword: '',
                });
                setShowErrorText((state) => ({ ...state, register: false }));
                break;
            case 'register':
                setLoginValids((state) => ({
                    username: true,
                    password: true,
                    attempt: 0,
                }));
                setShowErrorText((state) => ({ ...state, login: false }));

                break;
            default:
                break;
        }
    }, [currentPage]);

    useEffect(() => {
        const shouldSatisfy = Object.keys(loginValids).length;

        if (Object.keys(loginValids).filter((i) => Object(loginValids)[i]).length === shouldSatisfy) {
            dispatch(setLoading(true));

            const { username, password } = loginForm;

            // const doLogin = async () => {
            //     try {
            //         const res = await bread.post('/로그인', {
            //             username,
            //             password,
            //         });

            //         navigate('/list');
            //     } catch (err) {
            //         const ex = err as AxiosError;
            //         if (ex.response) {
            //             if (Object(ex.response.data).message === '아이디비번오류') {
            //                 setShowErrorText((state) => ({ ...state, login: true }));
            //             }
            //         }
            //     }
            // };
            // doLogin();

            bread
                .post('/login', {
                    username,
                    password,
                })
                .then((res) => res && navigate('/list'))
                .catch((error: AxiosError) => {
                    console.log(error.response!.data);
                })
                .finally(() => {
                    dispatch(setLoading(false));
                });

            // setTimeout(() => {
            //     dispatch(setLoading(false));
            //     navigate('/list');
            // }, 1000);
        }
    }, [loginValids]);

    useEffect(() => {
        const shouldSatisfy = Object.keys(registerValids).length;

        if (Object.keys(registerValids).filter((i) => Object(registerValids)[i]).length === shouldSatisfy) {
            dispatch(setLoading(true));
            // const { email, username, password, cfmpassword } = registerValids;

            // bread.post('/회원가입', {
            //     email,
            //     username,
            //     password,
            //     cfmpassword,
            // });

            setTimeout(() => {
                dispatch(setLoading(false));
                dispatch(
                    setPopup(true, 'positive', 'Succeed to create a new account!', false, 'Confirm', 'Cancel', () => {
                        {
                            // console.log('컨피름 클릭드');
                        }
                    })
                );
                setCurrentPage('login');
            }, 1000);
        }
    }, [registerValids]);

    return (
        <div className="container-entries">
            <section id="plate-logo">
                <Logo style={{ width: 'calc(100% - 6rem)', maxWidth: '26rem', height: 'auto' }} />
                <p
                    className="en-pri wei-100"
                    style={{
                        fontSize: '2rem',
                        paddingTop: '1.7rem',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                    }}
                >
                    Realtime Power-consumption Monitor
                </p>
            </section>
            <section id="plate-inputs">
                {currentPage === 'login' && showErrorText.login && (
                    <p className="en-sec error-text">Incorrect Username or Password</p>
                )}
                {currentPage === 'register' && showErrorText.register && (
                    <p className="en-sec error-text">Username is already taken.</p>
                )}
                {forms[currentPage].map(({ type, name, onInvalid, placeholder }, index) => {
                    return (
                        <RoundyInput
                            key={index}
                            type={type as 'password' | 'email' | 'text'}
                            name={name}
                            placeholder={placeholder && placeholder}
                            value={currentPage === 'login' ? Object(loginForm)[name] : Object(registerForm)[name]}
                            onChange={(e) => {
                                const target = e.target as HTMLInputElement;
                                currentPage === 'login'
                                    ? setLoginForm((state) => ({ ...state, [target.name]: target.value }))
                                    : setRegisterForm((state) => ({ ...state, [target.name]: target.value }));
                            }}
                            style={{
                                borderColor:
                                    currentPage === 'login'
                                        ? !Object(loginValids)[name]
                                            ? '#e09d9d'
                                            : undefined
                                        : !Object(registerValids)[name]
                                        ? '#e09d9d'
                                        : undefined,
                            }}
                            invalidText={
                                currentPage === 'login'
                                    ? !Object(loginValids)[name]
                                        ? ` - ${onInvalid}`
                                        : ''
                                    : !Object(registerValids)[name]
                                    ? ` - ${onInvalid}`
                                    : ''
                            }
                            invalidTextClassNames={`dynamic-placeholder${
                                currentPage === 'login'
                                    ? !Object(loginValids)[name]
                                        ? '-invalid'
                                        : ''
                                    : !Object(registerValids)[name]
                                    ? '-invalid'
                                    : ''
                            } nodrag`}
                        />
                    );
                })}

                <button
                    className="common confirm en-sec wei-200"
                    onClick={() => {
                        currentPage === 'login'
                            ? setLoginValids((state) => {
                                  const res = validate(loginForm);
                                  return {
                                      ...res,
                                      attempt: state.attempt + 1,
                                  };
                              })
                            : setRegisterValids((state) => {
                                  const res = validate(registerForm);
                                  return {
                                      ...res,
                                      attempt: state.attempt + 1,
                                  };
                              });
                    }}
                >
                    {currentPage === 'login' ? 'LOG IN' : 'SIGN UP'}
                </button>
                {currentPage === 'login' ? (
                    <p
                        className="en-pri wei-100 nodrag"
                        style={{ fontSize: '1.6rem', paddingTop: '1.5rem', color: '#666' }}
                    >
                        Have no account?{' '}
                        <span className="wei-900 pointer" onClick={() => setCurrentPage('register')}>
                            SIGN UP
                        </span>
                    </p>
                ) : (
                    <p
                        className="en-pri wei-100 nodrag"
                        style={{ fontSize: '1.6rem', paddingTop: '1.5rem', color: '#666' }}
                    >
                        Already have account?{' '}
                        <span className="wei-900 pointer" onClick={() => setCurrentPage('login')}>
                            LOG IN
                        </span>
                    </p>
                )}
            </section>
        </div>
    );
};

export default Entries;
