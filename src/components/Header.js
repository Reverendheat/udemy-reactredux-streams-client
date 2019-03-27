import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import GoogleAuth from './GoogleAuth';

class Header extends React.Component {
    //Helper method 
    renderWelcomeMessage() {
        if (this.props.isSignedIn === null) {
            return null
        }
        else if (this.props.isSignedIn) {
            return (
                <h4>StreamIt - Welcome {this.props.userName}!</h4>
            )
        } else {
            return (
                <h4>StreamIt!</h4>
            )
        }
    }
    render () {
        return (
            <div className="ui secondary pointing menu">
                <Link to="/" className="item" >
                    {this.renderWelcomeMessage()}
                </Link>
                <div className="right menu">
                    <Link to="/" className="item">
                        All Streams
                    </Link>
                    <GoogleAuth />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn:state.auth.isSignedIn ,userName: state.auth.userName};
};

export default connect(
    mapStateToProps)(Header);