import React, { Component } from "react";
import { Comment } from "semantic-ui-react";
import EventDetailedChatForm from "./EventDetailedChatForm";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import { Link } from "react-router-dom";
import Loop from "../../../app/common/util/Loop";

class EventDetailedCommentWithChildren extends Component {
  render() {
    const {
      comment,
      showReplyForm,
      handleCloseReplyForm,
      handleOpenReplyForm,
      selectedCommentId,
      addEventComment,
      eventId
    } = this.props;
    return (
      <Comment key={comment.id}>
        <Comment.Avatar src={comment.photoURL} />
        <Comment.Content>
          <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
            {comment.displayName}
          </Comment.Author>
          <Comment.Metadata>
            <Loop every="1min">
              <div>
                {distanceInWordsToNow(comment.date, {
                  addSuffix: true
                })}
              </div>
            </Loop>
          </Comment.Metadata>
          <Comment.Text>{comment.text}</Comment.Text>
          <Comment.Actions>
            <Comment.Action onClick={handleOpenReplyForm(comment.id)}>
              Reply
            </Comment.Action>
            {showReplyForm &&
              selectedCommentId === comment.id && (
                <EventDetailedChatForm
                  addEventComment={addEventComment}
                  eventId={eventId}
                  form={`reply_${comment.id}`}
                  closeForm={handleCloseReplyForm}
                  parentId={comment.id}
                />
              )}
          </Comment.Actions>
        </Comment.Content>
        <Comment.Group>
          {comment.childNodes &&
            comment.childNodes.map(child => (
              <EventDetailedCommentWithChildren
                key={child.id}
                comment={child}
                showReplyForm={showReplyForm}
                selectedCommentId={selectedCommentId}
                addEventComment={addEventComment}
                eventId={eventId}
                handleOpenReplyForm={handleOpenReplyForm}
                handleCloseReplyForm={handleCloseReplyForm}
              />
            ))}
        </Comment.Group>
      </Comment>
    );
  }
}

export default EventDetailedCommentWithChildren;
