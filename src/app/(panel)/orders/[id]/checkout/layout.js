"use client";


// import Header from '@/components/layout/Header';
// import Footer from '@/components/layout/Footer';
import BackImages from '@/components/layout/BackImages';


export default function RootLayout({ children }) {

 

  return (
    <>
     

      <section className="bg-light-background dark:bg-dark-background min-h-screen pb-8 px-8 md:px-12">

        <BackImages />
    
        <div>
            {children}
        </div>
          
      </section>

   
    </>
  )
}

