"use client";

import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

export function LogoutButton() {
  const router = useRouter();

  return (
    <Button

      className="absolute right-12 top-4 font-nunito font-normal hover:bg-[#f7bdc4] hover:text-black text-white bg-[#4a4a4a]"
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