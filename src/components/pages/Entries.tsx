import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validate } from '../../utils';
import Logo from '../Logo';
import RoundyInput from '../RoundyInput';
import entries from '../../assets/json/entries.json';

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
};

const Entries = () => {
    const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login');

    const [loginValids, setLoginValids] = useState<ValidateList>({
        username: true,
        password: true,
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
    });

    const [registerForm, setRegisterForm] = useState<FormData>({
        email: '',
        username: '',
        password: '',
        cfmpassword: '',
    });

    // useEffect(() => {
    //     console.log(loginValids);
    // }, [loginValids]);

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
                        <>
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
                                invalidTextClassNames={`dynamic-placeholder${
                                    currentPage === 'login'
                                        ? !Object(loginValids)[name]
                                            ? '-invalid'
                                            : ''
                                        : Object(registerValids)[name]
                                        ? '-invalid'
                                        : ''
                                } nodrag`}
                            />

                            {index !== Object.keys(entries[currentPage]).length - 1 && (
                                <div style={{ height: '1.5rem' }}></div>
                            )}
                        </>
                    );
                })}

                <button
                    className="common confirm en-sec wei-200"
                    onClick={() => {
                        currentPage === 'login'
                            ? setLoginValids(validate(loginForm))
                            : setLoginValids(validate(registerForm));
                    }}
                >
                    LOG IN
                </button>
                <p className="en-pri wei-100" style={{ fontSize: '1.6rem', paddingTop: '1.5rem', color: '#666' }}>
                    Have no account? <span className="wei-900">SIGN UP</span>
                </p>
            </section>
        </div>
    );
};

export default Entries;
