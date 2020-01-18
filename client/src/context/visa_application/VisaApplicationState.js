import React, { useReducer } from "react";
import VisaApplicationContext from "./visaApplicationContext";
import VisaApplicationReducer from "./visaApplicationReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

import {
  STEP_1,
  STEP_2,
  STEP_3,
  SAVE_STEP,
  SAVE_TO_DB,
  UNSAVE_WHILE_TYPING,
  SET_LOADING
} from "../types";

const VisaApplicationState = props => {
  const initialState = {
    full_application: null,
    loading: false,
    firstName: "",
    lastName: "",
    destination: "",
    passportNumber: "",
    saved: false
  };

  const [state, dispatch] = useReducer(VisaApplicationReducer, initialState);

  const setApplicationToState = (application, stepNum) => {
    setLoading();
    if (stepNum === 1) {
      dispatch({ type: STEP_1, payload: application });
    } else if (stepNum === 2) {
      dispatch({ type: STEP_2, payload: application });
    } else if (stepNum === 3) {
      dispatch({ type: STEP_3, payload: application });
    }
    saveStep();
  };

  const unsaveWhileTyping = () => {
    dispatch({ type: UNSAVE_WHILE_TYPING });
  };

  const saveStep = () => {
    dispatch({ type: SAVE_STEP });
  };

  const saveToDb = () => {
    //save to DB here
    console.log(state.full_application);
    //updates 'saved' to frontend by updating saved state to true.
    dispatch({ type: SAVE_TO_DB });
  };

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <VisaApplicationContext.Provider
      value={{
        firstName: state.firstName,
        lastName: state.lastName,
        destination: state.destination,
        passportNumber: state.passportNumber,
        saved: state.saved,
        loading: state.loading,
        setApplicationToState,
        saveToDb,
        unsaveWhileTyping
      }}
    >
      {props.children}
    </VisaApplicationContext.Provider>
  );
};

export default VisaApplicationState;
