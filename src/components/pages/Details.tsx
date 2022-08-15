import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../layouts/Header';

const Details = () => {
    const param = useParams();
    console.log(param);

    return (
        <div className="container-default">
            <Header title={'My Home'} subtitle="Details" renderBackward renderLinkSettings={false} />
            <main className="main"></main>
        </div>
    );
};

export default Details;
