import Link from "next/link";
import { Icons } from "../../../../components/ui/icons";

export default async function MagicVerify() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Icons.email className="h-16 w-16 mb-4" />
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Magic link has expired or is invalid
        </h1>
        <p className="text-sm text-muted-foreground">
          Please <Link href="/auth/signin">sign in</Link> again.
        </p>
      </div>
    </div>
  );
}
