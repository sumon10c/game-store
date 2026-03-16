"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useSession, signIn } from "next-auth/react"; 
import { usePathname } from "next/navigation"; 

const OrderModal = ({ game }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname(); 

 
  const handleButtonClick = () => {
    if (status === "unauthenticated") {
     
      signIn(undefined, { callbackUrl: pathname });
    } else {
   
      setIsOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const orderData = {
      gameId: game._id,
      gameTitle: game.title,
      price: game.price,
      customerName: e.target.name.value,
      customerEmail: e.target.email.value,
      phone: e.target.phone.value,
      thumbnail: game.thumbnail,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          title: "Application Submitted!",
          text: `Order for ${game.title} received.`,
          icon: "success",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#6366f1",
        });
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={handleButtonClick} 
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
      >
        Buy Now
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl relative">
            <h2 className="text-2xl font-black text-white mb-1 uppercase italic tracking-tighter">
              Application <span className="text-indigo-500">Form</span>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Selected Game</label>
                <input name="gameTitle" type="text" defaultValue={game.title} readOnly className="w-full bg-slate-800/30 border border-slate-800 text-indigo-400 p-3 rounded-xl outline-none cursor-not-allowed font-bold" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Full Name</label>
                <input name="name" type="text" defaultValue={session?.user?.name || ""} required placeholder="Your Name" className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl outline-none focus:border-indigo-500 transition-all" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Email Address</label>
                <input name="email" type="email" defaultValue={session?.user?.email || ""} readOnly className="w-full bg-slate-800/30 border border-slate-800 text-slate-500 p-3 rounded-xl outline-none cursor-not-allowed font-medium" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Phone Number</label>
                <input name="phone" type="text" required placeholder="e.g. 01700000000" className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl outline-none focus:border-indigo-500 transition-all" />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsOpen(false)} className="flex-1 bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-700 transition-all">Cancel</button>
                <button disabled={submitting} type="submit" className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-500 transition-all disabled:opacity-50">
                  {submitting ? "Processing..." : "Confirm Buy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderModal;