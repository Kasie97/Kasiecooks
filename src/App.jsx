import "./App.css";
import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/homePage/homePage";
import SignUp from "./pages/signUp/signUp";
import SignIn from "./pages/signIn/signIn";
import ResetPassword from "./pages/resetPassword/resetPassword";
import NewPassword from "./pages/resetPassword/newPassword";
import UserConfirmation from "./pages/verifyEmail/verifyEmail";
import Dashboard from "./pages/dashboard/dashboard";
import OrderReceiptModal from "./components/cart/OrderReceiptModal";
import AdminDashboard from "./pages/adminDashboard/adminDashboard";
import EditDish from "./pages/editDish/EditDish";
import HistoryPage from "./pages/historyPage/historyPage";

import UserHistory from "./pages/userHistory/useHistory";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/input-new-password/:token" element={<NewPassword />} />
        <Route path="/users/confirm/:userId/:token" element={<UserConfirmation />}/>
        <Route path="/Order-placed" element={<OrderReceiptModal />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/editdish/:id" element={<EditDish />} />
        <Route path="/historyPage" element={<HistoryPage />} />
        <Route path="/orders-history" element={<UserHistory />} />
        
      </Routes>
    </>
  );
}

export default App;
