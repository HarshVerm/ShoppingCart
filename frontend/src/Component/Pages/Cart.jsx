import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Container,
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
import {
  getCartData,
  removeProductById,
  changeQuantity,
} from "../../Redux/AddCart/actions";
import { NavLink, Redirect } from "react-router-dom";

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
  },
  counter: {
    border: "1px solid #656565",
    // position: "relative",
    width: "60px",
    display: "flex",
    justifyContent: "space-around",
  },
  counter_item: {
    cursor: "pointer",
    // position:"absolute"
  },
  placeOrder: {
    "& p": {
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
  // let arr = false;
  const classes = useStyles();
  // const [qty, setQty] = useState(0);
  // const user_id = useSelector((state) => state.users.user._id);
  const history = useHistory();
  const cart = useSelector((state) => state.cart.cart);
  const price = useSelector((state) => state.cart.totalPrice);
  const token = useSelector((state) => state.users.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);

  // useEffect(() => {}, [cart]);

  const handleRemove = (id) => {
    dispatch(removeProductById(id));
    dispatch(getCartData());
  };

  const handleChange = (qty, id) => {
    if (qty === 0) {
      dispatch(removeProductById(id));
    } else {
      dispatch(changeQuantity({ qty, id }));
    }
    dispatch(getCartData());
  };

  const handleBrowser = () => {
    history.push("/");
  };

  return (
    <Box className={classes.box_container}>
      <Container>
        {!token && <Redirect to="/account/login" />}
        {cart.length === 0 ? (
          <Grid container className={classes.empty_cart}>
            <Typography>YOUR CART</Typography>
            <Typography style={{ fontSize: "10px" }}>
              Your cart is empty.
            </Typography>
            <Button variant="contained" onClick={() => handleBrowser()}>
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
                      <TableRow key={item._id}>
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
                            onClick={() => handleRemove(item._id)}>
                            Remove
                          </Typography>
                        </TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell>
                          <div className={classes.counter}>
                            <span
                              className={classes.counter_item}
                              onClick={() =>
                                handleChange(Number(item.qty) - 1, item._id)
                              }>
                              -
                            </span>
                            <span style={{ margin: "0px 10px" }}>
                              {item.qty}
                            </span>
                            <span
                              className={classes.counter_item}
                              onClick={() =>
                                handleChange(Number(item.qty) + 1, item._id)
                              }>
                              +
                            </span>
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
                  <NavLink to="/cart/checkout">
                    <Button variant="outlined" className={classes.btn}>
                      <span style={{ color: "white" }}>CHECK OUT</span>
                    </Button>
                  </NavLink>
                </Typography>
              </div>
            </Grid>
          </Container>
        )}
      </Container>
    </Box>
  );
}
