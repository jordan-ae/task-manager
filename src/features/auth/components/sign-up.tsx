import { useContext, useState, type FormEvent } from "react";
import { AuthContext } from "../auth-context";
import { Link, useNavigate } from "react-router";

export function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth) {
    throw new Error("SignUpForm must be used within AuthProvide");
  }

  const { signup } = auth;

  function handleSignUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      signup(firstName, lastName, email, password);
      navigate("/");
    } catch (signupError) {
      if (signupError instanceof Error) {
        setError(signupError.message);
        return;
      }

      setError("Unable to create your account.");
    }
  }

  return (
    <form className="mt-7 grid gap-4" onSubmit={handleSignUp}>
      <p className="text-sm text-stone-600">
        Already have an account?{" "}
        <Link
          className="font-semibold text-orange-700 transition hover:text-orange-800"
          to="/login"
        >
          Log out
        </Link>
      </p>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <label className="text-xs font-bold uppercase tracking-[0.08em] text-stone-600">
            First name
          </label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
            value={firstName}
            placeholder="Jane"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-bold uppercase tracking-[0.08em] text-stone-600">
            Last name
          </label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
            value={lastName}
            placeholder="Doe"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-xs font-bold uppercase tracking-[0.08em] text-stone-600">
          Email
        </label>
        <input
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
          type="email"
          value={email}
          placeholder="jane@company.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <label className="text-xs font-bold uppercase tracking-[0.08em] text-stone-600">
            Password
          </label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
            type="password"
            value={password}
            placeholder="Create a password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-bold uppercase tracking-[0.08em] text-stone-600">
            Confirm password
          </label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
            type="password"
            value={confirmPassword}
            placeholder="Repeat your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded"
        type="submit"
      >
        Create account
      </button>

      <div className="text-gray-400 text-center mt-6">Or continue with</div>
      <div className="flex gap-4 mt-3">
        <button className="flex-1 bg-gray-800 text-white py-2 rounded">
          Google
        </button>
        <button className="flex-1 bg-gray-800 text-white py-2 rounded">
          Apple
        </button>
      </div>
    </form>
  );
}
