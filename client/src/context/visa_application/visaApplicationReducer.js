import { STEP_1, STEP_2, STEP_3, SAVE_STEP, SAVE_TO_DB } from "../types";
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
          passportNumber: state.passportNumber
        }
      };
    case SAVE_TO_DB:
      return {
        ...state,
        full_application: {
          firstName: state.firstName,
          lastName: state.lastName,
          destination: state.destination,
          passportNumber: state.passportNumber
        },
        saved: true
      };

    default:
      return state;
  }
};
