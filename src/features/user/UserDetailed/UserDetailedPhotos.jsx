import React from "react";
import { Grid, Segment, Header, Image } from 'semantic-ui-react'

const UserDetailedPhotos = ({photos}) => {
  return (
    <Grid.Column width={12}>
      <Segment attached>
        <Header icon="image" content="Photos" />
        {photos && photos.length > 1 ? (
          <Image.Group size="small">
            {photos.map(photo => {
              return <Image key={photo.id} src={photo.url} />;
            })}
          </Image.Group>
        ) : (<p>No photos uploaded</p>)}
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedPhotos;
