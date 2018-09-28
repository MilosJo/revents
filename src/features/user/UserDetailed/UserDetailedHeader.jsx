import React from "react";
import { Grid, Segment, Item, Header } from "semantic-ui-react";
import differenceInYears from "date-fns/difference_in_years";
import moment from "moment";

const UserDetailedHeader = ({ profile }) => {
  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              avatar
              size="small"
              src={profile.photoURL || "/assets/user.png"}
            />
            <Item.Content verticalAlign="bottom">
              <Header as="h1">{profile.displayName}</Header>
              <br />
              <Header as="h3">{profile.occupation}</Header>
              <br />
              <Header as="h3">
                {profile.dateOfBirth
                  ? differenceInYears(moment(), moment(profile.dateOfBirth).toDate())
                  : "Unknown age"}
                {", "}
                Lives in {profile.city || "Unknown city"},{" "}
                {profile.origin || "from Unknown place"}
              </Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedHeader;