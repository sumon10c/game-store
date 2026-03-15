"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Mail, User, Calendar, ShieldCheck } from "lucide-react";

const page = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-indigo-500"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p className="text-xl font-bold">Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-3xl rounded-full"></div>

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-indigo-500 p-1">
                <img
                  src={
                    session.user?.image || "https://i.ibb.co/v38Yf7D/avatar.png"
                  }
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-slate-900"></div>
            </div>

            {/* Basic Info */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                {session.user?.name}
              </h1>
              <p className="text-indigo-400 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                <ShieldCheck className="w-4 h-4" /> Verified Gamer
              </p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* User Details Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              Account Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <User className="text-indigo-500 w-5 h-5" />
                <div>
                  <p className="text-xs text-slate-500">Full Name</p>
                  <p className="text-white font-medium">{session.user?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <Mail className="text-indigo-500 w-5 h-5" />
                <div>
                  <p className="text-xs text-slate-500">Email Address</p>
                  <p className="text-white font-medium">
                    {session.user?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Activity/Stats Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              App Settings
            </h3>
            <div className="space-y-4">
              <button className="w-full text-left p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 text-white transition-colors">
                Edit Profile
              </button>
              <button className="w-full text-left p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 text-white transition-colors">
                My Game Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
