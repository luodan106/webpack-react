import React from 'react';
import Ulmenu from './Ulmenu';

export default class Home extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <React.Fragment>
                <Ulmenu></Ulmenu>
            </React.Fragment>
        )
    }
}