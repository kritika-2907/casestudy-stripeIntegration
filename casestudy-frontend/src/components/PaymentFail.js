// PaymentFailure.js
import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailure = () => {
  return (
    <div className="payment-status failure">
      <h1>Payment Failed</h1>
      <p>We're sorry, but your payment could not be processed at this time.</p>
      <p>Please try again later or contact support if the issue persists.</p>
      <Link to="/payment-retry" className="btn btn-danger">
        Retry Payment
      </Link>
    </div>
  );
};

export default PaymentFailure;
