import React from 'react';
import FrontCanvas from './FrontCanvas';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowX: 0,
            windowY: 0
        }
        this.rainArr = [];
        this.bgY = 0;
        this.ctx;
        this.rainObj;
        this.stop;
    }
    componentWillMount() {
        const x = document.body.clientWidth;
        const y = document.body.clientHeight;
        this.setState({
            windowX: x,
            windowY: y
        });

    }
    componentDidMount() {
        window.addEventListener("resize", this.showCurrentSize);
        const bgCanvas = document.getElementById("bgCanvas");
        this.ctx = bgCanvas.getContext("2d");
        //绘制雨布背景
        this.drawRain();
    }
    //根据当前浏览器界面调整canvas大小
    showCurrentSize = () => {
        const x = document.body.clientWidth;
        const y = document.body.clientHeight;

        this.setState({
            windowX: x,
            windowY: y
        })
    }
    drawRain = () => {
        for(var  i = 0; i < 300; i++) {
            const that=this;
            setTimeout(function(){
                const rainObj = that.createNewRain();
                that.rainArr.push(rainObj);
            },i*200);
        }
        this.rainDrop();
    }
    rainDrop = () => {
        this.ctx.fillStyle = "white";
        this.ctx.clearRect(0, 0, this.state.windowX, this.state.windowY);
        for (let i = 0; i < this.rainArr.length; i++) {
            this.drawRainRoad(this.rainArr[i],i);
        }
        requestAnimationFrame(this.rainDrop);
    }
    //创建新雨滴，设置初始属性
    createNewRain = () => {
        const singleRain = {};
        //设置雨滴初始位置
        singleRain.x = Math.random() * this.state.windowX;
        singleRain.y = 0;
        singleRain.ySpeed = Math.random() + 4;
        singleRain.mHeight = Math.random() * this.state.windowY * 0.1 + this.state.windowY * 0.8;
        singleRain.rlen = Math.random() * 8 + 2;
        //波纹的半径
        singleRain.r = 1;
        singleRain.rSpeed = 1;
        singleRain.rMax = singleRain.rlen * 2;

        //设置最后的透明度
        singleRain.o=1;
        singleRain.oSpeed=0.96;
        return singleRain;
    }
    //绘制雨滴路径
    drawRainRoad = (rainObj,i) => {
        if (rainObj.y < rainObj.mHeight) {
            this.ctx.fillRect(rainObj.x, rainObj.y, 2, rainObj.rlen);
        }
        //如果雨滴下落到最下面，则绘制圆形涟漪
        else {
            this.ctx.beginPath();
            this.ctx.arc(rainObj.x, rainObj.y, rainObj.r, 0, Math.PI * 2, false);
            this.ctx.strokeStyle = `rgba(255,255,255,${rainObj.o})`;
            this.ctx.stroke();
        }
        this.updateRain(rainObj,i);
    }
    //动态更新雨点位置
    updateRain = (rainObj,i) => {
        if (rainObj.y < rainObj.mHeight) {
            rainObj.y += rainObj.ySpeed;
        } else {
            if(rainObj.o>0.03){
                rainObj.r += rainObj.rSpeed;
                if (rainObj.r > rainObj.rMax) {
                    rainObj.o *= rainObj.oSpeed;
                }
            }else{
                //初始化雨滴
                this.rainArr[i]=this.createNewRain();
            }
        }
    }
    render() {
        const state = this.state;
        const windowX = state.windowX;
        const windowY = state.windowY;
        return (
            <React.Fragment>
                <canvas id="bgCanvas" width={windowX} height={windowY}></canvas>
                <FrontCanvas windowX={windowX} windowY={windowY}/>
            </React.Fragment>
        )
    }
}