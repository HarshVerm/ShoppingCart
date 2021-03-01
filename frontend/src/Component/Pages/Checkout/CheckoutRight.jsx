import React from "react";
import {
  Badge,
  Typography,
  Box,
  Grid,
  Divider,
  TableBody,
  TableCell,
  TableRow,
  Table,
} from "@material-ui/core";
// import { NavLink, Redirect, useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";

const useStyle = makeStyles(() => ({
  main_container: {
    // fontWeight: 200,
    color: "black",
    margin: "0px",
    padding: "0px",
    fontFamily: `"Roboto","sans serif`,
  },
  right_container: {
    backgroundColor: "#f1f2f6",
    color: "black",
    padding: "20px 20px",
    fontWeight: "bold",
  },
  img_container: {
    width: "4.6em",
    height: "4.6em",
    borderRadius: "8px",
    background: "#fff",
    position: "relative",
    border: "1px solid rgba(224, 224, 224, 1)",
  },
  img: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
  },
  product_name: {
    // fontWeight: 400,
    borderBottom: "none",
  },
  table_cell: {
    borderBottom: "none",
  },
  footer_container: {
    margin: "15px 0px",
  },
  input: {
    border: "1px solid grey",
    padding: "7px",
    fontSize: "12px",
    borderRadius: "3px",
    outline: "none",
    width: "200px",
    marginRight: "15px",
  },
  btn: {
    backgroundColor: "grey",
    border: "none",
    color: "black",
    width: "60px",
    height: "30px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  container_amt: {
    display: "flex",
    justifyContent: "space-between",
    margin: "15px 0px 30px 0px",
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
    backgroundColor: "white",
  },
}));

export function CheckoutRight() {
  const cart = useSelector((state) => state.cart.cart);
  const totalAmt = useSelector((state) => state.cart.totalPrice);
  // const user = useSelector((state) => state.users.user);
  const classes = useStyle();
  return (
    <Grid item xs md={5} className={classes.right_container}>
      <Box>
        <Table>
          <TableBody>
            {cart?.map((item) => (
              <TableRow key={item._id}>
                <TableCell className={classes.table_cell}>
                  <Badge
                    color="secondary"
                    className={classes.badge}
                    badgeContent={item.qty}>
                    <div className={classes.img_container}>
                      <div>
                        <img
                          className={classes.img}
                          src={item.img}
                          alt=""
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </Badge>
                </TableCell>
                <TableCell
                  className={classes.product_name}
                  style={{ borderBottom: "none" }}>
                  <div
                    style={{
                      // fontWeight: "bold",
                      fontSize: "10px",
                      marginLeft: "5px",
                    }}>
                    {item.product_name}
                  </div>
                  <div
                    style={{
                      // fontWeight: "li",
                      fontSize: "8px",
                      marginLeft: "5px",
                    }}>
                    {item.size}
                  </div>
                </TableCell>
                <TableCell className={classes.table_cell}>
                  ${item.price * item.qty}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Divider />
        <Typography className={classes.footer_container}>
          <input
            className={classes.input}
            type="text"
            placeholder="Discount Code"
          />
          <button className={classes.btn}>Apply</button>
        </Typography>
        <Divider />
        <div className={classes.footer_container}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              fontWeight: "100",
            }}>
            <div>Subtotal</div>
            <div style={{ fontWeight: "bold" }}>${totalAmt}</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
              fontWeight: "100",
            }}>
            <div>Shipping </div>
            <div>Calculated at next step </div>
          </div>
        </div>
        <Divider />
        <div className={classes.container_amt}>
          <div>Total</div>
          <div>${totalAmt}</div>
        </div>
      </Box>
    </Grid>
  );
}
