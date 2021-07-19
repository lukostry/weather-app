import { Action } from "types";

export type Error = { message: string } | null;

export interface State {
  error: Error | null;
}

export function reducer(state: State, action: Action<Error>): State {
  switch (action.type) {
    case "SET_ERROR":
      return {
        error: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        error: null,
      };
    default:
      return {
        error: null,
      };
  }
}
