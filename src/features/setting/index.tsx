import { useState } from "react";
import { useAuthStore } from "../auth/store/useAuthStore";

const Settings = () => {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-[#0b0f1a] min-h-screen text-gray-100">
      {/* Header Section */}
      <header className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
        <p className="text-gray-400 mt-2">
          Manage your profile, security, and preferences.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar Navigation (Desktop) */}
        <aside className="lg:col-span-3 space-y-2">
          <nav className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1">
            <SidebarItem label="General" active />
            <SidebarItem label="Security" />
            <SidebarItem label="Notifications" />
            <SidebarItem label="Billing" />
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-8">
          {/* Section: Profile Information */}
          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-800 bg-gray-900/80">
              <h3 className="text-lg font-semibold text-white">
                Public Profile
              </h3>
              <p className="text-sm text-gray-400">
                This information will be displayed publicly.
              </p>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="First Name"
                  defaultValue={user?.first_name}
                />
                <InputField label="Last Name" defaultValue={user?.last_name} />
              </div>
              <InputField
                label="Email Address"
                defaultValue={user?.email}
                disabled
                tooltip="Email cannot be changed without verification."
              />
              <InputField
                label="Username"
                defaultValue={user?.user_name}
                prefix="@"
              />
            </div>
          </section>

          {/* Section: Security */}
          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl shadow-sm">
            <div className="p-6 border-b border-gray-800 bg-gray-900/80">
              <h3 className="text-lg font-semibold text-white">
                Password & Security
              </h3>
            </div>
            <div className="p-6 space-y-5">
              <InputField
                label="Current Password"
                type="password"
                placeholder="••••••••"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="New Password"
                  type="password"
                  placeholder="••••••••"
                />
                <InputField
                  label="Confirm New Password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <div className="pt-2">
                <button className="bg-white hover:bg-gray-200 text-gray-900 px-5 py-2 rounded-lg text-sm font-bold transition-all transform active:scale-95">
                  Update Password
                </button>
              </div>
            </div>
          </section>

          {/* Section: Notifications Toggle */}
          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 flex items-center justify-between shadow-sm">
            <div className="max-w-[70%]">
              <h3 className="font-semibold text-white">Email Notifications</h3>
              <p className="text-sm text-gray-400 mt-1">
                Get notified about login attempts and security updates.
              </p>
            </div>
            <Toggle enabled={notifications} setEnabled={setNotifications} />
          </section>

          {/* Final Action Bar */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-800">
            <button className="text-gray-400 hover:text-white text-sm font-medium px-4 py-2">
              Cancel
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 px-8 py-2.5 rounded-xl font-semibold transition-all">
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- Sub-Components for Cleanliness --- */

const SidebarItem = ({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) => (
  <button
    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
      active
        ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20"
        : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
    }`}
  >
    {label}
  </button>
);

const InputField = ({
  label,
  type = "text",
  placeholder,
  defaultValue,
  disabled,
  prefix,
  tooltip,
}: any) => (
  <div className="space-y-1.5 group">
    <div className="flex justify-between items-center">
      <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 group-focus-within:text-indigo-400 transition-colors">
        {label}
      </label>
      {tooltip && (
        <span className="text-[10px] text-gray-500 italic">{tooltip}</span>
      )}
    </div>
    <div className="relative flex items-center">
      {prefix && (
        <span className="absolute left-4 text-gray-500 pointer-events-none">
          {prefix}
        </span>
      )}
      <input
        type={type}
        disabled={disabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`w-full bg-gray-950/50 border border-gray-800 rounded-xl px-4 py-2.5 text-sm transition-all outline-none 
          ${prefix ? "pl-9" : "pl-4"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 hover:border-gray-700"}
        `}
      />
    </div>
  </div>
);

const Toggle = ({
  enabled,
  setEnabled,
}: {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
}) => (
  <button
    onClick={() => setEnabled(!enabled)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
      enabled ? "bg-indigo-600" : "bg-gray-700"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

export default Settings;
