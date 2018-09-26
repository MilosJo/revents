import moment from "moment";
import cuid from "cuid";
import { toastr } from "react-redux-toastr";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";

export const updateProfile = user => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const { isLoaded, isEmpty, onBlur, ...updatedUser } = user;

    if (updatedUser.dateOfBirth && updatedUser.dateOfBirth._isAMomentObject) {
      updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
    }

    try {
      await firebase.updateProfile(updatedUser);
      toastr.success("Success", "Profile updated");
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProfileImage = (file, fileName) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const imageName = cuid();
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const path = `${user.uid}/user_images`;
    const options = {
      name: imageName
    };
    try {
      dispatch(asyncActionStart());
      // Upload the file to firebase storage
      let uploadedFile = await firebase.uploadFile(path, file, null, options);
      // Get url of image
      let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
      console.log({ downloadURL });
      // Get userdoc
      let userDoc = await firestore.get(`users/${user.uid}`);
      // Check if the user has photo, if not update the profile with the new image
      if (!userDoc.data().photoURL) {
        await firebase.updateProfile({
          photoURL: downloadURL
        });

        await user.updateProfile({
          photoURL: downloadURL
        });
      }
      // Add the new photo to collection
      await firestore.add(
        {
          collection: "users",
          doc: user.uid,
          subcollections: [{ collection: "photos" }]
        },
        {
          name: imageName,
          url: downloadURL
        }
      );
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      throw new Error("Problem uploading photo");
    }
  };
};

export const deletePhoto = photo => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    try {
      await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
      await firestore.delete({
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos", doc: photo.id }]
      });
    } catch (error) {
      console.log(error);
      throw new Error("Photo could not be deleted");
    }
  };
};

export const setMainPhoto = photo => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      return await firebase.updateProfile({
        photoURL: photo.url
      });
    } catch (error) {
      console.log(error);
      throw new Error("Problem changing them main photo");
    }
  };
};

export const goingToEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const attendee = {
      going: true,
      photoURL: photoURL || '/assets/user.png',
      displayName: user.displayName,
      host: false,
      joinDate: Date.now()
    };
    try {
      await firestore.update(`events/${event.id}`, {
        [`attendees.${user.uid}`]: attendee
      });
      await firestore.set(`events_attendee/${event.id}_${user.id}`, {
        eventDate: event.date,
        eventId: event.id,
        host: false,
        userUid: user.uid
      });
      toastr.success('Success', 'You are going to this event')
    } catch (error) {
      console.error(error);
      toastr.error("Oops", "Problem signing up to the event");
    }
  };
};

export const cancelGoingToEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    try {
      await firestore.update(`events/${event.id}`, {
        [`attendees.${user.uid}`]: firestore.FieldValue.delete()
      });
      await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
      toastr.success("Success", "You have successfuly removed yourself from this event");
    } catch (error) {
      console.error(error);
      toastr.error("Oops", "Something went wrong");
    }
  };
};
