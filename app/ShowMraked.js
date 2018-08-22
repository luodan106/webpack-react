import React from 'react';

export default class ShowMraked extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
                <div className='transferArea'
                dangerouslySetInnerHTML={{ __html: `${this.props.value}` }}>
                </div>
        )
    }
}