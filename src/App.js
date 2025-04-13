import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/shoppage/ShopPage";
//import DetailPage from "./pages/detaillpage/DetailPage";
import CartPage from "./pages/cartpage/CartPage";
import CheckoutPage from "./pages/checkoutpage/CheckoutPage";
import LoginPage from "./pages/loginpage/LoginPage";
import RegisterPage from "./pages/registerpage/RegisterPage";
import Layout from "./layout/Layout";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Popup from "./components/Popup";
import SignUp from "./Authentication/SignUp";
import SignIn from "./Authentication/SignIn";
import HistoryPage from "./pages/historypage/HistoryPage";
import OrderDetailPage from "./pages/historypage/OrderDetailPage";
import Livechat from "./livechat/Livechat";

import ProtectedRoute from "./livechat/ProtectedRoute";
import { lazy, Suspense } from "react";

const DetailPage = lazy(() => import("./pages/detaillpage/DetailPage"));
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route
              path="/detail/:productId"
              element={
                <Suspense fallback={<p>Loading...</p>}>
                  <DetailPage />
                </Suspense>
              }
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/order/:id" element={<OrderDetailPage />} />
          </Routes>
        </Layout>
        <Popup />
        <Livechat />
      </Router>
    </Provider>
  );
}

export default App;
