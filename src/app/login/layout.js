"use client";


import BackImages from '@/components/layout/BackImages';


export default function RootLayout({ children }) {

 

  return (


    <section className="bg-light-background dark:bg-dark-background px-8 md:px-12">

      <BackImages />
  
      <div>
          {children}
      </div>
        
    </section>


  )
}

