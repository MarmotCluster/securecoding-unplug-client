import React, { useEffect, useRef } from 'react';

const GraphItem = () => {
    const canvas = useRef(null);

    let ctx: CanvasRenderingContext2D | null = null;

    useEffect(() => {
        if (canvas.current) {
            ctx = (canvas.current as HTMLCanvasElement).getContext('2d');
            ctx!.lineWidth = 2;
            ctx!.strokeStyle = '#00B2AC';
            ctx!.clearRect(0, 0, 380, 160);
            ctx!.beginPath();
            ctx!.moveTo(0, 160);
            ctx!.lineTo(100, 130);
            ctx!.lineTo(200, 140);
            ctx!.lineTo(300, 40);
            ctx!.lineTo(380, 150);

            ctx!.stroke();
        }
    }, []);

    return (
        <div className="board-graph">
            <p className="board-graph__title en-sec wei-500">Realtime (Past an hour)</p>
            <p className="board-graph__watt-reuslt en-ter wei-500">0.16kW</p>
            <div className="board-graph-area">
                <canvas ref={canvas} className="board-graph-canvas" width="380px" height="160px"></canvas>

                <div className="board-graph__watt-guide en-ter wei-500">
                    <p className="board-graph__watt-guide-number">15</p>
                    <div className="board-graph__watt-guide-line"></div>
                </div>
                <div className="board-graph__watt-guide en-ter wei-500">
                    <p className="board-graph__watt-guide-number">10</p>
                    <div className="board-graph__watt-guide-line"></div>
                </div>
                <div className="board-graph__watt-guide en-ter wei-500">
                    <p className="board-graph__watt-guide-number">5</p>
                    <div className="board-graph__watt-guide-line"></div>
                </div>
                <div className="board-graph__watt-guide en-ter wei-500">
                    <p className="board-graph__watt-guide-number">0</p>
                    <div className="board-graph__watt-guide-line"></div>
                </div>
                <div className="board-graph__watt-guide en-ter wei-500">
                    <p className="board-graph__watt-guide-number"></p>
                    <div className="board-graph__watt-guide-line-last">
                        <p className="en-sec">an hour ago</p>
                        <p className="en-sec">now</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraphItem;
