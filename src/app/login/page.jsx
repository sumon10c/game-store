"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { useState } from "react";
import SocialLogin from '@/app/SocialLogin/page'

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, 
      });

      if (res.ok) {
        Swal.fire({
          title: "Welcome Back!",
          text: "Login successful!",
          icon: "success",
          background: "#0f172a",
          color: "#ffffff",
          confirmButtonColor: "#4f46e5",
        }).then(() => {
          router.push("/");
          router.refresh(); 
        });
      } else {
        throw new Error(res.error || "Invalid Email or Password");
      }
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error.message,
        icon: "error",
        background: "#0f172a",
        color: "#ffffff",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-md shadow-2xl"
      >
        <h2 className="text-white text-2xl font-bold mb-6 text-center italic uppercase tracking-wider">
          User <span className="text-indigo-500">Login</span>
        </h2>

        <div className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-lg outline-none focus:border-indigo-500 transition-colors"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-lg outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className={`w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-all mt-6 shadow-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Verifying..." : "LOGIN"}
        </button>
        
        <SocialLogin></SocialLogin>

        <p className="text-slate-400 text-center mt-6 text-sm">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-indigo-500 font-bold hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default page;
