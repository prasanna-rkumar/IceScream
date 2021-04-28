import PageContainer from "./PageContainer";
import TextFormField from "./shared/TextFormField";
import { useForm } from "react-hook-form";
import displayRazorpay from "../utils/razorpayGateway";
import { useContext } from "react";
import CartContext from "../context/CartContext";
import { iceCreamAuth } from "../firebase";
import createOrder from "../firebase/dbhelpers/createOrder";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Checkout = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { grandTotal, cartItems } = useContext(CartContext);
  const history = useHistory();
  const onSubmit = data => {
    displayRazorpay({
      name: data.fullname,
      email: iceCreamAuth.currentUser?.email,
      contact: data.mobile,
      amount: grandTotal * 100,
      onSuccess: (response) => {
        createOrder({
          amount: grandTotal,
          items: cartItems.map(({ id, count }) => {
            return {
              item_id: id,
              count,
            }
          })
        })
        setTimeout(() => {
          history.replace('/')
        }, 1500);
        toast.success("Order placed successfully!")
      },
      onFailure: (error) => {
        console.log(error)
      }
    });
  };

  return (
    <PageContainer>
      <form className="max-w-lg m-auto p-4 mb-4 bg-gray-200 bg-opacity-70 rounded-md" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="text-xl font-semibold mb-3">Personal Details</h4>
        <TextFormField {...register('fullname')} required label="Full Name" type="text" placeholder="John Doe" />
        <TextFormField {...register('mobile', { required: true, pattern: /^[0-9]{10}$/i })} required label="Mobile" type="text" placeholder="9898878754" />
        {errors?.mobile && <span className="relative -top-4 text-red-600 text-sm font-medium tracking-wide">please enter a valid mobile number</span>}
        <TextFormField {...register('email')} required label="Email" type="email" placeholder="johndoe@example.com" />

        <h4 className="text-xl font-semibold mt-8 mb-3">Shipping Details</h4>
        <TextFormField {...register('street_address')} required label="Street Address" type="text" placeholder="No: 1, ..." />
        <TextFormField {...register('city')} required label="City" type="text" placeholder="Kolkata" />
        <TextFormField {...register('state')} required label="State" type="text" placeholder="West Bengal" />
        <input className="mt-2 hover:shadow-lg cursor-pointer w-full py-1.5 rounded bg-pink-600 text-white text-lg tracking-wide uppercase font-semibold" type="submit" value="Proceed to payment" />
      </form>
    </PageContainer>
  )
};

export default Checkout;
