import React from 'react';
import {Link} from 'react-router-dom';

export default class Ulmenu extends React.Component{
    render(){
        return (
            <ul>
                <li><Link to='/index/compress'>在线压缩</Link></li>            
            </ul>
        )
    }
}