import React, { useReducer } from "react";
import VisaApplicationContext from "./visaApplicationContext";
import VisaApplicationReducer from "./visaApplicationReducer";
import axios from "axios";
// import setAuthToken from "../../utils/setAuthToken";

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
  UNSET_LOADING,
  ADD_ERROR,
  CLEAR_ERROR,
  SET_FINISHED_APPLICATION,
  GET_SINGLE_APP,
  GET_SINGLE_APP_ERROR,
  DESTROY_ALL_STATE,
  GET_ALL_APP
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
    visaApplicationErrs: [],
    allApplications: [],
    saved: false,
    finished: null,
    notFound: false
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
      dispatch({ type: CLEAR_ERROR });
      if (state.full_application !== null) {
        for (let key in state.full_application) {
          if (
            typeof state.full_application[key] === "string" &&
            isEmpty(state.full_application[key])
          ) {
            canSave = false;

            dispatch({ type: ADD_ERROR, payload: `${key}` });
          }
        }
      } else {
        dispatch({ type: ADD_ERROR, payload: "fillAll" });
      }

      //loop thru and checks if none of the state is empty
    }
    // state.saved === false
    if (canSave) {
      try {
        const res = await axios.post(
          "/api/visa_application",
          completeApplicationObj,
          config
        );
        dispatch({ type: SAVE_TO_DB });
        if (status.status === "finished") {
          dispatch({ type: SET_FINISHED_APPLICATION });
        }
      } catch (err) {
        console.error(JSON.stringify(err.response.data.msg));

        // dispatch({ type: CONTACT_ERROR, payload: err.response.data });
      }
    }

    unsetLoading();
  };

  const getSingleVisaAppById = async (visaAppId, theSource) => {
    try {
      const res = await axios.get(
        `/api/visa_application/singlevisa/${visaAppId}`
      );
      if (res.data.status === "unfinished") {
        if (theSource === "rawUrl") {
          dispatch({ type: GET_SINGLE_APP, payload: res.data });
        } else if (theSource === "allApplications") {
          dispatch({ type: GET_SINGLE_APP_ERROR, payload: "" });
        }
      } else if (res.data.status === "finished") {
        if (theSource === "allApplications") {
          dispatch({ type: GET_SINGLE_APP, payload: res.data });
        } else if (theSource === "rawUrl") {
          dispatch({ type: GET_SINGLE_APP_ERROR, payload: "" });
        }
        // display fully submitted visa (no edit).
      }
    } catch (err) {
      dispatch({ type: GET_SINGLE_APP_ERROR, payload: err.response.data.msg });
    }
  };

  const getAllVisaApp = async () => {
    setLoading();
    try {
      const res = await axios.get(`/api/visa_application/visas`);
      dispatch({ type: GET_ALL_APP, payload: res.data });
    } catch (err) {
      dispatch({ type: GET_SINGLE_APP_ERROR, payload: err.response.data.msg });
      //go to 404..?
    }
  };

  const setApplicationIdToState = appId => {
    dispatch({ type: SET_APPID, payload: appId });
  };

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const destroyAllState = () => {
    dispatch({ type: DESTROY_ALL_STATE });
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
        visaApplicationErrs: state.visaApplicationErrs,
        finished: state.finished,
        notFound: state.notFound,
        allApplications: state.allApplications,
        setApplicationToState,
        saveToDb,
        saveStep,
        getAllVisaApp,
        getSingleVisaAppById,
        unsaveWhileTyping,
        setApplicationIdToState,
        destroyAllState
      }}
    >
      {props.children}
    </VisaApplicationContext.Provider>
  );
};

export default VisaApplicationState;
