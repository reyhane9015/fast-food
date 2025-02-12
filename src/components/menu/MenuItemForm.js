"use client";

import { useState, useEffect } from "react";
import MenuItemPriceProps from "./MenuItemPriceProps";
import Input from "../ui/Input";
import InputSelect from "../ui/InputSelect";
import InputTextarea from "../ui/InputTextarea";

function MenuItemForm({ onSubmit, menuItem, category, setCategory }) {
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraItems, setextraItems] = useState(menuItem?.extraItems || []);
  const [categories, setCategories] = useState([]);
  const [ratings, setRatings] = useState(menuItem?.ratings || 0);
  const [freeShipping, setFreeShipping] = useState(
    menuItem?.freeShipping || false
  );

  const [isSaving, setIsSaving] = useState(false);

  // fetch all categories
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((categories) => {
        setCategories(categories);

        const selectedCategory = categories.find(
          (cat) => cat._id === menuItem.category
        );

       
        if (selectedCategory) {
          setCategory(selectedCategory);
        }
      })
      .catch((error) => console.error("Failed to fetch categories:", error));
  }, []);

  return (
    <div className="max-w-xl m-auto border rounded-md p-4">
      <form
        className="grow"
        onSubmit={(e) =>
          onSubmit(e, {
            name,
            description,
            basePrice,
            sizes,
            extraItems,
            category,
            ratings,
            freeShipping,
          })
        }
      >
        <Input
          type={"text"}
          label={"Item Name"}
          placeholder={"Item Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <InputSelect
          label={"Item Category"}
          value={category ? category.name : ""}
          onChange={(e) => setCategory(e.target.value)}
          optionaLabel={"Select a category"}
          optionItems={categories}
          isSaving={isSaving}
          isEditable={!isSaving}
        />

        <InputTextarea
          type={"text"}
          label={"Item Description"}
          placeholder={"Item Description"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          isSaving={isSaving}
          isEditable={!isSaving}
        />

        <Input
          type={"text"}
          label={"Item Price"}
          placeholder={"Item Price"}
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
        />

        <div className="flex gap-2 items-center justify-between">
          <div>
            <label>Item Ratings</label>
            <input
              type="number"
              min="0"
              max="5"
              step="1"
              placeholder="Ratings (0-5)"
              value={ratings}
              disabled={isSaving}
              onChange={(e) => setRatings(parseFloat(e.target.value))}
              className="border border-gray-200 dark:bg-dark-SBackground text-light-text dark:text-dark-text px-2 rounded-lg"
            />
          </div>

          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="FreeShipping"
            >
              <input
                id="FreeShipping"
                type="checkbox"
                className=""
                value={"1"}
                checked={freeShipping}
                onChange={(ev) => setFreeShipping(ev.target.checked)}
              />
              <span>Free Shipping</span>
            </label>
          </div>
        </div>

        <MenuItemPriceProps props={sizes} setProps={setSizes} label={"Size"} />

        <MenuItemPriceProps
          props={extraItems}
          setProps={setextraItems}
          label={"Item"}
        />

        <button type="submit" className="mt-8" disabled={isSaving}>
          Save
        </button>
      </form>
    </div>
  );
}

export default MenuItemForm;
