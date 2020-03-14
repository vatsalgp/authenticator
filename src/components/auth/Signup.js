import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signup } from "../../actions";
import Form from "../Form";

const Signup = props => {

    const onSubmit = formProps => {
        props.signup(formProps, () => {
            props.history.push("/feature");
        });
    }

    return (
        <Form
            buttonText="Sign Up"
            onSubmit={props.handleSubmit(onSubmit)}
            errorMessage={props.errorMessage}
        />);
}

const mapStateToProps = state => {
    return { errorMessage: state.auth.errorMessage };
};

const SignForm = reduxForm({ form: "signup" })(Signup);
export default connect(mapStateToProps, { signup })(SignForm);
