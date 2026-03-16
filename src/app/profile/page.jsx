"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Mail, User, ShieldCheck, ShoppingBag, LayoutDashboard, UserCircle, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [myOrders, setMyOrders] = useState([]);
  const [myProducts, setMyProducts] = useState([]);

  // ইউজারের ডাটা ফেচ করা
  useEffect(() => {
    if (session?.user?.email) {
      // ইউজারের অর্ডারগুলো লোড করা
      fetch(`/api/order?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => setMyOrders(data.data || []));

      // ইউজারের অ্যাড করা গেমগুলো লোড করা
      fetch(`/api/games?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => setMyProducts(data.data || []));
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-indigo-500"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p className="text-xl font-bold">Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Profile Header */}
        <div className="bg-slate-900 rounded-[2rem] border border-slate-800 p-8 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full border-4 border-indigo-500 p-1">
              <img
                src={session.user?.image || "https://i.ibb.co/v38Yf7D/avatar.png"}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                {session.user?.name}
              </h1>
              <p className="text-indigo-400 font-medium flex items-center justify-center md:justify-start gap-2">
                <ShieldCheck className="w-4 h-4" /> Professional Gamer
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-4 mt-8 border-t border-slate-800 pt-6">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'profile' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              <UserCircle className="w-4 h-4" /> Profile Details
            </button>
            <button 
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'orders' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              <ShoppingBag className="w-4 h-4" /> My Orders ({myOrders.length})
            </button>
            <button 
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'products' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              <LayoutDashboard className="w-4 h-4" /> Manage Products ({myProducts.length})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === "profile" && (
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-xl font-bold text-white mb-6">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">Display Name</p>
                  <p className="text-white font-medium">{session.user?.name}</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">Email Address</p>
                  <p className="text-white font-medium">{session.user?.email}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4">
              {myOrders.length > 0 ? myOrders.map((order) => (
                <div key={order._id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex gap-4 items-center">
                  <img src={order.thumbnail} className="w-16 h-16 rounded-xl object-cover" alt="" />
                  <div>
                    <h4 className="text-white font-bold">{order.gameTitle}</h4>
                    <p className="text-indigo-400 text-sm">${order.price}</p>
                    <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 uppercase font-bold">{order.status}</span>
                  </div>
                </div>
              )) : <p className="text-slate-500 p-8">No orders found.</p>}
            </div>
          )}

          {activeTab === "products" && (
            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden animate-in fade-in slide-in-from-bottom-4">
              <table className="w-full text-left">
                <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase font-bold">
                  <tr>
                    <th className="p-4">Game</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {myProducts.length > 0 ? myProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img src={product.thumbnail} className="w-10 h-10 rounded-lg object-cover" alt="" />
                        <span className="text-white font-medium">{product.title}</span>
                      </td>
                      <td className="p-4 text-slate-400">{product.category}</td>
                      <td className="p-4 text-indigo-400 font-bold">${product.price}</td>
                      <td className="p-4">
                        <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-slate-500">You haven't added any games yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;