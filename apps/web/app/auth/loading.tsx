import { Metadata } from "next";
import { Icons } from "../../components/ui/icons";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthLoading() {
  return (
    <div className="flex items-center justify-center">
      <Icons.spinner className="h-8 w-8 animate-spin" />
    </div>
  );
}
