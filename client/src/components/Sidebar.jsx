import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import { FaHandHolding } from "react-icons/fa";
import { useAuth } from "../hooks/useUser";

const Sidebar = () => {
  const location = useLocation();
  const { logOut } = useAuth();

  const navItems = [
    {
      to: "/admin/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      to: "/admin/dashboard/users",
      label: "Users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      to: "/dashboard/candidates",
      label: "Candidates",
      icon: <FaHandHolding className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 flex flex-col bg-white shadow-md">
        <div className="p-4 flex items-center justify-center">
          <img src="/logo.png" alt="logo.png" className="w-20 " />
        </div>
        <nav className="flex-1 flex flex-col gap-1 p-4">
          {navItems.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                to === "/admin/dashboard"
                  ? location.pathname === "/admin/dashboard"
                    ? "bg-green-500 text-white"
                    : "text-gray-600 hover:bg-green-100"
                  : location.pathname.startsWith(to)
                  ? "bg-green-500 text-white"
                  : "text-gray-600 hover:bg-green-100"
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 mb-4">
          <Link
            onClick={logOut}
            // to="/"
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-100 rounded-lg"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
