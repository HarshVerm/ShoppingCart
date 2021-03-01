import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/User/actions";
import Alert from "@material-ui/lab/Alert";
import { setErrorFalse } from "../../Redux/User/actions";

const useStyle = makeStyles((theme) => ({
  form_container: {
    marginTop: "70px",
    marginBottom: "170px",
  },
  form: {
    // border:"1px solid black",
    margin: "20px",
    width: "400px",
  },
  form_input: {
    border: "1px solid #656565",
    width: "100%",
    // maxWidth:"100%",
    display: "block",
    backgroundColor: "transparent",
    outline: "none",
    margin: "0 0 1em",
    padding: "8px 10px",
    lineHeight: 1.42,
    borderRadius: "2px",
    fontSize: "14px",
    fontFamily: "Questrial,sans-serif",
    color: "#656565",
    fontWeight: "400",
    boxSizing: "boder-box",
  },
  form_submit: {
    border: "1px solid #656565",
    width: "107%",
    // maxWidth:"100%",
    display: "block",
    backgroundColor: "#656565",
    outline: "none",
    margin: "0 0 1em",
    padding: "8px 10px",
    lineHeight: 1.42,
    borderRadius: "2px",
    fontSize: "14px",
    fontFamily: "Questrial,sans-serif",
    color: "white",
    fontWeight: "400",
    boxSizing: "boder-box",
    cursor: "pointer",

    ":hover": {
      backgroundColor: "red",
    },
  },
  link: {
    display: "flex",
    justifyContent: "center",
  },
  alert_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "7px",
    color: "white",
  },
  alert: {
    width: "350px",
    fontSize: "12px",
  },
  btn_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const classes = useStyle();
  const err = useSelector((state) => state.users.isError);
  const errMsg = useSelector((state) => state.users.error);
  const token = useSelector((state) => state.users.token);
  // const loading = useSelector((state) => state.users.isLoading);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  // console.log(token);
  useEffect(() => {
    setTimeout(() => {
      dispatch(setErrorFalse());
    }, 3000);
  }, [err, dispatch]);

  return !token ? (
    <Container>
      <Grid container className={classes.form_container}>
        <Grid item xs></Grid>
        <Grid container style={{ display: "grid", placeItems: "center" }}>
          {/* <Grid xs></Grid> */}
          <Grid item>
            <div style={{ textAlign: "center", fontWeight: "lighter" }}>
              LOGIN
            </div>
            <div className={classes.alert_container}>
              {err && (
                <Alert
                  variant="outlined"
                  severity="error"
                  className={classes.alert}>
                  {errMsg.msg ? errMsg.msg : errMsg}
                </Alert>
              )}
            </div>
            <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className={classes.form_input}
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={classes.form_input}
                />
              </div>
              <div>
                <div className={classes.btn_container}>
                  {/* {loading && <CircularProgress disableShrink />} */}
                </div>
                <input
                  type="submit"
                  className={classes.form_submit}
                  value="Sign In"
                  // disabled={loading ? true : false}
                />
              </div>
            </form>
            <div className={classes.link}>
              <NavLink to="/account/register">Register</NavLink>
              <span>•</span>
              {/* <NavLink>Forgot Password</NavLink> */}
            </div>
          </Grid>
          {/* <Grid xs></Grid> */}
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </Container>
  ) : (
    <Redirect to="/" />
  );
}
