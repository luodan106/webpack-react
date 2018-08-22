import React from 'react';
import marked from 'marked';
import ShowMraked from './ShowMraked';

export default class EditArea extends React.Component{
    constructor(props){
        super(props);
        this.state={
            editContent:""
        }
    }
    handleContent=(e)=>{
        this.setState({
            editContent:marked(e.target.innerText, {breaks: true})
        })
    }
    render() {
        const contentList = <p class='default'></p>
        return (
            <div>
                <div className='editArea' contentEditable="true"
                    onKeyUp={this.handleContent}
                    ref={editorDiv => this._editor = editorDiv}>

                </div>
                <ShowMraked value={this.state.editContent}/>
            </div> 
        )
    }
}