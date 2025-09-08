import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  OrderDetailsPage,
  TrackOrderPage,
} from "./routes/Routes";
import {
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProductPage,
  ShopAllProductsPage,
  ShopCreateEventPage,
  ShopAllEventsPage,
  ShopAllCouponsPage,
  ShopPreviewPage,
  ShopAllOrdersPage,
  ShopOrderDetailsPage,
  ShopAllRefundsPage,
  ShopSettingsPage,
  ShopWithdrawMoneyPage,
  ShopInboxPage,
} from "./routes/ShopRoutes.jsx";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { loadSeller, loadUser } from "./redux/actions/user";
import store from "./redux/store";
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/sellerProtectedRoute.jsx";
import { getAllProducts } from "./redux/actions/product.js";
import { getAllEvents } from "./redux/actions/event.js";
import { useState } from "react";
import axios from "axios";
import { server } from "./server.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeapiKey = async () => {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    // console.log(data);
    setStripeApiKey(data.stripeApiKey);
  };

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadSeller());
    store.dispatch(getAllProducts());
    store.dispatch(getAllEvents());
    getStripeapiKey();
  }, []);

  return (
    <>
      <BrowserRouter>
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Routes>
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Elements>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route
            path="/seller/activation/:activation_token"
            element={<SellerActivationPage />}
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/order/success" element={<OrderSuccessPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/track/order/:id"
            element={
              <ProtectedRoute>
                <TrackOrderPage />
              </ProtectedRoute>
            }
          />

          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
          {/* shop Routes */}
          <Route path="/shop-create" element={<ShopCreatePage />} />
          <Route path="/shop-login" element={<ShopLoginPage />} />
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <SellerProtectedRoute>
                <ShopSettingsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute>
                <ShopDashboardPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-product"
            element={
              <SellerProtectedRoute>
                <ShopCreateProductPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRoute>
                <ShopAllProductsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-event"
            element={
              <SellerProtectedRoute>
                <ShopCreateEventPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-events"
            element={
              <SellerProtectedRoute>
                <ShopAllEventsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-coupons"
            element={
              <SellerProtectedRoute>
                <ShopAllCouponsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-orders"
            element={
              <SellerProtectedRoute>
                <ShopAllOrdersPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-messages"
            element={
              <SellerProtectedRoute>
                <ShopInboxPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-refunds"
            element={
              <SellerProtectedRoute>
                <ShopAllRefundsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-withdraw-money"
            element={
              <SellerProtectedRoute>
                <ShopWithdrawMoneyPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <SellerProtectedRoute>
                <ShopOrderDetailsPage />
              </SellerProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </>
  );
}

export default App;
