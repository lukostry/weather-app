import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { Action } from "types";

import { reducer, Error, State } from "./reducer";
import { useStyles } from "./styles";

const initialState: State = {
  error: null,
};

export const ErrorDispatch = React.createContext<
  ((value: Action<Error>) => void) | null
>(null);

export const NotificationOutlet: React.FC = ({ children }) => {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleClose = () => {
    dispatch({ type: "CLEAR_ERROR", payload: null });
  };

  return (
    <ErrorDispatch.Provider value={dispatch}>
      <div className={classes.root}>
        {children}
        <Snackbar
          autoHideDuration={3000}
          message={state?.error?.message}
          onClose={handleClose}
          open={Boolean(state?.error)}
        />
      </div>
    </ErrorDispatch.Provider>
  );
};
