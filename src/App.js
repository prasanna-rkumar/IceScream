import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import "react-toastify/dist/ReactToastify.css";

import Login from './components/Login';
import Register from './components/Register';
import DoNotAllowIfLoggedInRoute from './components/Routes/DoNotAllowIfLoggedInRoute';
import HomePage from './components/HomePage';
import IcecreamEditor from './components/IcecreamEditor';
import IceCreamDetails from './components/IceCreamDetails';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import Checkout from './components/Checkout';

export const client = new ApolloClient({
  uri: 'https://api-ap-northeast-1.graphcms.com/v2/cknxj9gdyotw001yzbc15fjcf/master',
  cache: new InMemoryCache()
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <CartProvider>
          <Switch>
            <DoNotAllowIfLoggedInRoute path="/login" component={Login} />
            <DoNotAllowIfLoggedInRoute path="/register" component={Register} />
            <ProtectedRoute path="/checkout" component={Checkout} />
            <Route exact path="/ice-cream/:id/:nickname">
              <IceCreamDetails />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/ice-cream-editor">
              <IcecreamEditor />
            </Route>
          </Switch>
        </CartProvider>

      </ApolloProvider>
    </Router>
  );
}

export default App;