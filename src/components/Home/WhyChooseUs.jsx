import React from "react";
import { ShieldCheck, Zap, Headset, CreditCard } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-indigo-500" />,
      title: "Instant Services",
      description:
        "Get your game activation keys immediately after purchase. No waiting, just gaming.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-indigo-500" />,
      title: "Secure Payment",
      description:
        "100% secure checkout with encrypted payment gateways. Your data is always safe.",
    },
    {
      icon: <Headset className="w-8 h-8 text-indigo-500" />,
      title: "24/7 Support",
      description:
        "Our dedicated team is always online to help you with any technical issues.",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-indigo-500" />,
      title: "Best Prices",
      description:
        "We offer the most competitive prices and seasonal discounts on top titles.",
    },
  ];

  return (
    <section className="bg-slate-950 py-24 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-4">
            Why Choose <span className="text-indigo-500">Our Store?</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium italic">
            Experience the ultimate gaming destination with premium services and
            unmatched security.
          </p>
          <div className="h-1.5 w-24 bg-indigo-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-indigo-500/30 transition-all duration-500 group hover:-translate-y-2"
            >
              <div className="bg-slate-950 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-slate-800 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.2)] transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black text-white uppercase italic mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
