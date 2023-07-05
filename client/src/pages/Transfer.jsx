import React, { useState, useRef } from 'react';
import { UseCard } from '../components/partials/UseCard';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { capitalize } from '../features/capitalize';
import { updateBalance } from '../features/auth/authSlice';
import { transfer } from '../features/auth/authSlice';

const DevelopmentBanner = () => {
  const bannerStyles = {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '10px',
    textAlign: 'center',
    font: 'Arial',
    fontSize: '20px',
  };
  return(
    <div style={bannerStyles}>
            <p>NOTE: This page is under development. Come back later to transfer funds to another user.</p>
      </div>
  )
}

export const Transfer = () => {
  console.log("beginning of transfer");
  const [accountNumber, setAccountNumber] = useState('');
  const [transferAmount, setTransferAmount] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const validate = (field) => {
  console.log("beginning of validate");

    if (Number(field) > user.balance) {
      toast.error('Transaction failed. You do not have enough funds to make this transfer.', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
      return false;
    }
    if (!Number(field)) {
      toast.error('Input type not valid. Please enter a number.', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
      return false;
    }
    if (Number(field) <= 0) {
      toast.error('Please enter a positive value.', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
      return false;
    }
    return true;
  };

  const receiverAccountNumberRef = useRef('');

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!validate(transferAmount)) return;
  
    const receiverAccountNumber = receiverAccountNumberRef.current.value;
  
    try {
      const transferData = {
        senderId: user._id,
        receiverAccountNumber,
        amount: Number(transferAmount),
      };
      console.log("Transfer.jsx transferData", transferData);
  
      const token = user.token;
      console.log("Transfer.jsx token", token);
      const response = await dispatch(transfer(transferData, token));
      console.log("Transfer.jsx response", response);

      const senderNewBalance = response.payload.senderNewBalance;
  
      dispatch(updateBalance({ balance: senderNewBalance }));
      console.log("Transfer.jsx senderNewBalance", senderNewBalance);

  
      toast.info(`Your transfer of $${transferAmount.toLocaleString('en-US')} was successful`, {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
  
      setTransferAmount(0);
      setAccountNumber('');
    } catch (error) {
      console.error('Error transferring money:', error);
      toast.error('Failed to transfer money. Please try again.', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
    }
  };

  return (
    <div className="transfer-page">
      <DevelopmentBanner/>
      <UseCard
        bgcolor="success"
        opacity="10"
        header="Transfer"
        body={
          <>
            <h4>Hello, {capitalize(user.name)}!</h4>
            <p>
              <p>Your current balance is: ${user.balance.toLocaleString()}. Make a transfer to another account holder here at Better Bank by inputting their account number and desired transfer amount below.</p>
              <form onSubmit={handleTransfer} className="transfer-form">
                <input
                  style={{ marginTop: '1rem' }}
                  type="input"
                  className="form-control"
                  id="accountNumber"
                  placeholder="Enter user account number"
                  value={accountNumber}
                  ref={receiverAccountNumberRef}
                  onChange={(e) => {
                    setAccountNumber(e.currentTarget.value);
                    setDisabled(true);
                  }}
                />
                <input
                  style={{ marginTop: '1rem' }}
                  type="input"
                  className="form-control"
                  id="transfer"
                  placeholder="Enter amount to transfer"
                  value={transferAmount}
                  onChange={(e) => {
                    setTransferAmount(e.currentTarget.value);
                    setDisabled(true);
                  }}
                />
                <button
                  disabled={disabled}
                  style={{ marginTop: '1rem' }}
                  type="submit"
                  className="btn btn-outline-success"
                >
                  Transfer
                </button>
              </form>
            </p>
          </>
        }
      />
    </div>
  );
};
