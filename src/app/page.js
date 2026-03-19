import Banner from "@/components/Home/Banner";
import CommunityReviews from "@/components/Home/CommunityReviews";
import NewRelease from "@/components/Home/NewRelease";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
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
    <section>
      <WhyChooseUs></WhyChooseUs>
    </section>
    <section>
      <CommunityReviews></CommunityReviews>
    </section>
    
    </div>
  );
}
