import React from "react";
import { dbConnect } from "@/mongodb/dbConnect";

const page = async () => {
  const gamesCollection = dbConnect("games");

 
  const newGames = await gamesCollection
    .find({ category: "New Release" })
    .sort({ createdAt: -1 }) 
    .toArray();
  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12 flex items-center gap-4">
          <div className="h-10 w-2 bg-indigo-500 rounded-full"></div>
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">
            New <span className="text-indigo-500">Releases</span>
          </h2>
          <span className="bg-indigo-500/10 text-indigo-400 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/20 animate-pulse">
            JUST LANDED
          </span>
        </div>

        {/* ২. গেম কার্ড গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {newGames.map((game) => (
            <div
              key={game._id.toString()}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300 group flex flex-col shadow-2xl"
            >
              {/* ইমেজ সেকশন */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* New Label */}
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded italic uppercase tracking-widest shadow-lg">
                  Recent
                </div>
                <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md text-white font-black px-3 py-1 rounded-xl border border-slate-700">
                  ${game.price}
                </div>
              </div>

              {/* কন্টেন্ট সেকশন */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {game.title}
                </h3>

                <p className="text-slate-400 text-sm mb-6 line-clamp-2 italic">
                  "{game.description}"
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                      Genre
                    </span>
                    <span className="text-sm text-indigo-400 font-bold">
                      {game.genre}
                    </span>
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                  View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ৩. নো ডাটা মেসেজ */}
        {newGames.length === 0 && (
          <div className="text-center py-24 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800">
            <p className="text-slate-500 text-lg italic">
              The vault is currently empty for new releases...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
