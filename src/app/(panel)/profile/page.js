"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/ui/UserTabs";
import UserForm from "@/components/UserForm";

function ProfilePage() {
  const session = useSession();
  const status = session.status;

  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchProfile = async () => {
        try {
          const response = await fetch("/api/profile");
          if (!response.ok) {
            throw new Error("Failed to fetch profile");
          }
          const data = await response.json();
          setUser(data);
          setProfileFetched(true);
        } catch (error) {
          console.error("Error fetching profile:", error);
          toast.error("Error fetching profile");
          setProfileFetched(true);
        }
      };

      fetchProfile();
    }
  }, [status]);

  async function handleProfileInfoUpdate(e, data) {
    e.preventDefault();

    setIsSaving(true);

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
      setIsSaving(false);
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile Saved Successfully...",
      error: "Error In Saving...",
    });
  }

  if (status == "loading" || !user) {
    return (
      <div className="text-center font-semibold text-primary bg-light-background dark:bg-dark-background text-2xl h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (status == "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section>
      {status == "authenticated" && (
        <div>
          {user !== null && (
            <UserForm user={user} onSave={handleProfileInfoUpdate} />
          )}
        </div>
      )}
    </section>
  );
}

export default ProfilePage;
