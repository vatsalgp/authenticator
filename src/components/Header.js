import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends React.Component {
    renderLinks() {
        if (this.props.authenticated) return (
            <>
                <Link to="/feature" className="item ui header">Feature</Link>
                <Link to="/signout" className="item ui header">Sign Out</Link>
            </>
        );
        else return (
            <>
                <Link to="/signup" className="item ui header">Sign Up</Link>
                <Link to="/signin" className="item ui header">Sign In</Link>
            </>
        );
    }
    render() {
        return (
            <div className="ui secondary pointing menu">
                <div className="left menu">
                    <Link to="/" className="item ui header">Authenticator</Link>
                </div>
                <div className="right menu">
                    {this.renderLinks()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { authenticated: state.auth.authenticated }
};

export default connect(mapStateToProps)(Header);