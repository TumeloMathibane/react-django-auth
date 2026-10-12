import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-indigo-100">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Dashboard
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {user ? `Welcome, ${user.username}` : "Welcome, user"}
            </h2>
          </div>
          <button
            onClick={logout}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:text-red-600"
          >
            Logout
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-indigo-50 p-5">
            <p className="text-sm text-indigo-700">Username</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">
              {user?.username || "Not available"}
            </p>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-5">
            <p className="text-sm text-emerald-700">Email</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">
              {user?.email || "Not available"}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/"
            className="rounded-xl bg-slate-900 px-4 py-2.5 font-medium text-white transition hover:bg-slate-700"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
