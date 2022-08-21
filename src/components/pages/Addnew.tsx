import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CustomFormData, validate, ValidateList } from '../../utils';
import Header from '../layouts/Header';
import RoundyInput from '../layouts/RoundyInput';
import forms from '../../assets/json/forms.json';
import { setLoading, setPopup } from '../../modules/defaults';
import bread from '../../apis/bread';
import { AxiosError } from 'axios';

const Addnew = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [serialNumberValids, setSettingsValids] = useState<ValidateList>({
        devicename: true,
        serialnumber: true,
        attempt: 0,
    });

    const [serialNumberForm, setSettingsForm] = useState<CustomFormData>({
        devicename: '',
        serialnumber: '',
    });

    useEffect(() => {
        const shouldSatisfy = Object.keys(serialNumberValids).length;

        if (Object.keys(serialNumberValids).filter((i) => Object(serialNumberValids)[i]).length === shouldSatisfy) {
            dispatch(setLoading(true));
            const { serialnumber, devicename } = serialNumberForm;

            const doLogin = async () => {
                try {
                    const res = await bread.post('/users/add_device', {
                        device_name: devicename,
                        device: serialnumber,
                    });

                    console.log(res);
                    if (res) {
                        dispatch(setLoading(false));
                        dispatch(
                            setPopup(true, 'positive', 'Succeed to add new device!', false, 'Confirm', 'Cancel', () => {
                                {
                                    // console.log('컨피름 클릭드');
                                }
                            })
                        );
                        navigate('/list');
                    }
                } catch (err) {
                    const ex = err as AxiosError;
                    // if (ex.response) {
                    //     if (Object(ex.response.data).message === '유효하지않은 혹은') {
                    //         setShowErrorText((state) => ({ ...state, login: true }));
                    //     }
                    // }
                }
            };
            doLogin();

            // setTimeout(() => {
            //     dispatch(setLoading(false));
            //     dispatch(
            //         setPopup(true, 'positive', 'Succeed to add new device!', false, 'Confirm', 'Cancel', () => {
            //             {
            //                 // console.log('컨피름 클릭드');
            //             }
            //         })
            //     );
            //     navigate('/list');
            // }, 1000);
        }
    }, [serialNumberValids, dispatch, navigate]);

    return (
        <div className="container-default" id="plate-inputs" style={{ paddingBottom: '8rem' }}>
            <Header
                title="Add New Device"
                subtitle="Details"
                renderSubTitle={false}
                renderBackward
                renderLinkSettings={false}
            />
            <main className="main" style={{ justifyContent: 'flex-end' }}>
                <div
                    style={{
                        flex: '1 1 auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <img src={`${process.env.PUBLIC_URL}/images/serial_number.png`} width="400px" className="nodrag" />
                    <p className="en-pri wei-200" style={{ fontSize: '2rem' }}>
                        Type Serial Number on your device.
                    </p>
                </div>

                {forms.addnew.map((i, index: number) => {
                    switch (i.type) {
                        case 'text':
                        case 'password':
                        case 'email':
                            return (
                                <RoundyInput
                                    key={index}
                                    type={i.type as 'password' | 'email' | 'text'}
                                    name={i.name}
                                    placeholder={i.placeholder && i.placeholder}
                                    value={Object(serialNumberForm)[i.name]}
                                    onChange={(e) => {
                                        const target = e.target as HTMLInputElement;
                                        setSettingsForm((state) => ({ ...state, [target.name]: target.value }));
                                    }}
                                    style={{
                                        borderColor: !Object(serialNumberValids)[i.name] ? '#e09d9d' : undefined,
                                    }}
                                    invalidText={!Object(serialNumberValids)[i.name] ? ` - ${i.onInvalid}` : ''}
                                    invalidTextClassNames={`dynamic-placeholder${
                                        !Object(serialNumberValids)[i.name] ? '-invalid' : ''
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
                        setSettingsValids((state) => {
                            const res = validate(serialNumberForm);
                            return {
                                ...res,
                                attempt: state.attempt + 1,
                            };
                        });
                    }}
                >
                    ADD
                </button>
            </main>
        </div>
    );
};

export default Addnew;
