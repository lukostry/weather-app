import { Action, Loadable, Location } from "types";

export interface State {
  defaultLocations: Loadable<Location[]>;
  userLocation: Loadable<Location[]>;
}

// TODO: use enum for action types instead of raw strings
export function reducer(state: State, action: Action<Location[]>): State {
  switch (action.type) {
    case "FETCH_DEFAULT_LOCATIONS":
      return {
        defaultLocations: {
          data: [],
          loading: true,
        },
        userLocation: state.userLocation,
      };
    case "FETCHED_DEFAULT_LOCATIONS":
      return {
        defaultLocations: {
          data: action.payload as Location[],
          loading: false,
        },
        userLocation: state.userLocation,
      };
    case "FETCH_DEFAULT_LOCATIONS_ERROR":
      return {
        defaultLocations: {
          data: state.defaultLocations.data,
          loading: false,
        },
        userLocation: state.userLocation,
      };
    case "FETCH_USER_LOCATION":
      return {
        defaultLocations: state.defaultLocations,
        userLocation: {
          data: state.userLocation.data,
          loading: true,
        },
      };
    case "FETCH_USER_LOCATION_ERROR":
      return {
        defaultLocations: state.defaultLocations,
        userLocation: {
          data: state.userLocation.data,
          loading: false,
        },
      };
    case "FETCHED_USER_LOCATION":
      return {
        defaultLocations: state.defaultLocations,
        userLocation: {
          data: action.payload as Location[],
          loading: false,
        },
      };
    default:
      throw new Error();
  }
}
