import React from 'react';

export default class Compress extends React.Component{
    constructor(props){
        super(props);
        this.state={
            content:"",
            parseContent:""
        }
    }
    changeText=(event)=>{
        const target=event.target;
        const value=target.value;
        this.setState({
            content:value
        })
    }
    compress = () => {
        console.log(this.state.content);
        const content={content:this.state.content};
        fetch('/file/minify', {
            method: 'post',
            headers:{
                'Content-Type':'application/json'
                 },
            body:JSON.stringify(content)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    parseContent:data.data
                })
            })
            .catch((err) => {
                console.log("err:" + err);
            })
    }
    render(){
        return(
            <div>
                <textArea onChange={this.changeText}>{this.state.content}</textArea>
                <textArea>{this.state.parseContent}</textArea>   
                <button onClick={this.compress}>转换</button>

            </div>
        )
    }
}