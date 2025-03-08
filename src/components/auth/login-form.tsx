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

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) =>
    startTransition(async () => {
      const { data, error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        console.error(error);
        toast.error(error.message);
        return;
      }

      console.info(data);
      router.push("/");
      toast.success("Login successful");
    });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-[524px] h-[540px] relative bg-[#fff5e1] rounded-xl border border-[#5a4f40]">
        <CardHeader>
          <CardTitle className="w-44 h-[45px] relative justify-start text-[#4a4a4a] text-[40px] font-normal font-poppins underline">Inloggen</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-8 flex flex-col items-center mt-12" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-8">
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
                {isPending && <Loader2 className="mr-2  animate-spin w-[107px] h-[45px] relative justify-start " />}
                Inloggen
              </Button>

              
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-[#4a4a4a] text-xl font-normal font-nunito">
                Nog geen account? Maak{" "} 
                <Link href="/auth/register" className="text-[#f7bdc4] text-xl font-normal font-nunito underline">
                  hier
                </Link>
                {" "} 
                een account.
              </div>
    </div>
  );
}