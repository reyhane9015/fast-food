"use client";

import { useState , useEffect } from 'react';
import MenuItem from './menu/MenuItem';
import SectionHeader from './ui/SectionHeader';

function BestSellers() {

    const[bestSellers , setBestSellers] = useState([]);
    const[loading , setLoading] =useState(true);


    useEffect(() => {
        setLoading(true);
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {

                const sortedItems = menuItems.sort((a, b) => b.ratings - a.ratings);
                const bestSelleres = sortedItems.slice(0, 4);
                setBestSellers(bestSelleres);
            })
        })
        setLoading(false);
    },[])


  return (
    <section>

        <SectionHeader subHeader={'Our'} mainHeader={'Best Sellers'} />

        {/* {loading && 
            <div className="max-w-6xl mx-auto animate-pulse grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="rounded-md bg-slate-200 h-96"></div>
                <div className="rounded-md bg-slate-200 h-96"></div>
                <div className="rounded-md bg-slate-200 h-96"></div>
                <div className="rounded-md bg-slate-200 h-96"></div>
            </div>
        } */}


        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSellers?.length > 0 && bestSellers.map((item) => 
                <MenuItem key={item._id} {...item} />
            )}
        </div>
    </section>
  )
}

export default BestSellers
