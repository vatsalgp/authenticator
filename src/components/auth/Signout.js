import React from "react";
import { connect } from "react-redux";
import { signout } from "../../actions";

class Signout extends React.Component {

    componentDidMount() {
        this.props.signout();
    }

    render() {
        return <h1 className="ui header">Sorry to see you go !</h1>;
    }
}

export default connect(null, { signout })(Signout);