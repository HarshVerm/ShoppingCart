import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Table,
  Typography,
  TableContainer,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  box_container: {
    margin: "80px 0px 100px 0px",
    "& button": {
      fontSize: "10px",
      backgroundColor: "#e34489",
    },
    "& button:hover": {
      backgroundColor: "#B93870",
    },
  },
  empty_cart: {
    display: "grid",
    placeItems: "center",
    "& > p ": {
      marginBottom: "10px",
    },

    "& button:hover": {
      backgroundColor: "#B93870",
    },
  },
  divider: {
    borderTop: "1px solid black",
    width: "100%",
    borderTop: "1px solid black",
  },
  counter: {
    border: "1px solid #656565",
    // position: "relative",
    width: "40%",
    display: "flex",
    justifyContent: "space-around",
  },
  counter_item: {
    cursor: "pointer",
    // position:"absolute"
  },
  placeOrder: {
    "& p": {
      // fontSize: "1rem",
      fontFamily: `"Roboto", "Helvetica", "Arial", "sans-serif"`,
      fontWeight: 400,
      lineHeight: 1,
      letterSpacing: "0.00938em",
      textAlign: "right",
      fontSize: "10.5px",
      marginBottom: "5px",
    },
  },
  subtotal: {
    fontSize: "15px",
  },
  intrest: {
    fontSize: "12px",
  },
  remove: {
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

export function Cart() {
  let arr = false;
  const classes = useStyles();
  const [qty, setQty] = useState(0);

  const cart = useSelector((state) => state.cart.cart);
  const price = useSelector((state) => state.cart.totalPrice);

  console.log(cart);
  return (
    <Box className={classes.box_container}>
      <Container>
        {cart.length === 0 ? (
          <Grid container className={classes.empty_cart}>
            <Typography>YOUR CART</Typography>
            <Typography style={{ fontSize: "10px" }}>
              Your cart is empty.
            </Typography>
            <Button variant="contained">
              <span style={{ color: "white" }}>CONTINUE BROWISING HERE</span>
            </Button>
          </Grid>
        ) : (
          <Container>
            <Grid container>
              <Typography>YOUR CART</Typography>

              <TableContainer style={{ marginBottom: "20px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart?.map((item) => (
                      <TableRow>
                        <TableCell>
                          <img src={`${item.img}`} width="100px" alt="" />
                        </TableCell>
                        <TableCell>
                          <Typography style={{ fontSize: "12px" }}>
                            {item.product_name}
                          </Typography>
                          <Typography style={{ fontSize: "9px" }}>
                            {item.size}
                          </Typography>
                          <Typography
                            style={{ fontSize: "9px" }}
                            className={classes.remove}
                            // onClick={}
                          >
                            Remove
                          </Typography>
                        </TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell>
                          <div className={classes.counter}>
                            {/* <span
                              className={classes.counter_item}
                              onClick={(e) => handleClick(item.qty,-1,item.id)}>
                              -
                            </span> */}
                            <span style={{ margin: "0px 10px" }}>
                              {item.qty}
                            </span>
                            {/* <span
                              className={classes.counter_item}
                              onClick={(e) => setQty((prev) => prev + 1)}>
                              +
                            </span> */}
                          </div>
                        </TableCell>
                        <TableCell>${item.price * item.qty}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid container justify="flex-end">
              <div className={classes.placeOrder}>
                <Typography
                  className={classes.subtotal}
                  style={{ fontSize: "10.5px" }}>
                  <span>SUBTOTAL </span>${price}
                </Typography>
                <Typography className={classes.intrest}>
                  or 4 interest-free installments of ${price / 4}
                </Typography>
                <Typography>Shipping & taxes calculated at checkout</Typography>
                <Typography>
                  <Button variant="outlined" className={classes.btn}>
                    <span style={{ color: "white" }}>CHECK OUT</span>
                  </Button>
                </Typography>
              </div>
            </Grid>
          </Container>
        )}
      </Container>
    </Box>
  );
}
