"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import MenuItemForm from "@/components/menu/MenuItemForm";
import { useSession } from "next-auth/react";
import withAuth from "./../../../../libs/withAuth";
import LinkPrimary from "@/components/ui/LinkPrimary";

function NewMenuItemPage() {
  const session = useSession();
  const status = session.status;

  const [isSaving, setIsSaving] = useState(false);
  const [redirectToItems, setRedirectToItems] = useState(false);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState({});

  // Add New MenuItems
  async function handleFormSubmit(e, data) {
    e.preventDefault();

    setIsSaving(true);

    try {
      const savingPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/menu-items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, category: category?._id }),
        });

        if (response.ok) {
          resolve();
        } else {
          reject();
        }
      });
      await toast.promise(savingPromise, {
        loading: "Creating...",
        success: "Item Created Successfully!",
        error: "Error In Creating!",
      });

      setLoading(false);
      setRedirectToItems(true);
    } catch (error) {
      console.error("Error in handleFormSubmit:", error);
      toast.error("Error saving item.");
    } finally {
      setIsSaving(false);
    }
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (status == "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section>
      {status == "authenticated" && (
        <div className="max-w-6xl m-auto pb-8">
          <div className="w-[170px] mb-16">
            <LinkPrimary href={"/menu-items"} title="Back to All Items" />
          </div>

          <MenuItemForm
            onSubmit={handleFormSubmit}
            category={category}
            setCategory={setCategory}
          />
        </div>
      )}
    </section>
  );
}

export default withAuth(NewMenuItemPage);
