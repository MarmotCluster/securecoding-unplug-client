import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validate } from '../../utils';
import Logo from '../Logo';
import RoundyInput from '../RoundyInput';
import entries from '../../assets/json/entries.json';
import bread from '../../apis/bread';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../modules/defaults';

type TypeLogin = {
    username: string;
    password: string;
};

type FormData = {
    username?: string;
    email?: string;
    password?: string;
    cfmpassword?: string;
};

type ValidateList = {
    username?: boolean;
    email?: boolean;
    password?: boolean;
    cfmpassword?: boolean;
    attempt: number;
};

const Entries = () => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login');

    const [loginValids, setLoginValids] = useState<ValidateList>({
        username: true,
        password: true,
        attempt: 0,
    });

    const [loginForm, setLoginForm] = useState<FormData>({
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

    const [registerForm, setRegisterForm] = useState<FormData>({
        email: '',
        username: '',
        password: '',
        cfmpassword: '',
    });

    useEffect(() => {
        const shouldSatisfy = Object.keys(loginValids).length;

        if (Object.keys(loginValids).filter((i) => Object(loginValids)[i]).length === shouldSatisfy) {
            dispatch(setLoading(true));
            const { username, password } = loginValids;

            bread.post('/로그인', {
                username,
                password,
            });
        }
    }, [loginValids]);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <section
                id="plate-logo"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '40rem',
                    overflow: 'hidden',
                    flex: '1 1 auto',
                    transition: 'flex .2s ease',
                }}
            >
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
                {entries[currentPage].map(({ type, name, onInvalid }, index) => {
                    return (
                        <div key={index}>
                            <RoundyInput
                                type={type as 'password' | 'email' | 'text'}
                                name={name}
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

                            {index !== Object.keys(entries[currentPage]).length - 1 && (
                                <div style={{ height: '1.5rem' }}></div>
                            )}
                        </div>
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
                        <span
                            className="wei-900 pointer"
                            onClick={() => {
                                setCurrentPage('register');
                                setLoginValids((state) => ({
                                    username: true,
                                    password: true,
                                    attempt: 0,
                                }));
                            }}
                        >
                            SIGN UP
                        </span>
                    </p>
                ) : (
                    <p
                        className="en-pri wei-100 nodrag"
                        style={{ fontSize: '1.6rem', paddingTop: '1.5rem', color: '#666' }}
                    >
                        Already have account?{' '}
                        <span
                            className="wei-900 pointer"
                            onClick={() => {
                                setCurrentPage('login');
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
                            }}
                        >
                            LOG IN
                        </span>
                    </p>
                )}
            </section>
        </div>
    );
};

export default Entries;
