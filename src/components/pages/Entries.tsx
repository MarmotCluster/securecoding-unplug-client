import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validate } from '../../utils';
import Logo from '../Logo';

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
    const [loginValids, setLoginValids] = useState<ValidateList>({
        username: true,
        password: true,
    });

    const [loginForm, setLoginForm] = useState<FormData>({
        username: '',
        password: '',
    });

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
                <div style={{ position: 'relative' }}>
                    <input
                        className="common text en-pri wei-300"
                        type="text"
                        name="username"
                        placeholder=" "
                        value={loginForm.username}
                        onChange={(e) => setLoginForm((state) => ({ ...state, [e.target.name]: e.target.value }))}
                        autoComplete="off"
                        style={{ borderColor: !loginValids.username ? '#e09d9d' : undefined }}
                    />
                    <div className={`dynamic-placeholder${!loginValids.username ? '-invalid' : ''} nodrag`}>
                        username
                    </div>
                </div>
                <div style={{ height: '1.5rem' }}></div>
                <div style={{ position: 'relative' }}>
                    <input
                        className="common text en-pri wei-300"
                        type="password"
                        name="password"
                        placeholder=" "
                        value={loginForm.password}
                        onChange={(e) => setLoginForm((state) => ({ ...state, [e.target.name]: e.target.value }))}
                        autoComplete="new-password"
                        style={{ borderColor: !loginValids.password ? '#e09d9d' : undefined }}
                    />
                    <div className={`dynamic-placeholder${!loginValids.password ? '-invalid' : ''} nodrag`}>
                        password
                    </div>
                </div>

                <button className="common confirm en-sec wei-200" onClick={() => setLoginValids(validate(loginForm))}>
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
