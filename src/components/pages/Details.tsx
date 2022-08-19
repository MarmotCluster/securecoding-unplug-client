import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bread from '../../apis/bread';
import Header from '../layouts/Header';

const Details = () => {
    const param = useParams();
    console.log(param);

    useEffect(() => {
        bread.post('/users/login', {
            data: {
                username: 'test1',
                password: 'qwer123@',
            },
        });
    }, []);

    return (
        <div className="container-default">
            <Header title={'My Home'} subtitle="Details" renderBackward renderLinkSettings={false} />
            <main className="main"></main>
        </div>
    );
};

export default Details;
