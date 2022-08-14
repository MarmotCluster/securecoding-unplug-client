import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bread from '../../apis/bread';
import EarthClip from '../layouts/EarthClip';
import Header from '../layouts/Header';
import Logo from '../layouts/Logo';

interface BreadInfo {
    index: number;
    id: string;
    name: string;
    status: number;
}

const Main = () => {
    const navigate = useNavigate();

    const [initializing, setInitializing] = useState<boolean>(true);

    const [isLoadingItems, setIsLoadingItems] = useState<boolean>(true);

    const [items, setItems] = useState<BreadInfo[] | []>([
        {
            index: 0,
            id: 'BREAD1234',
            name: 'MY HOME',
            status: 0,
        },
        {
            index: 1,
            id: 'BREAD1234',
            name: '친구집',
            status: 3,
        },
        {
            index: 2,
            id: 'BREAD1234',
            name: '내 가게',
            status: 4,
        },
    ]);

    const [currentItemSelected, setCurrentItemSelected] = useState<number>(0);

    useEffect(() => {
        // bread.get('/아이템목록').then((res) => {
        //     setItems(res.data);
        //     setIsLoadingItems(false);
        // });

        setTimeout(() => {
            setIsLoadingItems(false);
        }, 1000);
    }, []);

    const renderItems = () => {
        const renderAddnewChildElements = () => {
            return (
                <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="56"
                        height="56"
                        x="0"
                        y="0"
                        preserveAspectRatio="none"
                        viewBox="0 0 56 56"
                    >
                        <defs>
                            <path
                                id="ico_addnew"
                                fill="silver"
                                d="M51 33q2.05 0 3.5-1.45Q56 30.05 56 28t-1.5-3.5Q53.05 23 51 23H33V5q0-2.05-1.5-3.55Q30.05 0 28 0t-3.55 1.45Q23 2.95 23 5v18H5q-2.05 0-3.55 1.5Q0 25.95 0 28t1.45 3.55Q2.95 33 5 33h18v18q0 2.05 1.45 3.5Q25.95 56 28 56t3.5-1.5Q33 53.05 33 51V33h18z"
                            ></path>
                        </defs>
                        <use xlinkHref="#ico_addnew"></use>
                    </svg>
                    <p
                        className="en-sec wei-700 nodrag"
                        style={{ fontSize: '1.2rem', color: '#BBBBBB', paddingTop: '1.2rem' }}
                    >
                        Add new device..
                    </p>
                </>
            );
        };

        const renderNonSelectedItem = (name: string) => {
            return (
                <>
                    <p className="main-items__item-title main-items__item-title-dark en-sec wei-700 nodrag">{name}</p>
                    <EarthClip status={-1} index={-1} />
                </>
            );
        };

        if (isLoadingItems) {
            return (
                <div className="main-items-loading">
                    <div className="main-items-loading-loader"></div>
                </div>
            );
        } else {
            const getTarget = (current: number, compareTo: number): false | BreadInfo => {
                if (current < compareTo) {
                    return items[current];
                } else if (current === compareTo) {
                    return {
                        index: -1,
                        id: '',
                        name: '<addnew>',
                        status: -1,
                    };
                } else {
                    return false;
                }
            };

            const prevTarget: false | BreadInfo = getTarget(currentItemSelected - 1, items.length);
            const target: BreadInfo = getTarget(currentItemSelected, items.length) as BreadInfo;
            const nextTarget: false | BreadInfo = getTarget(currentItemSelected + 1, items.length);

            // console.log(prevTarget, target, nextTarget);

            return (
                <div
                    className={`main-items__item main-items__item-selected main-items__item-${
                        target.name === '<addnew>' ? 'addnew' : `${target.status}`
                    }`}
                    onClick={() => {
                        target.name === '<addnew>' ? navigate(`/addnew`) : navigate(`/details/${target.id}`);
                    }}
                >
                    <p className="main-items__item-title en-sec wei-700 nodrag">
                        {target.name !== '<addnew>' && target.name}
                    </p>
                    {target.name !== '<addnew>' ? (
                        <EarthClip status={target.status} index={target.index} />
                    ) : (
                        renderAddnewChildElements()
                    )}
                    {/* prevTarget */}
                    <div
                        className={`main-items__item main-items__item--before ${
                            prevTarget || 'main-items__item-empty'
                        }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            currentItemSelected > 0 && setCurrentItemSelected((state) => state - 1);
                        }}
                    >
                        {prevTarget && renderNonSelectedItem(prevTarget.name)}
                    </div>
                    {/* nextTarget */}
                    {nextTarget && (
                        <div
                            className={`main-items__item main-items__item--after ${
                                nextTarget.name === '<addnew>' && 'main-items__item-addnew'
                            }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                currentItemSelected < items.length && setCurrentItemSelected((state) => state + 1);
                            }}
                        >
                            {nextTarget.name === '<addnew>'
                                ? renderAddnewChildElements()
                                : renderNonSelectedItem(nextTarget.name)}
                        </div>
                    )}
                </div>
            );
        }
    };

    const renderStringCurrentStatus = (index: number): string => {
        const strings = ['Great!', 'Good!', 'Not bad!', 'Bad..', 'Should Concern!'];

        return strings[index];
    };

    return (
        <div className="container-default">
            <Header />
            <main className="main">
                <div className="main-items">{renderItems()}</div>
                <div className="main-items-info">
                    <p className="main-items-info__text en-ter wei-900">
                        {currentItemSelected < items.length ? 'status of the own region is:' : '-'}
                    </p>
                    <p className="main-items-info__status en-ter wei-900">
                        {currentItemSelected < items.length
                            ? renderStringCurrentStatus(items[currentItemSelected].status)
                            : '-'}
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Main;
