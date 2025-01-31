import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Loading() {
  return (
    <>
      <Header />

      <section className="bg-light-background dark:bg-dark-background min-h-screen pb-8 px-8 md:px-12">
        <div className="text-center font-semibold text-primary bg-light-background dark:bg-dark-background text-2xl h-screen flex justify-center items-center">
          Loading...
        </div>
      </section>

      <Footer />
    </>
  );
}
