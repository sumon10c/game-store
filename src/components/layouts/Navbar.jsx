import React from "react";
import Link from "next/link";
import { Gamepad2 } from "lucide-react";

const Navbar = () => {
  return (
    <div className="navbar bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-50 px-4 md:px-8">
      {/* 1. Navbar Start: Logo & Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-900 rounded-box z-[1] mt-3 w-52 p-4 shadow-2xl border border-slate-800 space-y-2"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/games">Games Store</Link>
            </li>
            <li>
              <Link href="/trending">Trending</Link>
            </li>
            <li>
              <Link href="/new-releases">New Releases</Link>
            </li>
            <div className="divider my-1"></div>
            <li>
              <Link
                href="/login"
                className="btn btn-sm btn-outline btn-primary text-white"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="btn btn-sm btn-primary text-white"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group ml-2 lg:ml-0">
          <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic hidden sm:block">
            Game<span className="text-indigo-500">Store</span>
          </span>
        </Link>
      </div>

      {/* 2. Navbar Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-bold uppercase text-sm tracking-wide">
          <li>
            <Link href="/" className="hover:text-indigo-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/games"
              className="hover:text-indigo-400 transition-colors"
            >
              Games Store
            </Link>
          </li>
          <li>
            <Link
              href="/trending"
              className="hover:text-indigo-400 transition-colors"
            >
              Trending
            </Link>
          </li>
          <li>
            <Link
              href="/new-releases"
              className="hover:text-indigo-400 transition-colors"
            >
              New Releases
            </Link>
          </li>
        </ul>
      </div>

      {/* 3. Navbar End: Auth Buttons */}
      <div className="navbar-end gap-3">
        <Link
          href="/login"
          className="btn btn-ghost btn-sm font-bold hidden sm:flex"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="btn btn-primary btn-sm px-6 font-bold rounded-lg shadow-lg shadow-indigo-500/20"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
