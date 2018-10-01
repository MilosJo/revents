import React, { Component } from "react";
import { Segment, Header, Comment } from "semantic-ui-react";
import EventDetailedChatForm from "./EventDetailedChatForm";
import { createDataTree } from "../../../app/common/util/helpers";
import EventDetailedCommentWithChildren from './EventDetailedCommentWithChildren';
 
class EventDetailedChat extends Component {
  state = {
    showReplyForm: false,
    selectedCommentId: null
  };

  handleOpenReplyForm = id => () => {
    this.setState({
      showReplyForm: true,
      selectedCommentId: id
    });
  };

  handleCloseReplyForm = () => {
    this.setState({
      showReplyForm: false,
      selectedCommentId: null
    });
  };

  render() {
    const { addEventComment, eventId, eventChat } = this.props;
    const { showReplyForm, selectedCommentId } = this.state;
    return (
      <div>
        <Segment
          textAlign="center"
          attached="top"
          inverted
          color="teal"
          style={{ border: "none" }}
        >
          <Header>Chat about this event</Header>
        </Segment>
        <Segment attached>
          <Comment.Group>
            {eventChat &&
              createDataTree(eventChat).map(comment => (
                <EventDetailedCommentWithChildren 
                  key={comment.id}
                  comment={comment} 
                  showReplyForm={showReplyForm} 
                  selectedCommentId={selectedCommentId}
                  addEventComment={addEventComment}
                  eventId={eventId} 
                  handleOpenReplyForm={this.handleOpenReplyForm}
                  handleCloseReplyForm={this.handleCloseReplyForm}
                />
              ))}
          </Comment.Group>
          <EventDetailedChatForm
            addEventComment={addEventComment}
            eventId={eventId}
            form={"newComment"}
            parentId={0}
          />
        </Segment>
      </div>
    );
  }
}

export default EventDetailedChat;
