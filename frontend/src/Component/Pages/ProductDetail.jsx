import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Container,
  Box,
  Breadcrumbs,
  Link,
  Typography,
  NativeSelect,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/AddCart/actions";
import axios from "axios";

const useStyle = makeStyles((theme) => ({
  breadcrumbs: {
    fontSize: "11px",
  },
  sub_heading: {
    textAlign: "center",
  },
  product_detail: {
    margin: "40px 0px",
  },
  details: {
    marginBottom: "30px",
  },
  counter: {
    border: "1px solid #656565",
  },
  counter_item: {
    cursor: "pointer",
  },
}));

export function ProductDetail() {
  const [value, setValue] = useState(1);
  const [size, setSize] = useState("Small");
  const classes = useStyle();
  const history = useHistory();
  const id = history.location.search.split("?")[1];
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  let [product, setProduct] = useState({});
  useEffect(() => {
    var config = {
      method: "get",
      url: `http://localhost:5000/product/${id}`,
      headers: {},
    };

    axios(config)
      .then((res) => setProduct(res.data))
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // console.log(product);
  // console.log(Object.keys(product));
  const handleAdd = () => {
    let payload = {
      product_id: id,
      product_name: product.product_name,
      img: product.img,
      size,
      price: product.price,
    };
    let qty = value;
    dispatch(addToCart(payload, qty));
  };

  return (
    Object.keys(product).length > 0 && (
      <Box>
        <Container>
          <Box>
            <Breadcrumbs
              className={classes.breadcrumbs}
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb">
              <Link
                color="inherit"
                href="/"
                // onClick={handleClick}
              >
                Home
              </Link>
              {/* <Link
              color="inherit"
              //   href="/getting-started/installation/"
              // onClick={handleClick}
            >
              Core
            </Link> */}
              <Typography color="textPrimary" style={{ fontSize: "11px" }}>
                {product.product_name}
              </Typography>
            </Breadcrumbs>
          </Box>
          <Grid container className={classes.product_detail}>
            <Grid item sm></Grid>
            <Grid item xs={12} sm={6} lg={6} xl={7}>
              <img src={`${product.img}`} width="100%" height="500px" alt="" />
            </Grid>
            <Grid item sm></Grid>
            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              xl={4}
              style={{ textAlign: "center" }}>
              <Box className={classes.details}>
                <Typography variant="body2" gutterBottom>
                  ${product.price}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  OR 4 INTEREST-FREE INSTALLMENTS OF ${`${product.price / 4}`}
                </Typography>
              </Box>
              <Typography
                className={classes.details}
                variant="h3"
                gutterBottom
                style={{ fontSize: "1.3em", fontWeight: "400" }}>
                {product.product_name}
              </Typography>
              <Typography
                className={classes.details}
                variant="body2"
                gutterBottom>
                <ul style={{ listStyle: "initial" }}>
                  {product.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Typography>
              <Typography
                className={classes.details}
                variant="body2"
                gutterBottom>
                <p>size</p>
                <NativeSelect
                  id="select"
                  style={{ textAlign: "center", width: "100%" }}
                  value={size}
                  onChange={(e) => setSize(e.target.value)}>
                  {product.size.map((item, i) => (
                    <option value={item}>{item}</option>
                  ))}
                </NativeSelect>
              </Typography>
              <Typography
                className={classes.details}
                style={{ display: "flex" }}>
                <Grid item xs></Grid>
                <Grid
                  item
                  xs={4}
                  sm={4}
                  lg={4}
                  xl={4}
                  className={classes.counter}>
                  <span
                    className={classes.counter_item}
                    onClick={() => setValue(value === 1 ? 1 : value - 1)}>
                    -
                  </span>
                  <span style={{ margin: "0px 35px" }}>{value}</span>
                  <span
                    className={classes.counter_item}
                    onClick={() => setValue(value + 1)}>
                    +
                  </span>
                </Grid>
                <Grid item xs></Grid>
                {/* <div style={{border:"1px solid grey",width:"100px"}}><span>-</span><span>value</span><span>+</span></div> */}
              </Typography>
              <Typography className={classes.details}>
                <Button
                  variant="outlined"
                  className={classes.add_btn}
                  onClick={() => handleAdd()}
                  style={{ width: "100%" }}>
                  ADD TO CART - ${product.price * value}
                </Button>
              </Typography>
            </Grid>
          </Grid>
          {/* <Box>
          <h3 className={classes.sub_heading}>RELATED PRODUCTS</h3>
          <div
            style={{
              display: "grid",
              marginTop: "7px",
              justifyContent: "center",
              opacity: 0.2,
            }}>
            <p
              style={{
                width: "30px",
                backgroundColor: "black",
                height: "3px",
              }}></p>
          </div>
        </Box> */}
          <Box></Box>
        </Container>
      </Box>
    )
  );
}
