import React, { useState, useEffect } from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Grid, Container, Breadcrumbs } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { NavLink, Redirect, useHistory, Link } from "react-router-dom";
import { Checkout_Right } from "./Checkout_Right";
import { Input } from "./Input";
import axios from "axios";
import { getToken } from "../../../Utils/localstorage";
import { removecart, getCartData } from "../../../Redux/AddCart/actions";
import { getActive } from "../../../Redux/User/actions";

const dummyImage = `data:image/jpeg;base64,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`;
const useStyles = makeStyles(() => ({
  main_container: {
    // fontWeight: 200,
    color: "black",
    margin: "0px",
    padding: "0px",
    fontFamily: `"Roboto","sans serif`,
  },

  left_container: {
    padding: "20px",
  },
  profile: {
    display: "flex",
    margin: "15px 0px",
    // justifyContent: "",
  },
  profile_name: {
    fontSize: "14px",
  },
  logout: {
    fontSize: "11px",
    marginTop: "3px",
    color: "#e37648",
  },
  badge: {
    color: `white !important`,
  },
  checkout_subheading: {
    fontSize: "16px",
    margin: "15px 0px",
  },
  left_container_heading: {
    marginBottom: "15px",
    fontSize: "22px",
    fontWeight: "100",
  },
  breadcrumbs_container: {
    fontSize: "12px",
  },
  input_fields: {
    display: "flex",
    justifyContent: "space-around",
  },
  return_link: {
    color: "#e37648",
    fontSize: "14px",
  },
  order_btn: {
    backgroundColor: "#e37648",
    border: "none",
    outline: "none",
    width: "120px",
    height: "40px",
    color: "black",
    borderRadius: "4px",
    // opacity: "0.",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
}));

export const Checkout = () => {
  // const match = useMediaQuery("(min-width:700px)");
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.users);
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [company, setCompany] = useState("");
  const [counrty, setCountry] = useState("");
  const [pin, setPin] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [add, setAdd] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(getActive());
      dispatch(getCartData());
    }
  }, []);

  const paymentHandler = async () => {
    if (
      fname == "" ||
      lname == "" ||
      company == "" ||
      counrty == "" ||
      pin == "" ||
      state == "" ||
      city == "" ||
      add == "" ||
      phone == ""
    ) {
      alert("fill all details");
    } else {
      const API_URL = `http://localhost:5000/`;
      var config = {
        method: "POST",
        url: `${API_URL}order`,
        headers: {
          Authorization: `Bearer ${getToken("token")}`,
        },
        data: { totalPrice },
      };
      // const orderUrl = `${API_URL}order`;
      const response = await axios(config);
      const { data } = response;
      const options = {
        name: "Masai Razorpay",
        description: "Integration of Razorpay",
        order_id: data.id,
        handler: async (response) => {
          try {
            const paymentId = response.razorpay_payment_id;
            console.log(paymentId);
            const shipping_address = {
              company,
              pin,
              state,
              city,
              address: add,
            };
            let payload = {
              user_id: user.id,
              fname,
              lname,
              shipping_address,
              phone,
              order_list: cart,
              totalPrice,
            };

            var config = {
              method: "POST",
              url: `${API_URL}capture/&{payment}`,
              headers: {
                Authorization: `Bearer ${getToken("token")}`,
              },
              data: payload,
            };

            // const url = `${API_URL}capture/&{payment}`;
            await axios(config)
              .then(() => {
                console.log("success");
                alert("Suuccess");
                setTimeout(() => {
                  dispatch(removecart(user.id));
                  history.push("/");
                }, 2000);
              })
              .catch((err) => console.log("fail"));
          } catch (err) {
            console.log(err);
          }
        },
        theme: {
          color: "#c6203d",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    }
  };

  return (
    <Grid container justify="flex-start" className={classes.main_container}>
      {/* <Checkout_Right /> */}
      <Grid item xs sm md className={classes.left_container}>
        <Container>
          <div className={classes.left_container_heading}>KETNIPZ</div>
          <div>
            <Breadcrumbs
              className={classes.breadcrumbs_container}
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb">
              <div
                color="inherit"
                // href="/"
                //  onClick={handleClick}
              >
                Material-UI
              </div>
              <div
                color="inherit"
                // href="/getting-started/installation/"
                //  onClick={handleClick}
              >
                Core
              </div>
              <Typography
                className={classes.breadcrumbs_container}
                color="textPrimary">
                Breadcrumb
              </Typography>
            </Breadcrumbs>
          </div>
          <div>
            <div className={classes.checkout_subheading}>
              Contact Information
            </div>
            <div className={classes.profile}>
              <div>
                <img
                  src={dummyImage}
                  width="35"
                  alt="profile"
                  style={{ borderRadius: "5px" }}
                />
              </div>
              <div style={{ marginLeft: "5px" }}>
                <div className={classes.profile_name}>
                  {user.first_name} {user.last_name} ({user.email})
                </div>
                <div className={classes.logout}>Logout</div>
              </div>
            </div>
            <div className={classes.checkout_subheading}>Shipping Address</div>
            <Grid container>
              <Grid item xs={12} className={classes.input_fields}>
                <Input
                  type="text"
                  label="First name"
                  value={fname}
                  setValue={(e) => setFname(e)}
                />
                <Input
                  type="text"
                  label="Last name"
                  value={lname}
                  setValue={(e) => setLname(e)}
                />
              </Grid>
              <Grid item xs={12} className={classes.input_fields}>
                <Input
                  type="text"
                  label="Company"
                  value={company}
                  setValue={(e) => setCompany(e)}
                />
              </Grid>
              <Grid item xs={12} className={classes.input_fields}>
                <Input
                  type="text"
                  label="Country/Region"
                  value={counrty}
                  setValue={(e) => setCountry(e)}
                />
                <Input
                  type="number"
                  label="PIN code"
                  value={pin}
                  setValue={(e) => setPin(e)}
                />
                <Input
                  type="text"
                  label="State"
                  value={state}
                  setValue={(e) => setState(e)}
                />
              </Grid>
              <Grid item xs={12} className={classes.input_fields}>
                <Input
                  type="text"
                  label="City"
                  value={city}
                  setValue={(e) => setCity(e)}
                />
              </Grid>
              <Grid item xs={12} className={classes.input_fields}>
                <Input
                  type="text"
                  label="Address"
                  value={add}
                  setValue={(e) => setAdd(e)}
                />
              </Grid>
              <Grid item xs={12} className={classes.input_fields}>
                <Input
                  type="number"
                  label="Phone"
                  value={phone}
                  setValue={(e) => setPhone(e)}
                />
              </Grid>
            </Grid>
          </div>
          <Grid container className={classes.footer}>
            <NavLink to="/cart">
              <div className={classes.return_link}>{`< Return to cart`}</div>
            </NavLink>
            <button className={classes.order_btn} onClick={paymentHandler}>
              Place Order
            </button>
          </Grid>
        </Container>
      </Grid>
      <Checkout_Right />
    </Grid>
  );
};
