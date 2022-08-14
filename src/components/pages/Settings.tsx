import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../modules/defaults';
import Header from '../layouts/Header';
import RoundyInput from '../layouts/RoundyInput';
import forms from '../../assets/json/forms.json';
import { validate } from '../../utils';

interface GeneralInput {
    type: 'email' | 'text' | 'password';
    name: string;
    placeholder: string;
    onInvalid: string;
}

const Settings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [settingsValids, setSettingsValids] = useState({
        email: true,
        password: true,
        newpassword: true,
        confirmnewpassword: true,
        attempt: 0,
    });

    const [settingsForm, setSettingsForm] = useState({
        email: '',
        password: '',
        newpassword: '',
        confirmnewpassword: '',
    });

    useEffect(() => {
        const shouldSatisfy = Object.keys(settingsValids).length;

        if (Object.keys(settingsValids).filter((i) => Object(settingsValids)[i]).length === shouldSatisfy) {
            dispatch(setLoading(true));
            // const { username, password } = settingsValids;

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
            setTimeout(() => {
                dispatch(setLoading(false));
                navigate('/list');
            }, 1000);
        }
    }, [settingsValids]);

    return (
        <div className="container-default" id="plate-inputs" style={{ paddingBottom: '8rem' }}>
            <Header title="Settings" subtitle="MarmotCluster" renderBackward={true} renderLinkSettings={false} />
            <main className="main" style={{ justifyContent: 'flex-end' }}>
                {forms.settings.map((i, index: number) => {
                    switch (i.type) {
                        case 'text':
                        case 'password':
                        case 'email':
                            return (
                                <RoundyInput
                                    type={i.type as 'password' | 'email' | 'text'}
                                    name={i.name}
                                    placeholder={i.placeholder && i.placeholder}
                                    value={Object(settingsForm)[i.name]}
                                    onChange={(e) => {
                                        const target = e.target as HTMLInputElement;
                                        setSettingsForm((state) => ({ ...state, [target.name]: target.value }));
                                    }}
                                    style={{
                                        borderColor: !Object(settingsValids)[i.name] ? '#e09d9d' : undefined,
                                    }}
                                    invalidText={!Object(settingsValids)[i.name] ? ` - ${i.onInvalid}` : ''}
                                    invalidTextClassNames={`dynamic-placeholder${
                                        !Object(settingsValids)[i.name] ? '-invalid' : ''
                                    } nodrag`}
                                />
                            );
                        case 'label':
                            return <p className="child label-text en-pri wei-300">{i.name}</p>;
                        default:
                            break;
                    }
                })}
                <button
                    className="common confirm en-sec wei-200"
                    style={{ margin: '0 auto', marginTop: '1.5rem' }}
                    onClick={() => {
                        // setSettingsValids((state) => {
                        // const res = validate(settingsForm);
                        //     return {
                        //         ...res,
                        //         attempt: state.attempt + 1,
                        //     };
                        // });
                    }}
                >
                    SAVE
                </button>

                <p
                    className="en-pri wei-100 nodrag"
                    style={{ fontSize: '1.6rem', paddingTop: '1.5rem', color: '#d65151' }}
                >
                    <span className="wei-900 pointer">LOG OUT</span>
                </p>
            </main>
        </div>
    );
};

export default Settings;
