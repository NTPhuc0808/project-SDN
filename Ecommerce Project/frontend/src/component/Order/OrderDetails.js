// import React, { Fragment, useEffect } from "react";
// import "./OrderDetails.css";
// import { useSelector, useDispatch } from "react-redux";
// import MetaData from "../layout/MetaData";
// import { Link, useParams } from "react-router-dom"; // Import useParams
// import { Typography } from "@material-ui/core";
// import { getOrderDetails, clearErrors } from "../../actions/orderAction";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";

// const OrderDetails = () => {
//   const { id } = useParams(); // Sử dụng useParams để lấy id từ URL
//   const { order, error, loading } = useSelector((state) => state.orderDetails);

//   const dispatch = useDispatch();
//   const alert = useAlert();

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }

//     dispatch(getOrderDetails(id)); // Sử dụng id từ useParams
//   }, [dispatch, alert, error, id]);

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title="Order Details" />
//           <div className="orderDetailsPage">
//             <div className="orderDetailsContainer">
//               <Typography component="h1">
//                 Order #{order && order._id}
//               </Typography>
//               <Typography>Shipping Info</Typography>
//               <div className="orderDetailsContainerBox">
//                 <div>
//                   <p>Name:</p>
//                   <span>{order.user && order.user.name}</span>
//                 </div>
//                 <div>
//                   <p>Phone:</p>
//                   <span>
//                     {order.shippingInfo && order.shippingInfo.phoneNo}
//                   </span>
//                 </div>
//                 <div>
//                   <p>Address:</p>
//                   <span>
//                     {order.shippingInfo &&
//                       `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
//                   </span>
//                 </div>
//               </div>
//               <Typography>Payment</Typography>
//               <div className="orderDetailsContainerBox">
//                 <div>
//                   <p
//                     className={
//                       order.paymentInfo &&
//                       order.paymentInfo.status === "succeeded"
//                         ? "greenColor"
//                         : "redColor"
//                     }
//                   >
//                     {order.paymentInfo &&
//                     order.paymentInfo.status === "succeeded"
//                       ? "PAID"
//                       : "NOT PAID"}
//                   </p>
//                 </div>

//                 <div>
//                   <p>Amount:</p>
//                   <span>{order.totalPrice && order.totalPrice}</span>
//                 </div>
//               </div>

//               <Typography>Order Status</Typography>
//               <div className="orderDetailsContainerBox">
//                 <div>
//                   <p
//                     className={
//                       order.orderStatus && order.orderStatus === "Delivered"
//                         ? "greenColor"
//                         : "redColor"
//                     }
//                   >
//                     {order.orderStatus && order.orderStatus}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="orderDetailsCartItems">
//               <Typography>Order Items:</Typography>
//               <div className="orderDetailsCartItemsContainer">
//                 {order.orderItems &&
//                   order.orderItems.map((item) => (
//                     <div key={item.product}>
//                       <img src={item.image} alt="Product" />
//                       <Link to={`/product/${item.product}`}>
//                         {item.name}
//                       </Link>{" "}
//                       <span>
//                         {item.quantity} X {item.price}VND ={" "}
//                         <b>{item.quantity*item.price}VND</b>
//                       </span>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </div>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default OrderDetails;

import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom"; 
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = () => {
  const { id } = useParams(); 
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id)); 
  }, [dispatch, alert, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice.toLocaleString('vi-VN')} VND</span> {/* Formatted for VND */}
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X {item.price.toLocaleString('vi-VN')} VND ={" "}
                        <b>{(item.quantity * item.price).toLocaleString('vi-VN')} VND</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
