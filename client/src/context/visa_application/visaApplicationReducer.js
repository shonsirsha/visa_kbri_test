import {
  STEP_1,
  STEP_2,
  STEP_3,
  SAVE_STEP,
  SAVE_TO_DB,
  UNSAVE_WHILE_TYPING,
  SET_LOADING,
  UNSET_LOADING,
  SET_APPID
} from "../types";
export default (state, action) => {
  switch (action.type) {
    case STEP_1:
      return {
        ...state,
        saved: false,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName
      };
    case STEP_2:
      return {
        ...state,
        destination: action.payload.destination
      };
    case STEP_3:
      return {
        ...state,
        saved: false,
        passportNumber: action.payload.passportNumber
      };

    case SAVE_STEP:
      return {
        ...state,
        saved: false,
        full_application: {
          firstName: state.firstName,
          lastName: state.lastName,
          destination: state.destination,
          passportNumber: state.passportNumber,
          appId: state.appId
        }
      };
    case SAVE_TO_DB:
      return {
        ...state,
        full_application: {
          firstName: state.firstName,
          lastName: state.lastName,
          destination: state.destination,
          passportNumber: state.passportNumber,
          appId: state.appId
        },
        saved: true
      };
    case UNSAVE_WHILE_TYPING:
      return {
        ...state,
        saved: false
      };
    case SET_APPID:
      return {
        ...state,
        appId: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };

    case UNSET_LOADING:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};
