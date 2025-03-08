"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) =>
    startTransition(async () => {
      const { data, error } = await authClient.signUp.email(values);

      if (error) {
        console.error(error);
        toast.error(error.message);
        return;
      }

      console.info(data);
      router.push("/");
      toast.success("Registration successful");
    });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-[524px] h-[540px] relative bg-[#fff5e1] rounded-xl border border-[#5a4f40]">
        <CardHeader>
          <CardTitle className="w-[397px] h-[45px] relative justify-start text-[#4a4a4a] text-[40px] font-normal font-poppins underline">Account aanmaken</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-8 flex flex-col items-center mt-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormControl className="w-[402px] h-[84px] relative bg-white rounded-xl">
                        <Input className="font-nunito placeholder:text-black text-black" placeholder="Naam" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormControl className="w-[402px] h-[84px] relative bg-white rounded-xl">
                        <Input className="font-nunito placeholder:text-black text-black" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormControl className="w-[402px] h-[84px] relative bg-white rounded-xl">
                        <Input className="font-nunito placeholder:text-black text-black" type="password" placeholder="Wachtwoord" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-[161px] h-[58px] relative bg-[#f7bdc4] hover:bg-[#4a4a4a] hover:text-white rounded-xl text-[#4a4a4a] text-[27px] font-normal font-nunito" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Aanmaken
              </Button>

              
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-[#4a4a4a] text-xl font-normal font-nunito">
                Al een account? Log{" "}
                <Link href="/auth/login" className="text-[#f7bdc4] text-xl font-normal font-nunito underline">
                  hier
                </Link>
                {" "} 
                in je account.
              </div>
    </div>
  );
}