import Navbar from "@/components/layout/Navbar";

export default function KomunitasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
