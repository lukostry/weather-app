import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { api } from "infrastructure";
import { Location } from "types";

import { ErrorDispatch } from "../NotificationOutlet";

import { reducer, State } from './reducer'
import { useStyles } from "./styles";

const initialState: State = {
  defaultLocations: {
    data: [],
    loading: false,
  },
  userLocation: {
    data: [],
    loading: false,
  },
};

export const Main = () => {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [place, setPlace] = React.useState("");
  const errorDispatch = React.useContext(ErrorDispatch);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(event.target.value);
  };

  const fetchUserLocation = () => {
    dispatch({ type: "FETCH_USER_LOCATION", payload: [] });
    api<Location>({ q: place, units: "metric" })
      .then((location) => {
        dispatch({ type: "FETCHED_USER_LOCATION", payload: [location] });
      })
      .catch(() => {
        dispatch({ type: "FETCH_USER_LOCATION_ERROR", payload: [] });
        errorDispatch!({
          type: "SET_ERROR",
          payload: {
            message: "No place found, please try different location",
          },
        });
      });
    setPlace("");
  };

  const handleSearchButtonClick = () => {
    fetchUserLocation();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      fetchUserLocation();
      setPlace("");
    }
  };

  React.useEffect(() => {
    dispatch({ type: "FETCH_DEFAULT_LOCATIONS", payload: [] });
    Promise.all([
      api<Location>({ q: "London", units: "metric" }),
      api<Location>({ q: "Berlin", units: "metric" }),
    ])
      .then((locations) => {
        dispatch({ type: "FETCHED_DEFAULT_LOCATIONS", payload: locations });
      })
      .catch(() => {
        errorDispatch!({
          type: "SET_ERROR",
          payload: { message: "Error while loading data" },
        });
        dispatch({ type: "FETCH_DEFAULT_LOCATIONS_ERROR", payload: [] });
      });
  }, []);

  const [userLocation] = state.userLocation.data;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Dashboard
          </Typography>
          <div className={classes.search}>
            <InputBase
              placeholder="Search for city or place"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              inputProps={{ "aria-label": "search" }}
              value={place}
            />
          </div>
          <IconButton
            aria-label="search"
            color="secondary"
            className={classes.searchIcon}
            onClick={handleSearchButtonClick}
          >
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.gridWrapper}>
        <Grid
          component="section"
          container
          spacing={2}
          justifyContent="space-around"
        >
          {state.defaultLocations.loading && <CircularProgress />}
          {userLocation && (
            <Grid key={userLocation.name} item xs={12} sm={4}>
              {state.userLocation.loading ? (
                <CircularProgress />
              ) : (
                <Card>
                  <CardContent>
                    {userLocation.name}: {userLocation.main.temp}°C
                  </CardContent>
                  <CardActions>
                    <Button
                      color="primary"
                      component={RouterLink}
                      to={`/location/${userLocation.name}`}
                    >
                      See more
                    </Button>
                  </CardActions>
                </Card>
              )}
            </Grid>
          )}
          {state.defaultLocations.data.map((location) => {
            return (
              <Grid key={location.name} item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    {location.name}: {location.main.temp}°C
                  </CardContent>
                  <CardActions>
                    <Button
                      color="primary"
                      component={RouterLink}
                      to={`/location/${location.name}`}
                    >
                      See more
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};
