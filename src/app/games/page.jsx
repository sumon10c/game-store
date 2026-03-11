import React from "react";
import { dbConnect } from "@/mongodb/dbConnect";
import Link from "next/link";

// ১. searchParams এখন async ভাবে ডিক্লেয়ার করতে হবে
const page = async ({ searchParams }) => {
  // ২. searchParams কে await করে আনওয়্যাপ (unwrap) করুন
  const params = await searchParams;
  const currentPage = parseInt(params.page) || 1;
  const itemsPerPage = 12;

  const gamesCollection = dbConnect("games");

  // মোট গেমের সংখ্যা এবং পেজ ক্যালকুলেশন
  const totalGames = await gamesCollection.countDocuments();
  const totalPages = Math.ceil(totalGames / itemsPerPage);

  // MongoDB থেকে নির্দিষ্ট পেজের ডেটা আনা
  const games = await gamesCollection
    .find({})
    .skip((currentPage - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .toArray();

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-white italic uppercase mb-10 border-l-4 border-indigo-500 pl-4">
          All <span className="text-indigo-500">Games</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <div
              key={game._id.toString()}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500 transition-all group flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
                  ${game.price}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-white mb-2 leading-tight">
                  {game.title}
                </h2>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {game.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs text-indigo-400 font-semibold uppercase italic">
                    {game.category}
                  </span>
                  <button className="bg-slate-800 hover:bg-indigo-600 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ৩. কন্ট্রোল বাটন লজিক */}
        <div className="mt-16 flex justify-center items-center gap-6">
          <Link
            href={`/games?page=${currentPage - 1}`}
            className={`px-6 py-2 rounded-xl font-bold transition-all border border-indigo-500 ${
              currentPage <= 1
                ? "opacity-30 cursor-not-allowed text-slate-500 border-slate-700"
                : "text-indigo-500 hover:bg-indigo-500 hover:text-white"
            }`}
          >
            Previous
          </Link>

          <span className="text-white font-mono bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
            {currentPage} / {totalPages}
          </span>

          <Link
            href={`/games?page=${currentPage + 1}`}
            className={`px-6 py-2 rounded-xl font-bold transition-all border border-indigo-500 ${
              currentPage >= totalPages
                ? "opacity-30 cursor-not-allowed text-slate-500 border-slate-700"
                : "text-indigo-500 hover:bg-indigo-500 hover:text-white"
            }`}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
