import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import TextArea from "../../../app/common/form/TextArea";
import { reduxForm, Field } from "redux-form";

class EventDetailedChatForm extends Component {
  handleCommentSubmit = values => {
    const { addEventComment, eventId, reset, closeForm, parentId } = this.props;
    addEventComment(eventId, values, parentId);
    reset();
    if (parentId !== 0) {
      closeForm();
    }
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.handleCommentSubmit)}>
        <Field type="text" name="comment" component={TextArea} rows="2" />
        <Button
          content="Add Reply"
          labelPosition="left"
          icon="edit"
          primary
          type="submit"
        />
      </Form>
    );
  }
}

export default reduxForm({ Fields: "comment" })(EventDetailedChatForm);
