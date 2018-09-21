import moment from "moment";
import { toastr } from "react-redux-toastr";

export const updateProfile = user => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    // const { isLoaded, isEmpty, ...updatedUser } = user;
    
    // if (updatedUser.dateOfBirth && updatedUser.dateOfBirth._isAMomentObject) {
    //   updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate()
    // }
    // if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
    //   updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
    // }
    if(user.dateOfBirth) {
      console.log(user.dateOfBirth);
      user.dateOfBirth = moment(user.dateOfBirth).toDate();
      console.log(user.dateOfBirth);
    }
    
    try {
      await firebase.updateProfile(user);
      toastr.success("Success", "Profile updated");
    } catch (error) {
      console.log(error);
    }
  };
};


// moment.unix(yourUnixEpochTime).format('dddd, MMMM Do, YYYY h:mm:ss A')