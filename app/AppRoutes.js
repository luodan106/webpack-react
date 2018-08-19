import React from 'react';
import {Route,HashRouter as Router} from 'react-router-dom';
import Index from './Index';

export default class AppRouters extends React.Component{
    render(){
        return (
            <Router>
                <div>
			       <Route exact path="/" component={Index}/>
                </div>
            </Router>
        )
    }
}