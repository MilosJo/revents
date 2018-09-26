import React from "react";
import { Grid, Segment, Header, Image } from "semantic-ui-react";
import LazyLoad from "react-lazyload";

const UserDetailedPhotos = ({ photos }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached>
        <Header icon="image" content="Photos" />
        {photos && photos.length > 1 ? (
          <Image.Group size="small">
            {photos.map(photo => {
              return (
                <LazyLoad key={photo.id} height={150} placeholder={<Image src='/assets/user.png' />}>
                  <Image src={photo.url} />
                </LazyLoad>
              );
            })}
          </Image.Group>
        ) : (
          <p>No photos uploaded</p>
        )}
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedPhotos;
