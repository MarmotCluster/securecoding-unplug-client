import React from 'react';

const PopupIcon = ({
    type = 'positive',
    style = {},
}: {
    type: 'positive' | 'negative';
    style: React.CSSProperties;
}) => {
    const renderIcon = (type: 'positive' | 'negative') => {
        switch (type) {
            case 'positive':
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="80"
                        height="80"
                        x="0"
                        y="0"
                        preserveAspectRatio="none"
                        viewBox="0 0 80 80"
                    >
                        <defs>
                            <path
                                id="Layer0_0_FILL"
                                fill="#51D651"
                                d="M80 40q0-16.55-11.75-28.25Q56.55 0 40 0T11.7 11.75Q0 23.45 0 40q0 16.6 11.7 28.3Q23.45 80 40 80t28.25-11.7Q80 56.55 80 40M63.2 17.5q9.45 9.45 9.45 22.85 0 13.45-9.45 22.9T40.3 72.7q-13.4 0-22.85-9.45Q8 53.75 8 40.35q0-13.4 9.45-22.85Q26.9 8 40.3 8q13.4 0 22.9 9.5m-2.7 7.9q-1.1-1.1-2.7-1.1-1.55 0-2.7 1.1L34.05 46.45l-9.2-9.15q-1.1-1.1-2.7-1.1t-2.7 1.1q-1.1 1.1-1.1 2.7t1.1 2.7l11.9 11.85q1.1 1.1 2.7 1.15 1.55-.05 2.7-1.15L60.5 30.8q1.1-1.1 1.15-2.7-.05-1.6-1.15-2.7z"
                            ></path>
                        </defs>
                        <use xlinkHref="#Layer0_0_FILL"></use>
                    </svg>
                );

            case 'negative':
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="80"
                        height="80"
                        x="0"
                        y="0"
                        preserveAspectRatio="none"
                        viewBox="0 0 80 80"
                    >
                        <defs>
                            <path
                                id="Layer0_0_FILL"
                                fill="#D65151"
                                d="M80 40q0-16.55-11.75-28.25Q56.55 0 40 0T11.7 11.75Q0 23.45 0 40q0 16.6 11.7 28.3Q23.45 80 40 80t28.25-11.7Q80 56.55 80 40M63.2 17.5q9.45 9.45 9.45 22.85 0 13.45-9.45 22.9T40.3 72.7q-13.4 0-22.85-9.45Q8 53.75 8 40.35q0-13.4 9.45-22.85Q26.9 8 40.3 8q13.4 0 22.9 9.5M39.8 55q-1.55 0-2.7 1.15-1.1 1.1-1.1 2.7t1.1 2.7q1.15 1.15 2.7 1.15 1.6 0 2.7-1.15 1.15-1.1 1.15-2.7 0-1.55-1.15-2.7Q41.4 55 39.8 55m2.7-6.1q1.15-1.15 1.15-2.7V21.85q0-1.55-1.15-2.7Q41.4 18 39.8 18q-1.55 0-2.7 1.15-1.1 1.1-1.1 2.7V46.2q0 1.6 1.1 2.7 1.15 1.1 2.7 1.1 1.6 0 2.7-1.1z"
                            ></path>
                        </defs>
                        <use xlinkHref="#Layer0_0_FILL"></use>
                    </svg>
                );

            default:
                return null;
        }
    };

    return renderIcon(type);
};

export default PopupIcon;
