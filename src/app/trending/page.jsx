import React from "react";
import { dbConnect } from "@/mongodb/dbConnect";

const page = async () => {
  const gamesCollection = dbConnect("games");
  const trendingGames = await gamesCollection
    .find({ category: "Trending" })
    .toArray();
  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* হেডার সেকশন */}
        <div className="mb-10">
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">
            🔥 Trending <span className="text-indigo-500">Games</span>
          </h2>
          <p className="text-slate-400 mt-2">
            The most played and loved games right now.
          </p>
        </div>

        {/* ২. ডেটা রেন্ডারিং */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {trendingGames.map((game) => (
            <div
              key={game._id.toString()}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all group"
            >
              {/* ইমেজ কার্ড */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-indigo-600 text-white font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                  ${game.price}
                </div>
              </div>

              {/* কন্টেন্ট */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {game.title}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-yellow-400 font-bold">
                    ★ {game.rating}
                  </span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-400 text-sm font-medium italic">
                    {game.genre}
                  </span>
                </div>

                <button className="w-full bg-slate-800 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* যদি কোনো ডেটা না পাওয়া যায় */}
        {trendingGames.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-xl font-medium">
              No trending games available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
