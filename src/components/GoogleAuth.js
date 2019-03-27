import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId:'65197302808-4eqp94kpodled6tecpgnsgc6t5ug7cv3.apps.googleusercontent.com',
                scope: 'email'
            },).then(() => {
                //You can now reference this.auth anywhere in your component
                this.auth = window.gapi.auth2.getAuthInstance();
                //We are updating component level state, to rerender page.
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }
    //On auth change
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId(),this.auth.currentUser.get().getBasicProfile().getName());
        } else {
            this.props.signOut();
        }
    }
    //dont realllllly need this     
    onSignInClick = () => {
       this.auth.signIn(); 
    }
    //dont realllllly need this 
    onSignOutClick = () => {
        this.auth.signOut();
    }

    //Helper method 
    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null
        }
        else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign In with Google
                </button>
            )
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn};
};

export default connect(
    mapStateToProps,
    { signIn , signOut },
    )(GoogleAuth);