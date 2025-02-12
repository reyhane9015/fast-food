"use client";

import { useState, useEffect } from "react";
import MenuItem from "./menu/MenuItem";
import SectionHeader from "./ui/SectionHeader";

function NewestProducts() {
  const [newestProducts, setNewestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewestProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/menu-items");
        if (!res.ok) {
          throw new Error("Failed to fetch menu items");
        }
      } catch (err) {
        setError(err.messsage);
      } finally {
        setLoading(false);
      }
    };
    fetchNewestProduct();
  }, []);

  return (
    <section>
      <SectionHeader subHeader={"Our"} mainHeader={"Newest Products"} />

      {loading && (
        <div className="max-w-6xl mx-auto animate-pulse grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          <div className="rounded-md bg-slate-200 h-96 w-72"></div>
          <div className="rounded-md bg-slate-200 h-96 w-72"></div>
          <div className="rounded-md bg-slate-200 h-96 w-72"></div>
          <div className="rounded-md bg-slate-200 h-96 w-72"></div>
        </div>
      )}

      {error && (
        <div className="text-red-500 font-bold text-center">{error}</div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        {newestProducts?.length > 0 &&
          newestProducts.map((item) => <MenuItem key={item._id} {...item} />)}
      </div>
    </section>
  );
}

export default NewestProducts;
