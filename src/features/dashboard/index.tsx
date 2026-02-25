import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
} from "lucide-react";
import { useAuthStore } from "../auth/store/useAuthStore";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Next Tech
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={location.pathname === "/dashboard"}
            onClick={() => navigate("/dashboard")}
          />

          <NavItem
            icon={<User size={20} />}
            label="Profile"
            active={location.pathname === "/dashboard/profile"}
            onClick={() => navigate("/dashboard/profile")}
          />

          <NavItem
            icon={<Settings size={20} />}
            label="Settings"
            active={location.pathname === "/dashboard/settings"}
            onClick={() => navigate("/dashboard/settings")}
          />
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-gray-900/50 backdrop-blur-md">
          <div className="relative w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-800 border border-gray-700 rounded-full py-1.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition">
              <Bell size={20} />
            </button>

            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">
              {user?.first_name?.charAt(0)}
            </div>
          </div>
        </header>

        {/* 🔥 BODY CONTENT CHANGES HERE */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const NavItem = ({
  icon,
  label,
  active,
  onClick,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${
      active
        ? "bg-indigo-600 text-white"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

export default DashboardLayout;
