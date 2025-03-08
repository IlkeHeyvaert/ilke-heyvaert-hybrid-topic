"use client";

import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

export function LogoutButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="absolute right-2 top-2"
      onClick={async () => {
        const { data, error } = await authClient.signOut();

        if (error) {
          console.error(error);
          toast.error(error.message);
          return;
        }

        console.info(data);
        router.push("/auth/login");
        toast.success("Logout successful");
      }}
    >
      Logout
    </Button>
  );
}