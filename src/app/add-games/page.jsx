"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  Gamepad2,
  UploadCloud,
  DollarSign,
  Tag,
  AlignLeft,
  AlertCircle,
} from "lucide-react";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

 
  const isAdmin = session?.user?.role === "admin";

  
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleAddGame = async (e) => {
    e.preventDefault();

   
    if (isAdmin) return;

    setLoading(true);
    const form = e.target;
    const gameData = {
      title: form.title.value,
      price: parseFloat(form.price.value),
      category: form.category.value,
      thumbnail: form.thumbnail.value,
      description: form.description.value,
      sellerEmail: session?.user?.email,
      sellerName: session?.user?.name,
      createdAt: new Date(),
    };

    try {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameData),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          title: "Game Listed!",
          text: "Your game has been added to the store successfully.",
          icon: "success",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#6366f1",
        });
        form.reset();
        router.push("/games");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to add game",
        text: "Something went wrong. Please try again.",
        background: "#0f172a",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-indigo-600/10 rounded-2xl mb-4 border border-indigo-500/20">
            <Gamepad2 className="w-8 h-8 text-indigo-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
            List a New <span className="text-indigo-500">Game</span>
          </h1>
          <p className="text-slate-400 mt-3 font-medium">
            Fill in the details to add your game to our collection.
          </p>

          {/* Admin Warning Message */}
          {isAdmin && (
            <div className="mt-6 flex items-center justify-center gap-2 text-amber-500 bg-amber-500/10 py-3 px-6 rounded-xl border border-amber-500/20 max-w-md mx-auto">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">
                Admins are not allowed to list games
              </span>
            </div>
          )}
        </div>

        {/* Form Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/10 blur-[100px] rounded-full"></div>

          <form
            onSubmit={handleAddGame}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
          >
            {/* Game Title */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                <Tag className="w-3 h-3" /> Game Title
              </label>
              <input
                name="title"
                type="text"
                required
                disabled={isAdmin}
                placeholder="e.g. Forza Horizon 5"
                className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Price */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                <DollarSign className="w-3 h-3" /> Price ($)
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                required
                disabled={isAdmin}
                placeholder="e.g. 49.99"
                className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Category */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                Category
              </label>
              <select
                name="category"
                disabled={isAdmin}
                className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="RPG">RPG</option>
                <option value="Simulation">Simulation</option>
                <option value="Sports">Sports</option>
                <option value="Racing">Racing</option>
              </select>
            </div>

            {/* Thumbnail */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                <UploadCloud className="w-3 h-3" /> Thumbnail URL
              </label>
              <input
                name="thumbnail"
                type="url"
                required
                disabled={isAdmin}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Description */}
            <div className="space-y-3 md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                <AlignLeft className="w-3 h-3" /> Description
              </label>
              <textarea
                name="description"
                required
                disabled={isAdmin}
                rows="5"
                placeholder="Write a brief overview..."
                className="w-full bg-slate-950 border border-slate-800 text-white p-5 rounded-3xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              ></textarea>
            </div>

            {/* Submit Button - Updated Logic */}
            <div className="md:col-span-2 pt-4">
              <button
                disabled={loading || isAdmin}
                type="submit"
                className={`w-full font-black py-5 rounded-2xl transition-all shadow-xl active:scale-[0.98] uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 
                  ${
                    isAdmin
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed shadow-none"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"
                  } 
                  disabled:opacity-50`}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Processing...
                  </>
                ) : isAdmin ? (
                  "Action Disabled for Admin"
                ) : (
                  "List Game Now"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
