import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signin } from "../../actions";
import Form from "../Form";

const Signin = props => {

    const onSubmit = formProps => {
        props.signin(formProps, () => {
            props.history.push("/feature");
        });
    }

    return (
        <Form
            buttonText="Sign In"
            onSubmit={props.handleSubmit(onSubmit)}
            errorMessage={props.errorMessage}
        />
    );
}

const mapStateToProps = state => {
    return { errorMessage: state.auth.errorMessage };
};

const SignForm = reduxForm({ form: "signin" })(Signin);
export default connect(mapStateToProps, { signin })(SignForm);
