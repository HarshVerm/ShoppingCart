import React from "react";
import { AppBar, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PersonIcon from "@material-ui/icons/Person";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#e9e9e9",
  },
  container: {
    // color: "#656565",
    paddingLeft: "20px",
  },
  heading: {
    lineHeight: 3,
    fontSize: "9px",
    textAlign: "center",
  },
  icon_container: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "flex-end",
    // justifyContent: "",
  },
}));
export function Header() {
  const classes = useStyles();
  return (
    <AppBar position="sticky" className={classes.header}>
      <Container>
        <Grid container justify="flex-start" className={classes.container}>
          <Grid item xs sm={1} className={classes.icon_container}>
            <NavLink to="/profile">
              <PersonIcon />
            </NavLink>
          </Grid>
          <Grid item xs={10} className={classes.heading}>
            OFFICIAL KETNIPZ ONLINE STORE
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </Container>
    </AppBar>
  );
}
