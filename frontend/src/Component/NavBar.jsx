import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Container,
  Typography,
  Grid,
  Toolbar,
  Divider,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: "white",
    boxShadow: "none",
    borderBottom: "1px solid #f7f4f4",
    position: "sticky",
    color: "black",
    top: 0,
  },
  container: {
    display: "flex",
    margin: "10px 0px",
    padding: "0px 50px",
  },
  container_right: {
    color: "grey",
    display: "flex",
    alignItems: "left",
    justifyContent: "space-around",
    minWidth: "400px",
    maxWidth: "500px",
    "& :hover": {
      color: "#cc588a",
    },
  },
  container_item: {
    fontSize: "9px",
    fontFamily: "sans-serif",
    lineHeight: "70px",
    cursor: "pointer",
    "& a": {
      textDecoration: "none",
      color: "#656565",
    },
  },
  icon: {
    backgroundColor: "#00000",
    paddingTop: "15px",
    color: "#656565",
    fontSize: "30px",
    cursor: "pointer",
  },
  icon_right: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  container_xs: {
    margin: "0px",
    padding: "0px",
  },
  small_view: {
    padding: "10px 15px",
  },
  links: {
    margin: "10px",
    fontSize: "12px",
  },
}));

export function NavBar() {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:700px)");
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.users.token);
  // const history = useHistory();

  useEffect(() => {
    setOpen(false);
  }, [matches]);

  return (
    <AppBar className={classes.navbar}>
      <Toolbar>
        {matches && (
          <Grid container className={classes.container}>
            <Grid item sm={3} md={3} lg={3} xl={3}>
              <NavLink to="/">
                <img
                  src="//cdn.shopify.com/s/files/1/2028/6907/files/Ketnipz_Header_550x_dd3e502e-9e2e-4ad6-8c4d-e7cadd42b578_130x.gif?v=1592267404"
                  // class="logo--color"
                  // srcset="//cdn.shopify.com/s/files/1/2028/6907/files/Ketnipz_Header_550x_dd3e502e-9e2e-4ad6-8c4d-e7cadd42b578_130x.gif?v=1592267404 1x, //cdn.shopify.com/s/files/1/2028/6907/files/Ketnipz_Header_550x_dd3e502e-9e2e-4ad6-8c4d-e7cadd42b578_130x@2x.gif?v=1592267404 2x"
                  style={{ paddingLeft: "10px", cursor: "pointer" }}
                  alt="KETNIPZ"
                />
              </NavLink>
            </Grid>
            <Grid item sm></Grid>
            <Grid item sm={7} md={5} lg={6} xl={6}>
              <Box
                className={classes.container_right}
                display={{ xs: "none", sm: "block", md: "block" }}>
                <NavLink
                  to="/"
                  exact
                  activeStyle={{
                    color: "#cc588a",
                  }}>
                  <Typography className={classes.container_item} variant="h6">
                    HOME
                  </Typography>
                </NavLink>
                <NavLink
                  to="/shop-all"
                  activeStyle={{
                    color: "#cc588a",
                  }}>
                  <Typography className={classes.container_item} variant="h6">
                    SHOP ALL
                  </Typography>
                </NavLink>
                <NavLink
                  to="/footwear"
                  activeStyle={{
                    color: "#cc588a",
                  }}>
                  <Typography className={classes.container_item} variant="h6">
                    FOOTWEAR
                  </Typography>
                </NavLink>
                <NavLink
                  to="/topwear"
                  activeStyle={{
                    color: "#cc588a",
                  }}>
                  <Typography className={classes.container_item} variant="h6">
                    TOPWEAR
                  </Typography>
                </NavLink>
                <NavLink
                  to="/accessories"
                  activeStyle={{
                    color: "#cc588a",
                  }}
                  style={{ textAlign: "center" }}>
                  <Typography className={classes.container_item} variant="h6">
                    ACCESSORIES
                  </Typography>
                </NavLink>
                {token && (
                  <Typography className={classes.container_item} variant="h6">
                    <NavLink
                      to="/cart"
                      activeStyle={{
                        color: "#cc588a",
                      }}>
                      CART
                    </NavLink>
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        )}
        {!matches && (
          <Container>
            <Grid container className={classes.container_xs}>
              <Grid item xs onClick={(e) => setOpen(!open)}>
                <MenuIcon className={classes.icon} />
              </Grid>
              <Grid item xs>
                <img
                  src="//cdn.shopify.com/s/files/1/2028/6907/files/Ketnipz_Header_550x_dd3e502e-9e2e-4ad6-8c4d-e7cadd42b578_130x.gif?v=1592267404"
                  className="logo--color"
                  alt="KETNIPZ"
                />
              </Grid>
              <Grid item xs className={classes.icon_right}>
                {token && (
                  <NavLink to="/cart">
                    <ShoppingCartOutlinedIcon
                      className={classes.icon}
                      color="disabled"
                    />
                  </NavLink>
                )}
              </Grid>
            </Grid>
          </Container>
        )}
      </Toolbar>
      {open && !matches && (
        <Container className={classes.small_view}>
          <NavLink to="/">
            <div className={classes.links}>Home</div>
          </NavLink>
          <Divider />
          <NavLink to="">
            <div className={classes.links}>SHOP ALL</div>
          </NavLink>
          <Divider />
          <NavLink to="">
            <div className={classes.links}>FOOTWEAR</div>
          </NavLink>
          <Divider />
          <NavLink to="">
            <div className={classes.links}>TOPWEAR</div>
          </NavLink>
          <Divider />
          <NavLink to="">
            <div className={classes.links}>ACCESSORIES</div>
          </NavLink>
        </Container>
      )}
    </AppBar>
  );
}
