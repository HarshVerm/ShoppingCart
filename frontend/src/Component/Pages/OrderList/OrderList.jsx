import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../Redux/Orders/actions";
import { Spinner } from "../../Spinner";
import styles from "./Order.module.css";
import { getActive } from "../../../Redux/User/actions";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles((theme) => ({
  card: {
    backgroundColor: "#ffdde1",
    padding: "20px 10px",
    margin: "10px",
  },
  header: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

export function OrderList() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { orders, orderLoading } = useSelector((state) => state.orders);
  const user = useSelector((state) => state.users.user);
  const token = useSelector((state) => state.users.token);

  useEffect(() => {
    if (token) {
      dispatch(getActive());
    }
  }, []);

  useEffect(() => {
    if (token && user.id) {
      dispatch(getOrders({ id: user.id }));
    }
  }, [user.id]);
  console.log("orders", orders);
  return (
    <div className={styles.orderlist_conatiner}>
      {orderLoading && <Spinner loading={orderLoading} />}
      {!orderLoading && orders.length === 0 && <div>No order placed yet.</div>}
      {!orderLoading && orders.length != 0 && (
        <Container>
          <div>
            <div>
              <Card className={`${classes.card} ${classes.header} `}>
                <div>Product</div>
                {/* <div>Image</div> */}
                <div>Quantity</div>
                <div>Price</div>
                <div>Total</div>
              </Card>
            </div>
            {orders?.map((item) => (
              <div key={item._id}>
                <Card className={classes.card}>
                  {item.order_list.map((el) => {
                    return (
                      <div key={el._id}>
                        <div className={styles.items}>
                          <div>
                            <div className={styles.display_name}>
                              {el.product_name}
                            </div>
                            <img src={el.img} width="50px" alt="" />
                          </div>
                          <div>{el.qty}</div>
                          <div>{el.price}</div>
                          <div>{el.price * el.qty}</div>
                        </div>
                      </div>
                    );
                  })}
                </Card>
              </div>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}
