import React from "react";
import { dbConnect } from "@/mongodb/dbConnect";
import Link from "next/link";

const NewRelease = async () => {
  // ১. ডাটাবেস থেকে শুধু 'New Release' ক্যাটাগরির ৬টি গেম আনা
  const gamesCollection = dbConnect("games");
  const newGames = await gamesCollection
    .find({ category: "New Release" })
    .sort({ createdAt: -1 }) // নতুনগুলো আগে দেখাবে
    .limit(6)
    .toArray();

  return (
    <section className="bg-slate-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* সেকশন হেডার */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">
              New <span className="text-indigo-500">Arrivals</span>
            </h2>
            <div className="h-1 w-20 bg-indigo-500 mt-2"></div>
          </div>
          <Link
            href="/new-release"
            className="text-slate-400 hover:text-indigo-500 font-bold transition-all text-sm uppercase tracking-widest"
          >
            See All Releases →
          </Link>
        </div>

        {/* ২. গেম কার্ড গ্রিড (৩ কলামে ৬টি গেম) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newGames.map((game) => (
            <div
              key={game._id.toString()}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:bg-slate-900 transition-all group relative"
            >
              {/* ইমেজ সেকশন */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                  NEW
                </div>
              </div>

              {/* কন্টেন্ট সেকশন */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {game.title}
                  </h3>
                  <span className="text-indigo-400 font-black">
                    ${game.price}
                  </span>
                </div>

                <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                  {game.description}
                </p>

                <Link href={`/games/${game._id.toString()}`}>
                  <button className="w-full bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-600/20 text-indigo-400 hover:text-white font-bold py-3 rounded-xl transition-all">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* যদি ডেটা না থাকে */}
        {newGames.length === 0 && (
          <div className="text-center text-slate-700 py-10">
            Stay tuned! New games are coming soon.
          </div>
        )}
      </div>
    </section>
  );
};

export default NewRelease;
