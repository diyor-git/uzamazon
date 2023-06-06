//Action Type
import { accountAPI } from "../api/api";

const SET_LOGIN = "kadabra/profileReducer/SET_LOGIN";
const SET_STATUS = "kadabra/profileReducer/SET_STATUS";
const SET_TOKEN = "kadabra/profileReducer/SET_TOKEN";
const SET_PROFILE = "kadabra/profileReducer/SET_PROFILE";
const SET_ERROR = "kadabra/profileReducer/SET_ERROR";
const SET_PASSWORD_RESET_STATE =
  "kadabra/profileReducer/SET_PASSWORD_RESET_STATE";
const SET_PROFILE_CHANGE_STATE =
  "kadabra/profileReducer/SET_PROFILE_CHANGE_STATE";
const SET_PHOTO = "kadabra/profileReducer/SET_PHOTO";

let initialState = {
  login: "",
  id: "",
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  error: "",
  passwordResetState: "",
  profileChangeState: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case SET_STATUS:
      return {
        ...state,
        login: {
          ...state.login,
          sent_request: action.status.sent_request,
          verified: action.status.verified,
        },
      };
    case SET_TOKEN:
      return {
        ...state,
        login: { ...state.login, token: action.token },
      };
    case SET_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case SET_PASSWORD_RESET_STATE:
      return {
        ...state,
        passwordResetState: action.passwordResetState,
      };
    case SET_PROFILE_CHANGE_STATE:
      return {
        ...state,
        profileChangeState: action.profileChangeState,
      };
    case SET_PHOTO:
      return { ...state, profile: { ...state.profile, avatar: action.photo } };
    default:
      return state;
  }
};

//Action Creators
export let setLogin = (data) => ({
  type: SET_LOGIN,
  payload: { ...data },
});

export let setToken = () => ({
  type: SET_TOKEN,
  token: localStorage.getItem("Token"),
});

let setStatus = (status) => ({
  type: SET_STATUS,
  status,
});

let setProfile = (data) => ({
  type: SET_PROFILE,
  payload: { ...data },
});

let setError = (error) => ({
  type: SET_ERROR,
  error,
});

let setPasswordResetState = (passwordResetState) => ({
  type: SET_PASSWORD_RESET_STATE,
  passwordResetState,
});

let setProfileChangeState = (profileChangeState) => ({
  type: SET_PROFILE_CHANGE_STATE,
  profileChangeState,
});
const setPhoto = (photo) => ({ type: SET_PHOTO, photo });

//Thunk
// export let registerAcc = (registerData) => async (dispatch) => {
//     let {data, error} = await accountAPI.registerAcc(registerData)
//     return {data, error}
// }

export let getLogin = (userData) => async (dispatch) => {
  let { data, error } = await accountAPI.getLogin(userData);
  if (data) {
    localStorage.setItem("Sent_Request", data.sent_request);
    localStorage.setItem("Verified", data.verified);
    dispatch(setLogin(data));
  } else {
    dispatch(setError(error));
  }
  return data;
};

export let tokenAcc = (code) => async (dispatch) => {
  let data = await accountAPI.tokenAcc(code);
  let error;
  if (data.token) {
    dispatch(setLogin(data.token));
  } else {
    error = data;
  }
  return { data, error };
};

export let cleanError = () => async (dispatch) => {
  dispatch(setError(""));
};

export let getProfile = () => async (dispatch) => {
  let data = await accountAPI.getProfile();
  dispatch(setProfile(data));
};

export let getStatus = () => async (dispatch) => {
  let data = await accountAPI.getStatus();
  dispatch(setStatus(data));
};

export let putProfile = (profileData) => async (dispatch) => {
  let data = await accountAPI.putProfile(profileData);
  return data;
};

export let deleteProfile = () => async (dispatch) => {
  let data = await accountAPI.deleteProfile();
  dispatch(logOut());
  return data;
};

export let putPassword = (passwordData) => async (dispatch) => {
  let data = await accountAPI.putPassword(passwordData);
  dispatch(setProfileChangeState(data));
};

export let cleanPasswordReset = () => async (dispatch) => {
  dispatch(setPasswordResetState(""));
};
export let postPasswordReset = (passwordResetState) => async (dispatch) => {
  let data = await accountAPI.postPasswordReset(passwordResetState);
  dispatch(setPasswordResetState(data));
};

export let postPasswordResetCode = (code) => async (dispatch) => {
  let data = await accountAPI.postPasswordResetCode(code);
  dispatch(setPasswordResetState(data.data));
};

export let postSetPasswordReset = (newPasswords) => async (dispatch) => {
  let data = await accountAPI.postSetPasswordReset(newPasswords);
  dispatch(setPasswordResetState(data));
};

export let logOut = () => async (dispatch) => {
  dispatch(setLogin(""));
  localStorage.removeItem("Token");
};

export const setPhotoProfile = (file) => async (dispatch) => {
  let data = await accountAPI.setPhoto(file);
  return data;
};

export default profileReducer;
