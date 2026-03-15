import Banner from "@/components/Home/Banner";
import NewRelease from "@/components/Home/NewRelease";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <section>
      <Banner></Banner>
     </section>
    <section>
      <NewRelease></NewRelease>
    </section>
    </div>
  );
}
