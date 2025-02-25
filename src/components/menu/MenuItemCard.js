import Image from "next/image";
import { useState, useEffect } from "react";
import StarRating from "../ui/StarRating";
import { motion } from "framer-motion";
import ButtonPrimary from "../ui/ButtonPrimary";

function MenuItemCard({ onAddToCard, ...item }) {
  const {
    name,
    description,
    category,
    basePrice,
    sizes,
    extras,
    ratings,
    freeShipping,
  } = item;

  // *********************************************************************************//
  // In this section I want to show for each categoris one image based on its name
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // *********************************************************************************//

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="z-40 relative mt-[120px] bg-gray-100 dark:bg-dark-SBackground p-8 rounded-lg text-center hover:shadow-md hover:bg-white hover:cursor-pointer transition-all"
    >
      {freeShipping ? (
        <div className="absolute left-4 bg-green-500 p-2 rounded-lg text-white text-xs">
          10%
        </div>
      ) : (
        ""
      )}

      <div className="shadow-lg w-[150px] h-[150px] mx-auto absolute -top-[100px] left-0 right-0 bg-gray-100 dark:bg-dark-SBackground p-4 rounded-full text-center hover:shadow-md hover:bg-white hover:cursor-pointer transition-all">
        {categories.map((cat) => {
          if (cat._id === item.category) {
            switch (cat.name) {
              case "cat1":
                return (
                  <Image
                    src="/assets/plato.webp"
                    key={cat._id}
                    alt={name}
                    width={150}
                    height={150}
                    className="block mx-auto"
                  />
                );
              case "cat2":
                return (
                  <Image
                    src="/assets/food2.webp"
                    key={cat._id}
                    alt={name}
                    width={150}
                    height={150}
                    className="block mx-auto"
                  />
                );
              default:
                return (
                  <Image
                    src="/assets/food3.webp"
                    key={cat._id}
                    alt={name}
                    width={150}
                    height={150}
                    className="block mx-auto"
                  />
                );
            }
          }
          return null;
        })}
      </div>
      <div className="flex justify-between p-4 mt-8">
        <h4 className="font-semibold text-light-text dark:text-dark-text text-xl">
          {name}
        </h4>
        <h4 className="font-semibold text-third text-xl">{basePrice}$</h4>
      </div>

      <StarRating rating={ratings} />

      <p className="text-gray-500 text-sm line-clamp-2 mt-8">{description}</p>

      <div className="lg:w-[80%] mx-auto mt-16">
        <ButtonPrimary onClick={onAddToCard} title="Add to cart" />
      </div>
    </motion.div>
  );
}

export default MenuItemCard;
