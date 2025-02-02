// import React, { Fragment } from "react";
// import CheckoutSteps from "../Cart/CheckoutSteps";
// import { useSelector, useDispatch } from "react-redux";
// import MetaData from "../layout/MetaData";
// import "./ConfirmOrder.css";
// import { Link, useNavigate } from "react-router-dom";
// import { Typography } from "@mui/material";

// const ConfirmOrder = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch(); 
//   const { shippingInfo, cartItems } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.user);

//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.quantity * item.price,
//     0
//   );

//   const shippingCharges = subtotal > 500000 ? 0 : 50000;
//   const tax = subtotal * 0.1;
//   const totalPrice = subtotal + tax + shippingCharges;

//   const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode ? '****' : ''}, ${shippingInfo.country ? '****' : ''}`;

//   const proceedToPayment = () => {
//     const data = {
//       subtotal,
//       shippingCharges,
//       tax,
//       totalPrice,
//     };

//     sessionStorage.setItem("orderInfo", JSON.stringify(data));

//     // Navigate to payment page
//     navigate("/process/payment");
//   };

//   return (
//     <Fragment>
//       <MetaData title="Confirm Order" />
//       <CheckoutSteps activeStep={1} />
//       <div className="confirmOrderPage">
//         <div>
//           <div className="confirmshippingArea">
//             <Typography>Shipping Info</Typography>
//             <div className="confirmshippingAreaBox">
//               <div>
//                 <p>Name:</p>
//                 <span>{user.name}</span>
//               </div>
//               <div>
//                 <p>Phone:</p>
//                 <span>{shippingInfo.phoneNo}</span>
//               </div>
//               <div>
//                 <p>Address:</p>
//                 <span>{address}</span>
//               </div>
//             </div>
//           </div>
//           <div className="confirmCartItems">
//             <Typography>Your Cart Items:</Typography>
//             <div className="confirmCartItemsContainer">
//               {cartItems &&
//                 cartItems.map((item) => (
//                   <div key={item.product}>
//                     <img src={item.image} alt="Product" />
//                     <Link to={`/product/${item.product}`}>
//                       {item.name}
//                     </Link>{" "}
//                     <span>
//                       {item.quantity} X {item.price}VND ={" "}
//                       <b>{item.quantity * item.price}VND</b>
//                     </span>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//         <div>
//           <div className="orderSummary">
//             <Typography>Order Summary</Typography>
//             <div>
//               <div>
//                 <p>Subtotal:</p>
//                 <span>{subtotal.toFixed(2)}VND</span> {/* Format to two decimal places */}
//               </div>
//               <div>
//                 <p>Shipping Charges:</p>
//                 <span>{shippingCharges.toFixed(2)}VND</span>
//               </div>
//               <div>
//                 <p>GST:</p>
//                 <span>{tax.toFixed(2)}VND</span>
//               </div>
//             </div>

//             <div className="orderSummaryTotal">
//               <p>
//                 <b>Total:</b>
//               </p>
//               <span>{totalPrice.toFixed(2)}VND</span>
//             </div>

//             <button onClick={proceedToPayment}>Proceed To Payment</button>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default ConfirmOrder;

import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
      style: 'decimal', 
      minimumFractionDigits: 0,
  }).format(amount) + ' VND'; 
};

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 500000 ? 0 : 5000;
  const tax = subtotal * 0.1;
  const totalPrice = subtotal + tax + shippingCharges;

  // Hardcoded pinCode as 94000
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    // Navigate to payment page
    navigate("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X {formatCurrency(item.price)} ={" "}
                      <b>{formatCurrency(item.quantity * item.price)}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>{formatCurrency(subtotal)}</span> {/* Format to VND */}
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>{formatCurrency(shippingCharges)}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>{formatCurrency(tax)}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>{formatCurrency(totalPrice)}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;

