import { useContext, useState } from "react";
import { AuthContext } from "../../auth/auth-context";

export function SettingsPage() {
  const auth = useContext(AuthContext);

  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const profileName = auth?.userName || "Guest User";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your profile, preferences, and notifications.
          </p>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Profile Info</h2>
          <p className="mt-1 text-sm text-gray-500">
            Your account information.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={profileName}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value="Not available yet"
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-500 outline-none"
              />
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Preferences</h2>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
              <div>
                <h3 className="font-medium text-gray-900">Dark Mode</h3>
                <p className="text-sm text-gray-500">
                  Switch between light and dark appearance.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className={`relative h-6 w-12 rounded-full transition ${
                  darkMode ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    darkMode ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm text-gray-500">
            Choose how you want to be notified.
          </p>

          <div className="mt-6 space-y-4">
            <ToggleRow
              title="Email Notifications"
              description="Receive updates through email."
              checked={emailNotifications}
              onToggle={() => setEmailNotifications(!emailNotifications)}
            />

            <ToggleRow
              title="Push Notifications"
              description="Get instant alerts in the app."
              checked={pushNotifications}
              onToggle={() => setPushNotifications(!pushNotifications)}
            />

          </div>
        </section>
      </div>
    </div>
  );
}

type ToggleRowProps = {
  title: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
};

function ToggleRow({ title, description, checked, onToggle }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <button
        type="button"
        onClick={onToggle}
        className={`relative h-6 w-12 rounded-full transition ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked ? "left-7" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
