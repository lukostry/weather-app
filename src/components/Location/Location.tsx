import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { api } from "infrastructure";
import { Location as ILocation } from "types";

import { ErrorDispatch } from "../NotificationOutlet";
import { useStyles } from "./styles";

const dateFromTimestamp = (timeStamp: number) => {
  const date = new Date(timeStamp * 1000);
  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`;

  return `${hours}:${minutes.substr(-2)}`;
};

export const Location = () => {
  const classes = useStyles();
  const params = useParams<{ place: string }>();
  const [loading, setLoading] = React.useState(false);
  const [location, setLocation] = React.useState<null | ILocation>(null);
  const errorDispatch = React.useContext(ErrorDispatch);

  React.useEffect(() => {
    setLoading(true);
    api<ILocation>({ q: params.place, units: "metric" })
      .then((location) => {
        setLoading(false);
        setLocation(location);
      })
      .catch(() => {
        errorDispatch!({
          type: "SET_ERROR",
          payload: { message: "Error while loading data" },
        });
        setLoading(false);
      });
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            aria-label="search"
            className={classes.backButton}
            component={RouterLink}
            to="/"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">{params.place}</Typography>
        </Toolbar>
      </AppBar>
      <Grid
        className={classes.wrapper}
        container
        spacing={2}
        justifyContent="center"
      >
        {loading && <CircularProgress />}
        {location && (
          <>
            <Grid item xs={12} sm={4}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h6">
                    {location.weather[0]?.main}
                  </Typography>
                  <Typography variant="h2">
                    {Math.round(location.main.temp)}°C
                  </Typography>
                  <Typography>
                    Lo: {location.main.temp_min}°C, Hi: {location.main.temp_max}
                    °C
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card className={classes.card}>
                <CardContent className={classes.detailsWrapper}>
                  <div className={classes.weatherDetail}>
                    <Typography variant="h6">Sunrise:</Typography>
                    {dateFromTimestamp(location.sys.sunrise)}
                  </div>
                  <div className={classes.weatherDetail}>
                    <Typography variant="h6">Sunset:</Typography>
                    {dateFromTimestamp(location.sys.sunset)}
                  </div>
                  <div className={classes.weatherDetail}>
                    <Typography variant="h6">Humidity:</Typography>
                    {location.main.humidity}%
                  </div>
                  <div className={classes.weatherDetail}>
                    <Typography variant="h6">Visibility:</Typography>
                    {location.visibility / 1000}km
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};
