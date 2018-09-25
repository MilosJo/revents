import React from "react";
import { Grid, Segment, Header, List, Item, Icon } from "semantic-ui-react";
import format from "date-fns/format";

const UserDetailedDescription = ({ profile }) => {
  let dateCreated;
  if (profile.createdAt) {
    dateCreated = format(profile.createdAt.toDate(), "DD MMMM YYYY");
  }
  return (
    <Grid.Column width={12}>
      <Segment>
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Header icon="smile" content={`About ${profile.displayName}`} />
            <p>
              I am a: <strong>{profile.occupation || 'tbn'}</strong>
            </p>
            <p>
              Originally from: <strong>{profile.origin || 'tbn'}</strong>
            </p>
            {profile.createdAt && (
              <p>
                Member Since: <strong>{dateCreated}</strong>
              </p>
            )}
            <p>{profile.about}</p>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header icon="heart outline" content="Interests" />
            <List>
              {profile.interests
                ? profile.interests.map((interest, index) => {
                    return (
                      <Item key={index}>
                        <Icon name="heart" />
                        <Item.Content>{interest}</Item.Content>
                      </Item>
                    );
                  })
                : "No interests"}
            </List>
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedDescription;
