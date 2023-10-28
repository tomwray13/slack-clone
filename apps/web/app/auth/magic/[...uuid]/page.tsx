import Link from "next/link";
import { Icons } from "../../../../components/ui/icons";
import VerifyMagicUiid from "../../../../components/verify-magic-uuid";

export default async function MagicVerify({
  params,
}: {
  params: { uuid: string };
}) {
  return <VerifyMagicUiid uuid={params.uuid} />;
}
