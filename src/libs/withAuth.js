import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      if (status === "loading") return;

      if (status === "authenticated") {
        fetch("/api/profile")
          .then((response) => response.json())
          .then((data) => {
            if (data.admin) {
              setIsAdmin(true);
            } else {
              router.push("/profile");
            }
          })
          .catch((error) => {
            console.error("Error fetching profile:", error);
            router.push("/profile");
          });
      } else {
        router.push("/login");
      }
    }, [status, router]);

    if (!session || !session.user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  // Add a display name to the HOC
  WithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuth;
};

export default withAuth;
