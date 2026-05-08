import Navbar from "@/components/layout/Navbar";
import FeedPage from "@/components/komunitas/FeedPage";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <FeedPage />
      </main>
    </>
  );
}
