import React from "react";
import { Star, Quote } from "lucide-react";

const CommunityReviews = () => {
  const reviews = [
    {
      name: "Sabbir Ahmed",
      role: "Hardcore Gamer",
      image: "https://i.pravatar.cc/150?u=sabbir",
      review:
        "The best place to buy keys! I got my Cyberpunk 2077 key instantly. Highly recommended for every gamer.",
      rating: 5,
    },
    {
      name: "Anika Tabassum",
      role: "Streamer",
      image: "https://i.pravatar.cc/150?u=anika",
      review:
        "The UI is so clean and the support team is very helpful. I had an issue with payment and they fixed it in 5 mins!",
      rating: 5,
    },
    {
      name: "Rakib Hossain",
      role: "Casual Player",
      image: "https://i.pravatar.cc/150?u=rakib",
      review:
        "Competitive prices and very secure. I love the collection of indie games here. My go-to store from now on.",
      rating: 4,
    },
  ];

  return (
    <section className="bg-slate-950 py-24 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
              Community <span className="text-indigo-500">Reviews</span>
            </h2>
            <p className="text-slate-500 mt-2 font-bold uppercase tracking-widest text-xs">
              What our fellow gamers say
            </p>
          </div>
          <div className="hidden md:block h-px flex-1 bg-slate-800 mx-10"></div>
          <div className="bg-indigo-600/10 border border-indigo-500/20 px-6 py-2 rounded-2xl">
            <span className="text-white font-black text-xl italic">
              4.9/5.0
            </span>
            <span className="text-slate-500 text-xs ml-2 font-bold uppercase">
              Avg Rating
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-slate-900/60 border border-slate-800 p-8 rounded-[2.5rem] relative group hover:border-indigo-500/40 transition-all duration-500"
            >
              <Quote className="absolute top-8 right-8 text-slate-800 group-hover:text-indigo-500/20 transition-colors w-12 h-12" />

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={rev.image}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-800 group-hover:border-indigo-500 transition-all"
                  alt={rev.name}
                />
                <div>
                  <h4 className="text-white font-bold italic uppercase tracking-tight">
                    {rev.name}
                  </h4>
                  <p className="text-indigo-500 text-[10px] font-black uppercase tracking-widest">
                    {rev.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${
                      i < rev.rating
                        ? "fill-amber-500 text-amber-500"
                        : "text-slate-700"
                    }`}
                  />
                ))}
              </div>

              <p className="text-slate-400 text-sm leading-relaxed italic font-medium">
                "{rev.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityReviews;
