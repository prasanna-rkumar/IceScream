import { useState } from "react";
import { toast } from "react-toastify";
import TextFormField from "./shared/TextFormField";
import { iceCreamAuth } from "../firebase";
import { Link, useHistory } from "react-router-dom";
import GoogleAuthButton from './shared/GoogleAuthButton';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const onSubmit = (email, password) => {
    iceCreamAuth.signInWithEmailAndPassword(email, password).catch((error) => {
      switch (error.code) {
        case "auth/user-not-found":
          toast.warning(
            <p className="text-gray-800">
              Email Id does not exist!{" "}
              <Link className="text-blue-600 underline" to="/register">
                Click here to register
              </Link>
            </p>,
            {
              onClick: () => history.push("/register"),
            }
          );
          break;
        default:
          console.log('default')
      }
      console.log(error);
    });
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-200 px-2">
      <div className="max-w-xl w-full bg-white rounded shadow-inner border-2 border-gray-300 p-8">
        <header>
          <h1 className="text-4xl text-yellow-500 font-bold mb-6">IceScream</h1>
          <h3 className="text-xl font-semibold mb-1.5">Welcome back</h3>
          <h6 className="">
            New here?{" "}
            <Link to="/register" className="text-blue-600 underline">
              Create an account
            </Link>
          </h6>
        </header>
        <main className="mt-6 mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(email, password);
            }}
          >
            <TextFormField
              required
              label="Email"
              type="email"
              placeholder="john.doe@example.com"
              value={email}
              onChange={(event) => void setEmail(event.target.value)}
            />
            <TextFormField
              required
              label="Password"
              type="password"
              placeholder="your password"
              value={password}
              onChange={(event) => void setPassword(event.target.value)}
            />
            <input
              className="w-full transition-colors my-2 hover:bg-yellow-600 cursor-pointer rounded h-12 text-white font-medium text-base bg-yellow-500"
              type="submit"
              value="Login"
            />
            <button
              className="w-full transition-colors my-2 bg-yellow-500 bg-opacity-0 hover:bg-opacity-10 cursor-pointer rounded h-12 border-2 border-yellow-500 font-medium text-base text-yellow-500"
              onClick={(e) => {
                setEmail("afellowdev@internet.com");
                setPassword("mysterydev");
                onSubmit("afellowdev@internet.com", "mysterydev");
              }}
            >
              Login as Guest
            </button>
          </form>
          <div className="flex flex-row justify-between items-center gap-4 my-6">
            <Hr />
            <div className="font-medium text-gray-500">or</div>
            <Hr />
          </div>
          <div>
            <GoogleAuthButton />
          </div>
        </main>
      </div>
    </div>
  );
};

const Hr = () => (
  <div className="h-0.5 bg-black bg-opacity-30 w-full"></div>
);

export default Login;
