import React from "react";
import { dbConnect } from "@/mongodb/dbConnect";
import { ObjectId } from "mongodb";
import OrderModal from "@/components/OrderModal";

const GameDetailsPage = async ({ params }) => {

  const { id } = await params;


  const gamesCollection = await dbConnect("games");
  const game = await gamesCollection.findOne({ _id: new ObjectId(id) });

  if (!game) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <h1 className="text-white text-2xl font-bold">Game not found!</h1>
      </div>
    );
  }

  
  const plainGame = JSON.parse(JSON.stringify(game));

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
       
          <div className="h-[400px] md:h-full relative group">
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className="text-indigo-500 font-bold uppercase tracking-widest text-sm mb-2 border-l-2 border-indigo-500 pl-3">
              {game.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 italic uppercase leading-none tracking-tighter">
              {game.title}
            </h1>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-medium">
              {game.description}
            </p>

            <div className="flex items-center justify-between mt-auto bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
              <div className="flex flex-col">
                <span className="text-slate-500 text-xs uppercase font-bold tracking-widest">
                  Price
                </span>
                <span className="text-4xl font-black text-white">
                  ${game.price}
                </span>
              </div>

              
              <OrderModal game={plainGame} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsPage;
