import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";

function PaypalButton({amount, onSuccess, onError}) {
  return (
    <PayPalScriptProvider 
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        "currency": "USD"  // add currency here
      }}
    >
      <PayPalButtons  
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                      value: amount,
                      currency_code: "USD"  // also add currency_code here
                    }
                }],
            });
        }}
        onApprove={(data, actions) => {
            return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
}

export default PaypalButton;
