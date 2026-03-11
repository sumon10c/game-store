"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { Play, X } from "lucide-react";
import Link from "next/link";

const Banner = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const slides = [
    {
      id: 1,
      title: "Black Myth: Wukong",
      description:
        "Experience the legend of the Sun Wukong in this action-packed RPG.",
      image: "https://i.ibb.co.com/QFzZh2Y3/1379254.jpg",
      videoUrl:
        "https://www.youtube.com/embed/pnSsgRJmsCc?autoplay=1&controls=1&mute=0&rel=0",
    },
    {
      id: 2,
      title: "Elden Ring: Shadow of the Erdtree",
      description:
        "Rise, Tarnished, and let us walk a new path together in the Land of Shadow.",
      image: "https://i.ibb.co.com/C3LDb0Ct/1291883.png",
      videoUrl:
        "https://www.youtube.com/embed/qLZenOn7WUo?autoplay=1&controls=1&mute=0&rel=0",
    },
    {
      id: 3,
      title: "GTA VI",
      description:
        "Welcome back to Vice City. The most anticipated open-world game of the decade.",
      image:
        "https://i.ibb.co.com/hR4rJcC7/4c09a11c959eb85b6e1850fb544a3a568e8a4f0ea84413e3.avif",
      videoUrl:
        "https://www.youtube.com/embed/QdBZY2fkU-0?autoplay=1&controls=1&mute=0&rel=0",
    },
    {
      id: 4,
      title: "Cyberpunk 2077: Phantom Liberty",
      description:
        "Enter the world of Cyberpunk as V and explore the dangerous district of Dogtown.",
      image: "https://i.ibb.co.com/chCqVBsP/1365425.png",
      videoUrl:
        "https://www.youtube.com/embed/sJbexcm4Trk?autoplay=1&controls=1&mute=0&rel=0",
    },
    {
      id: 5,
      title: "Valorant",
      description:
        "Master the art of tactical shooting and unique abilities in Riot's premier FPS.",
      image: "https://i.ibb.co.com/fzCqjfqc/1402808.jpg",
      videoUrl:
        "https://www.youtube.com/embed/e_E9W2vsRbQ?autoplay=1&controls=1&mute=0&rel=0",
    },
  ];

  return (
    <section className="relative w-full h-[500px] md:h-[700px] bg-slate-950">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />

              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6 md:px-12">
                  <div className="max-w-2xl space-y-6">
                    <h2 className="text-4xl md:text-7xl font-black text-white leading-tight uppercase italic tracking-tighter">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 font-medium max-w-lg">
                      {slide.description}
                    </p>

                    <div className="flex items-center gap-6 pt-4">
                      <Link
                        href="/games"
                        className="btn btn-primary btn-lg rounded-xl text-white font-bold px-8"
                      >
                        Explore
                      </Link>

                      {/* Watch Trailer Button */}
                      <button
                        onClick={() => setActiveVideo(slide.videoUrl)}
                        className="btn btn-outline btn-lg border-white text-white rounded-xl hover:bg-white hover:text-black font-bold flex items-center gap-2"
                      >
                        <Play size={20} fill="currentColor" /> Watch Trailer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- Video Modal Overlay --- */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-300">
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 text-white hover:text-indigo-400 transition"
          >
            <X size={40} />
          </button>

          <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20">
            <iframe
              src={activeVideo}
              className="w-full h-full"
              allow="autoplay"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #6366f1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #6366f1 !important;
        }
      `}</style>
    </section>
  );
};

export default Banner;
