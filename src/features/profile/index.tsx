import { useAuthStore } from "../auth/store/useAuthStore";
import {
  Mail,
  Phone,
  ShieldCheck,
  ShieldAlert,
  Edit2,
  MapPin,
  Calendar,
} from "lucide-react";

const Profile = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-3xl mx-auto">
      {/* Profile Card Container */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header/Cover Section */}
        <div className="h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" />

        <div className="px-8 pb-8">
          {/* Avatar & Action Header */}
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="p-1 bg-gray-900 rounded-full">
              <div className="w-24 h-24 bg-gray-800 rounded-full border-4 border-gray-900 overflow-hidden flex items-center justify-center">
                {user?.profile_pic ? (
                  <img
                    src={user.profile_pic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-gray-600">
                    {user?.first_name?.[0]}
                    {user?.last_name?.[0]}
                  </span>
                )}
              </div>
            </div>
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 shadow-lg shadow-indigo-500/20">
              <Edit2 size={16} />
              Edit Profile
            </button>
          </div>

          {/* User Identification */}
          <div className="space-y-1 mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              {user?.first_name} {user?.last_name}
              {user?.email_verified && (
                <ShieldCheck className="text-blue-400 w-5 h-5" />
              )}
            </h2>
            <p className="text-gray-400 flex items-center gap-2">
              <span className="text-indigo-400 font-medium">
                @{user?.user_name}
              </span>
              <span className="text-gray-600 text-xs">•</span>
              <span className="text-xs">ID: {user?.user_id}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information Group */}
            <section className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                Contact Details
              </h3>

              <InfoTile
                icon={<Mail size={18} />}
                label="Email Address"
                value={user?.email}
                verified={user?.email_verified}
              />

              <InfoTile
                icon={<Phone size={18} />}
                label="Phone Number"
                value={user?.mobile_number}
                verified={user?.phone_verified}
              />
            </section>

            {/* Account Details Group */}
            <section className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                Account Info
              </h3>

              <div className="bg-gray-800/40 border border-gray-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={16} className="text-gray-500" />
                  <span className="text-gray-300">Location Not Set</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={16} className="text-gray-500" />
                  <span className="text-gray-300">Joined March 2024</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- Refined Sub-component --- */

const InfoTile = ({ icon, label, value, verified }: any) => (
  <div className="group bg-gray-800/40 border border-gray-800 p-4 rounded-2xl hover:border-gray-700 transition-colors">
    <div className="flex items-center gap-3 mb-1">
      <div className="text-indigo-400">{icon}</div>
      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">
        {label}
      </p>
    </div>
    <div className="flex justify-between items-center ml-7">
      <span className="text-gray-100 font-medium truncate pr-2">
        {value || "Not provided"}
      </span>
      {verified ? (
        <div title="Verified">
          <ShieldCheck size={14} className="text-green-500 shrink-0" />
        </div>
      ) : (
        <div title="Unverified">
          <ShieldAlert size={14} className="text-amber-500 shrink-0" />
        </div>
      )}
    </div>
  </div>
);

export default Profile;
