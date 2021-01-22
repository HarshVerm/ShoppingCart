import React, { useState, useEffect } from "react";
import { Container, Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../Redux/User/actions";
import { useHistory, Redirect, NavLink } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { setErrorFalse } from "../../Redux/User/actions";

const useStyle = makeStyles((theme) => ({
  form_container: {
    marginTop: "70px",
    marginBottom: "170px",
    // border:"1px solid black",
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
    currsor: "pointer",
    ":hover": {
      backgroundColor: "red",
    },
  },
  link: {
    textAlign: "center",
    fontSize: "12px",
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

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const err = useSelector((state) => state.users.isError);
  const errMsg = useSelector((state) => state.users.error);
  const isAuth = useSelector((state) => state.users.isAuth);
  const register = useSelector((state) => state.users.register);
  const loading = useSelector((state) => state.users.isLoading);

  const handleSumit = (e) => {
    e.preventDefault();
    let payload = {
      first_name: fname,
      last_name: lname,
      email,
      password,
    };

    dispatch(userRegister(payload));
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(setErrorFalse());
    }, 3000);
  }, [err]);

  useEffect(() => {
    setTimeout(() => {
      // alert("registration success");
      dispatch(setErrorFalse());
      if (register) {
        history.push("/account/login");
      }
    }, 5000);
  }, [register]);

  return !isAuth ? (
    <Container>
      <Grid container className={classes.form_container}>
        <Grid item xs></Grid>
        <Grid container style={{ display: "grid", placeItems: "center" }}>
          {/* <Grid item xs ></Grid> */}
          <Grid item>
            <div style={{ textAlign: "center", fontWeight: "lighter" }}>
              CREATE ACCOUNT
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
              {register && (
                <Alert variant="filled" severity="success">
                  Registration Successfull
                </Alert>
              )}
            </div>
            <form className={classes.form} onSubmit={(e) => handleSumit(e)}>
              <div>
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  placeholder="First Name"
                  className={classes.form_input}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  placeholder="Last Name"
                  className={classes.form_input}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className={classes.form_input}
                  // required
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={classes.form_input}
                  required
                />
              </div>
              <div>
                {loading && <CircularProgress disableShrink />}
                <input
                  type="submit"
                  className={classes.form_submit}
                  value="Create"
                />
              </div>
            </form>
            <div class={classes.link}>
              <NavLink to="/account/login">Log in</NavLink>
            </div>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </Container>
  ) : (
    <Redirect to="/" />
  );
}
