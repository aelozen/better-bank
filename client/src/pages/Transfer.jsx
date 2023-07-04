// import React, { useState, useEffect } from 'react';
// import { UseCard } from '../components/partials/UseCard';
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { capitalize } from '../features/capitalize';
// import { updateBalance } from "../features/auth/authSlice";

// export const Transfer = () => {
//   const [amount, setAmount] = useState(0);
//   const [disabled, setDisabled] = useState(true);

//   const dispatch = useDispatch();

//   const { user } = useSelector((state) => state.auth);

//   const validate = (field) => {
//       if (Number(field) > user.balance) {
//           toast.error(
//               "Transaction failed. You do not have enough funds to make this transfer.",
//               {
//                   position: "top-right",
//                   autoClose: 2000,
//                   closeOnClick: true,
//                   pauseOnHover: false,
//                   pauseOnFocusLoss: false,
//               }
//           );
//           return false;
//       }
//       if (!Number(field)) {
//           toast.error("Input type not valid. Please enter a number.", {
//               position: "top-right",
//               autoClose: 2000,
//               closeOnClick: true,
//               pauseOnHover: false,
//               pauseOnFocusLoss: false,
//           });
//           return false;
//       }
//       if (Number(field) <= 0) {
//           toast.error("Please enter a positive value.", {
//               position: "top-right",
//               autoClose: 2000,
//               closeOnClick: true,
//               pauseOnHover: false,
//               pauseOnFocusLoss: false,
//           });
//           return false;
//       }
//       return true;
//   };

//   const handleTransfer = (e) => {
//     e.preventDefault();
//     if (!validate(amount, "amount")) return;

//     const newBalance = user.balance - Number(amount);
//     const userData = {
//         id: user._id,
//         email: user.email,
//         balance: newBalance.toFixed(2),
//     };
//     dispatch(updateBalance(userData));
//     toast.info(
//         `Your transfer of $${amount.toLocaleString(
//             "en-US"
//         )} was successful`,
//         {
//             position: "top-right",
//             autoClose: 2000,
//             closeOnClick: true,
//             pauseOnHover: false,
//             pauseOnFocusLoss: false,
//         }
//     );
//     setAmount(0);
// };

//   return (
//     <div className="transfer-page">
//       <UseCard
//         bgcolor="success"
//         opacity="10"
//         header="Transfer"
//         body={
//           <>
//             <h4>Hello, {capitalize(user.name)}!</h4>
//             <p>
//               <p>Your current balance is: ${user.balance.toLocaleString()}. Make a transfer to another account holder here at Better Bank by inputting their account number and desired transfer amount below.</p>
//               <form onSubmit={handleTransfer} className="transfer-form">
//                 <input
//                   style={{ marginTop: '1rem' }}
//                   type="input"
//                   className="form-control"
//                   id="transfer"
//                   placeholder="Enter user account number"
//                   onChange={(e) => {
//                     setAmount(e.currentTarget.value);
//                     setDisabled(false);
//                 }} 
//                 />
//                 <input
//                   style={{ marginTop: '1rem' }}
//                   type="input"
//                   className="form-control"
//                   id="transfer"
//                   placeholder="Enter amount to transfer"
//                   onChange={(e) => {
//                       setAmount(e.currentTarget.value);
//                       setDisabled(false);
//                   }}  
//                 />
//                 <button
//                   disabled={disabled}
//                   style={{ marginTop: '1rem' }}
//                   type="submit"
//                   className="btn btn-outline-success"
//                 >
//                   Transfer
//                 </button>
//               </form>
//             </p>
//           </>
//         }
//       />
//     </div>
//   );
// };
