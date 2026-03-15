import React from "react";
import { dbConnect } from "@/mongodb/dbConnect";
import { ObjectId } from "mongodb"; 

const page = async ({ params }) => {
  const { id } = await params;
  
  const gamesCollection = await dbConnect("games");
  
 
  const game = await gamesCollection.findOne({ _id: new ObjectId(id) });

  if (!game) {
    return <div className="text-white text-center py-20">Game not found!</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          <div className="h-[400px] md:h-full">
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className="text-indigo-500 font-bold uppercase tracking-widest text-sm mb-2">
              {game.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 italic uppercase leading-none">
              {game.title}
            </h1>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              {game.description}
            </p>
            
            <div className="flex items-center justify-between mt-auto">
              <span className="text-3xl font-bold text-white">${game.price}</span>
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-2xl transition-all transform active:scale-95 shadow-lg shadow-indigo-600/20">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;