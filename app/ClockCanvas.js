import React from 'react';

export default class ClockCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.ctx = "";
        this.currentH = "";
        this.currentM = "";
        this.currentS = "";
    }
    componentDidMount() {
        this.drawClock();
    }
    //绘制时刻表
    drawClock = () => {
        const can = document.getElementById("clockCanvas");
        this.ctx = can.getContext("2d");

        const date = new Date();
        let hour = date.getHours();
        hour = hour > 11 ? (hour - 12) : hour;
        this.currentH = hour;
        this.currentM = date.getMinutes();
        this.currentS = date.getSeconds();

        this.drawSMHLine();
    }
    //获取当前时刻
    getCurrentTime = () => {
        const date = new Date();
        const time = {};
        time.hour = date.getHours();
        time.hour = time.hour > 11 ? (time.hour - 12) : time.hour;
        time.minu = date.getMinutes();
        time.sec = date.getSeconds();
        return time;
    }
    //表盘上时刻线
    drawClockLine = () => {
        for (let i = 0; i < 12; i++) {
            let x1, x2, y1, y2;
            const rad = 30 * i * Math.PI / 180;
            if (i % 3 === 0) {
                x1 = 150 + 100 * Math.cos(30 * i * Math.PI / 180);
                y1 = 150 + 100 * Math.sin(30 * i * Math.PI / 180);

                x2 = 150 + 110 * Math.cos(30 * i * Math.PI / 180);
                y2 = 150 + 110 * Math.sin(30 * i * Math.PI / 180);
            } else {
                x1 = 150 + 100 * Math.cos(30 * i * Math.PI / 180);
                y1 = 150 + 100 * Math.sin(30 * i * Math.PI / 180);

                x2 = 150 + 107 * Math.cos(30 * i * Math.PI / 180);
                y2 = 150 + 107 * Math.sin(30 * i * Math.PI / 180);

            }
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
        }
    }
    //绘制时分秒指针
    drawSMHLine = () => {
        const time = this.getCurrentTime();
        const s = time.sec;
        const m = time.minu;
        const h = time.hour;

        this.ctx.clearRect(0, 0, 300, 300);
        this.ctx.beginPath();
        this.drawClockLine();

        let showTime = "";
        if (m < 10 || s < 10) {
            if (m < 10&&s<10) {
                showTime = h + ':' + "0" + m + ':' +'0'+ s
            }
            else{if (s < 10) {
                showTime = h + ':' + m + ':' + "0" + s
            }else{
                showTime = h + ':'+ "0" + m + ':' + s
            }
        }
        } else {
            showTime = h + ':' + m + ':' + s
        }
        //中间显示时间的具体数值
        this.ctx.strokeStyle = "#f5e241";
        this.ctx.font = "normal 20px YouYuan";
        this.ctx.strokeText(showTime, 150, 200);
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.stroke();

        //计算时分秒指针的角度
        const sRad = s * Math.PI / 30;
        const mRad = m * Math.PI / 30 + sRad / 60;
        const hRad = h * Math.PI / 6 + mRad / 12;

        const xs = 150 + 99 * Math.cos(Math.PI / 2 - sRad);
        const ys = 150 + (-99 * Math.sin(Math.PI / 2 - sRad));

        const xm = 150 + 82 * Math.cos(Math.PI / 2 - mRad);
        const ym = 150 + (-82 * Math.sin(Math.PI / 2 - mRad));

        const xh = 150 + 60 * Math.cos(Math.PI / 2 - hRad);
        const yh = 150 + (-60 * Math.sin(Math.PI / 2 - hRad));

        //绘制时分秒指针
        this.ctx.moveTo(150, 150);
        this.ctx.lineTo(xs, ys);
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();

        this.ctx.moveTo(150, 150);
        this.ctx.lineTo(xm, ym);
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        this.ctx.moveTo(150, 150);
        this.ctx.lineTo(xh, yh);
        this.ctx.lineWidth = 2;

        this.ctx.stroke();
        requestAnimationFrame(this.drawSMHLine);
    }
    render() {
        return (
            <canvas id="clockCanvas" width="300" height="300"></canvas>
        )
    }
}