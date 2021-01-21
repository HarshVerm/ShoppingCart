import { useEffect, useState } from "react";
import { Container, useMediaQuery } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { loadData } from "../../Redux/LoadData/actions";

const useStyle = makeStyles((theme) => ({
  body_container: {
    padding: "90px 0px",
  },
  item_container: {
    margin: "15px 0px",
    cursor: "pointer",
  },
  items: {
    // border:"1px solid black",
    padding: "0px 30px",
  },
}));

export function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyle();
  const match = useMediaQuery("(min-width:700px)");
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    console.log(dispatch(loadData()));
  }, []);

  const handleClick = (_id, item = null) => {
    const location = {
      pathname: `/product`,
      search: `?${_id}`,
      state: item,
    };

    history.push(location);
  };

  return (
    <div>
      <div onClick={() => handleClick("6003683c6f45c6efabd28c0d")}>
        <img
          src="https://cdn.shopify.com/s/files/1/2028/6907/files/bean_anime_hoodie_banner3_medium_quality_4480x.gif?v=1610051060%204480w"
          width="100%"
          alt=""
        />
      </div>
      <Container>
        <Grid container className={classes.body_container}>
          {products.map((item) => (
            <Grid
              item
              xs={6}
              sm={6}
              md={3}
              lg={3}
              xl={3}
              key={item._id}
              className={classes.item_container}
              onClick={() => handleClick(item._id, item)}>
              <div className={classes.items}>
                <img src={item.img} width="100%" height="250px" alt="" />
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  color: "#656565",
                  marginBottom: "10px",
                  fontWeight: 600,
                }}>
                {item.product_name}
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "10.5px",
                  color: "#656565",
                }}>
                ${item.price}
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
