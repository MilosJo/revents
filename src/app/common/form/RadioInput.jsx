import React from "react";
import { Form } from "semantic-ui-react";

const RadioInput = ({ input, type, id, width, label }) => {
  return (
    <Form.Field>
      <div className="ui radio checkbox">
        <input className="hidden" id={id} type={type} {...input} /> 
        <label htmlFor={id}>{label}</label>
      </div>
    </Form.Field>
  );
};

export default RadioInput;
