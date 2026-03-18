import { useContext, useState } from "react";
import { AuthContext } from "../auth-context";
import { Link, useNavigate } from "react-router";
import type { FormEvent } from "react";
import { FaLock } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [error, setError] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth) {
    throw new Error("LoginForm must be used within AuthProvide");
  }

  const { login } = auth;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      login(email, password);
      navigate("/");
    } catch (loginError) {
      if (loginError instanceof Error) {
        setError(loginError.message);
        return;
      }

      setError("Unable to log in.");
    }
  }

  return (
    <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
      {showForgot && (
        <div className="grid gap-3">
          <h2 className="text-xl text-white">Reset Password</h2>

          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded bg-gray-800 text-white"
          />

          <button
            type="button"
            className="bg-orange-500 p-3 rounded text-white"
          >
            Reset Password
          </button>

          <button
            type="button"
            onClick={() => setShowForgot(false)}
            className="text-sm text-gray-400"
          >
            Back
          </button>
        </div>
      )}
      <div className="grid gap-2">
        <label className="text-xs font-bold uppercase tracking-[0.08em] text-stone-600">
          <FaEnvelope className="text-gray-400 mr-2" />
          Email
        </label>
        <input
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-xs font-bold uppercase tracking-[0.08em] text-stone-600">
          <FaLock className="text-gray-400 mr-2" />
          Password
        </label>
        <input
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex-justify-end">
          <button
            type="button"
            onClick={() => setShowForgot(true)}
            className="text-orange-700 hover:text-orange-800 text-sm mt-1"
          >
            Forgotpassword?
          </button>
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
        Login
      </button>

      <div className="text-gray-400 text-center mt-6">Or continue with</div>

      <div className="flex gap-4 mt-3">
        <button className="flex-1 bg-gray-800 text-white py-2 rounded">
          Google
        </button>
        <button className="flex-1 bg-gray-800 text-white py-2 rounded">
          GitHub
        </button>
      </div>
      <p className="text-sm text-stone-600">
        Don&apos;t have an account?{" "}
        <Link
          className="font-semibold text-orange-700 transition hover:text-orange-800"
          to="/sign-up"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
