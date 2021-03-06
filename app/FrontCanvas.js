import React from 'react';
import {Link} from 'react-router-dom';

export default class FrontCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.initPosition;
        this.ctx;
        this.canvasLeft;
        this.posture = "static";
        this.moveDirection = "left";
        this.ballMoveId = "";
        this.id;
        this.destoryId;
        this.ball = [];
        this.scheduledAnimationFrame = false;
        this.ballXDirection = true;
        this.ballYDirection = true;
        this.collision = false;
        this.frags = [];
        this.newP = 50;
        this.state={
            startBtn:'block'
        }
    }
    componentDidMount() {
        const frontCanvas = document.getElementById("frontCanvas");
        
        this.initPosition = {
            x: 50,
            y:  50,
            xSpeed: 2,
            newP: 0
        }
        this.canvasLeft = frontCanvas.getBoundingClientRect().left;
        this.ctx = frontCanvas.getContext("2d");
    }
    //点击开始绘制火柴人和小球
    startAgain=()=>{
        this.collision=false;
        this.frags = [];
        const frontCanvas = document.getElementById("frontCanvas");
        frontCanvas.addEventListener("mousemove", this.getPosition);
        if(this.destoryId){
            cancelAnimationFrame(this.destoryId);
        }
        this.setState({
            startBtn:'none'
        },()=>{
            this.ctx.clearRect(0, 0, this.props.windowX * 0.5, this.props.windowY * 0.5);
        
            //绘制火柴人
            this.drawMatchstick();
            this.ball = [];
            //绘制球
            for (let i = 0; i < 6; i++) {
                this.ball.push(this.createBall());
            };
            this.createBalls();
        });
       
    }
    //小人碰撞到球后产生的碎点
    createStickFrag = () => {
        //火柴碎片
        for (let i = 0; i < 30; i++) {
            const frag = {
                x: this.newP,
                y: this.props.windowY*0.5-60,
                xSpeed: Math.random() * 0.2 - 0.1,
                ySpeed: Math.random() * 0.4 + 0.2
            }
            this.frags.push(frag);
        }
        this.destoryId=requestAnimationFrame(this.detoryMatchStick);
    }
    //碰撞后的碎点绘制
    detoryMatchStick = () => {
        
        this.ctx.clearRect(0, 0, this.props.windowX * 0.5, this.props.windowY * 0.5);
        for (let i = 0; i < this.frags.length; i++) {
            if (this.frags[i].y < this.props.windowY * 0.5 - 5) {
                this.frags[i].x += this.frags[i].xSpeed;
                this.frags[i].y += this.frags[i].ySpeed;
            }else{
                this.setState({
                    startBtn:'block'
                })
            }
            this.ctx.beginPath();
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(this.frags[i].x, this.frags[i].y, 2, 2);
        }
        requestAnimationFrame(this.detoryMatchStick);
    }
    //绘制不断变化位置的小球及人
    createBalls = () => {
        this.ctx.clearRect(0, 0, this.props.windowX * 0.5, this.props.windowY * 0.5);
        for (let i = 0; i < this.ball.length; i++) {
            if (this.collision) break;
            this.updateBall(this.ball[i]);
        }

        if (!this.collision) {
            this.ctx.beginPath();
            this.ctx.arc(50, this.props.windowY * 0.5 - 50, 10, 0, 2 * Math.PI, true);
            this.ctx.strokeStyle = "black";

            this.ctx.lineWidth = 1;
            this.drawStatic(50);
            this.ctx.stroke();

            this.ballMoveId = requestAnimationFrame(this.createBalls);
        } else { 
            const frontCanvas = document.getElementById("frontCanvas");
            frontCanvas.removeEventListener("mousemove", this.getPosition);
            cancelAnimationFrame(this.id);
            cancelAnimationFrame(this.ballMoveId);
            this.createStickFrag();
        }
    }
    //更新球以及小人的坐标位置
    updateBall = (ballObj) => {
        //获取小人当前的位置
        const stickX=this.initPosition?this.initPosition.x:50;
        const windowX = this.props.windowX * 0.5;
        const windowY = this.props.windowY * 0.5;
        if (ballObj.ballXDirection) {
            ballObj.x += ballObj.xSpeed;
            if (ballObj.x >= windowX) {
                ballObj.ballXDirection = false;
            }
        } else {
            ballObj.x -= ballObj.xSpeed;
            if (ballObj.x <= 0) {
                ballObj.ballXDirection = true;
            }
        }
        if (ballObj.ballYDirection) {
            ballObj.y += ballObj.ySpeed;
            if (ballObj.y >= windowY) {
                ballObj.ballYDirection = false;
            }
        } else {
            ballObj.y -= ballObj.ySpeed;
            if (ballObj.y <= 0) {
                ballObj.ballYDirection = true;
            }
        }

        if (stickX < ballObj.x + 10 && stickX > ballObj.x - 10 && ballObj.y > windowY - 60) {
            this.collision = true;
            return;
        }

        this.ctx.beginPath();
        this.ctx.arc(ballObj.x, ballObj.y, ballObj.r, 0, Math.PI * 2, false);
        this.ctx.fillStyle="#aeaeb7";
        this.ctx.fill();
    }
    //火柴人的初始状态绘制
    drawMatchstick = () => {
        const windowX = this.props.windowX * 0.5;
        const windowY = this.props.windowY * 0.5;

        this.initPosition = {
            x: 50,
            y: windowY - 50,
            xSpeed: 2,
            newP: 0
        }

        this.ctx.beginPath();
        this.ctx.arc(50, windowY - 50, 10, 0, 2 * Math.PI, true);
        this.ctx.strokeStyle = "black";

        this.ctx.lineWidth = 1;
        this.drawStatic(50);

        this.ctx.stroke();
    }
    //获取鼠标位置，并让小人朝着鼠标点不断移动
    getPosition = (e) => {
        if (this.scheduledAnimationFrame) { return; }
        //获取火柴人的新位置
        let newPosition = e.clientX - this.canvasLeft;
        this.newP = newPosition;
        const windowX = this.props.windowX * 0.5;
        const windowY = this.props.windowY * 0.5;
        this.ctx.clearRect(0, 0, windowX, windowY);

        if (newPosition > this.initPosition.x) {
            this.moveDirection = "right";
            if (e.clientX > frontCanvas.getBoundingClientRect().right - 25) {
                newPosition = frontCanvas.getBoundingClientRect().right - 25;
            }
        } else {
            if (e.clientX < frontCanvas.getBoundingClientRect().left + 15) {
                newPosition = 15;
            }
            this.moveDirection = "left";
        }
        this.initPosition.newP = newPosition;
        this.scheduledAnimationFrame = true;
        cancelAnimationFrame(this.id);
        this.updatePosition();

        this.ctx.beginPath();
        this.ctx.arc(newPosition, windowY - 50, 10, 0, 2 * Math.PI, true);
        this.ctx.strokeStyle = "black";

        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }
    //更新火柴人
    updatePosition = () => {
        this.scheduledAnimationFrame = false;
        this.ctx.clearRect(0, 0, this.props.windowX * 0.5, this.props.windowY * 0.5);
        for (let i = 0; i < this.ball.length; i++) {
            this.updateBall(this.ball[i]);
        }
        this.ctx.beginPath();
        if (this.moveDirection === "right") {
            if (this.initPosition.x < this.initPosition.newP) {
                this.initPosition.x += this.initPosition.xSpeed;
                if (this.posture === "static") {
                    this.drawRight(this.initPosition.x);
                } else {
                    this.drawStatic(this.initPosition.x);
                }
            } else {
                this.drawStatic(this.initPosition.x);
            }
        } else {
            if (this.initPosition.x > this.initPosition.newP) {
                this.initPosition.x -= this.initPosition.xSpeed;
                if (this.posture === "static") {
                    this.drawLeft(this.initPosition.x);
                } else {
                    this.drawStatic(this.initPosition.x);
                }
            } else {
                this.drawStatic(this.initPosition.x);
            }
        }
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.id = requestAnimationFrame(this.updatePosition);
    }
    //小人向左走的姿势
    drawLeft = (newX) => {
        const windowY = this.props.windowY * 0.5;
        this.ctx.arc(newX, windowY - 50, 10, 0, 2 * Math.PI, true);

        this.ctx.moveTo(newX, windowY - 40);
        this.ctx.lineTo(newX, windowY - 20);

        this.ctx.moveTo(newX, windowY - 40);
        this.ctx.quadraticCurveTo(newX - 2, windowY - 30, newX - 10, windowY - 22);

        this.ctx.moveTo(newX, windowY - 40);
        this.ctx.quadraticCurveTo(newX + 12, windowY - 30, newX + 10, windowY - 22);

        this.ctx.moveTo(newX, windowY - 20);
        this.ctx.quadraticCurveTo(newX - 4, windowY - 18, newX - 10, windowY - 4);

        this.ctx.moveTo(newX, windowY - 20);
        this.ctx.quadraticCurveTo(newX - 2, windowY - 18, newX + 10, windowY - 4);
        this.posture = "left";
    }
    //小人向右走的姿势
    drawRight = (newX) => {
        const windowY = this.props.windowY * 0.5;
        //向右走
        this.ctx.arc(newX, windowY - 50, 10, 0, 2 * Math.PI, true);
        this.ctx.moveTo(newX, windowY - 40);
        this.ctx.lineTo(newX, windowY - 20);

        this.ctx.moveTo(newX, windowY - 40);
        this.ctx.quadraticCurveTo(newX + 2, windowY - 30, newX + 10, windowY - 22);

        this.ctx.moveTo(newX, windowY - 40);
        this.ctx.quadraticCurveTo(newX - 12, windowY - 30, newX - 10, windowY - 22);

        this.ctx.moveTo(newX, windowY - 20);
        this.ctx.quadraticCurveTo(newX + 4, windowY - 18, newX + 10, windowY - 4);

        this.ctx.moveTo(newX, windowY - 20);
        this.ctx.quadraticCurveTo(newX + 2, windowY - 18, newX - 10, windowY - 4);
        this.posture = "right";
    }
    //保持中间姿势
    drawStatic = (newX) => {
        const windowY = this.props.windowY * 0.5;
        //绘制静止的小人
        this.ctx.arc(newX, windowY - 50, 10, 0, 2 * Math.PI, true);
        this.ctx.moveTo(newX, windowY - 40);
        this.ctx.lineTo(newX, windowY - 20);

        this.ctx.moveTo(newX, windowY - 40);
        this.ctx.lineTo(newX - 10, windowY - 22);

        this.ctx.moveTo(newX, windowY - 40);
        this.ctx.lineTo(newX + 10, windowY - 22);

        this.ctx.moveTo(newX, windowY - 20);
        this.ctx.lineTo(newX - 10, windowY - 4);

        this.ctx.moveTo(newX, windowY - 20);
        this.ctx.lineTo(newX + 10, windowY - 4);
        this.posture = "static";
    }
    //生成小球
    createBall = () => {
        
        const r = Math.random() * 10 + 10;
        const x = Math.random() * (this.props.windowX * 0.5 - 2 * r) + r
        const y = Math.random() * (this.props.windowY * 0.5 - 2 * r) + r;
        const xSpeed = Math.random() + 2;
        const ySpeed = Math.random() + 2;
        const newBall = {
            x: x,
            r: r,
            y: y,
            xSpeed: xSpeed,
            ySpeed: ySpeed,
            ballXDirection: true
        }
        return newBall;
    }
    render() {
        const windowX = this.props.windowX;
        const windowY = this.props.windowY;
        return (
            <div className="gameCanvas" style={{ width: windowX, height: windowY }}>
                <canvas id="frontCanvas" width={windowX * 0.5} height={windowY * 0.5}></canvas>
                <button onClick={this.startAgain} style={{display:this.state.startBtn,width:this.props.windowX*0.1,height:this.props.windowY*0.1}} className='startBtn'>开始</button>
                <Link className="indexBtn"  to="/index" >进入主页</Link>
            </div>
        )
    }
}