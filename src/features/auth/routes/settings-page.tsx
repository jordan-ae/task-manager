import { useContext, useState } from "react";
import { AuthContext } from "../../auth/auth-context";

export function SettingsPage() {
  const auth = useContext(AuthContext);

  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const profileName = auth?.userName || "Guest User";

  return (
    <div
      className={`min-h-screen p-6 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Settings
          </h1>
          <p
            className={`mt-1 text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Manage your profile, preferences, and notifications.
          </p>
        </div>

        <section
          className={`rounded-2xl p-6 shadow-sm ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Profile Info
          </h2>
          <p
            className={`mt-1 text-sm ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            Your account information.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                className={`mb-2 block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Full Name
              </label>
              <input
                type="text"
                value={profileName}
                readOnly
                className={`w-full rounded-lg border px-4 py-2 outline-none ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-50 text-gray-700"
                }`}
              />
            </div>

            <div>
              <label
                className={`mb-2 block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                value="Not available yet"
                readOnly
                className={`w-full rounded-lg border px-4 py-2 outline-none ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-gray-300"
                    : "border-gray-300 bg-gray-50 text-gray-500"
                }`}
              />
            </div>
          </div>
        </section>

        <section
          className={`rounded-2xl p-6 shadow-sm ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Preferences
          </h2>

          <div className="mt-6 space-y-4">
            <div
              className={`flex items-center justify-between rounded-lg border p-4 ${
                darkMode
                  ? "border-gray-600 bg-gray-700"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div>
                <h3
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Dark Mode
                </h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
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

        <section
          className={`rounded-2xl p-6 shadow-sm ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Notifications
          </h2>
          <p
            className={`mt-1 text-sm ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            Choose how you want to be notified.
          </p>

          <div className="mt-6 space-y-4">
            <ToggleRow
              title="Email Notifications"
              description="Receive updates through email."
              checked={emailNotifications}
              onToggle={() => setEmailNotifications(!emailNotifications)}
              darkMode={darkMode}
            />

            <ToggleRow
              title="Push Notifications"
              description="Get instant alerts in the app."
              checked={pushNotifications}
              onToggle={() => setPushNotifications(!pushNotifications)}
              darkMode={darkMode}
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
  darkMode: boolean;
};

function ToggleRow({
  title,
  description,
  checked,
  onToggle,
  darkMode,
}: ToggleRowProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border p-4 ${
        darkMode ? "border-gray-600 bg-gray-700" : "border-gray-200 bg-white"
      }`}
    >
      <div>
        <h3
          className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          {title}
        </h3>
        <p
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}
        >
          {description}
        </p>
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
