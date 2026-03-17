"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  ShieldCheck,
  ShoppingBag,
  LayoutDashboard,
  UserCircle,
  Trash2,
  CheckCircle,
  XCircle,
  Users,
} from "lucide-react";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [loadingAction, setLoadingAction] = useState(null);

  const isAdmin = session?.user?.role === "admin";

  
  useEffect(() => {
    if (session?.user?.email) {
      
      const orderQuery = isAdmin
        ? "/api/order"
        : `/api/order?email=${session.user.email}`;

      fetch(orderQuery)
        .then((res) => res.json())
        .then((data) => setOrders(data.data || []));

      
      fetch(`/api/games?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => setMyProducts(data.data || []));
    }
  }, [session, isAdmin]);

  
  const handleUpdateStatus = async (orderId, newStatus) => {
    setLoadingAction(orderId);
    try {
      const res = await fetch(`/api/order/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (data.success) {
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        Swal.fire({
          title: `Order ${newStatus}!`,
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          background: "#0f172a",
          color: "#fff",
        });
      }
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoadingAction(null);
    }
  };

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
        <p className="text-xl font-bold italic uppercase tracking-widest">
          Access Denied. Please Login.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-slate-900 rounded-[2rem] border border-slate-800 p-8 shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            {isAdmin ? <ShieldCheck size={120} /> : <UserCircle size={120} />}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div
              className={`w-24 h-24 rounded-full border-4 ${
                isAdmin ? "border-amber-500" : "border-indigo-500"
              } p-1`}
            >
              <img
                src={
                  session.user?.image || "https://i.ibb.co/v38Yf7D/avatar.png"
                }
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                {session.user?.name}
              </h1>
              <p
                className={`${
                  isAdmin ? "text-amber-500" : "text-indigo-400"
                } font-bold flex items-center justify-center md:justify-start gap-2 uppercase text-xs tracking-widest mt-1`}
              >
                {isAdmin ? (
                  <>
                    <ShieldCheck className="w-4 h-4" /> System Administrator
                  </>
                ) : (
                  <>
                    <UserCircle className="w-4 h-4" /> Verified Member
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-4 mt-8 border-t border-slate-800 pt-6">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${
                activeTab === "profile"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              <UserCircle className="w-4 h-4" /> Details
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${
                activeTab === "orders"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {isAdmin ? (
                <Users className="w-4 h-4" />
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
              {isAdmin
                ? `All Orders (${orders.length})`
                : `My Orders (${orders.length})`}
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${
                activeTab === "products"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />{" "}
              {isAdmin ? "All Products" : "My Products"} ({myProducts.length})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === "profile" && (
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-xl font-bold text-white mb-6 uppercase italic tracking-wider">
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-500 uppercase font-black mb-1 tracking-widest">
                    Display Name
                  </p>
                  <p className="text-white font-bold text-lg">
                    {session.user?.name}
                  </p>
                </div>
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-500 uppercase font-black mb-1 tracking-widest">
                    Email Address
                  </p>
                  <p className="text-white font-bold text-lg">
                    {session.user?.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex flex-col md:flex-row gap-6 items-center justify-between hover:border-slate-700 transition-all"
                  >
                    <div className="flex gap-5 items-center w-full">
                      <img
                        src={order.thumbnail}
                        className="w-20 h-20 rounded-2xl object-cover border border-slate-700"
                        alt=""
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-white font-black uppercase italic tracking-tight text-lg">
                            {order.gameTitle}
                          </h4>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-black uppercase border ${
                              order.status === "accepted"
                                ? "border-green-500 text-green-500 bg-green-500/10"
                                : order.status === "rejected"
                                ? "border-red-500 text-red-500 bg-red-500/10"
                                : "border-amber-500 text-amber-500 bg-amber-500/10"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-indigo-400 font-bold mt-1">
                          ${order.price}
                        </p>
                        {isAdmin && (
                          <p className="text-slate-500 text-xs mt-1">
                            Customer:{" "}
                            <span className="text-slate-300">
                              {order.buyerEmail}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Admin Actions */}
                    {isAdmin && order.status === "pending" && (
                      <div className="flex gap-3 w-full md:w-auto">
                        <button
                          onClick={() =>
                            handleUpdateStatus(order._id, "accepted")
                          }
                          disabled={loadingAction === order._id}
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50"
                        >
                          <CheckCircle className="w-4 h-4" /> Accept
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(order._id, "rejected")
                          }
                          disabled={loadingAction === order._id}
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50"
                        >
                          <XCircle className="w-4 h-4" /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-slate-900 rounded-[2rem] border border-dashed border-slate-800">
                  <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-500 font-bold uppercase tracking-widest">
                    No orders found in the system.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "products" && (
            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase font-black tracking-widest">
                    <tr>
                      <th className="p-6">Game Details</th>
                      <th className="p-6">Category</th>
                      <th className="p-6">Price</th>
                      <th className="p-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {myProducts.length > 0 ? (
                      myProducts.map((product) => (
                        <tr
                          key={product._id}
                          className="hover:bg-indigo-600/5 transition-colors group"
                        >
                          <td className="p-6">
                            <div className="flex items-center gap-4">
                              <img
                                src={product.thumbnail}
                                className="w-12 h-12 rounded-xl object-cover border border-slate-700 group-hover:border-indigo-500 transition-all"
                                alt=""
                              />
                              <span className="text-white font-bold text-lg italic tracking-tight uppercase">
                                {product.title}
                              </span>
                            </div>
                          </td>
                          <td className="p-6">
                            <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">
                              {product.category}
                            </span>
                          </td>
                          <td className="p-6 text-indigo-400 font-black text-lg">
                            ${product.price}
                          </td>
                          <td className="p-6 text-right">
                            <button className="p-3 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all active:scale-90">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="p-20 text-center">
                          <LayoutDashboard className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                          <p className="text-slate-500 font-bold uppercase tracking-widest">
                            Your inventory is empty.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
