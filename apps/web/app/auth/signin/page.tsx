import Link from "next/link";
import { buttonVariants } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import { AuthForm } from "../../../components/auth-form";

export default function SignIn() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login
        </p>
      </div>
      <AuthForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/auth/signup"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Create Account
        </Link>
      </p>
    </>
  );
}
