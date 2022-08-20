import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import bread from '../../apis/bread';
import { setLoading } from '../../modules/defaults';
import { setToastMessage } from '../../modules/toast';
import BrandNewEarth from '../layouts/BrandNewEarth';
import GraphItem from '../layouts/GraphItem';
import Header from '../layouts/Header';

const Details = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const param = useParams();

    const [isOpenedDetails, setIsOpenedDetails] = useState({
        status: false,
        attempt: 0,
    });

    useEffect(() => {
        async function requestInit() {
            dispatch(setLoading(true));
            try {
                const res = await bread.post('/아이템리스트', {
                    data: {
                        serial: param.id,
                    },
                });

                if (res.data) {
                    console.log(res.data);
                }

                // dispatch(setLoading(false));
            } catch (err) {
                const ex = err as AxiosError;
                console.log(ex.response);
                dispatch(setToastMessage('Something went wrong. Try it later.'));
            }
        }
        // requestInit();
    }, []);

    return (
        <>
            <div className="container-default">
                <Header
                    title={'My Home'}
                    subtitle="Details"
                    renderBackward
                    renderLinkSettings={false}
                    isDark={!isOpenedDetails.status}
                />
                <main className="main">
                    <div className="main-canvas">
                        <div className="main-canvas-earth">
                            <BrandNewEarth />
                        </div>
                    </div>
                </main>
                <section
                    className={`section-fixed section-fixed-topradius${
                        isOpenedDetails.attempt > 0
                            ? isOpenedDetails.status
                                ? ' expandanimation'
                                : ' unexpandanimation'
                            : ''
                    }`}
                    style={{
                        padding: isOpenedDetails.status ? '15rem 0 4rem 0' : '4rem 2rem',
                    }}
                >
                    {!isOpenedDetails.status ? (
                        <>
                            <p className="en-ter wei-900 usedwatts-desc">Power Consumption of the month</p>
                            <p className="en-ter wei-900 usedwatts">123kW</p>
                        </>
                    ) : (
                        <div className="section-fixed-details">
                            <GraphItem />
                            <GraphItem />
                        </div>
                    )}
                    <p
                        className="en-sec wei-200 nodrag usedwatts-showdetails"
                        onClick={() =>
                            setIsOpenedDetails((state) => ({
                                ...state,
                                status: !state.status,
                                attempt: state.attempt + 1,
                            }))
                        }
                    >
                        {isOpenedDetails.status ? 'TAP HERE TO HIDE DETAILS.' : 'TAP HERE TO SEE MORE DETAILS.'}
                    </p>
                </section>
            </div>
        </>
    );
};

export default Details;
