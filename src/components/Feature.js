import React from "react";
import requireAuth from "./requireAuth";

const Feature = () => (
    <h1 className="ui header">Protected Feature</h1>
);

export default requireAuth(Feature);