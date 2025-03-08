import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";
import UserDashboard from "./pages/Dashboards/UserDashboard";
import Header from "./components/Header";
import PrivateRoutes from "./routes/protectedRoutes";
import Sidebar from "./components/Sidebar";
import UserForm from "./components/UserForm";
import { Toaster } from "react-hot-toast";
import UserList from "./pages/Dashboards/Users";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<LoginForm />} />

        <Route element={<PrivateRoutes />}>
          <Route
            path="/admin/dashboard"
            element={
              <>
                <Sidebar />
              </>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users/register" element={<UserForm />} />
            <Route path="users/update/:id" element={<UserForm />} />
            <Route path="users" element={<UserList />} />
          </Route>
          <Route
            path="/user/dashboard"
            element={
              <>
                <Header />
                <UserDashboard />
              </>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
