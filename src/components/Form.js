import React from "react";
import { Field } from "redux-form";

const Form = props => {

    const renderError = error => {
        if (error) {
            return (
                <div className="ui negative message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }

    return (
        <form onSubmit={props.onSubmit} className="ui form">
            <div className="field">
                <label htmlFor="email">Enter Email</label>
                <Field
                    component="input"
                    name="email"
                    id="email"
                    type="text"
                    autoComplete="off"
                />
            </div>
            <div className="field">
                <label htmlFor="password">Enter Password</label>
                <Field
                    component="input"
                    name="password"
                    id="password"
                    type="password"
                    autoComplete="off"
                />
            </div>
            <button className="ui button primary" >
                {props.buttonText}
            </button>
            {renderError(props.errorMessage)}
        </form >
    );
}

export default Form;