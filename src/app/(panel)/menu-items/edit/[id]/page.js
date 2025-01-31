"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "@/components/menu/MenuItemForm";
import DeleteButton from "@/components/DeleteButton";
import { useSession } from "next-auth/react";
import withAuth from "./../../../../../libs/withAuth";
import LinkPrimary from "@/components/ui/LinkPrimary";

function EditMenuItemPage() {
  const session = useSession();
  const status = session.status;

  const [menuItem, setMenuItem] = useState(null);

  const [isSaving, setIsSaving] = useState(false);

  const [redirectToItems, setRedirectToItems] = useState(false);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState({});

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    fetch("/api/menu-items")
      .then((res) => res.json())
      .then((data) => {
        const item = data.find((i) => i._id == id);
        setMenuItem(item);

        setCategory(item.category);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
        setLoading(false);
      });
  }, [id]);

  // Edit MenuItems
  const handleFormSubmit = async (e, data) => {
    e.preventDefault();

    if (!data) {
      console.error("Form data is undefined");
      return;
    }

    setIsSaving(true);

    try {
      const savingPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/menu-items", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, category: category, _id: id }),
        });

        if (response.ok) {
          resolve();
        } else {
          reject();
        }
      });
      await toast.promise(savingPromise, {
        loading: "Editing...",
        success: "Item edited Successfully!",
        error: "Error In Editing!",
      });

      setIsSaving(false);
      setRedirectToItems(true);
    } catch (error) {
      console.error("Error in handleFormSubmit:", error);
      toast.error("Error saving item.");
    } finally {
      setIsSaving(false);
    }
  };

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  // Delete item
  async function handleItemDelete() {
    const deletionPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/menu-items", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: id }), // Passing the id of the item to delete
        });

        if (!response.ok) {
          throw new Error("Failed to delete menu item");
        }

        resolve();
      } catch (error) {
        reject(error);
      }
    });

    await toast.promise(deletionPromise, {
      loading: "Deleting Item...",
      success: "Item Deleted Successfully!",
      error: "Error in Deleting Item",
    });

    setRedirectToItems(true);
  }

  if (status == "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section>
      {status == "authenticated" && (
        <div className="max-w-6xl m-auto pb-8">
          <div className="flex justify-between">
            <div className="w-[170px] mb-16">
              <LinkPrimary href={"/menu-items/new"} title="Back to All Items" />
            </div>

            <div>
              <DeleteButton label="Delete" onDelete={handleItemDelete} />
            </div>
          </div>

          {menuItem !== null && (
            <MenuItemForm
              onSubmit={handleFormSubmit}
              menuItem={menuItem}
              category={category}
              setCategory={setCategory}
              isSaving={isSaving}
            />
          )}
        </div>
      )}
    </section>
  );
}

export default withAuth(EditMenuItemPage);
