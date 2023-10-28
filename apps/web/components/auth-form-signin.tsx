"use client";

import * as React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Icons } from "./ui/icons";
import { cn } from "../lib/utils";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { magicSignIn } from "../data";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { GoogleAuth } from "./auth-google";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AuthFormSignIn({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();
  const FormSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: ``,
    },
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  async function handleLogin(data: z.infer<typeof FormSchema>) {
    if (!data.email) return;
    setIsLoading(true);
    try {
      await magicSignIn(data.email);
      router.push(`/auth/magic`);
    } catch (error: any) {
      toast({
        title: "Unable to login",
        description: error,
        variant: `destructive`,
      });
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6 p-4", className)} {...props}>
      <Toaster />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="w-full">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Continue with Email
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleAuth />
    </div>
  );
}
