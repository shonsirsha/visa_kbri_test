import React, { useReducer } from "react";
import VisaApplicationContext from "./visaApplicationContext";
import VisaApplicationReducer from "./visaApplicationReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

import isEmpty from "../../utils/isEmpty";

import {
  STEP_1,
  STEP_2,
  STEP_3,
  SAVE_STEP,
  SAVE_TO_DB,
  UNSAVE_WHILE_TYPING,
  SET_LOADING,
  SET_APPID,
  UNSET_LOADING
} from "../types";

const VisaApplicationState = props => {
  const initialState = {
    full_application: null,
    loading: false,
    appId: "",
    firstName: "",
    lastName: "",
    destination: "",
    passportNumber: "",
    saved: false
  };

  const [state, dispatch] = useReducer(VisaApplicationReducer, initialState);

  const setApplicationToState = (application, stepNum) => {
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

  const saveToDb = async status => {
    setLoading();

    let canSave = true;

    const completeApplicationObj = { ...state.full_application, ...status };

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (status.status === "finished") {
      for (let key in state.full_application) {
        if (
          typeof state.full_application[key] === "string" &&
          isEmpty(state.full_application[key])
        ) {
          canSave = false;
          console.error(key + " is empty.");
        }
      }
      //loop thru and checks if none of the state is empty
    }

    if (state.saved === false && canSave === true) {
      try {
        const res = await axios.post(
          "/api/visa_application",
          completeApplicationObj,
          config
        );
        dispatch({ type: SAVE_TO_DB, payload: res.data });
      } catch (err) {
        console.log(err.response.data);
        // dispatch({ type: CONTACT_ERROR, payload: err.response.data });
      }
    }

    unsetLoading();
  };

  const setApplicationIdToState = appId => {
    dispatch({ type: SET_APPID, payload: appId });
  };

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const unsetLoading = () => {
    dispatch({ type: UNSET_LOADING });
  };

  const saveStep = () => {
    dispatch({ type: SAVE_STEP });
  };

  return (
    <VisaApplicationContext.Provider
      value={{
        appId: state.appId,
        firstName: state.firstName,
        lastName: state.lastName,
        destination: state.destination,
        passportNumber: state.passportNumber,
        saved: state.saved,
        loading: state.loading,
        setApplicationToState,
        saveToDb,
        saveStep,
        unsaveWhileTyping,
        setApplicationIdToState
      }}
    >
      {props.children}
    </VisaApplicationContext.Provider>
  );
};

export default VisaApplicationState;
