import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <div className="w-full max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-indigo-100 md:p-14">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Secure auth
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Protect your app with smart authentication.
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              A clean React + Django authentication starter with login,
              registration, protected routing, and JWT session handling.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={user ? "/dashboard" : "/login"}
                className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500"
              >
                {user ? "Go to dashboard" : "Login"}
              </Link>
              <Link
                to="/register"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
              >
                Create account
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-xl shadow-slate-200">
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
              <p className="text-sm text-slate-300">Current status</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-semibold">User</span>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-300">
                  {user ? "Authenticated" : "Guest"}
                </span>
              </div>
              <div className="mt-6 rounded-xl bg-slate-700 p-4 text-sm text-slate-200">
                {user ? `Signed in as ${user.username}` : "No active session"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
