import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import BackImages from '@/components/layout/BackImages';


export default function Loading() {
    return (
        <>

            <Header />
    
            <section className="bg-light-background dark:bg-dark-background min-h-screen pb-8 px-8 md:px-12">
    
                {/* <BackImages /> */}

                <div className="flex items-center justify-center min-h-screen">
                        <div className="relative z-40 w-12 h-12 rounded-full animate-spin border-8 border-solid border-primary border-t-transparent"></div>
                </div>

                </section>


            <Footer />

        </>
    );
  }
  