import { Container, Box, Grid, Button, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { NavLink } from "react-router-dom";
import { userLogout } from "../../Redux/User/actions";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: "50px 0px",
  },
  container: {
    padding: "0px 10px",
  },
  header_container: {
    borderBottom: "1px solid black",
    padding: "15px 0px",
    marginBottom: "20px",
    "& button:hover": {
      backgroundColor: "red",
    },
  },
  heading: {
    fontWeight: "lighter",
    fontSize: "1.5em",
  },
  logout_btn: {
    color: "white",
    backgroundColor: "#656565",
    fontSize: "10px",
    "& span": {
      color: "white",
    },
  },
  sub_heading: {
    fontSize: "0.9em",
  },
  title: {
    fontSize: "10.5px",
  },
}));

export const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <Box className={classes.wrapper}>
      <Container className={classes.container}>
        <Grid container>
          <Grid item sm={2}></Grid>
          <Grid item xs={2} sm>
            <Grid
              container
              justify="flex-start"
              className={classes.header_container}>
              <Grid item xs={5} lg={3}>
                <div className={classes.heading}>MY ACCOUNT</div>
              </Grid>
              <Grid item xs></Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => handleLogout()}
                  className={classes.logout_btn}>
                  <span>LOG OUT</span>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={2}></Grid>
        </Grid>
      </Container>
      <Container className={classes.container}>
        <Grid container>
          <Grid item sm={2}></Grid>
          <Grid item xs={12} sm>
            <Grid container justify="flex-start">
              <Grid item xs={5} lg={3}>
                <Typography className={classes.sub_heading}>
                  ORDER HISTORY
                </Typography>
                <Typography className={classes.title}>
                  You haven't placed any order yet
                </Typography>
              </Grid>
              <Grid item xs></Grid>
              <Grid item>
                <Typography className={classes.sub_heading}>
                  {user.first_name}
                  <span> </span>
                  {user.last_name}
                </Typography>
                <Typography className={classes.title}>
                  Account Details
                </Typography>
                <Typography className={classes.title}>
                  <NavLink to="/account/addresses">View address</NavLink>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={2}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};
