import { Icons } from "../../../components/ui/icons";

function waitForTwoSeconds(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

export default async function MagicLayout() {
  await waitForTwoSeconds();
  return (
    <div className="flex flex-col items-center justify-center">
      <Icons.email className="h-16 w-16 mb-4" />
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Check your email
        </h1>
        <p className="text-sm text-muted-foreground">
          View your email and click on the link to sign in.
        </p>
      </div>
    </div>
  );
}
