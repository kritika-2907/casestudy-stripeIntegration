// PaymentSuccess.js
import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className="payment-status success">
      <h1>Payment Successful!</h1>
      <p>Thank you for your payment. Your transaction has been completed successfully.</p>
      <Link to="/billing-history" className="btn btn-primary">
        View Billing History
      </Link>
    </div>
  );
};

export default PaymentSuccess;
