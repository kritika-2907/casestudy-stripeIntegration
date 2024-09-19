import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import { UserContext } from '../UserContext'; // Fetch email from context
import './PrepaidPlan.css'; // Import the CSS file

const stripePromise = loadStripe('pk_test_51PzMJ92LE9UHjUCiRYxbweuMYXgYud6jst1hGkeWirgTU3mBVfPqqkTmEX4uXSPqUV10ab9uviGTBAsjOgsJJUPg00ydnLub8D');

const PrepaidPlans = () => {
  const [prepaidPlans, setPrepaidPlans] = useState([]);
  const [error, setError] = useState(null);
  const { userEmail } = useContext(UserContext); // Fetch the email from context
  const navigate = useNavigate();

  const apiURL = 'http://localhost:9099'; // Define your API URL

  useEffect(() => {
    const fetchPrepaidPlans = async () => {
      try {
        const response = await axios.get(`${apiURL}/prepaidPlans`); // Adjust URL if needed
        setPrepaidPlans(response.data.prepaidPlans);
        console.log(prepaidPlans);
      } catch (error) {
        setError('Error fetching prepaid plans');
      }
    };

    fetchPrepaidPlans();
  }, [apiURL]);

  const makePayment = async (plan) => {
    console.log("Selected Plan:", plan);
    const stripe = await loadStripe("pk_test_51PzMJ92LE9UHjUCiRYxbweuMYXgYud6jst1hGkeWirgTU3mBVfPqqkTmEX4uXSPqUV10ab9uviGTBAsjOgsJJUPg00ydnLub8D");

    const body = {
      products: plan // Send the selected plan
    };


    const headers = {
      "Content-Type": "application/json"
    };

    const response = await fetch(`${apiURL}/create-checkout-session`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <div className="container">
      <main>
        <h1>Prepaid Plans</h1>
        <p>Select a plan that suits you best.</p>

        <div className="plans-container">
          {error && <p className="error-message">{error}</p>}
          {prepaidPlans.length > 0 ? (
            prepaidPlans.map((plan) => (
              <div className="plan" key={plan.id}>
                <h3 className="plan-name">{plan.planName}</h3>
                <h4 className="plan-description">{plan.planDescription}</h4>
                <p>Price: ${plan.prepaidBalance}</p>
                <div className="buttonplace">
                  <button
                    onClick={() => makePayment(plan)} // Pass the selected plan to makePayment
                    className="buy-button"
                  >
                    Buy Plan
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No prepaid plans available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default PrepaidPlans;
