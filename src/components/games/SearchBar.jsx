"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);
    
    params.set("page", "1");

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

   
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative w-full md:w-96 group mb-10">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors"
        size={20}
      />
      <input
        type="text"
        placeholder="Search games..."
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full bg-slate-900 border border-slate-800 text-white pl-12 pr-4 py-3 rounded-2xl focus:outline-none focus:border-indigo-500 transition-all font-medium italic"
      />
    </div>
  );
};

export default SearchBar;
