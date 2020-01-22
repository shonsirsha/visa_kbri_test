import {
  STEP_1,
  STEP_2,
  STEP_3,
  SAVE_STEP,
  SAVE_TO_DB,
  UNSAVE_WHILE_TYPING,
  SET_LOADING,
  UNSET_LOADING,
  SET_APPID,
  ADD_ERROR,
  CLEAR_ERROR,
  SET_FINISHED_APPLICATION,
  GET_SINGLE_APP,
  GET_SINGLE_APP_ERROR,
  GET_ALL_APP,
  DESTROY_ALL_STATE
} from "../types";
export default (state, action) => {
  switch (action.type) {
    case STEP_1:
      return {
        ...state,
        saved: false,
        finished: false,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName
      };
    case STEP_2:
      return {
        ...state,
        saved: false,
        finished: false,
        destination: action.payload.destination
      };
    case STEP_3:
      return {
        ...state,
        saved: false,
        finished: false,
        passportNumber: action.payload.passportNumber
      };

    case SAVE_STEP:
      return {
        ...state,
        saved: false,
        finished: false,
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
        finished: false,
        saved: true
      };
    case UNSAVE_WHILE_TYPING:
      return {
        ...state,
        finished: false,
        saved: false
      };
    case SET_FINISHED_APPLICATION: {
      return {
        ...state,
        finished: true
      };
    }
    case SET_APPID:
      return {
        ...state,
        appId: action.payload
      };

    case GET_SINGLE_APP:
      const {
        firstName,
        lastName,
        destination,
        passportNumber
      } = action.payload;
      return {
        ...state,
        full_application: action.payload,
        firstName: firstName,
        lastName: lastName,
        destination: destination,
        passportNumber: passportNumber
      };
    case DESTROY_ALL_STATE:
      return {
        ...state,
        full_application: null,
        loading: false,
        appId: "",
        firstName: "",
        lastName: "",
        destination: "",
        passportNumber: "",
        allApplications: [],
        visaApplicationErrs: [],
        saved: false,
        finished: null,
        notFound: false
      };
    case GET_SINGLE_APP_ERROR:
      return {
        ...state,
        notFound: true
      };
    case GET_ALL_APP:
      return {
        ...state,
        allApplications: action.payload,
        loading: false
      };
    case ADD_ERROR:
      return {
        ...state,
        visaApplicationErrs: [action.payload, ...state.visaApplicationErrs]
      };
    case CLEAR_ERROR:
      return {
        ...state,
        visaApplicationErrs: []
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
