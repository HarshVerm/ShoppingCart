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
    paddingLeft: "20px",
    cursor: "pointer",
  },
  heading: {
    lineHeight: 3,
    fontSize: "9px",
    textAlign: "center",
  },
}));
export function Header() {
  const classes = useStyles();
  return (
    <AppBar position="sticky" className={classes.header}>
      <Container>
        <Grid container justify="flex-start" className={classes.container}>
          <Grid item xs>
            <NavLink to="/profile">
              <PersonIcon />
            </NavLink>
          </Grid>
          <Grid item xs={6} className={classes.heading}>
            OFFICIAL KETNIPZ ONLINE STORE
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </Container>
    </AppBar>
  );
}
