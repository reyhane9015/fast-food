import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BackImages from "@/components/layout/BackImages";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />

      <section className="bg-light-background dark:bg-dark-background min-h-screen pb-8 px-8 md:px-12">
        <BackImages />

        <div className="relative z-40 text-center font-semibold h-screen flex flex-col gap-2 justify-center items-center">
          <h2 className="text-primary text-2xl">Page Not Found</h2>
          <Link href="/" className="text-gray-500 underline">
            Return Home
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
