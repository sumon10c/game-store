"use client";
import React from "react";
import Link from "next/link";
import { Gamepad2, LogOut, PlusCircle } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="navbar bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-50 px-4 md:px-8">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
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
              <Link href="/new-releases">New Release</Link>
            </li>

            
            {session && (
              <li>
                <Link href="/add-games">Add Games</Link>
              </li>
            )}

            <li>
              <Link href="/trending">Trending</Link>
            </li>
            <div className="divider my-1"></div>
            {!session ? (
              <>
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => signOut()}
                  className="text-red-500 font-bold"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        <Link href="/" className="flex items-center gap-2 group ml-2 lg:ml-0">
          <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic hidden sm:block">
            Game<span className="text-indigo-500">Store</span>
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-bold uppercase text-sm tracking-wide">
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
              <Link href="/new-releases">New Release</Link>
            </li>

         
          {session && (
            <li>
              <Link href="/add-games">
                <PlusCircle className="w-4 h-4" /> Add Games
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {status === "loading" ? (
          <span className="loading loading-spinner loading-sm text-indigo-500"></span>
        ) : !session ? (
          <div className="flex items-center gap-2">
            
            <Link
              href="/login"
              className="btn btn-ghost btn-sm font-bold hidden sm:flex"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="btn btn-primary btn-sm px-6 font-bold rounded-lg bg-indigo-600 border-none text-white hover:bg-indigo-500 transition-all"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter leading-none mb-1">
                Welcome,
              </p>
              <p className="text-sm font-black text-white leading-none tracking-tight">
                {session.user?.name}
              </p>
            </div>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-indigo-500/50 p-0.5"
              >
                <div className="w-full rounded-full ring ring-offset-2 ring-slate-950">
                  <img
                    src={
                      session.user?.image ||
                      "https://i.ibb.co/v38Yf7D/avatar.png"
                    }
                    alt="profile"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-slate-900 rounded-box z-[1] mt-3 w-52 p-4 shadow-2xl border border-slate-800"
              >
                <li>
                  <Link href="/profile">My Profile</Link>
                </li>
                <div className="divider my-0 opacity-20"></div>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="text-red-400 flex items-center justify-between"
                  >
                    Logout <LogOut className="w-4 h-4" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
