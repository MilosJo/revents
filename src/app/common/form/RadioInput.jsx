import React from "react";
import { Form } from "semantic-ui-react";

const RadioInput = ({ input, type, width, label }) => {
  return (
    <Form.Field>
      <div className="ui radio checkbox">
        <input type={type} {...input} /> 
        <label>{label}</label>
      </div>
    </Form.Field>
  );
};

export default RadioInput;
