import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { sentMail, setSentfalse } from "../../Redux/Contact/actions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    // border: "1px solid red",
    textAlign: "center",
    margin: "50px 0px",
    "& a": {
      outline: "1px solid #656565",
    },
  },
  form_container: {
    // border: "1px solid green",
  },
  heading: {
    fontWeight: "100",
    fontSize: "23px",
    letterSpacing: "2px",
    fontFamily: `'Cormorant Garamond', serif;`,
    marginBottom: "10px",
  },
  detail: {
    fontSize: "10.5px",
    marginBottom: "9px",
    textAlign: "left",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "20px 0px",
  },
  input_field: {
    border: "1px solid black",
    margin: "10px 0px",
    padding: "8px 10px",
    // height: "50px",
    fontSize: "15px",
    outline: "none",
  },
  btn: {
    color: "white",
    backgroundColor: "#656565",
    outline: "none",
    padding: "7px",
    cursor: "pointer",
  },
}));

export function ContactUs() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { sent } = useSelector((state) => state.contact);

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      name,
      email,
      phone,
      message,
      subject,
    };
    dispatch(sentMail(payload));
  };

  function handleSent() {
    alert("Mail Sent");
    dispatch(setSentfalse());
    history.push("/");
  }
  console.log(sent);

  return (
    <Container>
      <Grid className={classes.container} container justify="flex-start">
        <Grid item sm></Grid>
        {sent && handleSent()}
        <Grid item sm={10} md={8} className={classes.form_container}>
          <Typography>
            <span className={classes.heading}>Contact</span>
          </Typography>
          <Typography className={classes.detail}>
            Should you have any questions or concerns that aren't answered on
            our <span>Return & Exchange Policy</span> or <span>FAQ pages</span>,
            please use the following form to email our dedicated support team!
          </Typography>
          <Typography className={classes.detail}>
            Please remember that our hours of operation for shipping and
            customer service are Monday through Friday, 8AM to 4PM PST
            (excluding weekends and major holidays) with response times
            typically within 1-2 business days. Please allow an extra 1-2
            business days for a response during high traffic times such as
            holidays and new launches.
          </Typography>
          <Typography className={classes.detail}>
            Lastly please note that we answer all emails oldest to newest
          </Typography>
          <Grid container justify="flex-start" direction="column">
            <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
              <input
                className={classes.input_field}
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className={classes.input_field}
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className={classes.input_field}
                type="number"
                placeholder="Phone Number   "
                value={phone}
                name="phone"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                className={classes.input_field}
                type="text"
                placeholder="Subject"
                value={subject}
                name="subject"
                required
                onChange={(e) => setSubject(e.target.value)}
              />
              <textarea
                rows="10"
                placeholder="Message"
                className={classes.input_field}
                name="message"
                value={message}
                required
                onChange={(e) => setMessage(e.target.value)}
              />
              <Grid container justify="flex-end">
                <input className={classes.btn} type="submit" value="SEND" />
              </Grid>
            </form>
          </Grid>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    </Container>
  );
}
