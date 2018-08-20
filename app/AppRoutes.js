import React from 'react';
import {Route,HashRouter as Router} from 'react-router-dom';
import Index from './Index';
import Home from './Home';
import Compress from './Compress';

export default class AppRouters extends React.Component{
    render(){
        return (
            <Router>
                <div>
			       <Route exact path="/" component={Index}/>
			       <Route path="/index" component={Home}/>
			       <Route path="/index/compress" component={Compress}/>
                </div>
            </Router>
        )
    }
}