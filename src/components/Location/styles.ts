import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backButton: {
      color: theme.palette.common.white,
    },
    wrapper: {
      marginTop: theme.spacing(3),
    },
    detailsWrapper: {
      display: "flex",
      flexWrap: "wrap",
      width: "90%",
    },
    weatherDetail: {
      width: "49%",
      textAlign: "center",
      "&:first-of-type": {
        borderBottom: "1px solid gray",
        borderRight: "1px solid gray",
      },
      "&:nth-of-type(2)": {
        borderBottom: "1px solid gray",
      },
      "&:last-of-type": {
        borderLeft: "1px solid gray",
      },
    },
    card: {
      minHeight: "175px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);
