import React from 'react';
import ReactDOM from 'react-dom';

export default class EditArea1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spanList: [{
                class: 'default',
                child: []
            }]
        }
        this.stanum = 1;
    }

    componentDidMount() {
    }
    //判断是否要添加标记
    judgeStyle=(code)=>{
        let tag="";
        if(code=='-'){
            const pNode=getSelection().anchorNode.parentNode.innerText.split('-');
            pNode.pop();
            pNode.every((pn,index)=>{
                console.log(tag);
                if(pn=="")  {
                     tag=tag=="hr"?tag:"h2";
                     return true;
                    }
                else if(pn==" "||pn=="   "||pn=="  ") {
                     tag="hr";
                     return true;
                    }
                else{
                    tag="normal";
                    return false;
                };
            })
            return tag;
        }
    }
    //判断是否是代码块
    judgeCode=()=>{

    }
    handleContent = (e) => {
        if (e.keyCode == '8') {
            if (this._editor.innerHTML == "<br>" || this._editor.innerHTML == "") {
                this.setState({
                    spanList: [{
                        class: `default  ${"cls" + this.stanum++}`,
                        child: []
                    }]
                })
            }
        }
        else if (e.keyCode == '13') {
            e.target.lastChild.className="li";
            const appDiv=<p class="default"></p>
        }
        else{
            //输入为-
            if(e.keyCode=='189'||e.keyCode=='229'){
                const currentCls=this.judgeStyle('-')+"cls";
                getSelection().anchorNode.parentNode.className=currentCls;

            }
            //输入为*
            if(e.keyCode=='56'){
                this.judgeStyle('*')
            }
            //输入为=
            if(e.keyCode=='187'){
                this.judgeStyle('=') 
            }
            //输入为~，判断是否为代码块
            if(e.keyCode=='192'){
                this.judgeCode()
            }
            //输入为>,判断是否为引用
            if(e.keyCode=='190'){
                this.judgeTitle()
            }
        }

    }
    render() {
        const contentList = this.state.spanList.map((s, index) => {
            return `<p class=${s.class}><br></p>`
        })
        return (
            <div>
                <div className='editArea' contentEditable="true"
                    onKeyUp={this.handleContent}
                    ref={editorDiv => this._editor = editorDiv}
                    dangerouslySetInnerHTML={{ __html: `${contentList}` }}>

                </div>
                <div ref={edit => this._edit = edit} className='123'></div>
            </div>
        )
    }
}