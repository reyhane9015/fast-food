"use client";

import SectionHeader from '@/components/ui/SectionHeader';
import MenuItem from '@/components/menu/MenuItem';
import { useState , useEffect } from 'react';

function MenuPage() {


    const[categories , setCategories] = useState([]);
    const[menuItems , setMenuItems] = useState([]);
    const[loading , setLoading] =useState(true);


    useEffect(() => {

        setLoading(true);

        fetch('/api/categories').then(response => {
            response.json().then(categories => setCategories(categories));
        });

        fetch('/api/menu-items').then(response => {
            response.json().then(menuItems => setMenuItems(menuItems));
        });
        
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    },[])



  return (
    <section className="py-16 bg-light-background dark:bg-dark-background min-h-screen">

            
        {loading && <div 
                    className="relative z-40 text-center font-semibold text-primary text-2xl h-screen flex justify-center items-center">
                        Loading...
                    </div>
        }


        <div className="max-w-6xl mx-auto px-4 md:px-12">
            {categories?.length > 0 && categories.map(cat => (
                <div key={cat._id}>
                    <div className="relative text-center z-40">
                        <SectionHeader subHeader={'Our'} mainHeader={cat.name} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {menuItems?.length > 0 && (
                            menuItems.filter(item => item.category === cat._id).map(item => 
                                <MenuItem key={item._id} {...item} />
                        ))}    
                    </div>

                    {menuItems.filter(item => item.category === cat._id).length === 0 &&
                        <div className="relative z-40 mx-auto text-center my-16 font-semibold text-primary text-xl">
                            There are No items in this category
                        </div>
                    }
                </div>
            ))}
        </div>


    </section>
  )
}

export default MenuPage
