import loadScript from "./loadScripts";

const displayRazorpay = async ({
  name, email, contact, amount, onSuccess
}) => {
  const res = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const options = {
    key: "rzp_test_WM1URjp81T2lYM",
    amount: amount.toString(),
    currency: "INR",
    name: "Ice Scream",
    description: "Ice creams",
    handler: (response) => {
      onSuccess(response)
    },
    prefill: {
      name,
      email,
      contact
    },
    notes: {
      address: "Ice Scream PVT LTD",
    },
    theme: {
      color: "#61dafb",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.on('payment.failed', (error) => {
    console.log(error)
  })
  paymentObject.open();
}

export default displayRazorpay;
