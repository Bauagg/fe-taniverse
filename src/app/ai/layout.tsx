import Navbar from "@/components/layout/Navbar";

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
