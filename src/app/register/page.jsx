"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { useState } from "react";
import SocialLogin from '@/app/SocialLogin/page'

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); 

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    try {
     
      const formData = new FormData();
      formData.append("image", image);

      const imgbb_api_key = "b924416928da101cbc8dfb878d20ea40";
      const img_res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbb_api_key}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const img_data = await img_res.json();

      if (!img_data.success) {
        throw new Error("Image upload failed!");
      }

      const photoUrl = img_data.data.display_url;

      
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, photo: photoUrl }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
       
        const loginRes = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (loginRes.ok) {
          Swal.fire({
            title: "Success!",
            text: "Account created and logged in successfully.",
            icon: "success",
            background: "#0f172a",
            color: "#ffffff",
            confirmButtonColor: "#4f46e5",
          }).then(() => {
            router.push("/");
            router.refresh();
          });
        }
      } else {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: error.message || "Something went wrong!",
        icon: "error",
        background: "#0f172a",
        color: "#ffffff",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <form
        onSubmit={handleRegister}
        className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-md shadow-2xl"
      >
        <h2 className="text-white text-2xl font-bold mb-6 text-center italic uppercase tracking-wider">
          Create <span className="text-indigo-500">Account</span>
        </h2>

        <div className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            required
            className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-lg outline-none focus:border-indigo-500 transition-colors"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-lg outline-none focus:border-indigo-500 transition-colors"
          />

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-slate-400">Profile Photo</span>
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              required
              className="file-input file-input-bordered w-full bg-slate-950 border-slate-800 text-white"
            />
          </div>

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
          {loading ? "Processing..." : "REGISTER NOW"}
        </button>
        <SocialLogin></SocialLogin>
        <p className="text-slate-400 text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-500 font-bold hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
