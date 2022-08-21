import React, { useEffect, useRef } from 'react';

interface GraphItemProps {
    title?: string | React.ReactNode;
    result?: number;
    horizonalRange?: { start: number; interval: number };
    tails?: number[];
    chartType?: 'bar' | 'line';
    oldestString?: string;
}

const GraphItem = ({
    title = 'Noname',
    result = 0,
    horizonalRange = {
        start: 0,
        interval: 5,
    },
    tails = [0, 15, 2, 15, 5],
    chartType = 'line',
    oldestString = 'undefined ago',
}: GraphItemProps) => {
    const canvas = useRef(null);

    let ctx: CanvasRenderingContext2D | null = null;

    useEffect(() => {
        const _width = 380;
        const _height = 160;
        const retails: number[] = (function () {
            const range = {
                // max: horizonalRange.interval * 4 + horizonalRange.start,
                min: horizonalRange.start, // 0
                abs: horizonalRange.interval * 4, // 20
            };
            let res: number[] = [];

            tails.forEach((i) => {
                res.push(160 - ((i - range.min) / range.abs) * _height);
                //   15 - 0 / 20 * 160
            });
            return res;
        })();
        const tailsLength = tails.length - 1;

        if (canvas.current) {
            ctx = (canvas.current as HTMLCanvasElement).getContext('2d');

            if (chartType === 'line') {
                ctx!.lineWidth = 2;
                ctx!.strokeStyle = '#00B2AC';
                ctx!.clearRect(0, 0, 380, 160);
                ctx!.beginPath();

                retails.forEach((i, index) => {
                    if (index === 0) {
                        ctx!.moveTo((_width * index) / tailsLength, i);
                    } else {
                        ctx!.lineTo((_width * index) / tailsLength, i);
                    }
                });
                ctx!.stroke();
            } else if (chartType === 'bar') {
                const barSpace = 2;
                const barWidth = _width / (tailsLength + 1) - barSpace;

                ctx!.clearRect(0, 0, 380, 160);

                retails.forEach((i, index) => {
                    if (index === 0) {
                        ctx!.beginPath();
                        ctx!.fillRect(barSpace, i, barWidth, 160 - i);
                        // ctx!.fillRect(0, 0, barWidth, 20);
                        ctx!.fillStyle = '#00B2AC';
                        ctx!.stroke();
                    } else {
                        ctx!.beginPath();
                        ctx!.fillRect((barWidth + barSpace) * index + barSpace, i, barWidth, 160 - i);
                        ctx!.fillStyle = '#00B2AC';
                        ctx!.stroke();
                    }
                });
            }
        }
    }, []);

    const renderHorizonalRange = () => {
        const rearr: number[] = (function () {
            let res = [];

            for (let i = 0; i < 4; i++) {
                res.push(horizonalRange.start + horizonalRange.interval * i);
            }

            return res.sort((a, b) => b - a);
        })();
        return rearr.map((i, index) => {
            return (
                <div key={index} className="board-graph__watt-guide en-ter wei-500">
                    <p className="board-graph__watt-guide-number">{i}</p>
                    <div className="board-graph__watt-guide-line"></div>
                </div>
            );
        });
    };

    return (
        <div className="board-graph">
            <p className="board-graph__title en-sec wei-500">{title}</p>
            <p className="board-graph__watt-reuslt en-ter wei-500">{result}kW</p>
            <div className="board-graph-area">
                <canvas ref={canvas} className="board-graph-canvas" width="380px" height="160px"></canvas>
                {renderHorizonalRange()}
                <div className="board-graph__watt-guide en-ter wei-500">
                    <p className="board-graph__watt-guide-number"></p>
                    <div className="board-graph__watt-guide-line-last">
                        <p className="en-sec">{oldestString}</p>
                        <p className="en-sec">now</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraphItem;
