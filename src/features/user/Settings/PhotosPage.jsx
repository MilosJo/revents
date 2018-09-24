import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import {
  Image,
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card,
  Icon
} from "semantic-ui-react";
import Dropzone from "react-dropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { updateProfileImage, deletePhoto, setMainPhoto } from "../userActions";
import { toastr } from "react-redux-toastr";

const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos"
    }
  ];
};

const mapState = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    photos: state.firestore.ordered.photos,
    loading: state.async.loading
  };
};

const actions = {
  updateProfileImage,
  deletePhoto,
  setMainPhoto
};

class PhotosPage extends Component {
  state = {
    files: [],
    fileName: "",
    cropResult: null,
    image: {}
  };

  updateImage = async () => {
    try {
      await this.props.updateProfileImage(
        this.state.image,
        this.state.fileName
      );
      this.cancelCrop();
      toastr.success("Success", "Photo has been uploaded");
    } catch (error) {
      toastr.error("Error", error.message);
    }
  };

  handleDeletePhoto = photo => async () => {
    try {
      this.props.deletePhoto(photo);
    } catch (error) {
      toastr.error("Oops", error.messsage);
    }
  };

  handleSetMainPhoto = photo => async () => {
    try {
      this.props.setMainPhoto(photo);
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  cancelCrop = () => {
    this.setState({
      files: [],
      fileName: ""
    });
  };

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === "undefined") {
      return;
    }
    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imgUrl = URL.createObjectURL(blob);
      this.setState({
        cropResult: imgUrl,
        image: blob
      });
    }, "image/jpeg");
  };

  onDrop = files => {
    this.setState({
      files,
      fileName: files[0].name
    });
  };

  render() {
    const { photos, profile, loading } = this.props;
    let filteredPhotos;
    if (photos) {
      filteredPhotos = photos.filter(photo => {
        return photo.url !== profile.photoURL;
      });
    }
    return (
      <Segment>
        <Header dividing size="large" content="Your Photos" />
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="teal" sub content="Step 1 - Add Photo" />
            <Dropzone onDrop={this.onDrop} multiple={false}>
              <div style={{ marginTop: "30px", textAlign: "center" }}>
                <Icon name="upload" size="huge" />
                <Header content="Drop your image here or click to add" />
              </div>
            </Dropzone>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 2 - Resize image" />
            {this.state.files[0] && (
              <Cropper
                style={{ height: 200, width: "100%" }}
                ref="cropper"
                src={this.state.files[0].preview}
                crop={this.cropImage}
                aspectRatio={1}
                viewMode={0}
                dragMode="move"
                guides={true}
                scalable={false}
                cropBoxMovable={true}
                cropBoxResizable={true}
              />
            )}
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 3 - Preview and Upload" />
            {this.state.files[0] && (
              <div>
                <Image
                  style={{ minWidth: "200px", minHeight: "200px" }}
                  src={this.state.cropResult}
                />
                <Button.Group>
                  <Button
                    loading={loading}
                    onClick={this.updateImage}
                    style={{ width: "100px" }}
                    positive
                    icon="check"
                  />
                  <Button
                    disabled={loading}
                    onClick={this.cancelCrop}
                    style={{ width: "100px" }}
                    icon="close"
                  />
                </Button.Group>
              </div>
            )}
          </Grid.Column>
        </Grid>

        <Divider />
        <Header sub color="teal" content="All Photos" />

        <Card.Group itemsPerRow={5}>
          <Card>
            <Image src={profile.photoURL || "/assets/user.png"} />
            <Button positive>Main Photo</Button>
          </Card>
          {photos &&
            filteredPhotos.map(photo => {
              return (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  <div className="ui two buttons">
                    <Button
                      onClick={this.handleSetMainPhoto(photo)}
                      basic
                      color="green"
                    >
                      Main
                    </Button>
                    <Button
                      onClick={this.handleDeletePhoto(photo)}
                      basic
                      icon="trash"
                      color="red"
                    />
                  </div>
                </Card>
              );
            })}
        </Card.Group>
      </Segment>
    );
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect(auth => query(auth))
)(PhotosPage);
