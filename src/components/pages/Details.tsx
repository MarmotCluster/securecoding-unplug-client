import { AxiosError } from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import bread from '../../apis/bread';
import { RootState } from '../../modules';
import { setLoading } from '../../modules/defaults';
import { setToastMessage } from '../../modules/toast';
import { getDateFromNumbers, getDateFromString, getInputDateCurrent } from '../../utils';
import BrandNewEarth, { BrandNewEarthStatusColor } from '../layouts/BrandNewEarth';
import GraphItem, { GraphItemProps } from '../layouts/GraphItem';
import Header from '../layouts/Header';
import statics from '../../assets/json/statics.json';

interface periodAverageProps {
    created_at: string;
    id: number;
    serial: string;
    watt: number;
}

const Details = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const param = useParams();
    const { currentSelectedItemIs } = useSelector((state: RootState) => state.defaults);

    const [isOpenedDetails, setIsOpenedDetails] = useState({
        status: false,
        attempt: 0,
    });

    const [realtimeRefreshAttempt, setRealtimeRefreshAttempt] = useState(0);
    const [realtimemWattages, setRealtimemWattages] = useState<GraphItemProps>({
        horizonalRange: { start: 0, interval: 5 },
        tails: [],
        result: 0,
        oldestString: 'an hour ago',
        newestString: 'now',
    });
    const [datesDataByWeek, setDatesDataByWeek] = useState<string | undefined>(getInputDateCurrent());
    const [weeklyWattages, setWeeklyWattages] = useState<GraphItemProps>({
        horizonalRange: { start: 0, interval: 5 },
        tails: [],
        result: 0,
        oldestString: '',
        newestString: '',
    });

    const [monthlyUsedPower, setMonthlyUsedPower] = useState<number>(-1);

    const [capitalAverages, setCapitalAverages] = useState<number>(0);

    useEffect(() => {
        bread.get('electricities/average_kwatt').then((res) => {
            if (res.data) {
                setCapitalAverages(res.data[0].average_Kwatt);
            }
        });

        // bread.get('electricities/average_money', { data: { month: 8 } }).then((res) => {
        //     res.data && console.log(res.data);
        // });

        async function requestInit() {
            dispatch(setLoading(true));
            try {
                const res = await bread.get('/electricities/my_entries');

                if (res.data) {
                    const getAverageOfMine = (arr: periodAverageProps[]): number => {
                        // console.log(arr);

                        let totals: number = 0;
                        let counts: number = 0;

                        arr.forEach((i: periodAverageProps, index: number) => {
                            if (i.serial === param.id) {
                                totals += i.watt;
                                counts++;
                            }
                        });

                        return Math.floor(totals / counts);
                    };

                    setMonthlyUsedPower(getAverageOfMine(res.data[0]));
                }
            } catch (err) {
                const ex = err as AxiosError;
                dispatch(setToastMessage('Something went wrong. Try it later.'));
            }
        }

        if (currentSelectedItemIs.id === '') {
            navigate('/list');
        } else {
            requestInit();
        }
    }, []);

    useEffect(() => {
        async function requestInit() {
            dispatch(setLoading(true));

            let gotCurrentDate: number[] = getDateFromString(datesDataByWeek!);

            try {
                const res = await bread.get('/electricities/period_average', {
                    params: {
                        start_date: getDateFromNumbers(
                            gotCurrentDate[0],
                            gotCurrentDate[1],
                            gotCurrentDate[2],
                            0,
                            0,
                            7
                        ),
                        end_date: getDateFromNumbers(gotCurrentDate[0], gotCurrentDate[1], gotCurrentDate[2], 0, 0, 1),
                        serial: param.id,
                    },
                });

                if (res.data) {
                    let finalData: number[] = [];
                    let minValue = -1;
                    let maxValue = -1;
                    let totals = 0;
                    let gotOldestDate = '';
                    let gotNewestDate = '';

                    res.data.forEach((i: periodAverageProps[]) => {
                        if (i.length > 0) {
                            gotNewestDate = i[0].created_at.split('T')[0];

                            if (gotOldestDate === '') {
                                gotOldestDate = i[0].created_at.split('T')[0];
                            }
                            if (minValue === -1 || minValue > i[0].watt) {
                                minValue = i[0].watt;
                            }
                            if (maxValue === -1 || maxValue < i[0].watt) {
                                maxValue = i[0].watt;
                            }
                            totals += i[0].watt;

                            finalData.push(i[0].watt);
                        }
                    });

                    setWeeklyWattages((state) => ({
                        ...state,
                        tails: [...finalData],
                        horizonalRange: {
                            start: 0,
                            interval: maxValue / 3,
                        },
                        result: totals,
                        oldestString: gotOldestDate,
                        newestString: gotNewestDate,
                    }));
                }
            } catch (err) {
                // const ex = err as AxiosError;
                dispatch(setToastMessage('Something went wrong. Try it later.'));
            }
        }
        requestInit();
    }, [datesDataByWeek]);

    useEffect(() => {
        async function requestInit() {
            dispatch(setLoading(true));

            try {
                const res = await bread.get('/electricities/my_entries');

                if (res.data) {
                    let finalData: number[] = [];
                    let minValue = -1;
                    let maxValue = -1;
                    let totals = 0;

                    res.data[0].forEach((i: periodAverageProps) => {
                        if (minValue === -1 || minValue > i.watt) {
                            minValue = i.watt;
                        }
                        if (maxValue === -1 || maxValue < i.watt) {
                            maxValue = i.watt;
                        }
                        totals += i.watt;

                        finalData.push(i.watt);
                    });

                    // console.log(finalData.length, minValue, maxValue, totals);
                    setRealtimemWattages((state) => ({
                        ...state,
                        tails: [...finalData],
                        horizonalRange: {
                            start: 0,
                            interval: maxValue / 3,
                        },
                        result: totals,
                    }));
                }
            } catch (err) {}
        }

        function refreshDate() {
            if (isOpenedDetails.status) {
                requestInit();
            }

            setRealtimeRefreshAttempt((state) => state + 1);
        }

        const tick = setInterval(refreshDate, 60000);

        if (realtimeRefreshAttempt === 0) {
            requestInit();
        }

        return () => clearInterval(tick);
    }, [realtimeRefreshAttempt]);

    return (
        <>
            <div className="container-default">
                <Header
                    title={currentSelectedItemIs.name}
                    subtitle="Details"
                    renderBackward={
                        isOpenedDetails.status
                            ? () => {
                                  setIsOpenedDetails((state) => ({
                                      ...state,
                                      status: false,
                                      attempt: state.attempt + 1,
                                  }));
                              }
                            : true
                    }
                    renderLinkSettings={false}
                    isDark={!isOpenedDetails.status}
                />
                <main className="main">
                    <div className="main-canvas">
                        <div
                            className="main-canvas-earth"
                            style={{
                                filter: `drop-shadow(0px 0px 12px ${
                                    BrandNewEarthStatusColor.sphere[currentSelectedItemIs.status]
                                })`,
                            }}
                        >
                            <BrandNewEarth
                                sea={BrandNewEarthStatusColor.sea[currentSelectedItemIs.status]}
                                ground={BrandNewEarthStatusColor.ground[currentSelectedItemIs.status]}
                            />
                        </div>
                        <div className="main-canvas-trees">
                            {(function () {
                                const randomized = Math.random();
                                const isCurrentTreeAlive = (4 - currentSelectedItemIs.status) / 4;

                                return statics.tree.map((i, index) => {
                                    return (
                                        <img
                                            key={index}
                                            src={`/images/${
                                                randomized < isCurrentTreeAlive ? 'tree_healthy' : 'tree_dead'
                                            }.svg`}
                                            className="main-canvas-trees__tree nodrag"
                                            style={{
                                                top: `${i.y}px`,
                                                left: `${i.x}px`,
                                            }}
                                        />
                                    );
                                });
                            })()}
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
                            <p className="en-ter wei-900 usedwatts">{monthlyUsedPower}kW</p>
                            <p className="en-ter wei-900 usedwatts-capital">
                                Average wattage of your capital city is: <span>{capitalAverages}kW</span>
                            </p>
                        </>
                    ) : (
                        <div className="section-fixed-details">
                            <GraphItem
                                title="Realtime (Past an hour)"
                                chartType="line"
                                result={realtimemWattages.result}
                                horizonalRange={realtimemWattages.horizonalRange}
                                tails={realtimemWattages.tails}
                                oldestString={realtimemWattages.oldestString}
                                newestString={realtimemWattages.newestString}
                            />
                            <GraphItem
                                title={
                                    <>
                                        {'Custom Week ('}
                                        <input
                                            type="date"
                                            className="removedDateStyle"
                                            value={datesDataByWeek}
                                            max={getInputDateCurrent()}
                                            onChange={(e) => setDatesDataByWeek(e.target.value)}
                                        />
                                        {')'}
                                    </>
                                }
                                chartType="bar"
                                result={weeklyWattages.result}
                                horizonalRange={weeklyWattages.horizonalRange}
                                tails={weeklyWattages.tails}
                                oldestString={weeklyWattages.oldestString}
                                newestString={weeklyWattages.newestString}
                            />
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
