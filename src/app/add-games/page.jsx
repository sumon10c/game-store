"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Gamepad2, UploadCloud, DollarSign, Tag, AlignLeft } from "lucide-react";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // লগইন না থাকলে প্রটেকশন (কেউ সরাসরি URL দিয়ে ঢুকতে পারবে না)
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleAddGame = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const gameData = {
      title: form.title.value,
      price: parseFloat(form.price.value),
      category: form.category.value,
      thumbnail: form.thumbnail.value,
      description: form.description.value,
      sellerEmail: session?.user?.email, // ইউজারের ইমেইল ট্র্যাকিংয়ের জন্য
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
        router.push("/games"); // গেম স্টোর পেজে পাঠিয়ে দিবে
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
          <p className="text-slate-400 mt-3 font-medium">Fill in the details to add your game to our collection.</p>
        </div>

        {/* Form Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/10 blur-[100px] rounded-full"></div>
          
          <form onSubmit={handleAddGame} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            
            {/* Game Title */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                <Tag className="w-3 h-3" /> Game Title
              </label>
              <input
                name="title"
                type="text"
                required
                placeholder="e.g. Forza Horizon 5"
                className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
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
                placeholder="e.g. 49.99"
                className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Category Selection */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                Category
              </label>
              <select
                name="category"
                className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
              >
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="RPG">RPG</option>
                <option value="Simulation">Simulation</option>
                <option value="Sports">Sports</option>
                <option value="Racing">Racing</option>
              </select>
            </div>

            {/* Thumbnail Image URL */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                <UploadCloud className="w-3 h-3" /> Thumbnail URL
              </label>
              <input
                name="thumbnail"
                type="url"
                required
                placeholder="https://example.com/image.jpg"
                className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
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
                rows="5"
                placeholder="Write a brief overview of the game mechanics and story..."
                className="w-full bg-slate-950 border border-slate-800 text-white p-5 rounded-3xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-4">
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-50 uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Processing...
                  </>
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

export default page;