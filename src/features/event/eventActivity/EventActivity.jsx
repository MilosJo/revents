import React from "react";
import { Header, Segment } from "semantic-ui-react";

const eventActivity = () => {
  return (
    <div>
      <Header attached="top" content="Recent Acivity" />
      <Segment attached>
        <p>Recent activity</p>
      </Segment>
    </div>
  );
};

export default eventActivity;
